import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';
import { TodoComponent } from './todo/todo.component'
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTodoDbService } from './todo/todo-data';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryTodoDbService),
    routing
  ],
  providers: [
    //每个service以一个object的形式在providers中配置
    //{provide: 'name',  useClass: class}
    //然后不用import即可在组件构造函数中用@Inject注入
    {provide: 'auth',  useClass: AuthService}
    //配置服务的方法写在根模块中则代表全局，既所有组件都能用
    //providers:{AuthService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
