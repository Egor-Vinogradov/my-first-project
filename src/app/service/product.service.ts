import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, take, tap} from "rxjs";

export interface Product {
  id: number
  name: string
  brand?: string

  calories?: number
  protein?: number
  fats?: number
  carbohydrates?: number
  measure: number

  version?: number
}

@Injectable({providedIn: 'root'})
export class ProductService {

  private url: string = 'http://localhost:8080/api/product';
  public headers = new HttpHeaders().set('Authorization', this.getToken())

  private options = {
    headers: this.headers,
    params: new HttpParams().set('token', this.getToken())
  }

  public notIndicated: string = 'Не указано'

  constructor(private http: HttpClient) {
  }

  public getToken(): any {
    return localStorage.getItem('auth_token')
  }

  public fetchProducts(name: string, size: number, page: number): Observable<Product[]> {
    const params: any = new HttpParams().set('page', page).set('size', size).set('name', name)
      .set('token', this.getToken())
    return this.http.get<Product[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', this.getToken()),
      params: params
    })
  }

  public fetchRemoveProduct(id: number | string) {
    const dt_update: number = Date.now()
    return this.http.delete(this.url + '/' + id + '/dt_update/' + dt_update, this.options)
  }

  public fetchAllPage(name: string): Observable<number> {
    const options = {
      headers: new HttpHeaders().set('Authorization', this.getToken()),
      params: new HttpParams().set('name', name).set('token', this.getToken())
    }
    return this.http.get<number>(this.url + '/all/', options)
  }

  public addProduct(product: Product) {
    return this.http.post(this.url, product, this.options)
  }

  public updateProduct(product: Product) {
    const dtUpdate: any = product.version
    const url: string = this.url + '/' + product.id + '/dt_update/' + dtUpdate
    return this.http.put(url, product, this.options)
  }

}
