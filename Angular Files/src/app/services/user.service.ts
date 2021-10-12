import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User[] = [];

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiServerUrl}/users/User`);
    }

    public addUser(user : User): Observable<User> {
        return this.http.post<User>(`${this.apiServerUrl}/user/add`,user);
    }

    public deleteUser(userId : number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
    }

    public updateUser(user : User): Observable<User> {
        return this.http.put<User>(`${this.apiServerUrl}/user/update`,user);
    }

    public getAllEmployees(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiServerUrl}/users/Employee`);
    }

    public loginUser(user : User): Observable<User> {
      return this.http.post<User>(`${this.apiServerUrl}/login`,user);
    }

    public findUser(id: number): Observable<User>{
      return this.http.get<User>(`${this.apiServerUrl}/user/find/${id}`);
    }


    loggedIn(){
      return !!localStorage.getItem('token');
    }
}
