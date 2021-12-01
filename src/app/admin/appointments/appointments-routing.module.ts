import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateStatusDemandeComponent } from '../doctors/update-status-demande/update-status-demande.component';
import { ViewDemandeComponent } from './../appointements/view-demande/view-demande.component';
import { AppointmentsComponent } from './appointments.component';
import { PendingDemandeComponent } from './pending-demande/pending-demande.component';
import { UpdatePriceDemandeComponent } from './update-price-demande/update-price-demande.component';

const routes: Routes = [
	{
		path : '',
		component : AppointmentsComponent,
    children : [
     /*  {
        path : 'demande-Encours',
        component : PendingDemandeComponent
      }, */
      {
        path : 'viewDemande:/id',
        component : ViewDemandeComponent
      },
     /*  {
        path : '',
        component : UpdateStatusDemandeComponent
      }, */
      {
        path : 'appointment',
        component : UpdatePriceDemandeComponent
      }
    ]
	},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
