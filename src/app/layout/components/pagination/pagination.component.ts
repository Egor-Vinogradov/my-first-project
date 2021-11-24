import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {PagerService} from "../../../service/pager.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {

  public amountCount: any = 5
  public maxNumber: number = Number.MAX_SAFE_INTEGER
  @Output() emitter = new EventEmitter<number>()
  @Output() emitterPage = new EventEmitter<number>()

  // массив всех элеметов
  // @Input() public allItems: any[] = []
  @Input() public allItems: number = Number.MAX_SAFE_INTEGER
  // pager
  pager: any = {}

  constructor(private pagerService: PagerService) { }

  ngOnInit(): void {
    this.setPage(1)
  }

  public installAmountCount(size: number) {

    if (size < this.maxNumber) {
      this.amountCount = size
      this.emitter.emit(size)
      this.setPage(1)
    }
  }

  public setPage(page: number) {
    // получаем объекты из сервиса
    this.pager = this.pagerService.getPager(this.allItems, page, this.amountCount);
    this.emitterPage.emit(page - 1)

    // получаем текущую страницу
    // this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


}
