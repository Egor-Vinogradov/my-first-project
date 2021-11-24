import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./auth.service";

export interface Audit {
  id: number
  description: string
  essenceName: string
  essenceID: number
  typeAudit: string
  creationDate: Date
  user: User
}



@Injectable({providedIn: 'root'})
export class AuditService {

  private url: string = 'http://localhost:8080/api/audit';
  public headers = new HttpHeaders().set('Authorization', this.getToken())

  constructor(private http: HttpClient) {
  }

  public getToken(): any {
    return localStorage.getItem('auth_token')
  }

  public fetchAudits(login: string,size: number, page: number): Observable<Audit[]> {
    const params: any = new HttpParams().set('page', page).set('size', size).set('login', login)
      .set('token', this.getToken())
    return this.http.get<Audit[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', this.getToken()),
      params: params
    })
  }

  public fetchAllPage(login: string): Observable<number> {
    const options = {
      headers: new HttpHeaders().set('Authorization', this.getToken()),
      params: new HttpParams().set('token', this.getToken()).set('login', login)
    }
    return this.http.get<number>(this.url + '/all/', options)
  }
}
