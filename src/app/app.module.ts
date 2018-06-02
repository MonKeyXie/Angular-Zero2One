import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';
import { AppRoutingModule } from './app-routing.module';

import { TodoModule } from './todo/todo.module';  //引入子模块
import { CoreModule } from './core/core.module';

@NgModule({
  //顶层组件，在整个module中的Component的模板文件中都能直接使用
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  //导入所需要的模块
  imports: [
    BrowserModule,
    SharedModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    TodoModule
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
