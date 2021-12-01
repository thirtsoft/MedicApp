import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-patient-chat',
  templateUrl: './patient-chat.component.html',
  styleUrls: ['./patient-chat.component.css']
})
export class PatientChatComponent implements OnInit {

  message;
  text;
  constructor(
    public router: Router,
    public commonSerivce: CommonServiceService
  ) {}

  ngOnInit(): void {
    this.commonSerivce.nextmessage('chat');
  }

  ngOnDestroy() {
    this.commonSerivce.nextmessage('');
  }

  send() {
    this.text = this.message;
    this.message = '';
  }

}
