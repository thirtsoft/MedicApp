import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from './../../services/email.service';
import { CommonServiceService } from './../../common-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css'],
})
export class DoctorProfileComponent implements OnInit {
  id;
  doctorDetails;
  dataFormMail: FormGroup;
  isSent = false;

  constructor(public crupdApi: EmailService,
              public fb: FormBuilder,
              private router: Router,
              public commonService: CommonServiceService,
              private route: ActivatedRoute,
              private toastr: ToastrService
  ) {}

  get f() { return this.dataFormMail.controls; }


  images = [
    {
      path: 'assets/img/features/feature-01.jpg',
    },
    {
      path: 'assets/img/features/feature-02.jpg',
    },
    {
      path: 'assets/img/features/feature-03.jpg',
    },
    {
      path: 'assets/img/features/feature-04.jpg',
    },
  ];
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.id = this.route.snapshot.queryParams['id'];
    this.getDoctorsDetails();

    this.infoForm();
  }

  infoForm() {
    const validatorString = '^[a-zA-Z,.!?\\s-]*$';
    this.dataFormMail = this.fb.group({
    //  id: 0,
      customerName: ['', [Validators.required]],
      customerEmail: ['', [Validators.required]],
      recipient: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],

    });
  }

  sendMailToManager() {
    console.log(this.dataFormMail.value);
    
    this.crupdApi.sendEmailToManager(this.dataFormMail.value)
      .subscribe(response => {
        this.toastr.success('on vous recontacte','Nous avons bien reçu votre email', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.isSent = true;
        this.router.navigate(['/contact/nous']);
      },
        (error: HttpErrorResponse) => {
          this.toastr.error("Désolé votre email n'a pas été envoyé, veuillez vérifier");
          this.isSent = false;
        }
      );
    

  }



  getDoctorsDetails() {
    if (!this.id) {
      this.id = 1;
    }
    this.commonService.getDoctorDetails(this.id).subscribe((res) => {
      this.doctorDetails = res;
    });
  }

  addFav() {
    this.commonService.createFav(this.doctorDetails).subscribe((res) => {
      this.toastr.success('', 'Added to favourite successfully!');
      document.getElementById('fav-btn').style.background = '#fb1612';
      document.getElementById('fav-btn').style.color = '#fff';
    });
  }
}
