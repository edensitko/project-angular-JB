import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  role: string;

  constructor() {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.role = JSON.parse(userData).role;
    }
  }

}