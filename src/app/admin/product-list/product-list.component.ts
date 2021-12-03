import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from '../../common-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

import { UtilisateurService } from './../../services/utilisateur.service';
import { UtilisateurDto } from './../../models/utilisateur';

import * as $ from 'jquery';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  utilisateurDTOList: UtilisateurDto[];
  p : number=1;
  searchText;

  currentTime: number = 0;
  img: boolean;
  editForm: FormGroup

  constructor(public crudApi: UtilisateurService,
              private router: Router,
              public toastr: ToastrService,
              private commonService: CommonServiceService,
              private modalService: BsModalService,
              private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getProducts();

    this.getUtilisateurDTOs();

    if (this.crudApi.getUserAvatar(this.id) === null)
      this.img = false;
    else this.img = true;

    this.editForm = this.fb.group({
      id: [''],
      name: [''],
      username: [''],
      address: [''],
      mobile: [''],
      email: ['']
    } );

  }

  public getUtilisateurDTOs(): void {
    this.crudApi.getAllUtilisateurDtosOrderByIdDesc().subscribe(
      (response: UtilisateurDto[]) => {
        this.utilisateurDTOList = response;
        console.log(this.utilisateurDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  getTS() {
    return this.currentTime;
  }


  getProducts() {
    this.commonService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  editModal(template: TemplateRef<any>, userDTO: UtilisateurDto) {
/*     this.id = category.id;
    this.name = category.name; */
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });

    this.editForm.patchValue( {
      id: userDTO.id,
      name: userDTO.name,
      username: userDTO.username,
      address: userDTO.address,
      mobile: userDTO.mobile,
      email: userDTO.email
    });
  }

  update() {
    this.crudApi.updateUtilisateurDto(this.editForm.value.id, this.editForm.value)
      .subscribe((data) => {
        this.modalRef.hide();
       this.getUtilisateurDTOs();
      })
    this.modalRef.hide();
  }

 /*  update() {
    let params = {
      id: this.id,
      key: this.key,
      speciality: this.name,
    };
    this.modalRef.hide();
  } */

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteModal(template: TemplateRef<any>, userDTO) {
    this.id = userDTO.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  save() {
    this.modalRef.hide();
  }

  deleteProduct() {
    this.products = this.products.filter((a) => a.id !== this.id);
    this.commonService.deleteProduct(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getProducts();
    });
  }

  deleteUtilisateurDTO() {
    this.utilisateurDTOList = this.utilisateurDTOList.filter((a) => a.id !== this.id);
    this.crudApi.deleteUtilisateurDto(this.id).subscribe((data) => {
      this.modalRef.hide();
      this.getUtilisateurDTOs();
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
