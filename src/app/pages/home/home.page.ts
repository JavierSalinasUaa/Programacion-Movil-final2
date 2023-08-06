import { Component, OnInit } from '@angular/core';
import { EnviosService } from 'src/app/services/envios.service';
import { AlertController,LoadingController  } from '@ionic/angular';
import { CiudadesResponse } from 'src/app/interfaces/ciudades';
import { DeliveryResponse } from 'src/app/interfaces/delivery-response';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  resultado:CiudadesResponse[]=[];
  resultadoDel:DeliveryResponse[]=[];
  ciudadActualO : string = '';
  ciudadActualD : string = '';
  ciudades : string [] = [];
  mensaje: string = '';

  constructor(private serviceEnvios:EnviosService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private router: Router) { 
    this.getCiudades()
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

  getCiudades(){
    this.loadingController.create({
      message: 'Aguarde por favor...',
    }).then((res)=>{
      res.present();
    this.serviceEnvios.getCiudades().subscribe(
      data=>{
            console.log(data);
            this.resultado = data;
            res.dismiss();
            
      
    });
})}

handleChange(ev:any) {
  this.ciudadActualO = ev.target.value;
  this.ciudades[0] = this.ciudadActualO;
  console.log(this.ciudadActualO)
}

handleChange2(ev:any) {
  this.ciudadActualD = ev.target.value;
  this.ciudades[1] = this.ciudadActualD;
  console.log(this.ciudadActualD)
}

buscar(){
  this.serviceEnvios.getDelivery(this.ciudadActualO, this.ciudadActualD).subscribe(
  data=>{     
    this.resultadoDel.push(...data)
    if(this.resultadoDel.toString() == ""){
      this.mensaje = 'No se ha encontrado ningun delivery'
      this.Alerta(this.mensaje)
    }
}, error =>{
  this.Alerta(error.error)
}

);
}

mostrarDetalle(item: any){
  this.ciudades[2] = item;
  let navigationExtras: NavigationExtras = {
    state: {
      articulo_seleccionado: this.ciudades
    }
  };
  this.router.navigate(['/envio'], navigationExtras);

}

limpiar(){
  this.resultadoDel = []
}

  ngOnInit() {
   
  }

}
