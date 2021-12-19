import { Injectable, NgZone } from '@angular/core';

import { User } from '../shared/services/user';

import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserService } from './user.service';
import firebase from 'firebase/compat';
import { copyFileSync } from 'fs';

// declare var firebase: any;
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  iddd:string | undefined;
  // id_user: string | undefined;
  // name: string | undefined;
  // birthday: Date | undefined;
  // phonenumber: string | undefined;
  // address: string | undefined;
  // url_avatar: string | undefined;
  // status: string | undefined;
  // create_date: Date | undefined

  constructor(
    public afStore: AngularFirestore,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone ,// NgZone service to remove outside scope warning
    public userService: UserService,
    public _router: Router
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') as string);
      }
      else {
        localStorage.setItem('user', JSON.stringify(null));
        JSON.parse(localStorage.getItem('user') as string);
      }

    })
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')as string);
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          result.user?.uid;
          this.userService.getById(result.user?.uid).subscribe(user =>{
            if(user.role=="admin"){
              this.router.navigate(['/users']);
            }else if(user.role=="normal"){
              window.alert('Bạn không có quyền hạn!');
            }else{
              window.alert('Đăng nhập không thành công!');
            }

          })
        });

      }).catch((error) => {
        window.alert('Sai tài khoản hoặc mật khẩu!')
      })
  }
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      // password:user.password,
    }
    console.log(user.uid);
    return userRef.set(userData, {
      merge: true
    })
  }
  async SendVerificationMail(){
    (await this.afAuth.currentUser)?.sendEmailVerification()
    .then(() =>{
      this.router.navigate(['users']);
    })
  }
   async SignUp(email: string, password: string,name: string,birthday: Date,phonenumber:string,address:string,url_avatar:string,status:string,create_date:Date) {

    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // this.SendVerificationMail();
        // this.router.navigate(['users']);
        // Sending email verification notification, when new user registers
        this.SendVerificationMail();
        // this.SetUserData(result.user);
        this.iddd=user.user?.uid;
        this.userService.add(user.user?.uid as string,name,birthday,phonenumber,address,url_avatar,status,create_date).subscribe(res =>{
          this._router.navigate(['users']);
      });
        // this.SignIn(email,password);
        console.log(user.user?.uid);
        // console.log('hello console:',this.userData.uid);
      }).catch((error) => {
        window.alert(error.message)
      })
  }



  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['dn']);
    })
  }

}
