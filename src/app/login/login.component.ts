import { 
  Component,
  Inject,
  trigger,
  state,
  style,
  transition,
  animate, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Auth } from '../domain/entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ['./login.compoment.css'],
  animations: [
    trigger('loginState', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active',   style({
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  username= "";
  password= "";
  photo = '/assets/isImg.jpg';
  auth: Auth;
  loginBtnState: string = 'inactive'

  //在构造函数中将AuthService示例注入到成员变量service中
  //而且我们不需要显式声明成员变量service了
  constructor(@Inject('auth') private service,private router: Router,) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.service
      .loginWithCredentials(this.username,this.password)
      .subscribe(auth => {
        this.auth = Object.assign({},auth);
        if(!auth.hasError){
          this.router.navigate(['todo']);
        }
      });
  }

  toggleLoginState(state: boolean){
    this.loginBtnState = state ? 'active' : 'inactive';
  }

  // focus() {
  //   this.pleName= "";
  //   this.plePass= ""
  // }

  // onClick(username){
  //   console.log(username)
  // }
}
