import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  currentPage = 0;
  users: any[] = [];

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.currentPage++;
    this.api.getUsers(this.currentPage).subscribe(res => {
      this.users = this.users.concat(res.data);
    })
  }
}
