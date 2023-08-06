import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { EnviosService } from 'src/app/services/envios.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.page.html',
  styleUrls: ['./envio.page.scss'],
})
export class EnvioPage implements OnInit {

  articulo_seleccionado: any | undefined;
  fecha_envio: string = '';
  nombre_remitente: string = '';
  direccion_remitente : string = '';
  telefono_remitente: string = '';
  nombre_destinatario: string = '';
  direccion_destinatario: string = '';
  telefono_destinatario: string = '';
  descripcion_articulo: string = '';
  mensaje : string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceEnvio:EnviosService,
    public alertController: AlertController
  ) {
    route.queryParamMap.subscribe(params => {
      if(this.router.getCurrentNavigation()?.extras.state){
        this.articulo_seleccionado = this.router.getCurrentNavigation()?.extras.state
        console.log(this.articulo_seleccionado.articulo_seleccionado)
      }
    }

    )
   }

   async Alerta(msg:string) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: msg,
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

   enviar(){
    this.serviceEnvio.enviar(this.fecha_envio, this.articulo_seleccionado.articulo_seleccionado[0], 
      this.articulo_seleccionado.articulo_seleccionado[1], this.nombre_remitente, this.direccion_remitente, 
      this.telefono_remitente, this.nombre_destinatario, this.direccion_destinatario, this.telefono_destinatario, 
      this.descripcion_articulo, this.articulo_seleccionado.articulo_seleccionado[2].persona_id).subscribe(
        data=>{
          console.log(data)
          this.mensaje = data.message
          this.Alerta(this.mensaje);
          this.vaciar();
          this.router.navigate(['//home']);
        }, error=>{
          this.Alerta(error.error)
        }
      )
   }

   vaciar(){
    this.fecha_envio = '';
    this.nombre_remitente = '';
    this.direccion_remitente = '';
    this.telefono_remitente = '';
    this.nombre_destinatario = '';
    this.direccion_destinatario = '';
    this.telefono_destinatario = '';
    this.descripcion_articulo = '';
    this.mensaje = '';
   }

  ngOnInit() {
  }

}
