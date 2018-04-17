//寻找当前user信息并返回结果（一个user对象），供auth.service使用
import { Injectable } from '@angular/core';

import { Http,Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import { User } from '../domain/entities';

@Injectable()
export class userService {

    private api_url = 'http://localhost:3000/users';

    constructor(private http: Http) { }

    findUser(username:string): Observable<User> {
        const url = `${this.api_url}/?username=${username}`;
        return this.http.get(url)
                    .map(res => {
                        let users = res.json() as User[];
                        return (users.length>0)?users[0]:null;
                    })
                    //.catch(this.handleError);
    }
    // private handleError(error: any): Promise<any> {
    //     console.error('An error occurred', error);     //for demo purposes only
    //     return Promise.reject(error.message || error);
    // }

}