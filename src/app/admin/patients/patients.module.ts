import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [PatientsComponent, CreateServiceComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    DataTablesModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ]
})
export class PatientsModule { }
