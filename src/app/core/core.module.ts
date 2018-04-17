import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
//声明创建的服务，把相关认证代码阻止在此模块下
import { AuthService } from './auth.service';
import { userService } from './user.service';
import { AuthGuardService } from './auth.guard'

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        { provide:'auth', useClass: AuthService },
        { provide:'user', useClass: userService },
        AuthGuardService
    ]
})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if(parentModule) {
            throw new Error(
                'CoreModule is already loaded, Import it in the AppModule only'
            );
        }
    }
}