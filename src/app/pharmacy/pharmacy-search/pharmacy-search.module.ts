import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacySearchComponent } from './pharmacy-search.component';
import { PharmacySearchRoutingModule } from './pharmacy-search-routing.module';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [ PharmacySearchComponent],
  imports: [
    CommonModule,
    PharmacySearchRoutingModule,
    NgSelect2Module
  ]
})
export class PharmacySearchModule { }
