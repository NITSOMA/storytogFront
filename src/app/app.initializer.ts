import { catchError, lastValueFrom, Observable, of } from "rxjs";
import { inject } from "@angular/core";
import { UserService } from "./services/user-service";

export function initializeAuth(){
    const userService = inject(UserService);

    return lastValueFrom(userService.refreshToken().pipe(
        catchError(()=> of(null))
    ))
}