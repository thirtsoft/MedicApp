import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataService } from './../data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelect2Module } from 'ng-select2';
import { ViewDemandeComponent } from './appointements/view-demande/view-demande.component';


@NgModule({
  declarations: [AdminComponent, SidemenuComponent, ViewDemandeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    NgSelect2Module,
    InMemoryWebApiModule.forRoot(DataService),
    ModalModule.forRoot(),
  ],
})
export class AdminModule {}
