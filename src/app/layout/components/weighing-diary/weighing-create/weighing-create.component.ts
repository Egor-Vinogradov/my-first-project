import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Weighing, WeighingService} from "../../../../service/weighing.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-weighing-create',
  templateUrl: './weighing-create.component.html',
  styleUrls: ['./weighing-create.component.css']
})
export class WeighingCreateComponent implements OnInit {

  public loading: boolean = false
  public weighing: Weighing = {
    profile: {
      user: {
        login: ''
      }
    }

  }
  public dateDefault: any = this.datePipe.transform(new Date(), 'yyyy-MM-dd')

  @Output() emitter = new EventEmitter<any>()

  constructor(private weighingService: WeighingService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.dateDefault = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  }

  public addWeighing(weighing: Weighing) {
    weighing.creationDate = Date.parse(this.dateDefault)
    this.loading = true
    const profileId: any = localStorage.getItem('profile_id')
    this.weighingService.addWeighing(weighing, profileId)
      .subscribe({
        next: (weighing) => {
          this.loading = false
          this.weighing.weight = 0
          this.emitter.emit();
        }
      })
  }

  public cleanForm() {
    this.weighing.weight = 0
  }

  public setDate(event: any) {
    this.dateDefault = event
  }
}
