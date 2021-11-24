import {Injectable} from "@angular/core";
import {Profile} from "./auth.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Weighing {
  id?: number
  profile: ProfileW
  weight?: number
  creationDate?: any
  updateDate?: Date
  version?: number
}

export interface UserW {
  login: string
}

export interface ProfileW {
  user: UserW
}

@Injectable({providedIn: 'root'})
export class WeighingService {

  private url: string = 'http://localhost:8080/api/profile/'
  private url1: string = '/journal/weight/'

  constructor(private http: HttpClient) {
  }

  public getToken(): any {
    return localStorage.getItem('auth_token')
  }

  public addWeighing(weighing: Weighing, profileId: number): Observable<Weighing> {
    const options = {
      headers: new HttpHeaders().set('Authorization', this.getToken()),
      params: new HttpParams().set('token', this.getToken())
    }
    return this.http.post<Weighing>(this.url + profileId + this.url1, weighing, options)
  }

  public getListWeighing(size: number, page: number, profileId: number,
                          dateStart: number = 0,
                          dateEnd: number = Number.MAX_SAFE_INTEGER): Observable<Weighing[]> {
    const options = {
      headers: new HttpHeaders().set('Authorization', this.getToken()),
      params: new HttpParams().set('page', page).set('size', size)
        .set('dt_start', dateStart).set('dt_end', dateEnd)
        .set('token', this.getToken())
    }
    return this.http.get<Weighing[]>(this.url + profileId + this.url1, options)
  }

  public getAllWeighing(profileId: number): Observable<number> {
    const options = {
      headers: new HttpHeaders().set('Authorization', this.getToken()),
      params: new HttpParams().set('token', this.getToken())
    }
    return this.http.get<number>(this.url + profileId + this.url1 + 'all', options)
  }
}
