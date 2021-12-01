import { Subject } from 'rxjs';
import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { DemandeDto } from './../../models/demande';
import { DemandeService } from './../../services/demande.service';
import { UpdateStatusDemandeComponent } from './update-status-demande/update-status-demande.component';

import * as $ from 'jquery';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  doctorsList: any = [];
  errorMessage: string;

  modalRef: BsModalRef;
  name;
  id;
  key;
  formDataDemandeDTO = new DemandeDto();
  listDemandeDtoData: DemandeDto[];
  editForm: FormGroup;
  viewForm: FormGroup;
  mailForm: FormGroup;
  p : number=1;
  searchText;

  StatusList= ['ENCOURS','VALIDER','ANNULER'];

  constructor(public crudApi: DemandeService,
              private modalService: BsModalService,
              public toastr: ToastrService,
              public router: Router,
              private fb: FormBuilder,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<UpdateStatusDemandeComponent>,
  ) { }

  ngOnInit(): void {
    this.getListDemandeDTOByStatusPendingOrderByIdDesc();

    this.editForm = this.fb.group({
      id: [''],
      status: ['']
    } );

    this.viewForm = this.fb.group({
      id: [''],
      numero: [''],
      firstName: [''],
      lastName: [''],
      mobile: [''],
      typeEtude: [''],
      directorThese: [''],
      speciality: [''],
      masqueSaisi: [''],
      saisiDonnees: [''],
      analyseUnvaried: [''],
      analyseBivarie: [''],
      analyseMultivariate: [''],
      subjectThese: ['']
    } );

    this.mailForm = this.fb.group({
      id: [''],
      email: [''],
      subject: [''],
      message: [''],
    } );

  }

  getListDemandeDTOByStatusPendingOrderByIdDesc() {
    this.crudApi.getListOfDemandeByStatusPending().subscribe(
      (response: DemandeDto[]) => {
        console.log(this.listDemandeDtoData);
        this.listDemandeDtoData = response;
      }
    );
  }

  addEditStatusDamndeDTO(item: DemandeDto) {
    this.crudApi.choixmenu === 'M';
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(UpdateStatusDemandeComponent, dialogConfig);
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
     status: special.status
    });
  }

  viewModal(template: TemplateRef<any>, special: DemandeDto) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });

    this.viewForm.patchValue( {
     id: special.id,
     numero: special.numero,
     firstName: special.firstName,
     lastName: special.lastName,
     mobile: special.mobile,
     typeEtude: special.typeEtude,
     directorThese: special.directorThese,
     speciality: special.speciality,
     masqueSaisi: special.masqueSaisi,
     saisiDonnees: special.saisiDonnees,
     analyseUnvaried: special.analyseUnvaried,
     analyseBivarie: special.analyseBivarie,
     analyseMultivariate: special.analyseMultivariate,
     subjectThese: special.subjectThese
    });
  }

  mailModal(template: TemplateRef<any>, special: DemandeDto) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });

    this.mailForm.patchValue( {
     id: special.id,
     email: special.email,
     subject: special.subject,
     message: special.message,
    });
  }

  update() {
    console.log(this.editForm.value.id);
    console.log(this.editForm.value);
    this.crudApi.updateStatusOfDemande(this.editForm.value.id, this.editForm.value.status)
      .subscribe((data) => {
        this.modalRef.hide();
        this.toastr.success('avec succès','Status Modifié', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
       this.getListDemandeDTOByStatusPendingOrderByIdDesc();
       this.router.navigate(['/admin/doctor']);
      })
    this.modalRef.hide();
  }

  mailToDemandeur() {
    console.log(this.mailForm.value.id);
    console.log(this.mailForm.value);
    /*
    this.crudApi.updateStatusOfDemande(this.editForm.value.id, this.editForm.value.status)
      .subscribe((data) => {
        this.modalRef.hide();
        this.toastr.success('avec succès','Status Modifié', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
       this.getListDemandeDTOByStatusPendingOrderByIdDesc();
       this.router.navigate(['/admin/doctor']);
      }) */
    this.modalRef.hide();
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
      this.getListDemandeDTOByStatusPendingOrderByIdDesc();
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
