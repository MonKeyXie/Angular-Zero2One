//封装成独立模块
//功能相对独立，则没必要都放在根模块AppModule中，因为子组件没在其他地方用到。
//import { CommonModule } from '@angular/common';     //导入CommomModule而不是BrowserModule,因为不需要初始化全应用的提供商（定义在根模块整个应用可用）
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module'

import { TodoRoutingModule } from './todo-routing.module';

import { TodoComponent } from './todo.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoService } from './todo.service';

@NgModule({
    imports: [
        SharedModule,
        HttpModule,
        TodoRoutingModule
    ],
    declarations: [
        TodoComponent,
        TodoFooterComponent,
        TodoHeaderComponent,
        TodoItemComponent,
        TodoListComponent
    ],
    providers: [
        {provide: 'todoService', useClass: TodoService} //todo.commponent中改成用Inject注入依赖
    ]
})

export class TodoModule {}

