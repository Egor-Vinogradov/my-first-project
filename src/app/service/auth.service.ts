import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface User {
  id?: number
  login?: string
  password?: string
  token?: string
  name?: string
  status?: UserStatus
  role?: UserRole
  creationDate?: Date
  updateDate?: Date
}

export interface Profile {
  id?: number
  dateOfBirth?: Date
  sex?: Sex
  activity?: Activity
  target?: Target
  targetWeight?: number
  height?: number
  user?: User
  creationDate?: Date
  updateDate?: Date
  weight?: number
}

export enum Sex {
  MAN = "MAN",
  WOMAN = "WOMAN"
}

export enum Activity {
  SITTING = "SITTING",
  SEDENTARY = "SEDENTARY",
  MOBILE = "MOBILE",
  VERY_ACTIVE = "VERY_ACTIVE"
}

export enum Target {
  LOSS_1KG = "LOSS_1KG",
  LOSS_05KG = "LOSS_05KG",
  MAINTAINING = "MAINTAINING",
  GAIN_025KG = "GAIN_025KG",
  GAIN_05KG = "GAIN_05KG"
}
export enum UserStatus {
  ACTIVE = "ACTIVE",
  NOT_ACTIVE = "NOT_ACTIVE"
}

export enum UserRole {
  USER = "ROLE_USER",
  ADMIN = "ROLE_ADMIN"
}

export interface Error {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:8080/api/user/auth';
  private urlRegistration: string = 'http://localhost:8080/api/user/registration';
  private urlAllUsers: string = 'http://localhost:8080/api/user/all';
  private urlAllPage: string = 'http://localhost:8080/api/user/allpage';
  private urlProfile: string = 'http://localhost:8080/api/user/profile'
  public headers = new HttpHeaders().set('Authorization', this.getToken())

  private options = {
    headers: this.headers,
    params: new HttpParams().set('token', this.getToken())
  }

  constructor(private http: HttpClient) {}

  public fetchUsers(name: string, size: number, page: number): Observable<User[]> {
    const params: any = new HttpParams().set('page', page).set('size', size).set('name', name)
      .set('token', this.getToken())
    return this.http.get<User[]>(this.urlAllUsers, {
      headers: new HttpHeaders().set('Authorization', this.getToken()),
      params: params
    })
  }

  public fetchAllPage(): Observable<number> {
    this.headers = new HttpHeaders().set('Authorization', this.getToken())
    this.options = {
      headers: new HttpHeaders().set('Authorization', this.getToken()),
      params: new HttpParams().set('token', this.getToken())
    }
    return this.http.get<number>(this.urlAllPage, this.options)
  }

  public getToken(): any {
    return localStorage.getItem('auth_token')
  }

  public login(user: User) {
    return this.http.post(this.url, user)
  }

  public registration(user: User) {
    return this.http.post(this.urlRegistration, user)
  }

  public updateUser(user: User) {
    this.headers = new HttpHeaders().set('Authorization', this.getToken())
    this.options = {
      headers: this.headers,
      params: new HttpParams().set('token', this.getToken())
    }
    return this.http.put(this.url, user, this.options)
  }

  public getProfile(login: string): Observable<Profile> {
    this.options = {
      headers: new HttpHeaders().set('Authorization', this.getToken()),
      params: new HttpParams().set('token', this.getToken()).set('login', login)
    }
    return this.http.get<Profile>(this.urlProfile, this.options)
  }

  public updateProfile(profile: Profile): Observable<Profile> {
    this.options = {
      headers: new HttpHeaders().set('Authorization', this.getToken()),
      params: new HttpParams().set('token', this.getToken())
    }
    return this.http.put(this.urlProfile, profile, this.options)
  }
}
