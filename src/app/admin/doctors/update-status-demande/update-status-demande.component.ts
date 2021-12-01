import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { DemandeService } from './../../../services/demande.service';
import { DemandeDto } from './../../../models/demande';

@Component({
  selector: 'app-update-status-demande',
  templateUrl: './update-status-demande.component.html',
  styleUrls: ['./update-status-demande.component.css']
})
export class UpdateStatusDemandeComponent implements OnInit {

  listData: DemandeDto[];

  StatusList= ['ENCOURS','VALIDER','ANNULER'];

  constructor(public crudApi: DemandeService,
    public toastr: ToastrService,
    public fb: FormBuilder,
    private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<UpdateStatusDemandeComponent>,
  ) { }

  ngOnInit() {
    if (this.crudApi.choixmenu == 'A'){
    this.infoForm();
    };
  }


  infoForm() {
    this.crudApi.formData = this.fb.group({
    id: [this.crudApi.formData.value.id, [Validators.required]],
    status: [this.crudApi.formData.value.status, [Validators.required]],
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
    console.log(this.crudApi.formData.value.status);
    this.crudApi.updateStatusOfDemande(this.crudApi.formData.value.id,this.crudApi.formData.value.status).
      subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Status Modifier avec Succès");
      this.getListDemandeDTO();
      this.router.navigate(['/admin/appointment']);
    });
  }


}
