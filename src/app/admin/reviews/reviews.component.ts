import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { EmailService } from './../../services/email.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { EmailDto } from './../../models/email';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonServiceService } from '../../common-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  name;
  id;
  key;

  modalRef: BsModalRef;
  formDataEmailDtoDTO = new EmailDto();
  listEmailDtoData: EmailDto[];
  editForm: FormGroup;

  p : number=1;
  searchText;


  constructor(public crudApi: EmailService,
              private modalService: BsModalService,
              public router: Router
  ) { }

  ngOnInit(): void {
    this.getAllEmailDTOOrderByIdDesc();
  }

  getAllEmailDTOOrderByIdDesc() {
    this.crudApi.getEmailDtosOrderDesc().subscribe(
      (response: EmailDto[]) => {
        console.log(this.listEmailDtoData);
        this.listEmailDtoData = response;
      }
    );
  }

  repondeEmailDTO(i) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    // this.name = "";
    // this.id = "";
    // this.key = "";
  }

  editModal(template: TemplateRef<any>, special: EmailDto) {
    /*  this.id = special.id;
     console.log(this.id); */
     // this.name = data[0].speciality;
     // this.id = data[0].id;
     // this.key = data[0].key;
     this.modalRef = this.modalService.show(template, {
       class: 'modal-lg modal-dialog-centered',
     });

     this.editForm.patchValue( {
       id: special.id,
   //    code: special.code,
   //    name: special.name,
   //    description: special.description
     });
   }

   responseToDemandeur(i) {}

   deleteModal(template: TemplateRef<any>, special) {
     this.id = special.id;
     this.modalRef = this.modalService.show(template, {
       class: 'modal-sm modal-dialog-centered',
     });
   }


  deleteEmailDTO() {
    this.listEmailDtoData = this.listEmailDtoData.filter((a) => a.id !== this.id);
    this.crudApi.deleteEmailDto(this.id).subscribe((data) => {
      this.modalRef.hide();
      this.getAllEmailDTOOrderByIdDesc();
    });
  }

  decline() {
    this.modalRef.hide();
  }

  btnColor() {
    document.getElementById('btn-yes').style.backgroundColor = '#00d0f1';
    document.getElementById('btn-yes').style.border = '1px solid #00d0f1';
    document.getElementById('btn-yes').style.color = '#fff';

    document.getElementById('btn-no').style.backgroundColor = '#fff';
    document.getElementById('btn-no').style.border = '1px solid #fff';
    document.getElementById('btn-no').style.color = '#000';
  }

  btnColorNo() {
    document.getElementById('btn-no').style.backgroundColor = '#00d0f1';
    document.getElementById('btn-no').style.border = '1px solid #00d0f1';
    document.getElementById('btn-no').style.color = '#fff';

    document.getElementById('btn-yes').style.backgroundColor = '#fff';
    document.getElementById('btn-yes').style.border = '1px solid #fff';
    document.getElementById('btn-yes').style.color = '#000';
  }

  /* reviews: any = [];
  errorMessage: string;
  modalRef: BsModalRef;
  id;
  constructor(public commonService: CommonServiceService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  deleteModal(template: TemplateRef<any>, special) {
    let data = this.reviews.filter(a => a.id === special.id);
    this.id = data[0].id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
  }

  getReviews() {
    this.commonService.getReviews()
      .subscribe(res => {
        this.reviews = res;
        $(function () {
          $("table").DataTable();
        });
      },
        error => this.errorMessage = <any>error);
  }
  deleteReview() {
    this.commonService.deleteReview(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getReviews();
    });
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
  } */

}
