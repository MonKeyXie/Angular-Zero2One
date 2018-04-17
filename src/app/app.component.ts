import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Auth } from './domain/entities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  auth: Auth;
  title = 'Awesome Todo';

  constructor(@Inject('auth')private service, private router: Router){ 
  }

  ngOnInit() {
    //查看Auth里有没有初始数据
    this.service
      .getAuth()
      .subscribe(auth => this.auth = Object.assign({}, auth));

  }

  login() {
    this.router.navigate(['login']);
  }
  logout() {
    this.service.unAuth();
    this.auth = null;
    this.router.navigate(['login']);
  }
}
