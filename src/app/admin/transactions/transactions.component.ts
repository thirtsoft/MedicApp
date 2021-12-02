import { DemandeDto } from './../../models/demande';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from '../../common-service.service';
import * as $ from 'jquery';
import { Chart } from 'chart.js';

import { DashboardService } from './../../services/dashboard.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  modalRef: BsModalRef;
  transactionsList: any = [];
  errorMessage: string;
  id;

  Linechart: any = [];

  ChiffreAffaireMois: number[] = [];
  DemandeOfMonth: Date[] = [];

  listMois: any={}

  constructor(public commonService: CommonServiceService,
              private modalService: BsModalService,
              private crudApi: DashboardService) { }

  ngOnInit(): void {
    this.crudApi.getSumtotalOfDemandeByMonth()
      .subscribe((result: DemandeDto[]) => {
        this.listMois = result;
        const n = 1;
        const m = 0;
        console.log(this.listMois);
        for (let i=0; i<this.listMois.length; i++) {
          this.ChiffreAffaireMois.push(this.listMois[i][n]);
          this.DemandeOfMonth.push(this.listMois[i][m]);
        }
    //  this
        this.Linechart = new Chart('lineChart', {
          type: 'line',
          data: {
            labels: this.DemandeOfMonth,

            datasets: [
              {
                data: this.ChiffreAffaireMois,
                borderColor: '#3cb371',
                backgroundColor: "#FF7F50",
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            responsive: true,
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
      }
    );
  }

  deleteModal(template: TemplateRef<any>, trans) {
    this.id = trans.id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
  }

  deleteTrans() {
    this.transactionsList = this.transactionsList.filter(a => a.id !== this.id);
    this.modalRef.hide();
    // this.commonService.deleteTransaction(this.id).subscribe((data : any[])=>{
    //   this.getTransactions();
    // });
  }

  decline() {
    this.modalRef.hide();
  }
  btnColor() {
    document.getElementById('btn-yes').style.backgroundColor = "#00d0f1";
    document.getElementById('btn-yes').style.border = "1px solid #00d0f1";
    document.getElementById('btn-yes').style.color = "#fff";

    document.getElementById('btn-no').style.backgroundColor = "#fff";
    document.getElementById('btn-no').style.border = "1px solid #fff";
    document.getElementById('btn-no').style.color = "#000";
  }

  btnColorNo() {
    document.getElementById('btn-no').style.backgroundColor = "#00d0f1";
    document.getElementById('btn-no').style.border = "1px solid #00d0f1";
    document.getElementById('btn-no').style.color = "#fff";

    document.getElementById('btn-yes').style.backgroundColor = "#fff";
    document.getElementById('btn-yes').style.border = "1px solid #fff";
    document.getElementById('btn-yes').style.color = "#000";
  }

  getTransactions() {
    this.commonService.getTransactions()
      .subscribe(res => {
        this.transactionsList = res;
        $(function () {
          $("table").DataTable();
        });
      },
        error => this.errorMessage = <any>error);
  }

}
