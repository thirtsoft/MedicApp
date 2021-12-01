import { Router } from '@angular/router';
import { DemandeService } from './../../services/demande.service';
import { DemandeDto } from './../../models/demande';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StatusDemande } from 'src/app/models/statutsDemande';

@Component({
  selector: 'app-home1header',
  templateUrl: './home1header.component.html',
  styleUrls: ['./home1header.component.css']
})
export class Home1headerComponent implements OnInit {

  formDataDemande: DemandeDto  = new DemandeDto();

  fileDemande: File;

  submitted = false;

  constructor(public crudApi: DemandeService,
      //        public toastr: ToastrService,
              private router : Router,

  ) { }


  ngOnInit(): void {
  }


  infoForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
      /*
    this.crudApi.formData = {
      id: this.crudApi.id,
      numero: '',
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      typeEtude: '',
      directorThese: '',
      speciality: '',
      masqueSaisi: '',
      saisiDonnees: '',
      analyseUnvaried: '',
      analyseBivarie: '',
      analyseMultivariate: '',
      subjectThese: '',
      baseDeDonnee: '',
      price: '',
      nbreJours: 0,
      status: '',
      subject: '',
      message: '',
      createdDate: new Date(),
    };
    */

  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  // selectionner une image et la garder
  selectFileDemande(event) {
    const file = event.target.files[0];
    this.fileDemande = file;
  }

  onSubmit() {
    console.log(this.formDataDemande, this.fileDemande);
    this.crudApi.addDemandeDtoWithFiles(this.formDataDemande, this.fileDemande)
      .subscribe( data => {
        alert("demande envoyé avec succès");
        console.log("Result : " + data);
   //     this.toastr.success("Contrat Ajouté avec Succès");
      }
    );

  //  this.router.navigate(['/admin/demandes']);

  }


}
