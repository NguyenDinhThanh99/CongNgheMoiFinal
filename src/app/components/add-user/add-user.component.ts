import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [DatePipe]
})
export class AddUserComponent implements OnInit {

  // today:now
  submited: boolean =false;
  users:any;
  myDate: any = new Date();
  uid:string | undefined;

  proAdd = this.fb.group({
    // id_user: ['',Validators.required],
    email: ['',Validators.required],
    name: ['',Validators.required],
    birthday: ['',Validators.required],
    phonenumber: ['',Validators.required],
    address: ['',Validators.required],
    url_avatar: ['',Validators.required],
    status: ['offline',Validators.required] ,
    create_date: [formatDate(this.myDate, 'yyyy-MM-dd', 'en'),Validators.required]
  })
  constructor(
    private user: UserService,
    private fb: FormBuilder,
    private _router:Router,
    public authService: AuthService,
    private datePipe: DatePipe
    ) {
      this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    }

  ngOnInit(): void {
  }
  // formatDate(this.proAdd.value.create_date, 'yyyy-MM-dd', 'en')
  get f() {return this.proAdd.controls;}

  onSubmit(): any {
    this.submited=true;
    if(this.proAdd.invalid){return false;}

    console.log('add 1',this.authService.userData);
    this.authService.SignUp(this.proAdd.value.email,this.proAdd.value.email,this.proAdd.value.name,this.proAdd.value.birthday,this.proAdd.value.phonenumber,this.proAdd.value.address,this.proAdd.value.url_avatar,this.proAdd.value.status,this.proAdd.value.create_date);
    //thêm mới
    //this.proAdd.value.id_user
    // this.authService.SetUserData(this.user);

    // console.log(this.authService.userData.uid);

  }
}
