import {Component, OnInit, ViewChild} from '@angular/core';
import {Product, ProductService} from "../../../../service/product.service";
import {delay} from "rxjs";
import {Router} from "@angular/router";
import {UserRole} from "../../../../service/auth.service";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  public loading: boolean = true
  public admin: boolean = false

  public products: Product[] = []
  private name: string = ''
  private size: number = 5
  public page: number = 0
  public allPage: number = 2147483647

  constructor(public productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.admin = this.getRole()
    this.productService.fetchAllPage(this.name)
      .subscribe({
          next: (allPage) => {
            this.allPage = allPage
            this.productService.fetchProducts(this.name, this.size, this.page)
              .subscribe({
                next: (products) => {
                    this.products = products
                    this.loading = false
                }
              })
          },
        error: (err) => {
          this.router.navigate(['/'])
        }
        })
  }

  private getRole(): boolean {
    if (localStorage.getItem('role') === UserRole.ADMIN) {
      return true
    }
    return false
  }

  public getForm(id: number) {
  }

  public removeProduct(id: number) {
    this.loading = true
    this.productService.fetchRemoveProduct(id)
      .pipe(delay(200))
      .subscribe({
        next: () => {
          this.loading = false
          this.ngOnInit()
        }
      })
  }

  public inputSearch(name: string) {
    this.name = name
    this.ngOnInit()
  }

  public inputSearchSize(size: number) {
    this.size = size
    this.ngOnInit()
  }

  public inputPage(page: number) {
    this.page = page
    this.ngOnInit()
  }

  public updateProduct(product: Product) {
    this.loading = true
    this.productService.updateProduct(product)
      .subscribe({
        next: (resp) => {
          this.loading = false
          this.ngOnInit()
        }
      })
  }
}
