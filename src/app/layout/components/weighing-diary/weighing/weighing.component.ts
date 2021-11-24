import { Component, OnInit } from '@angular/core';
import {Weighing, WeighingService} from "../../../../service/weighing.service";
import {UserRole} from "../../../../service/auth.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-weighing',
  templateUrl: './weighing.component.html',
  styleUrls: ['./weighing.component.css']
})
export class WeighingComponent implements OnInit {

  public loading: boolean = true
  public admin: boolean = false
  private profileId: any = localStorage.getItem('profile_id')
  public dataStart: number = Date.UTC(1995, 12, 1)
  public dataStop: number = Date.UTC(2222, 12, 1)

  public weighings: Weighing[] = []
  public name: any = ''
  private size: number = 5
  public page: number = 0
  public allPage: number = 2147483647

  public dateDefault: any = this.datePipe.transform(new Date(), 'yyyy-MM-dd')

  constructor(private weighingService: WeighingService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    console.log(Date.now())
    this.dateDefault = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    this.admin = this.getRole()
    this.name = localStorage.getItem('name')
    this.profileId = localStorage.getItem('profile_id')
    this.weighingService.getAllWeighing(this.profileId)
      .subscribe({
        next: (allPage) => {
          this.allPage = allPage
          this.weighingService.getListWeighing(this.size, this.page,
            this.profileId, this.dataStart, this.dataStop)
            .subscribe({
              next: (weighings) => {
                this.weighings = weighings
                this.loading = false
              }
            })
        }
      })
  }

  private getRole(): boolean {
    if (localStorage.getItem('role') === UserRole.ADMIN) {
      return true
    }
    return false
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

  public updatePage() {
    this.ngOnInit()
  }

  public removeWeighing(id: any) {
    console.log(id)
  }

  public updateWeighing(weighing: Weighing) {
    console.log(weighing.weight)
  }

  public test(event: any): string | null {
    this.dateDefault = event
    console.log(this.dateDefault)
    console.log(event)
    return this.datePipe.transform(event, 'yyyy-MM-dd')
  }

}
