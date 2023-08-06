import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { CiudadesResponse } from '../interfaces/ciudades';
import { DeliveryResponse } from '../interfaces/delivery-response';
import { EnviosResponse } from '../interfaces/envios-response';

@Injectable({
  providedIn: 'root'
})
export class EnviosService {

  constructor(private http:HttpClient) { }

  enviar(f_envio: string, ciu_ori_id: string, ciu_des_id: string, nombre_rem: string, dir_rem: string, tel_rem: string,
    nombre_des: string, dir_des: string, tel_des: string, desc_art: string, personal_id : string){
    var formData = new FormData();
    formData.append('fecha_envio', f_envio);
    formData.append('ciudad_origen_id', ciu_ori_id);
    formData.append('ciudad_destino_id', ciu_des_id);
    formData.append('nombre_remitente', nombre_rem);
    formData.append('direccion_remitente', dir_rem);
    formData.append('telefono_remitente', tel_rem);
    formData.append('nombre_destinatario', nombre_des);
    formData.append('direccion_destinatario', dir_des);
    formData.append('telefono_destinatario', tel_des);
    formData.append('descripcion_articulo', desc_art);
    formData.append('personal_delivery_id', personal_id);
    var url='https://www.hostcatedral.com/api/appAranceles/public/registrar_envio';

     return this.http.post<EnviosResponse>(url,formData);
  }

  getCiudades(){
    var url='https://www.hostcatedral.com/api/appAranceles/public/getCiudades';
    return this.http.get<CiudadesResponse[]>(url);
  } 

  getDelivery(ciudadOri:string, ciudadDes: string){
    var url='https://www.hostcatedral.com/api/appAranceles/public/getDeliveryPorCiudad/'+ciudadOri+'/'+ciudadDes;
    return this.http.get<DeliveryResponse[]>(url);    
  }

}
