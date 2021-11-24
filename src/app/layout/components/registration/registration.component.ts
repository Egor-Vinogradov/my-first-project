import {Component, OnInit} from '@angular/core';
import {AuthService, Error, User, UserStatus} from "../../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public loading: boolean = false
  public emailChek: boolean = true

  public user: User = {
    login: '',
    password: '',
    name: '',
    status: UserStatus.NOT_ACTIVE
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public registration(user: User) {
    this.authService.registration(user)
      .subscribe({
        next: (resp: any) => {
          this.router.navigate(['/'])
        },
        error: (err) => {
          this.emailChek = false
        }
      })
  }

  public cleanForm() {
    this.emailChek = true
  }

  public return() {
    this.router.navigate(['/'])
  }

}
