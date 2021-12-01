import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpecialitiesRoutingModule } from './specialities-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { SpecialitiesComponent } from './specialities.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [AddComponent, ViewComponent, SpecialitiesComponent],
  imports: [
    CommonModule,
    SpecialitiesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ]
})
export class SpecialitiesModule { }
