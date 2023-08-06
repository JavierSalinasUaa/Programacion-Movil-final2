import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnvioPageRoutingModule } from './envio-routing.module';

import { EnvioPage } from './envio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnvioPageRoutingModule
  ],
  declarations: [EnvioPage]
})
export class EnvioPageModule {}
