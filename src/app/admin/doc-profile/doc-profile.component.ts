import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from './../auth/token-storage.service';
import { AuthService } from './../auth/auth.service';

import { UtilisateurService } from './../../services/utilisateur.service';

import { UtilisateurDto } from './../../models/utilisateur';
import { ProfilInfo, UpdatePasswordInfo } from './../auth/profil-info';


@Component({
  selector: 'app-doc-profile',
  templateUrl: './doc-profile.component.html',
  styleUrls: ['./doc-profile.component.css'],
})
export class DocProfileComponent implements OnInit {

  changePass = false;
  personalDetails = true;

  name = '';
  username = '';
  password = '';

  profileInfo: ProfilInfo = {} as ProfilInfo;
  listDataProfil: UtilisateurDto = new UtilisateurDto();
  formDataProfile: UpdatePasswordInfo  = new UpdatePasswordInfo();
  email;

  editPhoto: boolean;
  currentProfile: any;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  title: string;
  currentRequest: string;
  currentTime: number = 0;
  id;

  userId;
  img: boolean;
  editForm: FormGroup;
  modalRef: BsModalRef;
  errorMessage: string;

  constructor(private router: Router,
              private authService: AuthService,
              private tokenService: TokenStorageService,
              public toastr: ToastrService,
              public crudApi: UtilisateurService,
              private modalService: BsModalService,
              private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {

    this.getEmploye();

    const user = this.tokenService.getUser();
    this.id = user.id

    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;

    if (this.crudApi.getUserAvatar(this.userId) === null)
      this.img = false;
    else this.img =true;

    this.formDataProfile = {
      username: '',
      oldPassword: '',
      newPassword: '',
    };

    this.editForm = this.fb.group({
      id: [''],
      name: [''],
      username: [''],
      address: [''],
      mobile: [''],
      email: ['']
    } );

  }

  getEmploye() {
    const user = this.tokenService.getUser();
    console.log(user.id);
    this.crudApi.getUtilisateurDtoById(user.id).subscribe(
    response => {
    console.log(response);
    this.listDataProfil = response;
    }
    );
  }

  editModal(template: TemplateRef<any>, userDTO: UtilisateurDto) {
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
      }
    );
  }

  getTS() {
    return this.currentTime;
  }

  onEditPhoto(p) {
    this.currentProfile = p;
    this.editPhoto = true;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  processForm() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    console.log(this.currentFileUpload);
    console.log(this.id);
    this.crudApi.uploadPhotoUtilisateur(this.currentFileUpload, this.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.currentTime = Date.now();
        }
      }, err => {
        this.toastr.warning("Problème de chargment de la photo");
      }
    );
    this.selectedFiles = undefined;
  }

  onSubmit() {
    console.log(this.formDataProfile);
    this.authService.updatePassword(this.formDataProfile).
    subscribe( data => {
      this.toastr.warning('veuillez vous reconnectez','Votre Mot de pqsse a ete modifie avec success', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.logout();
      console.log(data);
    });

  }

  update() {
    this.crudApi.updateUtilisateurDto(this.listDataProfil.id, this.listDataProfil)
      .subscribe((data) => {
        this.toastr.warning('avec succès','Votre profil a été modifié !', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("admin/dashborad").then(() => {
          window.location.reload();
        });
      })
    this.modalRef.hide();
  }

  logout(): void {
    this.tokenService.signOut();
    this.router.navigateByUrl('admin');
  }

  goToDashboard() {
    this.router.navigateByUrl('admin/dashborad');
  }

  about() {
    this.changePass = false;
    this.personalDetails = true;
    document.getElementById('about').classList.add('active');
    document.getElementById('pass').classList.remove('active');
  }

  pass() {
    this.changePass = true;
    this.personalDetails = false;
    document.getElementById('about').classList.remove('active');
    document.getElementById('pass').classList.add('active');
  }

  submit() {
    this.router.navigateByUrl('/admin/doc-profile');
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
