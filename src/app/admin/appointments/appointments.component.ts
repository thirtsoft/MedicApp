import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, TemplateRef, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { DemandeDto } from './../../models/demande';
import { DemandeService } from './../../services/demande.service';

import { UpdatePriceDemandeComponent } from './update-price-demande/update-price-demande.component';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  OpenPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).open();
  }

  PrintPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).print();
  }

  DownloadPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).download();
  }


  deleteDemandeDTO() {
    this.listDemandeDtoData = this.listDemandeDtoData.filter((a) => a.id !== this.id);
    this.crudApi.deleteDemandeDto(this.id).subscribe((data) => {
      this.modalRef.hide();
      this.getListDemandeDTOByStatusValidatedOrderByIdDesc();
    });
  }

  getDocument() {
    return {
      content: [
        {
          text: 'SIM SENEGAL',
          fontSize: 15,
          alignment: 'center',
          color: '#0000ff',
          decoration: 'underline',
          style: 'name',
        },
        {
          text: 'Analyse de données statistiques, Vente de matériels médicales & informatiques, Accompagnement dans la rechercher de RV médicale et Mise en place de logiciel de gestion médicale',
          fontSize: 11,
          bold: true,
          color: '#0000ff',
          alignment: 'center',
        },
        {
          text: 'Au Sicap Liberté 6 Lot N° 266 Dakar',
          fontSize: 9.5,
          bold: true,
          color: '#0000ff',
          alignment: 'center',
        },
        {
          text: 'Tél: +221 77 446 66 25 / Email: senimedicale@gmail.com',
          fontSize: 11,
          bold: true,
          alignment: 'center',
          color: '#0000ff'
        },
        {

        },


        {
          columns: [

             [
              {
                text: `${this.crudApi.listData[0].status}`,
                fontSize: 15,
                bold: true,
                color: '#0000ff',
                margin: [0, 15, 0, 15]
              },
              {
                text: ' Facturé à : ',
                fontSize: 11,
                color: '#0000ff',
                bold: true,
                margin: [0, 7, 0, 7]
              },
              {
                text: `${ this.crudApi.listData[0].firstName + ' ' + this.crudApi.listData[0].lastName }`,
                margin: [0, 5, 0, 5],
                fontSize: 11,
              },
              {
                text: `Tél: ${this.crudApi.listData[0].mobile}`,
                margin: [0, 5, 0, 5],
                fontSize: 11,
              },
              {
                text: `Email: ${this.crudApi.listData[0].email}`,
                margin: [0, 5, 0, 5],
                fontSize: 11,
              },

            ],

            [
              {
                text: `Date : ${this.crudApi.listData[0].createdDate.toLocaleString()}`,
                alignment: 'right',
                margin: [0, 15, 0, 15]
              },
              {
                text: ' Informations médicales : ',
                fontSize: 11,
                color: '#0000ff',
                bold: true,
                alignment: 'right',
                margin: [0, 7, 0, 7]
              },
              {
                text: `${this.crudApi.listData[0].typeEtude}`,
                alignment: 'right',
                margin: [0, 5, 0, 5],
                fontSize: 11,
              },
              {
                text: `${this.crudApi.listData[0].speciality}`,
                alignment: 'right',
                margin: [0, 5, 0, 5],
                fontSize: 11,
              },
              {
                text: `${this.crudApi.listData[0].directorThese}`,
                alignment: 'right',
                margin: [0, 5, 0, 5],
                fontSize: 11,
              },
            ],


          ]
        },

        {
          text: ' FACTURE ',
          alignment: 'center',
          fontSize: 12,
          color: '#0000ff',
          bold: true,
          margin: [0, 5, 0, 5]
        },
        {
          text: `N° : ${this.crudApi.listData[0].numero}`,
          bold: true,
          fontSize: 12,
          alignment: 'center',
          color: '#0000ff',
          margin: [0, 8, 0, 8]
        },

        {
          columns: [

             [

              {
                text: ' ',
                fontSize: 11,
                color: '#0000ff',
                bold: true,
                margin: [0, 7, 0, 7]
              },

              {
                text: `Saisi Donnée :  ${this.crudApi.listData[0].saisiDonnees}`,
                bold: true,
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },

              {
                text: `Masque saisi :  ${this.crudApi.listData[0].masqueSaisi}`,
                bold: true,
                fontSize: 11,
                margin: [0, 5, 0, 5],
              },

              {
                text: `Nbre jours :  ${this.crudApi.listData[0].nbreJours}`,
                bold: true,
                fontSize: 11,
                margin: [0, 5, 0, 5],
              },

            ],

            [

              {
                text: ' ',
                fontSize: 11,
                color: '#0000ff',
                bold: true,
                margin: [0, 7, 0, 7]
              },

              {
                text: `Analyse univ :  ${this.crudApi.listData[0].analyseUnvaried}`,
                bold: true,
                fontSize: 11,
                alignment: 'right',
                margin: [0, 5, 0, 5],
              },

              {
                text: `Analyse biv :  ${this.crudApi.listData[0].analyseBivarie}`,
                bold: true,
                fontSize: 11,
                alignment: 'right',
                margin: [0, 5, 0, 5],
              },

              {
                text: `Analyse multiv :  ${this.crudApi.listData[0].analyseMultivariate}`,
                bold: true,
                fontSize: 11,
                alignment: 'right',
                margin: [0, 5, 0, 5],
              },



            ],


          ]
        },




        {

        },

  //      this.getListLigneCommandes(this.lcmdService.listData),
        {

        },

        {
          text: `Total F CFA : ${this.crudApi.listData[0].price}`,
          alignment: 'right',
          margin: [0, 8, 0, 8],
          bold: true,
          fontSize: 12,
        },

        {
          text: 'Signature',
          style: 'sign',
          alignment: 'right',
          decoration: 'underline',
        },


      ],

      styles: {
        header: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 14,
          bold: true
        },
        total: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        ligne: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
          fontSize: 14,
          alignment: 'center'
        },

      }
    };

  }

 /*  getListLigneCommandes(item: LigneCommandeDto[]) {
    return {
      table: {
        widths: ['auto', '*', 'auto', 'auto'],
        body: [
          [
            {
              text: 'Quantité',
              style: 'tableHeader'
            },
            {
              text: 'Désignation',
              style: 'tableHeader'
            },
            {
              text: 'P.Unitaire',
              style: 'tableHeader'
            },
            {
              text: 'P.Total',
              style: 'tableHeader'
            },

          ],
          ...item.map(x => {
            return ([x.quantity, x.productName, x.price,
              (x.quantity*x.price).toFixed(2)])
          }),
          [
            {
              text: 'Montant Total',
              alignment: 'center',
              colSpan: 3
            }, {}, {},
            this.lcmdService.listData.reduce((sum, x)=> sum + (x.quantity * x.price), 0).toFixed(2)
          ]
        ]
      }
    }

  } */

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
