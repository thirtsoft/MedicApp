import {Component, OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';

import { Chart } from 'chart.js';

import { DemandeDto } from './../../models/demande';
import { DashboardService } from './../../services/dashboard.service';

declare var $: any;
declare var Morris: any;

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

  chartDemandeDataByMonth: number[] = [];
  MonthsOfDemande: Date[] = [];
  listOfMonth: any = [];

  chartLineDemandeDataByYear: number[] = [];
  YearsOfDemande: Date[] = [];
  listOfYears: any={};

  Linechart: Chart;
  Barchart: any = [];
  Number = [];

  lineDemandeDataByMonth: number[] = [];
  lineMonthOfMonth: Date[] = [];

  list: any={};

  ngOnInit(): void {
  //  this.getNumberOfDemandeInDay();

    this.getNumberOfDemandeInMonth();

    this.getNumberOfPendingDemande();

    this.getNumberOfRefusedDemande();

    this.getNumberOfValidatedDemande();

    this.getNumberOftotalOfDemande();

    this.getNumberOftotalOfServices();

  /*   let chartAreaData = [
      { y: '2006', a: 100, b: 90 },
      { y: '2007', a: 75, b: 65 },
      { y: '2008', a: 50, b: 40 },
      { y: '2009', a: 75, b: 65 },
      { y: '2010', a: 50, b: 40 },
      { y: '2011', a: 75, b: 65 },
      { y: '2012', a: 100, b: 90 },
    ]; */
   /*  let chartLineData = [
      { y: '2006', a: 100, b: 90 },
      { y: '2007', a: 75, b: 65 },
      { y: '2008', a: 50, b: 40 },
      { y: '2009', a: 75, b: 65 },
      { y: '2010', a: 50, b: 40 },
      { y: '2011', a: 75, b: 65 },
      { y: '2012', a: 100, b: 90 },
    ];
 */
    /* this.crudApi.getNumbertotalOfDemandeByMonth().subscribe((result: DemandeDto[]) => {
      this.listOfMonth = result;
      const n = 1;
      const m = 0;
      console.log(this.listOfMonth);
      for (let i = 0; i < this.listOfMonth.length; i++) {
        this.chartDemandeDataByMonth.push(this.listOfMonth[i][n]);
        this.MonthsOfDemande.push(this.listOfMonth[i][m]);
      } */



    /* Morris Area Chart */
   /*  Morris.Area({
      element: 'morrisArea',
      data: [
        { y: '2013', a: 60 },
        { y: '2014', a: 100 },
        { y: '2015', a: 240 },
        { y: '2016', a: 120 },
        { y: '2017', a: 80 },
        { y: '2018', a: 100 },
        { y: '2019', a: 300 },
      ],
      xkey: 'y',
      ykeys: ['a'],
      labels: ['Revenue'],
      lineColors: ['#1b5a90'],
      lineWidth: 2,

      fillOpacity: 0.5,
      gridTextSize: 10,
      hideHover: 'auto',
      resize: true,
      redraw: true,
    });
 */
    Morris.Area({
      element: 'morrisArea',
      data: [
        this.chartDemandeDataByMonth

      ],
      xkey: 'y',
      ykeys: ['a'],
      labels: this.MonthsOfDemande,
      lineColors: ['#1b5a90'],
      lineWidth: 2,

      fillOpacity: 0.5,
      gridTextSize: 10,
      hideHover: 'auto',
      resize: true,
      redraw: true,
    });

    /* Morris Line Chart */
   /*  Morris.Line({
      element: 'morrisLine',
      data: [
        { y: '2015', a: 100, b: 30 },
        { y: '2016', a: 20, b: 60 },
        { y: '2017', a: 90, b: 120 },
        { y: '2018', a: 50, b: 80 },
        { y: '2019', a: 120, b: 150 },
      ],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Doctors', 'Patients'],
      lineColors: ['#1b5a90', '#ff9d00'],
      lineWidth: 1,
      gridTextSize: 10,
      hideHover: 'auto',
      resize: true,
      redraw: true,
    });
    });*/

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
