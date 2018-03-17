import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <form #formRef='ngForm' (ngSubmit)='onSubmit(formRef.value)'>
      <!-- <fieldset ngModelGroup="login"> 意味着我们对于 fieldset 之内的数据都分组到了 login 对象中。 -->
      <fieldset ngModelGroup='login'> 
        <legend>登录信息</legend> 
        <input required minlength='4'
          [(ngModel)]='username' 
          name='username'
          type='text'
          #usernameRef='ngModel'
          [placeholder]='pleName'
          (focus)='focus()'
          />
          <!--{{usernameRef.errors | json}}-->
          <div *ngIf="usernameRef.errors?.required">this is required</div>
          <div *ngIf="usernameRef.errors?.minlength">should be at least 3 charactors</div>

          <input required 
          [(ngModel)]='password' 
          name='password'
          type="password" 
          #passwordRef='ngModel'
          [placeholder]='plePass'
          />
          <!--{{passwordRef.valid}}-->
          <div *ngIf="passwordRef.errors?.required">this is required</div>
          <button (click)="onClick(usernameRef.value)" type='submit'>Login</button>
        </fieldset>
      </form>
    </div>
  `,
  styles: [`
  input.ng-invalid{
    border: 3px solid red;
  }
  input.ng-valid{
    border: 3px solid green;
  }
`],
  providers:[]
})
export class LoginComponent implements OnInit {
  private username= "";
  private password: any;
  private pleName = '请输入用户名';
  private plePass = '请输入密码'

  //在构造函数中将AuthService示例注入到成员变量service中
  //而且我们不需要显式声明成员变量service了
  constructor(@Inject('auth') private service) { }

  ngOnInit() {
  }

  onSubmit(formValue) {
    console.log(formValue)
    console.log('the result is:'+this.service.loginWithCredentials(formValue.login.username,formValue.login.password))
  }

  focus() {
    this.pleName= "";
    this.plePass= ""
  }

  onClick(username){
    console.log(username)
  }
}
