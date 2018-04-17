//登录判定的逻辑。返回的auth对象包括user信息和错误信息
import { Injectable, Inject } from '@angular/core'
import {Http, Headers, Response} from '@angular/http';

import { ReplaySubject, Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import { Auth } from '../domain/entities';

@Injectable()
export class AuthService {
    auth: Auth = { user:null,hasError:true,redirectUrl:'', errMsg:'not logged in'};
    //【1】ReplaySubject向新的订阅者推送旧数值，回放数量为1
    subject: ReplaySubject<Auth> = new ReplaySubject<Auth>(1);

    constructor(private http:Http, @Inject("user") private userService ) {}
    //【3】提供一个getAuth方法给需要Auth数据的地方
    getAuth(): Observable<Auth> {
        //console.log(this.subject.asObservable().subscribe);
        return this.subject.asObservable(); //把subject转换成Observable
    }
    //用于logout,把this,auth弄空
    unAuth():void {
        this.auth = Object.assign(
            {},
            this.auth,
            {user:null, hasError:true, redirectUrl:'',errMsg:'not logged in'});
        this.subject.next(this.auth);
    }

    //TS可指明此方法的参数类型&返回类型
    loginWithCredentials(username:string,password:string): Observable<Auth> {
        return this.userService
            .findUser(username)
            .map(user => {
                let auth = new Auth();
                if(null === user) {
                    auth.user = null;
                    auth.hasError = true;
                    auth.errMsg = 'user not found';
                }else if (password === user.password) {
                    auth.user = user;
                    auth.hasError = false;
                    auth.hasError = null;
                    //localStorage.setItem('userId',user.id);  //根据id选择显示的内容
                }else {
                    auth.user = null;
                    auth.hasError = true;
                    auth.errMsg = 'password not match';
                }
                this.auth = Object.assign({},auth);
                //【2】对在subject上注册的Observable多路推送数据(this.auth)
                this.subject.next(this.auth);
                return this.auth;
            });
            //.catch(this.handleError);
    }
    // private handleError(error: any): Promise<any> {
    //     console.error('An error occurred', error); //for demo purposes only
    //     return Promise.reject(error.message || error);
    // }
}