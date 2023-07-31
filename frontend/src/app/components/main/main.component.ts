import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/Service/login-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  public userName: string = ''; 

  constructor(private router: Router,private loginService: LoginServiceService,) {}

  ngOnInit(): void {

    this.userName = localStorage.getItem('userName') || '';
  }

  
}
