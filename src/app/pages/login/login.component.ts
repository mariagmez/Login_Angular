import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { switchAll } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor( private auth: AuthService,
    private router: Router ) { } 
  ngOnInit() {
  }

  login( form: NgForm){

    if ( form.invalid){ return; }

      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere...'
      });
      Swal.showLoading();

      this.auth.login(this.usuario)
      .subscribe(resp =>{

          console.log(resp);
          Swal.close();
          this.router.navigateByUrl('/home');

        }, (err)=>{
          console.log(err.error.error.message);
          Swal.fire({
            allowOutsideClick: false,
            type: 'error',
            title:'Datos incorrectos',
            text: err.error.error.message
          });
        });
  }
}
