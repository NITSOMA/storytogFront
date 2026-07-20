import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
    userService = inject(UserService);
  router = inject(Router)

  formSubmitted = signal(false);
  errorMessage = signal<string | null>(null);
  registerError = signal(false)

  registerForm = new FormGroup({
    username: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    about: new FormControl<string | null>(null),
    profile_image: new FormControl<File | null>(null)
    
  })


  addImage(event: any){
    const file: File = event.target.files[0];
    if (file){
      this.registerForm.patchValue({
        profile_image: file
      })
    }
  }


submitRegisterData(){
  if (this.registerForm.valid){
    const formdata = new FormData();
    const registerValues = this.registerForm.value;

    formdata.append("username", registerValues.username!)
    formdata.append("email", registerValues.email!)
    formdata.append("password", registerValues.password!)
    
    

    if (registerValues.profile_image){
      formdata.append("profile_image", registerValues.profile_image!)
    }

    if (registerValues.about) {
      formdata.append("about", registerValues.about!)
    }

    this.userService.registerUser(formdata).subscribe({
      next: () => {
        
        this.router.navigate(['/login'])

      }, 
      error: (err) => {
        this.registerError.set(true)

      }
    })
  }

  
}

}
