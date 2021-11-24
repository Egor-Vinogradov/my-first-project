import {Pipe, PipeTransform} from "@angular/core";
import {Product} from "./product.service";

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], search: string): Product[] {
    if (!search.trim()) {
      return products
    }
    return products.filter(product => {
      return product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
  }

}
