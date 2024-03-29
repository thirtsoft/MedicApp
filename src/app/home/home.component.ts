import { DemandeService } from './../services/demande.service';
import { DemandeDto } from './../models/demande';
import { Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CommonServiceService } from '../common-service.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
declare const $: any;

import { ServiceService } from './../services/service.service';
import { ServiceDto } from './../models/department';
import { ToastrService } from 'ngx-toastr';

export interface Doctors {
  id: number;
  doctor_name: string;
  speciality: string;
  Education: string;
  location: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // encapsulation : ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild('slickModal1') slickModal1: SlickCarouselComponent;
  @ViewChild('slickModal2') slickModal2: SlickCarouselComponent;
  @ViewChild('slickModal3') slickModal3: SlickCarouselComponent;
  specialityList: any = [];
  doctors: any = [];
  slidepage: any;
  employeeCtrl = new FormControl();
  filteredEmployee: Observable<Doctors[]>;
  blogs: any = [];
  keyword = 'name';
  searchDoctor = [];
  public countries = [
    {
      id: 1,
      name: 'Albania',
      img: 'image',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    },
  ];

  modalRef: BsModalRef;
  errorMessage: string;

  formDataDemandeDTO: DemandeDto = new DemandeDto();

  fileDemande: File;

  submitted = false;

  constructor(public crudApi: DemandeService,
              public router: Router,
              public commonService: CommonServiceService,
              private modalService: BsModalService,
              public toast: ToastrService,
  ) {
    this.filteredEmployee = this.employeeCtrl.valueChanges.pipe(
      startWith(''),
      map((employee) =>
        employee ? this._filterEmployees(employee) : this.doctors.slice()
      )
    );
  }

  ngOnInit() {

    window.scrollTo(0, 0);
    this.getspeciality();
    this.getDoctors();
    this.getblogs();



    // User's voice slider
    $('.testi-slider').each(function () {
      var $show = $(this).data('show');
      var $arr = $(this).data('arrow');
      var $dots = !$arr;
      var $m_show = $show;
      if ($show == 3) $m_show = $show - 1;
      $(this).slick({
        slidesToShow: $show,
        slidesToScroll: 1,
        arrows: $arr,
        autoplay: false,
        autoplaySpeed: 6000,
        adaptiveHeight: true,
        prevArrow:
          '<button type="button" class="prev-nav"><i class="icon ion-ios-arrow-back"></i></button>',
        nextArrow:
          '<button type="button" class="next-nav"><i class="icon ion-ios-arrow-forward"></i></button>',
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: $m_show,
              slidesToScroll: 1,
              infinite: true,
              arrows: $arr,
              dots: $dots,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
        ],
      });
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    // this.name = "";
    // this.id = "";
    // this.key = "";
  }

   // selectionner une image et la garder
  selectFileDemande(event) {
    const file = event.target.files[0];
    this.fileDemande = file;
  }

  save() {
    console.log(this.formDataDemandeDTO);
    console.log(this.fileDemande);
  //  this.crudApi.addDemandeDtoWithFiles(this.formDataDemandeDTO, this.fileDemande)
    this.crudApi.addDemandeDtoWithFilesInPath(this.formDataDemandeDTO, this.fileDemande)
      .subscribe( data => {
        this.modalRef.hide();
        console.log("Result : " + data);
        this.toast.success("Votre demande à été envoyée avec succès");
  });
    this.modalRef.hide();
    this.formDataDemandeDTO = null;
  }


  private _filterEmployees(value: string): Doctors[] {
    const filterValue = value.toLowerCase();
    return this.doctors.filter(
      (state) => state.doctor_name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  slides = [
    {
      img: 'assets/img/specialities/specialities-05.png',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Dentist',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-01.png',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Urology',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-02.png',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Neurology',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-03.png',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Orthopedic',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-04.png',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Cardiologist',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-05.png',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Dentist',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-01.png',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Urology',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-05.png',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Dentist',
      position: 'CEO of VoidCoders',
    },


  ];
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  slideConfig2 = {
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 3,
    speed: 500,
    variableWidth: true,
    arrows: false,
    autoplay: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  slideConfig3 = {
    dots: true,
    arrows: false,
    variableWidth: true
  };

  next() {
    this.slickModal1.slickNext();
  }

  prev() {
    this.slickModal1.slickPrev();
  }

  getspeciality() {
    this.commonService.getSpeciality().subscribe((res) => {
      this.specialityList = res;
    });
  }

  getDoctors() {
    this.commonService.getDoctors().subscribe((res) => {
      this.doctors = res;
      this.slidepage = {
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
      this.countries = [];
      this.doctors.forEach((index, i) => {
        this.countries.push({
          id: index.id,
          name: index.doctor_name,
        });
      });
    });
  }

  getblogs() {
    this.commonService.getBlogs().subscribe((res) => {
      this.blogs = res;
    });
  }

  selectEvent(item) {
    let filter = this.countries.filter((a) => a.name === item.name);
    this.router.navigateByUrl('/patients/doctor-profile?id=' + filter[0].id);
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }

  //// next step 2
  sliderContent = [
    {
      img: 'assets/img/features/feature-01.jpg',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Patient Ward',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/features/feature-02.jpg',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Test Room',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/features/feature-03.jpg',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'ICU',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/features/feature-04.jpg',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Laboratory',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/features/feature-05.jpg',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Operation',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/features/feature-06.jpg',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Medical',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/features/feature-05.jpg',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Patient Ward',
      position: 'CEO of VoidCoders',
    },
  ];
  slideConfigure = {
    dots: false,
    autoplay: false,
    infinite: true,
    variableWidth: true,
  };
  nextslide() {
    this.slickModal2.slickNext();
  }

  prevslide() {
    this.slickModal2.slickPrev();
  }

  nextpage() {
    this.slickModal3.slickNext();
  }

  prevpage() {
    this.slickModal3.slickPrev();
  }
}
