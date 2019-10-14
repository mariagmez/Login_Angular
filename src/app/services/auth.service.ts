import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "https://identitytoolkit.googleapis.com/v1";
  private apikey = "AIzaSyDqpDD3GULDFvcAMYXp1sxP5xEnJs5IrXo";

  userToken:string;

  //CREAR NUEVO USUARIO
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //LOGIN
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor( private http: HttpClient ) {
    this.leerToken();
   }

  logout(){}
  login( usuario: UsuarioModel ){
    const authData = {
      ...usuario,
      returnSegureToken: true
    };
    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map( resp =>{
        this.guardarToken( resp['idToken']);
        return resp;
      })
  );

  }
  nuevoUsuario( usuario: UsuarioModel ){
    const authData = {
      ...usuario,
      returnSegureToken: true
    };

    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.apikey}`,
      authData).pipe(
        map( resp =>{
          this.guardarToken( resp['idToken']);
          return resp;
        })
    );

  }


  private guardarToken( idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken(){
    if ( localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

    return this.userToken;
  }
}
