import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from "../../../../service/product.service";
import {delay} from "rxjs";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public product: Product = {
    id: 0,
    name: '',
    brand: '',

    calories: 0,
    protein: 0,
    fats: 0,
    carbohydrates: 0,
    measure: 100
  }

  public loading: boolean = false;

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.cleanForm()
    this.product = {
      id: 0,
      name: '',
      measure: 100
    }
  }

  public addProduct(product: Product): void {
    this.loading = true
    this.productService.addProduct(product)
      .pipe(delay(200))
      .subscribe(() => {
        this.ngOnInit();
        this.loading = false;
      })
  }

  public cleanForm(): void {
    this.product.name = '';
    this.product.brand = '';
    this.product.calories = 0;
    this.product.protein = 0;
    this.product.fats = 0;
    this.product.carbohydrates = 0;
    this.product.measure = 100
  }

}
