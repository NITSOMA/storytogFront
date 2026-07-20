import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user-service';

export const profileGuard: CanActivateFn = (route, state) => {
   const userService = inject(UserService)
  const router = inject(Router)
  if (userService.accessToken()){
    return true
  }
  router.navigate(['/login'])
  return false;
};
