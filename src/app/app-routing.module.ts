import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './core/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'  //完全匹配
      },
      {
        path: 'login',
        component: LoginComponent
      },

      //无组件路由，重定向到TodoModule模块
      //'/ALL'重定向到默认参数是ALL的路径
      {
        path: 'todo',
        redirectTo: 'todo/ALL',
        canLoad: [AuthGuardService] //是否加载某个URL的对应模块
      }
];


@NgModule({
    imports:[ RouterModule.forRoot(routes, { useHash: true}) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }