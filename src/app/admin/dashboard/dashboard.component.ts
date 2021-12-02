import { DemandeDto } from './../../models/demande';
import {Component, OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';

import { Chart } from 'chart.js';

import { DashboardService } from './../../services/dashboard.service';
/*
declare var $: any;
declare var Morris: any; */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(public crudApi: DashboardService,
              public router: Router
  ) {}

  numberOfDemandeInDay;
  numberOfDemandeInMonth;
  numberOfPendingDemande;
  numberOfRefusedDemande;
  numberOfValidatedDemande;
  numberTotalOfDemande;
  numberOfService;

  numberOfDemandeDataByMonth: number[] = [];
  MonthsOfDemande: Date[] = [];
  listOfMonth: any = [];

  Barchart: any = [];


  ngOnInit(): void {

    this.getNumberOfDemandeInMonth();

    this.getNumberOfPendingDemande();

    this.getNumberOfRefusedDemande();

    this.getNumberOfValidatedDemande();

    this.getNumberOftotalOfDemande();

    this.getNumberOftotalOfServices();

    this.crudApi.getNumbertotalOfDemandeByMonth().subscribe((result: DemandeDto[]) => {
      this.listOfMonth = result;
      const n = 1;
      const m = 0;
      console.log(this.listOfMonth);
      for (let i=0; i<this.listOfMonth.length; i++) {
        this.numberOfDemandeDataByMonth.push(this.listOfMonth[i][n]);
        this.MonthsOfDemande.push(this.listOfMonth[i][m]);
      }
    //  this
      this.Barchart = new Chart('barChartNumberDemandePeerMonth', {
        type: 'bar',
        data: {
          labels: this.MonthsOfDemande,

          datasets: [
            {
              data: this.numberOfDemandeDataByMonth,
              borderColor: '#3cb371',
              backgroundColor: "#5F9EA0",

            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
          }
        }
      });
    });

  }

  getNumberOfDemandeInDay() {
    this.crudApi.getNumberOfDemandeInDay()
      .subscribe(resp => {
        this.numberOfDemandeInDay = resp;
      }
    );

  }

  getNumberOfDemandeInMonth() {
    this.crudApi.getNumberOfDemandeInMonth()
      .subscribe(resp => {
        this.numberOfDemandeInMonth = resp;
      }
    );

  }

  getNumberOfPendingDemande() {
    this.crudApi.getNumberOfDemandeByStatusPending()
      .subscribe(resp => {
        this.numberOfPendingDemande = resp;
      }
    );

  }

  getNumberOfRefusedDemande() {
    this.crudApi.getNumberOfDemandeByStatusRefused()
      .subscribe(resp => {
        this.numberOfRefusedDemande = resp;
      }
    );

  }

  getNumberOfValidatedDemande() {
    this.crudApi.getNumberOfDemandeByStatusValidated()
      .subscribe(resp => {
        this.numberOfValidatedDemande = resp;
      }
    );

  }

  getNumberOftotalOfDemande() {
    this.crudApi.getNumbertotalOfDemandes()
      .subscribe(resp => {
        this.numberTotalOfDemande = resp;
      }
    );

  }

  getNumberOftotalOfServices() {
    this.crudApi.getNumbertotalOfServices()
      .subscribe(resp => {
        this.numberOfService = resp;
      }
    );

  }

  goToPendingDemande() {
    this.router.navigateByUrl("appointment/demande-Encours");
  }

  goToRefusedDemande() {
    this.router.navigateByUrl("appointment/demande-resused");
  }

  goToValidatedDemande() {
    this.router.navigateByUrl("appointment/demande-validated");
  }







}
