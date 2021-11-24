import {Component, OnInit, ViewChild} from '@angular/core';
import {Audit, AuditService} from "../../../service/audit.service";
import {Router} from "@angular/router";
import {UserRole} from "../../../service/auth.service";

@Component({
  selector: 'app-list-audit',
  templateUrl: './list-audit.component.html',
  styleUrls: ['./list-audit.component.css']
})
export class ListAuditComponent implements OnInit {

  public loading: boolean = true
  public admin: boolean = false

  public audits: Audit[] = []
  private login: string = ''
  private size: number = 5
  public page: number = 0
  public allPage: number = 2147483647

  constructor(private auditService: AuditService, private router: Router) { }

  ngOnInit(): void {
    this.admin = this.getRole()
    this.auditService.fetchAllPage(this.login)
      .subscribe({
        next: (allPage) => {
          this.allPage = allPage
          this.auditService.fetchAudits(this.login, this.size, this.page)
            .subscribe({
              next: (audits) => {
                this.audits = audits
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

  public getForm(id: number) {
  }

  public inputSearch(login: string) {
    this.login = login
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

}
