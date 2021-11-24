import {Component, OnInit} from '@angular/core';
import {User, UserStatus} from "../../../service/auth.service";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  public listProduct: boolean = false;
  public createProduct: boolean = false;
  public loginPage: boolean = true;
  public listUsers: boolean = false;
  public listAudit: boolean = false;
  public profile: boolean = true;
  public weighing: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
