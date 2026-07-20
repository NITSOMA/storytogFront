import { Component, effect, inject, input, signal } from '@angular/core';
import { StoryService } from '../../services/story-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ResizeDirective } from '../../directives/resize-directive';

@Component({
  selector: 'app-main',
  imports: [ReactiveFormsModule, DatePipe, RouterLink,  ResizeDirective],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  
  private storyService = inject(StoryService)
  public writeNow = input<string>();
  readMode = signal(true)
  writeMode = signal(false)
  filterOptions = ["latest", "oldest", "most_chapters", "fewest_chapters", "most_authors"]
  ordering = signal(this.filterOptions[0])
  page = signal(1)

  stories = rxResource({
    params: () => ({ ordering: this.ordering(), page: this.page()}),
    stream: ({params}) => this.storyService.getStories(params.ordering, params.page)
  })

 private writeModeEffect = effect(() => {
    if (this.writeNow() === 'true') {
      this.writeMode.set(true);
      this.readMode.set(false);
    }
  });

  storyForm  = new FormGroup({
    title: new FormControl("", {nonNullable: true, validators: [Validators.required]}),
    first_chapter_content: new FormControl("",{nonNullable: true, validators: [Validators.required]})

  })
filterStories(event: Event){
  const value = (event.target as HTMLSelectElement).value;
  console.log(value)
  this.ordering.set(value)

}


  
createStory(){
  if(this.storyForm.valid) {
    this.storyService.createStory(this.storyForm.getRawValue()).subscribe({
      next: () => {
        this.stories.reload()
        this.storyForm.reset()
        this.readMode.set(true)
      }
    })
  }

}

  read() {
    this.readMode.set(true)
    this.writeMode.set(false)
  }

  write() {
    this.writeMode.set(true)
     this.readMode.set(false)

  }

}
