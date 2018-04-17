//使用路由CanAvtivate守卫，每当用户进入/todo:filter时先执行此服务作用为：
//1.根据用户登录状态判断是否放行。2.保存要访问的Url并导航到登录页
import { Injectable, Inject } from '@angular/core';
import { 
    CanActivate,
    CanLoad,
    Router,
    Route,
    ActivatedRouteSnapshot,
    RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

 @Injectable()
 export class AuthGuardService implements CanActivate {

    constructor(private router:Router,@Inject('auth')private authService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //取得用户访问的URL
        let url: string = state.url;

        return this.authService.getAuth()
            .map(auth => !auth.hasError);
    }
    canLoad(route: Route): Observable<boolean> {
        let url=`/${route.path}`;

        return this.authService.getAuth()
            .map(auth => !auth.hasError);
    }

 }