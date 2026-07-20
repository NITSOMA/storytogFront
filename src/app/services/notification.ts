import { Injectable, signal, WritableSignal } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class Notification {

 private socket$!: WebSocketSubject<{ notification: string }>;
  
 
  public alerts: WritableSignal<string[]> = signal([]);

  public connect(userId: number): void {
    const url = `ws://localhost:8000/ws/notifications/${userId}/`;
    this.socket$ = webSocket(url);

    this.socket$.subscribe({
      next: (msg) => {
       
        this.alerts.update((prev) => [...prev, msg.notification]);
      },
      error: (err) => console.error('WebSocket Error:', err),
      complete: () => console.warn('Notification socket disconnected cleanly.')
    });
  }

  public disconnect(): void {
    if (this.socket$) {
      this.socket$.complete();
      this.alerts.set([]);
    }
  }
  
}