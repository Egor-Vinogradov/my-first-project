import {Component, OnInit} from '@angular/core';
import {AuthService, User, UserStatus} from "../../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = {
    login: '',
    password: '',
    status: UserStatus.NOT_ACTIVE
  }
  public loginValid1: boolean = true
  public loginPasswordValid: boolean = true
  public registrationChek: boolean = true
  //egor@soooperfekt.by

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public logIn(user: User) {
    this.loginValid1 = true
    this.loginPasswordValid = true
    this.registrationChek = true
    this.authService.login(user)
      .subscribe({
        next: (resp: any) => {
          if (resp.status === UserStatus.ACTIVE) {
            this.router.navigate(['/start'])
            localStorage.setItem('auth_token', resp.token)
            localStorage.setItem('role', resp.role)
            localStorage.setItem('name', resp.name)
            localStorage.setItem('login', resp.login)
          } else {
            this.router.navigate(['/'])
            this.registrationChek = false
          }
        },
        error: (err) => {
          console.log(err.status)
          if (err.status === 400) {
            this.loginValid1 = false
          } else if (err.status === 403) {
            this.loginPasswordValid = false
          }
        }
      })
  }
  public registration() {
    this.router.navigate(['/registration'])
  }

}
