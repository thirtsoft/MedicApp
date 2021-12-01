import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { UpdateStatusDemandeComponent } from './update-status-demande/update-status-demande.component';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MAT_DIALOG_DATA, MatDialogModule,MatDialogRef, } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [DoctorsComponent, UpdateStatusDemandeComponent],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
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
    DoctorsComponent,
    UpdateStatusDemandeComponent
  ]

})
export class DoctorsModule { }
