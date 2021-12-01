import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Router } from '@angular/router';

import { DemandeService } from './../../services/demande.service';
import { DemandeDto } from './../../models/demande';

import * as $ from 'jquery';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patientsList: any = [];
  errorMessage: string;

  datatable: any;

  name;
  id;
  key;

  modalRef: BsModalRef;
  formDataDemandeDTO = new DemandeDto();
  listDemandeDtoData: DemandeDto[];
  editForm: FormGroup;

  p : number=1;
  searchText;

/*   dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective; */

  constructor(public crudApi: DemandeService,
              private modalService: BsModalService,
              public router: Router,

  ) { }

  ngOnInit(): void {
    this.getListDemandeDTOByStatusRefusedOrderByIdDesc();
  }

  getListDemandeDTOByStatusRefusedOrderByIdDesc() {
    this.crudApi.getAllDemandesByStatusRefused().subscribe(
      (response: DemandeDto[]) => {
        console.log(this.listDemandeDtoData);
        this.listDemandeDtoData = response;
      }
    );
  }

  viewDemandeDTO(i) {}

  addEditServiceDTO() {
    this.router.navigateByUrl("admin/patients/create");
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    // this.name = "";
    // this.id = "";
    // this.key = "";
  }

  editModal(template: TemplateRef<any>, special: DemandeDto) {
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

   deleteModal(template: TemplateRef<any>, special) {
     this.id = special.id;
     this.modalRef = this.modalService.show(template, {
       class: 'modal-sm modal-dialog-centered',
     });
   }


  deleteDemandeDTO() {
    this.listDemandeDtoData = this.listDemandeDtoData.filter((a) => a.id !== this.id);
    this.crudApi.deleteDemandeDto(this.id).subscribe((data) => {
      this.modalRef.hide();
      this.getListDemandeDTOByStatusRefusedOrderByIdDesc();
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


}
