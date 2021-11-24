import {Component, OnInit} from '@angular/core';
import {AuthService, User, UserStatus} from "../../../service/auth.service";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public loading: boolean = true

  public users: User[] = []
  public userStatus = [
    UserStatus.ACTIVE,
    UserStatus.NOT_ACTIVE
  ]
  private status: UserStatus = UserStatus.NOT_ACTIVE
  private name: string = ''
  private size: number = 5
  public page: number = 0
  public allPage: number = 2147483647

  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.userService.fetchAllPage()
      .subscribe({
        next: (allPage) => {
          this.allPage = allPage
          this.userService.fetchUsers(this.name, this.size, this.page)
            .subscribe({
              next: (users) => {
                this.users = users
                this.loading = false
              }
            })
        }
      })
  }

  public selectStatus(userStatus: UserStatus) {
    this.status = userStatus
  }

  public updateUser(user: User) {
    const user1 = {
      id: user.id,
      status: this.status
    }
    this.userService.updateUser(user1)
      .subscribe({
        next: (resp) => {
          this.ngOnInit()
        }
      })
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

}
