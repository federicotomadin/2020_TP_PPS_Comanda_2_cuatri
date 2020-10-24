import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { UtilsService } from 'src/app/servicios/utils.service';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { NotificationService } from 'src/app/servicios/notification.service';
import { from } from 'rxjs';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';
import { Notificacion } from 'src/app/clases/notificacion';
import { Router } from '@angular/router';
import { SonidosService } from '../servicios/sonidos.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public formHome: FormGroup;
  usuario: Usuario = new Usuario();

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private utilsService: UtilsService,
    public usuarioService: UsuarioService,
    public notificationService: NotificationService,
    private router:Router,
    private sonido:SonidosService
  ) { }

  ngOnInit() {
    console.log('Se activo ngOnInit de HOME');
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        console.log('Se asignaron datos al usuario');
        this.usuario = datos;
        this.notificationService.activarNotificaciones(this.usuario.perfil);
        
        /*let notificacion = new Notificacion();
        notificacion.idPedido = "27";
        notificacion.mensaje = "sale con fritas";
        notificacion.receptor = TipoUsuario.COCINERO;
        this.notificationService.crearNotificacion(notificacion);*///.then(data => console.log(data));
        
      });
      // .subscribe(datos => {console.log(datos[0].mensaje)});
    });
  }

  ionViewWillEnter() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        console.log('Se asignaron datos al usuario');
        this.usuario = datos;
        this.notificationService.activarNotificaciones(this.usuario.perfil);
        
        /*let notificacion = new Notificacion();
        notificacion.idPedido = "27";
        notificacion.mensaje = "sale con fritas";
        notificacion.receptor = TipoUsuario.COCINERO;
        this.notificationService.crearNotificacion(notificacion);*///.then(data => console.log(data));
        
      });
      // .subscribe(datos => {console.log(datos[0].mensaje)});
    });
    /*this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
      });
    });*/
  }

  cerrarSesion(){
    this.authService.logout();
    this.sonido.Reproducir('cerrar');
    this.router.navigateByUrl('/login');
  }

  gestionarUsuarios() {
    this.utilsService.showLoadingAndNavigate('usuarios');
  }

  gestionarMesas() {
    this.utilsService.showLoadingAndNavigate('mesas');
  }

  gestionarListaEspera() {
    this.utilsService.showLoadingAndNavigate('clientes-espera');
  }

  gestionarPropinas() {
    this.utilsService.showLoadingAndNavigate('propinas');
  }

  irAProductos(): void {
    this.utilsService.showLoadingAndNavigate('productos');
  }

  irAPendientes() {
    this.utilsService.showLoadingAndNavigate('pendientes');
  }

  irABartender(): void {
    this.utilsService.showLoadingAndNavigate('bartender');
  }

  irAMozo(): void {
    this.utilsService.showLoadingAndNavigate('mozo');
  }
}
