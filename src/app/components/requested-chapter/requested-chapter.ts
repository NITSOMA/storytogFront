import { Component, inject, input } from '@angular/core';
import { StoryService } from '../../services/story-service';
import { UserService } from '../../services/user-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Author } from '../author/author';

@Component({
  selector: 'app-requested-chapter',
  imports: [Author],
  templateUrl: './requested-chapter.html',
  styleUrl: './requested-chapter.css',
})
export class RequestedChapter {
  id = input.required<string>();
  storyService = inject(StoryService);
  userService = inject(UserService);
  router = inject(Router);

  
  userData = rxResource({
    stream: () => this.userService.getProfile()
  })

 notification = rxResource({
  params: () => ({ id: Number(this.id()) }),
  stream: ({ params }) => this.storyService.getNotificationDetail(params.id)
});

  Vote(value: boolean) {
    

    this.storyService.voteChapter({ choice: value }, Number(this.id())).subscribe({
      next: (response: any) => {
       
        if (response && response.detail && response.detail.includes('approved')) {
          this.router.navigate(['/main']);
        } else {
        
          this.notification.reload();
        }
      },
      error: (err) => console.error(err)
    });
  }
}
