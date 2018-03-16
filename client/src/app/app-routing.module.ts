import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'contacts',
      pathMatch: 'full'
    },
    {
      path: 'contacts',
      component: ContactListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'new',
      component: AddContactComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'login',
      component: LoginComponent
    }, {
      path: '**',
      redirectTo: 'contacts'
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
