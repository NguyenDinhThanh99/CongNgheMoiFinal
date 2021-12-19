import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router:Router
  ) { }

  ngOnInit() {
  }

  // signUp(email: string,password: string){
  //   this.authService.SignUp(email,password);
  // }
}
