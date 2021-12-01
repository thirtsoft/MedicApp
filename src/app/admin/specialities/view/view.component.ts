import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from '../../../common-service.service';
import * as $ from 'jquery';

import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceDto } from './../../../models/department';
import { ServiceService } from './../../../services/service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  speciality = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;
  formDataServiceDTO = new ServiceDto();
  listServiceDtoData: ServiceDto[];
  editForm: FormGroup;

  p : number=1;
  searchText;

  constructor(
    private commonService: CommonServiceService,
    private modalService: BsModalService,
    private crudApi: ServiceService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getSpecialityList();
    this.getListServiceDTOOrderDesc();

    this.editForm = this.fb.group({
      id: [''],
      code: [''],
      name: [''],
      description: ['']
    } );
  }

  getSpecialityList() {
    this.commonService.getSpeciality().subscribe(
      (data: any[]) => {
        this.speciality = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  getListServiceDTOOrderDesc() {
    this.crudApi.getServiceDtosOrderDesc().subscribe(
      (response: ServiceDto[]) => {
        console.log(this.listServiceDtoData);
        this.listServiceDtoData = response;
      }
    );
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    // this.name = "";
    // this.id = "";
    // this.key = "";
  }

  editModal(template: TemplateRef<any>, special: ServiceDto) {
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
      code: special.code,
      name: special.name,
      description: special.description
    });
  }

  deleteModal(template: TemplateRef<any>, special) {
    this.id = special.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  save() {
    console.log(this.formDataServiceDTO);
    this.crudApi.addServiceDto(this.formDataServiceDTO)
    .subscribe( data => {
      this.modalRef.hide();
      this.getListServiceDTOOrderDesc();
  });
    // let count = this.speciality.reverse()[0]['key'] + 1;
    // let id = this.speciality.reverse()[0]['id'] + 1
    // let params = {
    //   id : id,
    //   key : count,
    //   speciality : this.name
    // }
    // this.commonService.createSpeciality(params).subscribe((data : any[])=>{
    //   this.modalRef.hide();
    //   this.getSpecialityList();
    // })
    this.modalRef.hide();
    this.formDataServiceDTO = null;
  }

  update() {
    this.crudApi.updateServiceDto(this.editForm.value.id, this.editForm.value)
      .subscribe((data) => {
        this.modalRef.hide();
       this.getListServiceDTOOrderDesc();
      })
    this.modalRef.hide();
  }

  /* update() {
    let params = {
      id: this.formDataServiceDTO.id,
      code: this.formDataServiceDTO.code,
      name: this.formDataServiceDTO.name,
      description: this.formDataServiceDTO.description
    };
    console.log(params);
     this.commonService.updateSpeciality(params,this.id).subscribe((data : any[])=>{
       this.modalRef.hide();
       this.getSpecialityList();
     });
    this.modalRef.hide();
  } */

  deleteSpeciality() {
    this.speciality = this.speciality.filter((a) => a.id !== this.id);
    this.commonService.deleteSpeciality(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getSpecialityList();
    });
  }

  deleteServiceDTO() {
    this.listServiceDtoData = this.listServiceDtoData.filter((a) => a.id !== this.id);
    this.crudApi.deleteServiceDto(this.id).subscribe((data) => {
      this.modalRef.hide();
      this.getListServiceDTOOrderDesc();
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
