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

  //CREAR NUEVO USUARIO
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //LOGIN
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor( private http: HttpClient ) { }

  logout(){}
  login( usuario: UsuarioModel ){
    const authData = {
      ...usuario,
      returnSegureToken: true
    };
    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.apikey}`,
      authData
    );

  }
  nuevoUsuario( usuario: UsuarioModel ){
    const authData = {
      ...usuario,
      returnSegureToken: true
    };

    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.apikey}`,
      authData
    );

  }
}
