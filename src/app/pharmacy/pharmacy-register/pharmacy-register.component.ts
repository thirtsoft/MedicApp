import { Component, OnInit } from '@angular/core';

declare const $: any;
@Component({
  selector: 'app-pharmacy-register',
  templateUrl: './pharmacy-register.component.html',
  styleUrls: ['./pharmacy-register.component.css']
})
export class PharmacyRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if($('.floating').length > 0 ){
      $('.floating').on('focus blur', function (e) {
      $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
      }).trigger('blur');
    }
  }

}
