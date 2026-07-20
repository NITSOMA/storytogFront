import { Component, inject, input, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { StoryService } from '../../services/story-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { DatePipe, ViewportScroller } from '@angular/common';
import { of } from 'rxjs';
import { Author } from '../author/author';
import { ResizeDirective } from '../../directives/resize-directive';


@Component({
  selector: 'app-story-component',
  imports: [ReactiveFormsModule, DatePipe, Author,  ResizeDirective],
  templateUrl: './story-component.html',
  styleUrl: './story-component.css',
})
export class StoryComponent {
  id = input.required<string>();
  router = inject(Router);
  showAuthors = signal(false);

  storyService = inject(StoryService);
  userService  = inject(UserService);
  add = signal(false);
  message = signal(false);
  errorMessage = signal<string | null>(null);
  private scroller = inject(ViewportScroller);
  editCommentMode = signal<number | null>(null)

  currentChapterNumber = signal<number>(1);

  story = rxResource({
    params: () => ({ id: Number(this.id()) }), 
    stream: ({ params }) => this.storyService.getStoryDetail(params.id)
  });

  activeChapter = rxResource({
   
    params: () => ({ 
      storyId: Number(this.id()), 
      firstChapterData: this.story.value()?.first_chapter, 
      chapterNum: this.currentChapterNumber() 
    }),
    stream: ({ params }) => {
      if (params.chapterNum === 1 && params.firstChapterData) {
        return of(params.firstChapterData);
      }
      return this.storyService.getChapter(params.storyId, params.chapterNum);
    }
  });

  userData = toSignal(this.userService.getProfile());

  chapterForm = new FormGroup({
    content: new FormControl("", { nonNullable: true, validators: [Validators.required] })
  });

  addNewChapter() {
    if (this.chapterForm.valid) {
      this.storyService.addChapter(this.chapterForm.getRawValue(), Number(this.id())).subscribe({
        next: () => {
          this.chapterForm.reset();
          this.message.set(true);
          this.errorMessage.set(null);
          this.add.set(false);
        },
        error: (err) => {
          this.message.set(false);
          if (err.error) {
            const errors = err.error.non_field_errors || err.error.detail || err.error;
            this.errorMessage.set(Array.isArray(errors) ? errors[0] : errors);
          } else {
            this.errorMessage.set('An error occurred while submitting your proposal.');
          }
        }
      });
    }
  }

  deleteChap(pk: number) {
    this.storyService.chapterDelete(pk).subscribe({
      next: () => { this.router.navigate(['/main']) }
    });
  }

  addChapter(sectionId: string): void {
    this.add.set(true);
    this.message.set(false);
    this.errorMessage.set(null);
    this.scroller.scrollToAnchor(sectionId);
  }

  goToNextChapter() {
    const total = this.story.value()?.total_chapters || 1;
    if (this.currentChapterNumber() < total) {
      this.currentChapterNumber.update(n => n + 1);
    }
  }

  goToPreviousChapter() {
    if (this.currentChapterNumber() > 1) {
      this.currentChapterNumber.update(n => n - 1);
    }
  }




  commentForm = new FormGroup({
        story_id: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required]}),
    content: new FormControl('', {nonNullable: true, validators: [Validators.required]})

  })


  editCommentForm = new FormGroup({
         content: new FormControl('', {nonNullable: true, validators: [Validators.required]})

    

  })

  VoteForm = new FormGroup({
   story_id: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required]}),
    vote_number: new FormControl(0, {nonNullable: true, validators: [Validators.required]})

  })


  addComment() {
  if (this.commentForm.valid) {
   
    const payload = {
      ...this.commentForm.getRawValue(),
      story_id: Number(this.id()) 
    };

    this.storyService.addComment(payload).subscribe({
      next: () => { 
        this.commentForm.get('content')?.reset(); 
        this.story.reload();
       
        
      }
    });
  }
}





deleteComment(id: number) {
  this.storyService.deleteComment(id).subscribe({
    next: () => this.story.reload()
  })
  
}

editComment(id: number) {
   if (this.editCommentForm.valid) {
   
   

    this.storyService.editComment(id, this.editCommentForm.getRawValue()).subscribe({
      next: () => { 
        this.editCommentForm.get('content')?.reset(); 
         this.editCommentMode.set(null)
        this.story.reload();
       
       
        
      }
    });
  
}

}

}