import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   userService = inject(UserService)
  router = inject(Router)
  errorMessage = signal(false)
  loginForm = new FormGroup({
    login_id: new FormControl("", {nonNullable: true, validators: Validators.required}),
    password: new FormControl("", {nonNullable: true, validators: Validators.required})
  })

 
  loginUser(){
    if (this.loginForm.valid) {
      this.userService.loginUser(this.loginForm.getRawValue()).subscribe({
        next: () => {
          this.router.navigate(['/profile'])
          
          
        }, 
        error: (err) => {
          this.errorMessage.set(true)
        }
      })
    }
  }


}
