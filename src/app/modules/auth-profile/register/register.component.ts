import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:any=null;
  email:any=null;
  password:any=null;
  id_rol:any=null
  UserRegister:string=''
  registerForm: FormGroup;
  registerError: string = '';
  confirmPassword:string=''
  constructor(private authService:AuthService,private router:Router,private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      id_rol: [null, [Validators.required]],
    });
   }

  ngOnInit(): void {
  }

  register(){
    if (this.password !== this.confirmPassword) {
      this.UserRegister = 'Las contraseñas no coinciden';
      return; 
    }
    this.id_rol=1;
    this.authService.register(this.name,this.email, this.password,this.id_rol).subscribe(
      (res: any) => {
        if (res){
          this.UserRegister="Usuario creado con exito";
        } 
        console.log(res)
      },
      (error) => {
        if (error.status === 400) {
          this.UserRegister = 'Correo ya registrado, por favor use otro!'; 
        }else {
          this.UserRegister = 'Ha ocurrido un error. Intente nuevamente'+error; 
        }
      }
    );
  }

}
