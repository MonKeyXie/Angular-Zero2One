import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo.component';


import { AuthGuardService } from '../core/auth.guard'

export const routes: Routes = [
    {
        path: 'todo/:filter',       //路由传参，知识点
        //路由拦截器，判断此用户是否有权限访问Todo，根据结果导航道不同路径
        canActivate: [AuthGuardService],
        component: TodoComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    //父路由会通过TodoModule来自路由寻找路径
    exports: [ RouterModule ],
})

export class TodoRoutingModule { }