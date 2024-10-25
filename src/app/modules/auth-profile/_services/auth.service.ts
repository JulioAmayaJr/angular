import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {map, catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any;
  token:any='';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.loadStorage();
  }

  loadStorage(){
    if(localStorage.getItem("token")){
      this.token=localStorage.getItem("token");
      this.user=JSON.parse(localStorage.getItem("user")??'');
    }else{
      this.token='';
      this.user=null;
    }
  }

  login(email:String,password:String){
    let URL= environment.URL_SERVICES + '/users/login';
    return this.http.post(URL,{email,password}).pipe(
      map((res:any)=>{
        if(res.access_token){
          return this.saveLocalStorageResponse(res);
        }else{
          return res;
        }
      }),
      catchError((err:any)=>{
        return err;
      })
    );;
  }

  saveLocalStorageResponse(res:any){
    if(res.access_token && res.user){
      localStorage.setItem("token",res.access_token);
      localStorage.setItem("user",JSON.stringify(res.user));
      this.user=res.user;
      this.token=res.access_token;
      return true;
    }
    return false;
  }

  register(email:String,password:String){
    let URL= environment.URL_SERVICES + '/users/register';
    return this.http.post(URL,{email,password});
  }

  logout(){
    this.user=null;
    this.token=null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(["auth/login"]);
  }

}
