import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from './../../services/utilisateur.service';
import { TokenStorageService } from './../auth/token-storage.service';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { CommonServiceService } from '../../common-service.service';
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  page = 'Dashboard';
  showDropdown = true;
  public bellCollapsed = true;
  public userCollapsed = true;

  info: any;
  roles: string[];

  currentTime: number = 0;

  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  showVendeurBoard = false;

  username: string;
  email: String;
  userId;
  photo;
  img: boolean;


  constructor(
    @Inject(DOCUMENT) private document,
    public router: Router,
    private commonService: CommonServiceService,

    private dashboardService: DashboardService,
    private tokenService: TokenStorageService,
    public userService: UtilisateurService,
    public toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showVendeurBoard = this.roles.includes("ROLE_VENDEUR");
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
      this.userId = user.id;
      this.photo = user.photo;

      if (this.userService.getUserAvatar(this.userId) === null)
        this.img = false;
      else this.img = true;

    }
  }

  logout() {
    this.tokenService.signOut();
    this.router.navigateByUrl("admin");
  //  window.location.reload();
  }

  getProfile() {
  //  this.router.navigate(['/admin/profile/' + this.userId]);
    this.router.navigate(['/admin/doc-profile/' + this.userId]);
  }

  getTS() {
    return this.currentTime;
  }


  ngAfterViewInit() {
    this.loadDynmicallyScript('assets/admin/js/script.js');
  }
  loadDynmicallyScript(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }

  doSomethingWhenScriptIsLoaded() {}
  change(name) {
    this.page = name;
    this.commonService.nextmessage('admin');
  }

  main() {
    this.commonService.nextmessage('main');
  }
  clickLogout() {
    window.location.href = '/home';
  }
  bell() {
    this.bellCollapsed = !this.bellCollapsed;
    if (!this.userCollapsed) {
      this.userCollapsed = true;
    }
  }
  user() {
    this.userCollapsed = !this.userCollapsed;
    if (!this.bellCollapsed) {
      this.bellCollapsed = true;
    }
  }
}
