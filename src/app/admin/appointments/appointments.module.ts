import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { DataTablesModule } from 'angular-datatables';
import { ViewDemandeComponent } from './view-demande/view-demande.component';
import { PendingDemandeComponent } from './pending-demande/pending-demande.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, } from '@angular/material/dialog';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { ModalModule } from 'ngx-bootstrap/modal';
import { UpdatePriceDemandeComponent } from './update-price-demande/update-price-demande.component';

@NgModule({
  declarations: [
      AppointmentsComponent, ViewDemandeComponent,
      PendingDemandeComponent, UpdatePriceDemandeComponent
    ],

  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ModalModule.forRoot(),
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} ,},
    { provide: MatDialogRef, useValue: {} },
  ],

  entryComponents: [
    AppointmentsComponent, UpdatePriceDemandeComponent,
    PendingDemandeComponent
  ]

})
export class AppointmentsModule { }
