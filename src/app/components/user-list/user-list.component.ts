import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users:any;
  userForm = this.fb.group({
    name:''
  })
  constructor(
    private user: UserService,
    private fb:FormBuilder,
    public authService: AuthService
    ) { }

  getAll(){
    this.user.getList().subscribe(res =>{
      this.users = res;
      console.log(this.users)
    })
  }
  ngOnInit(): void {
    this.getAll();
  }
  onEdit(id_url: string){
    // alert('click on button' + id_url)
  }
  onDelete(id: string,name:string){
    this.user.delete(id,name).subscribe(res =>{
      this.getAll();
    })
    alert('Bạn đã xóa: '+name)
  }

  onSubmit(){
    console.log(this.userForm.value);
  }
}
