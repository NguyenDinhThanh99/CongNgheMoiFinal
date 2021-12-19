import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {formatDate} from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userId:any;
  userDetails:any;
  dataLoaded: boolean = false;
  editUserForm: FormGroup = new FormGroup({});
  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public authService:AuthService
    ){}

  ngOnInit(): void {
    this.dataLoaded = false;
    this.activatedRoute.params.subscribe(data => {
      this.userId = data.id_user
    });

    if(this.userId !== ''){
      this.userService.getById(this.userId)
      .toPromise()
      .then(data =>{
        this.userDetails=data;
        // Object.assign(this.userDetails,data);
        console.log(this.userDetails);


        //build the edit form
        this.editUserForm = this.formBuilder.group({
          'id_user': new FormControl(this.userDetails.id_user),
          'name': new FormControl(this.userDetails.name,[Validators.required]),
          'birthday': new FormControl(formatDate(this.userDetails.birthday, 'yyyy/MM/dd', 'en')),
          'phonenumber': new FormControl(this.userDetails.phonenumber,[Validators.required,Validators.minLength(9),Validators.maxLength(10)]),
          'address': new FormControl(this.userDetails.address),
          'url_avatar': new FormControl(this.userDetails.url_avatar),
          'status': new FormControl(this.userDetails.status),
          'create_date': new FormControl(formatDate(this.userDetails.create_date, 'yyyy/MM/dd', 'en')),

        })

        this.dataLoaded = true;
      })
      .catch(err =>{
        console.log(err);
      })


    }

  }
  get f() {return this.editUserForm.controls;}
  updateUser(): any{

    this.dataLoaded=true;
    if(this.editUserForm.invalid){return false;}
    // this.userService.update(this.userId,this.editUserForm.value.name,this.editUserForm.value.birthday,
    //   this.editUserForm.value.phonenumber,this.editUserForm.value.address
    //   ,this.editUserForm.value.url_avatar,this.editUserForm.value.status,this.editUserForm.value.create_date).subscribe(res =>{
    //     this._router.navigate(['']);
    //   });


  //   this.user.add(this.proAdd.value.id_user,this.proAdd.value.name,this.proAdd.value.birthday,this.proAdd.value.phonenumber,this.proAdd.value.address,this.proAdd.value.url_avatar,this.proAdd.value.status,this.proAdd.value.create_date).subscribe(res =>{
  //     this._router.navigate(['']);
  // });
    this.userService.update(this.userId,this.editUserForm.value).subscribe(data =>{
      this._router.navigate(['users']);
    })
  }
  // submited: boolean =false;
  // users:any;
  // proUpdate = this.fb.group({
  //   id_user: ['',Validators.required],
  //   name: ['',Validators.required],
  //   birthday: ['',Validators.required],
  //   phonenumber: ['',Validators.required],
  //   address: ['',Validators.required],
  //   url_avatar: ['',Validators.required],
  //   status: ['',Validators.required] ,
  //   create_date: ['',Validators.required]
  // })
  // constructor(
  //   private user: UserService,
  //   private fb: FormBuilder,
  //   private _router:Router,
  //   private router:ActivatedRoute
  //   ) { }

  // ngOnInit(): void {
  //   // this.router.paramMap.subscribe(query =>{
  //   //   let id:string = query.get("id");
  //   //   this.user.getById(id).subscribe(res =>{
  //   //     console.log(res.result);
  //   //   })
  //   // })
  //   this.router.paramMap.subscribe(query =>{
  //     // console.log(query.get("id_user"));
  //     let id_user = query.get("id_user");

  //     this.user.getById(id_user).subscribe(res =>{
  //       let myPro =res.result;
  //       this.proUpdate = this.fb.group({
  //         id_user: [myPro.id_user,Validators.required],
  //         name: [myPro.name,Validators.required],
  //         birthday: [myPro.birthday,Validators.required],
  //         phonenumber: [myPro.phonenumber,Validators.required],
  //         address: [myPro.address,Validators.required],
  //         url_avatar: [myPro.url_avatar,Validators.required],
  //         status: [myPro.status,Validators.required] ,
  //         create_date: [myPro.create_date,Validators.required]
  //       })
  //     })
  //   })
  // }
  // get f() {return this.proUpdate.controls;}
  // onSubmit(): any {
  //   this.submited=true;
  //   if(this.proUpdate.invalid){return false;}

  //   //cập nhật
  //   console.log(this.proUpdate.value);
  //   this.user.update(this.proUpdate.value.id_user,this.proUpdate.value.name,this.proUpdate.value.birthday,this.proUpdate.value.phonenumber,this.proUpdate.value.address,this.proUpdate.value.url_avatar,this.proUpdate.value.status,this.proUpdate.value.create_date).subscribe(res =>{
  //        this._router.navigate(['']);
  //   });
  // }

}
