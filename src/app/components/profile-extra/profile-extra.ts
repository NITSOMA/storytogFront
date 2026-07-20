import { Component, computed, contentChild, effect, ElementRef, inject, output, Renderer2, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { map, filter } from 'rxjs';
import { UserService } from '../../services/user-service';
import { StoryService } from '../../services/story-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-extra',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './profile-extra.html',
  styleUrl: './profile-extra.css',
})
export class ProfileExtra {

 private router = inject(Router);
  userService = inject(UserService);
  storyService = inject(StoryService);

  editMode = signal(false)
  notificationVisible = signal(false)
  deleteMode = signal(false)

  profileData = rxResource({ stream: () => this.userService.getProfile() });
  notifications = rxResource({ stream: () => this.storyService.getNotifications() });


    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    isVisible = signal(false)


triggerElement = contentChild<ElementRef<HTMLElement>>('trigger');

  private clickTracker = effect((onCleanup) => {
  
    if (!this.isVisible()) return;

    const unlisten = this.renderer.listen('document', 'click', (event: Event) => {
      const target = event.target as HTMLElement;

  
      const clickedInsideDropdown = this.el.nativeElement.contains(target);
      const clickedTrigger = this.triggerElement()?.nativeElement.contains(target);
      const clickedNavLink = target.closest('[routerLink],  a');

      if ((!clickedInsideDropdown && !clickedTrigger) || clickedNavLink) {
        this.isVisible.set(false);
      }
    });

    onCleanup(() => unlisten());
  });




  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  isProfileLinkVisible = computed(() => this.currentUrl().includes('/profile'));



    updateProfileForm = new FormGroup({
    username: new FormControl<string | null>(null),
    about: new FormControl<string | null>(null)
  })


  submitRegisterData() {
    if (this.updateProfileForm.valid) {
      const formdata = new FormData();
      const registerValues = this.updateProfileForm.value;
      if (registerValues.username) {
        formdata.append("username", registerValues.username)
      }
      if (registerValues.about) {
        formdata.append("about", registerValues.about)
      }

      this.userService.updateProfile(formdata).subscribe({
        next: () => {
          this.editMode.set(false)
          this.updateProfileForm.reset()
          this.profileData.reload()
        }, 
        error: (err) => console.error(err)
      })
    }
  }

  signOut() {
    this.userService.logoutUser().subscribe({
      next: () => {
        this.router.navigate(['/login'])
      }, 
      error: (err) => {
        console.error(err)
      }
    })
  }


  deleteAccount() {
    this.userService.delete().subscribe({
      next: () => {
        this.router.navigate(['/register'])
      }, 
      error: (err) => {
        console.error(err)
      }
    })
  } }