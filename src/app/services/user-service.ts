import { inject, Injectable, signal } from '@angular/core';
import { APP_CONFIG } from '../app.config.token';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthorRead, LoginRequestInterface, UserProfileInterface } from '../models/userTypes';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
   private config = inject(APP_CONFIG);
  private http = inject(HttpClient);
  private router = inject(Router)

  private registerApi = `${this.config.apiUrl}/user/register/`;
  private loginApi = `${this.config.apiUrl}/user/login/`;
  private logoutApi = `${this.config.apiUrl}/user/logout/`;
  private refreshApi = `${this.config.apiUrl}/user/refresh/`;
  private profileApi = `${this.config.apiUrl}/user/profile/`;
  private authorApi = `${this.config.apiUrl}/user/author/`;

  authTrigger = signal<number>(0);

  accessToken = signal<string | null>(null);

  registerUser(data: FormData) {
    return this.http.post(this.registerApi, data);
  }

  loginUser(data: LoginRequestInterface) {
    return this.http.post<any>(this.loginApi, data).pipe(
      tap((response) => {
        if (response?.access) {
        
          this.accessToken.set(response.access);
          this.authTrigger.update(v => v + 1);
        }
      })
    );
  }

  logoutUser() {
    return this.http.post<any>(this.logoutApi, {}).pipe(
      tap({
        next: (response) => {
          this.authTrigger.update(v => v + 1);
          this.accessToken.set(null);
          
          this.router.navigate(['/login'])
          
        },
        error: (err) => {
          console.error('Logout failed', err);
         
          this.accessToken.set(null);
        }
      })
    );
  }

  refreshToken() {
    
    return this.http.post<any>(this.refreshApi, {}, { withCredentials: true }).pipe(
      tap({
        next: (response) => {
          if (response?.access) {
            this.accessToken.set(response.access);
           
          }
        },
        error: () => {
         
          this.accessToken.set(null);
        }
      })
    );
  }


  getProfile(): Observable<UserProfileInterface>{
    return this.http.get<UserProfileInterface>(this.profileApi)
  }

  updateProfile(data: FormData) {
    return this.http.patch(this.profileApi, data)
    
  }

  delete() {
    return this.http.delete(this.profileApi).pipe(
      tap({
        next: () => {
          this.accessToken.set(null)
        }, 
        error: (err) => {
          console.error(err)
        }
      })
    )
  }
  
  getAuthor(pk: number){
    return this.http.get<AuthorRead>(`${this.authorApi}${pk}/`)

  }
}
