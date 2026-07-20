import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user-service';

export const loginRegisterGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService)
  const router = inject(Router)
  if (userService.accessToken()) {
      router.navigate(['/profile'])
      return false
  } else {
     return true;

  }
};
