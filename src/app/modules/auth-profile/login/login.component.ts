import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/modules/auth-profile/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:any=null;
  password:any=null;
  loginError: string = ''; 

  constructor( public authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    
  }
  login(){
    this.authService.login(this.email, this.password).subscribe(
      (res: any) => {
        if (!res.error){
          this.router.navigate(['/']);
          this.loginError = ''; 
        } else {
          this.loginError = 'Usuario o contra  seña incorrectos'; 
        }
      },
      (error) => {
        if (error.status === 401) {
          this.loginError = 'Usuario o contraseña incorrectos'; 
        }else if(error==='Unauthorized'){
          this.loginError = 'Usuario o contraseña incorrectos'; 
        }else {
          this.loginError = 'Ha ocurrido un error. Intente nuevamente'+error; 
        }
      }
    );
  }
}
