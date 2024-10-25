import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/modules/auth-profile/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:any=null;
  password:any=null;
  constructor( public authService:AuthService) { }

  ngOnInit(): void {
  }
  login(){
    this.authService.login(this.email,this.password).subscribe((res:any)=>{
      console.log(res);
      if(!res.error && res){

      }else{
        if(res.error.error=="Unauthorized"){
          
        }
      }
    });
  }
}
