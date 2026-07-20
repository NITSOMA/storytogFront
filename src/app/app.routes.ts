import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Profile } from './components/profile/profile';
import { loginRegisterGuard } from './guards/login-register-guard';
import { profileGuard } from './guards/profile-guard';
import { StoryComponent } from './components/story-component/story-component';
import { RequestedChapter } from './components/requested-chapter/requested-chapter';

export const routes: Routes = [
    {path: "", component: Main, title: 'Main', 
        
    },
    {
        path: "main", component: Main, title: 'Main'
    },

    {path: "login",
    component: Login, 
    title: "Login",
    canActivate: [loginRegisterGuard]}, 

    {path: "register", component: Register, title: "Register",
        canActivate: [loginRegisterGuard]
    },
    {path: "profile", 
        component: Profile,
        title: "Profile",
       
  
        canActivate: [profileGuard],
        
    },
    {
        path: 'story/:id', 
        component: StoryComponent,
        
    },
    {
        path: 'requests/:id', 
        component: RequestedChapter,
        
    }, 
    {
        path: 'author/:id', 
        component: RequestedChapter,
        
    }, 

];
