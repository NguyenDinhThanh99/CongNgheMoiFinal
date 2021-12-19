import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{

  // log_email:string | undefined;
  // log_pw:string | undefined;
  // login_result="";
  user: any;
  submited: boolean =false;
  userDetails:any;
  proAdd = this.fb.group({
    // id_user: ['',Validators.required],
    email:['',Validators.required],
    password: ['',Validators.required],
  })
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    public authService : AuthService,
    public userService: UserService) {}
    get f() {return this.proAdd.controls;}
  ngOnInit() {
  }
  ifAdmin(){

  }
  onSubmit(): any {
    this.submited=true;
    if(this.proAdd.invalid){return false;}
    this.authService.SignIn(this.proAdd.value.email,this.proAdd.value.password);
    // this._router.navigate(['users']);
    // this.authService.SignIn(this.proAdd.value.email,this.proAdd.value.email);
    // this.authService.SetUserData(this.user);

    // console.log(this.authService.userData.uid);
    // this.userService.getById(this.authService.userData.uid).subscribe(res =>{
    //   this.user=res;
    //   console.log(this.user);
    //   console.log(this.user.role);
    // })

    // if(this.user.role == "admin"){
    //   this._router.navigate(['/add']);
    // }else{
    //   console.error("lỗi");
    // }



  }

}



