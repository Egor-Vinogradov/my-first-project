import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  public name: string = ''
  @Output() emitter = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  public inputSearch(name: string): void {
    this.emitter.emit(name)
  }

}
