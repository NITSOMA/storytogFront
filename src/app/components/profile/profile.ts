import { Component, inject, input, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProfileExtra } from '../profile-extra/profile-extra';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, DatePipe, RouterLink, ProfileExtra],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  id = input.required<string>()
  userService = inject(UserService)

  showMessages = signal(false)
   
  profileData = rxResource({
    stream: () => this.userService.getProfile()
  })
  









  addImage(event: any, imageName: string) {
    const file: File = event.target.files[0]
    if (file) {
      const formdata = new FormData();
    formdata.append(imageName, file)
    this.userService.updateProfile(formdata).subscribe({
      next: () => {
        this.profileData.reload()
      }
    })

    }
    

  }







     


  


}
