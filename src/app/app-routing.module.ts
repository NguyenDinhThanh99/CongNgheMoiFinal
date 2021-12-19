import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  // {path:'',component:UserListComponent},
  {path:'dn',component:AdminLoginComponent},
  {path:'',component:AdminLoginComponent},
  {path:'register',component:SignUpComponent},
  {path: 'users',component: UserListComponent},
  {path: 'delete',component: DeleteUserComponent},
  {path: 'add',component: AddUserComponent},
  {path: 'edit/:id_user',component: EditUserComponent},
  {path: 'register-user', component: SignUpComponent},
  // {path: 'verify-email-address', component: VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
