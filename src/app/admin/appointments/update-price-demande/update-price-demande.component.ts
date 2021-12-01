import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { DemandeService } from './../../../services/demande.service';
import { DemandeDto } from './../../../models/demande';

@Component({
  selector: 'app-update-price-demande',
  templateUrl: './update-price-demande.component.html',
  styleUrls: ['./update-price-demande.component.css']
})
export class UpdatePriceDemandeComponent implements OnInit {

  listData: DemandeDto[];

  constructor(public crudApi: DemandeService,
    public toastr: ToastrService,
    public fb: FormBuilder,
    private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<UpdatePriceDemandeComponent>,
  ) { }

  ngOnInit() {
    if (this.crudApi.choixmenu == 'A'){
    this.infoForm();
    };
  }


  infoForm() {
    this.crudApi.formData = this.fb.group({
    id: [this.crudApi.formData.value.id, [Validators.required]],
    price: [this.crudApi.formData.value.price, [Validators.required]],
    nbreJours: [this.crudApi.formData.value.nbreJours, [Validators.required]],
    });
  }

  getListDemandeDTO() {
    this.crudApi.getAllDemandesByStatusValidated().subscribe(
      response =>{
      this.listData = response;
      }
    );
  }

  ResetForm() {
    this.crudApi.formData.reset();
  }

  onSubmit() {
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

}
