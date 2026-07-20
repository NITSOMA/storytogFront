import { Component, contentChild, effect, ElementRef, inject, input, Renderer2, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserService } from '../../services/user-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-author',
  imports: [RouterLink],
  templateUrl: './author.html',
  styleUrl: './author.css',
})
export class Author {

 id = input.required<number>();
   userService = inject(UserService)

   authorData = rxResource({
    params: () =>({id:  this.id()}),
    stream: ({params}) => this.userService.getAuthor(params.id)
   })


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



}
