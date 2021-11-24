import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService, User} from "../../../../service/auth.service";

@Component({
  selector: 'app-filter-login',
  templateUrl: './filter-login.component.html',
  styleUrls: ['./filter-login.component.css']
})
export class FilterLoginComponent implements OnInit {

  public login: string = ''
  @Output() emitter = new EventEmitter<string>()
  public users: User[] = []

  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.userService.fetchUsers('', 2147483647, 0)
      .subscribe({
        next: (users) => {
          this.users = users
        }
      })

  }

  public inputSearch(login: string): void {
    this.emitter.emit(login)
  }
}
