import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { UserService } from '../services/user-service';
import { inject } from '@angular/core';
import { catchError, switchMap, take, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const token = userService.accessToken();

  // 1. WebSocket Bypass: Let real-time traffic skip HTTP headers entirely
  if (req.url.startsWith('ws://') || req.url.startsWith('wss://')) {
    return next(req);
  }

  let authReq = req.clone({
    withCredentials: true,
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {}
  });

  // 2. Strict Loop Prevention: If we are already refreshing or logging out, bypass completely
  if (req.url.includes('/refresh') || req.url.includes('/logout')) {
    return next(authReq);
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      // If the request that failed with a 401 was the logout itself, kill the chain to stop loops
      if (req.url.includes('/logout')) {
        return throwError(() => error);
      }

      return userService.refreshToken().pipe(
        take(1),
        switchMap((response) => {
          const newToken = userService.accessToken();

          if (!newToken) {
            return throwError(() => new Error('Refresh failed - No token received'));
          }

          const retryReq = req.clone({
            withCredentials: true,
            setHeaders: {
              Authorization: `Bearer ${newToken}`
            }
          });

          return next(retryReq);
        }),
        catchError((refreshError) => {
          // Cleans out state safely; the outgoing logout HTTP request will be ignored by the top filter
          userService.logoutUser().subscribe();
          return throwError(() => refreshError);
        })
      );
    })
  );
};