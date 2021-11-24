import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class PagerService {
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 5) {
    // считаем количество страниц
    let totalPages = Math.ceil(totalItems / pageSize);

    // не выводим если текущая страница меньше 1
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      // если меньше 10 страниц, то показать все
      startPage = 1;
      endPage = totalPages;
    } else {
      // если больше 10, тогда расчитываем начальную и конечную страницу
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 3;
        endPage = currentPage + 2;
      }
    }

    // расчитываем индексы начального и конечного элементов
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // массив страниц
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
