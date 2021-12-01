import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {  PatientsComponent  } from './patients.component';
import { CreateServiceComponent } from './create-service/create-service.component';

const routes: Routes = [
	{
		path : '',
		component : PatientsComponent,
    children : [
      {
        path : "create",
        component : CreateServiceComponent
      }
    ]
	}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
