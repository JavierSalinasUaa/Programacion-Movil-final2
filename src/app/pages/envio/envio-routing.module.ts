import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnvioPage } from './envio.page';

const routes: Routes = [
  {
    path: '',
    component: EnvioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvioPageRoutingModule {}
