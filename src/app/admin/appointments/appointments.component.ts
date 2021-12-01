import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, TemplateRef, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { DemandeDto } from './../../models/demande';
import { DemandeService } from './../../services/demande.service';

import { UpdatePriceDemandeComponent } from './update-price-demande/update-price-demande.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  name;
  id;
  key;
  notNullPrice = true;

  modalRef: BsModalRef;
  formDataDemandeDTO = new DemandeDto();
  listDemandeDtoData: DemandeDto[];
  editForm: FormGroup;

  p : number=1;
  searchText;

  constructor(public crudApi: DemandeService,
              private modalService: BsModalService,
              public toastr: ToastrService,
              private fb: FormBuilder,
              public router: Router,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<UpdatePriceDemandeComponent>,
  ) { }

  ngOnInit(): void {
    this.getListDemandeDTOByStatusValidatedOrderByIdDesc();

    this.editForm = this.fb.group({
      id: [''],
      price: [''],
      nbreJours: ['']
    } );

  }

  getListDemandeDTOByStatusValidatedOrderByIdDesc() {
    this.crudApi.getAllDemandesByStatusValidated().subscribe(
      (response: DemandeDto[]) => {
        console.log(this.crudApi.listData);
        this.crudApi.listData = response;
      }
    );
  }

  addEditPriceOfDamndeDTO(item: DemandeDto) {
    this.crudApi.choixmenu === 'M';
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(UpdatePriceDemandeComponent, dialogConfig);
  }

  viewDemandeDTO() {
    this.router.navigateByUrl("");
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
     this.modalRef = this.modalService.show(template, {
       class: 'modal-lg modal-dialog-centered',
     });

     this.editForm.patchValue( {
      id: special.id,
      price: special.price,
      nbreJours: special.nbreJours
     });
  }

  viewModal(template: TemplateRef<any>, special: DemandeDto) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });

    this.editForm.patchValue( {
     id: special.id,
     price: special.price,
     nbreJours: special.nbreJours
    });
 }

  deleteModal(template: TemplateRef<any>, special) {
     this.id = special.id;
     this.modalRef = this.modalService.show(template, {
       class: 'modal-sm modal-dialog-centered',
     });
  }

  update() {
    console.log(this.editForm.value.id);
    console.log(this.editForm.value);
    this.crudApi.updatePriceAndNumberOfDayOfDemandeDto(this.editForm.value.id, this.editForm.value.price, this.editForm.value.nbreJours)
      .subscribe((data) => {
        this.modalRef.hide();
        this.toastr.success('avec succès','Le Prix et NbreJours Modifié', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
       this.getListDemandeDTOByStatusValidatedOrderByIdDesc();
       this.router.navigate(['/admin/appointment']);
      })
    this.modalRef.hide();
  }

 /*  onSubmit() {
    console.log(this.crudApi.formData.value);
    console.log(this.crudApi.formData.value.id);
    console.log(this.crudApi.formData.value.price);
    this.crudApi.updatePriceAndNumberOfDayOfDemandeDto(this.crudApi.formData.value.id,this.crudApi.formData.value.price, this.crudApi.formData.value.nbreJours).
      subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Status et Nbre jours Modifier avec Succès");
      this.getListDemandeDTO();
      this.router.navigate(['/admin/appointment']);
      });
  }
 */

  deleteDemandeDTO() {
    this.listDemandeDtoData = this.listDemandeDtoData.filter((a) => a.id !== this.id);
    this.crudApi.deleteDemandeDto(this.id).subscribe((data) => {
      this.modalRef.hide();
      this.getListDemandeDTOByStatusValidatedOrderByIdDesc();
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
