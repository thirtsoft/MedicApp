import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ForgotPasswordModule } from './../../forgot-password/forgot-password.module';
// import { MorrisJsModule } from 'angular-morris-js';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ForgotPasswordModule,
    // MorrisJsModule,
    ChartsModule
  ],
})
export class DashboardModule {}
