import { Component, effect, ElementRef, inject, OnDestroy, Renderer2, signal, viewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user-service';
import { Notification } from '../../services/notification';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StoryService } from '../../services/story-service';
import { ProfileExtra } from '../profile-extra/profile-extra';
import { Main } from '../main/main';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, ProfileExtra],
  templateUrl: './header.html',
  styleUrl: './header.css',
 
})
export class Header implements OnDestroy {
  userService = inject(UserService)
  storyService = inject(StoryService)
  profileMenu = viewChild<ProfileExtra>('profileMenu');


  
  userData = rxResource({
    params: () => ({ trigger: this.userService.authTrigger() }),
    stream: () => this.userService.getProfile()
  })
  
  
  router = inject(Router)
  
  private notificationService = inject(Notification);
  public alerts = this.notificationService.alerts;



  private authSocketEffect = effect(() => {
    const user = this.userData.value();
    const currentUserId = user?.id;
  
    if (currentUserId) {
      this.notificationService.connect(currentUserId);
    }
  });








  

  ngOnDestroy(): void {
    this.notificationService.disconnect();
  }
  
  

  notificationOpen(){
    const menuInstance = this.profileMenu();
  
  if (menuInstance) {
   
    menuInstance.notifications.reload();
    
   
    menuInstance.isVisible.set(true);
    menuInstance.notificationVisible.set(true);

    this.alerts.set([]);
  }

    
  }




}