import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import  { Observable } from 'rxjs'



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient) { }
  
  //Method to call backend for verification of the credentials
  user_auth(user_Obj:any):Observable<any>{
    console.log("User Obje is ", user_Obj);
    // TODO: Modify these params, Instead of query param, pass it in body
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');    
    const params = new HttpParams()
    .append('username', user_Obj.Email_Id)
    .append('password', user_Obj.password);	
    console.log("User Obje is ", params);
    return this.http.get("http://localhost:6000/login/", {headers, params})
  }

//Method of backend call for creating new user
  user_Register(user_Obj:object):Observable<any>{
    return this.http.post("http://localhost:6000/signup",user_Obj)
  }


//Method to get the Short url 
short_Url(Url:any):Observable<any>{
  return this.http.post("http://localhost:6000/urlShortner",Url)
}
}

