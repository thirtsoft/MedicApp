import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [ ProductsComponent ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgSelect2Module
  ]
})
export class ProductsModule { }
