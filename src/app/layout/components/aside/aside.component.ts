import {Component, OnInit} from '@angular/core';
import {StartPageComponent} from "../start-page/start-page.component";
import {User, UserRole, UserStatus} from "../../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  public usersAdmin: boolean = false
  public userName: string | null = 'World'

  constructor(public startPageComponent: StartPageComponent,
              private router: Router) { }

  ngOnInit(): void {
    this.usersAdmin = this.getRole()
    this.userName = localStorage.getItem('name')
  }

  private getRole(): boolean {
    if(localStorage.getItem('role') === UserRole.ADMIN) {
      return true
    }
    return false
  }

  public fetchProductList() {
    this.startPageComponent.listProduct = false;
  }

  public listProductActive() {
    this.resetAll();
    this.startPageComponent.listProduct = true;
  }

  public createProductActive() {
    this.resetAll();
    this.startPageComponent.createProduct = true;
  }

  public logOut() {
    this.router.navigate(['/'])
    localStorage.clear()
  }

  public listUsersActive() {
    this.resetAll();
    this.startPageComponent.listUsers = true;
  }

  public listAuditActive() {
    this.resetAll();
    this.startPageComponent.listAudit = true;
  }

  public profilePage() {
    this.resetAll();
    this.startPageComponent.profile = true
  }

  public weighingActive() {
    this.resetAll()
    this.startPageComponent.weighing = true
  }

  private resetAll() {
    this.startPageComponent.listUsers = false;
    this.startPageComponent.createProduct = false;
    this.startPageComponent.listProduct = false;
    this.startPageComponent.listAudit = false;
    this.startPageComponent.profile = false;
    this.startPageComponent.weighing = false;
  }
}
