import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
// const baseUrl = 'http://localhost:3000/Users';
// const url = "http://:3000/Users?id_user=" + idUser + "&name=" + fullname
//                 + "&birthday=" + chuoiNamSinh + "&phonenumber=" + phonenumber + "&address=" + address;
export class UserService {

  constructor(private http:HttpClient) { }


  getById(id: any):Observable<UserData>{
    return this.http.get<UserData>('http://ec2-13-213-52-25.ap-southeast-1.compute.amazonaws.com:3000/Users/'+id);
  }
  getList():Observable<UserData[]> {
    return this.http.get<UserData[]>('http://ec2-13-213-52-25.ap-southeast-1.compute.amazonaws.com:3000/Users');
  }
  delete(id: string,name:string): Observable<any>{
    return this.http.delete('http://ec2-13-213-52-25.ap-southeast-1.compute.amazonaws.com:3000/Users/'+id);
  }

  update(id: any, userObj: any){
    return this.http.put('http://ec2-13-213-52-25.ap-southeast-1.compute.amazonaws.com:3000/Users/'+id,userObj);
  }

  add(id_user:string,name:string,birthday:Date,phonenumber:string,address:string,url_avatar:string,status:string,create_date:Date):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
      // const body=JSON.stringify();
    }
    return this.http.post(`http://ec2-13-213-52-25.ap-southeast-1.compute.amazonaws.com:3000/Users?id_user=${id_user}&name=${name}&birthday=${birthday}&phonenumber=${phonenumber}&address=${address}&url_avatar=${url_avatar}&status=${status}&create_date=${create_date}`,httpOptions);
  }

}
export interface UserData {
  id_user: string;
  name: string;
  birthday: Date;
  phonenumber: string;
  address: string;
  url_avatar: string;
  status: string;
  create_date: Date;
  role: string
}
