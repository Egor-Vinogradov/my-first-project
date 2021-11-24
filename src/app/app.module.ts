import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './layout/components/aside/aside.component';
import { ListProductComponent } from './layout/components/product/list-product/list-product.component';
import {HttpClientModule} from "@angular/common/http";
import { FilterComponent } from './layout/components/filters/filter/filter.component';
import {FormsModule} from "@angular/forms";
import {FilterPipe} from "./service/filter.pipe";
import { PaginationComponent } from './layout/components/pagination/pagination.component';
import { CreateProductComponent } from './layout/components/product/create-product/create-product.component';
import { LoginComponent } from './layout/components/login/login.component';
import { StartPageComponent } from './layout/components/start-page/start-page.component';
import { RegistrationComponent } from './layout/components/registration/registration.component';
import { ListUsersComponent } from './layout/components/list-users/list-users.component';
import { ListAuditComponent } from './layout/components/list-audit/list-audit.component';
import { FilterLoginComponent } from './layout/components/filters/filter-login/filter-login.component';
import { ProfileComponent } from './layout/components/profile/profile.component';
import {DatePipe} from "@angular/common";
import { WeighingCreateComponent } from './layout/components/weighing-diary/weighing-create/weighing-create.component';
import { WeighingComponent } from './layout/components/weighing-diary/weighing/weighing.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    ListProductComponent,
    FilterComponent,
    FilterPipe,
    PaginationComponent,
    CreateProductComponent,
    LoginComponent,
    StartPageComponent,
    RegistrationComponent,
    ListUsersComponent,
    ListAuditComponent,
    FilterLoginComponent,
    ProfileComponent,
    WeighingCreateComponent,
    WeighingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
