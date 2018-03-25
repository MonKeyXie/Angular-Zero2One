import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { UUID } from 'angular2-uuid';

import 'rxjs/add/operator/toPromise';

import { Todo } from './todo.model';

@Injectable()
export class TodoService {

    //定义假WebAPI地址前半部'api'分无所谓，后半部分'todos'和data.ts返回值相关
    //确保是无法访问的地址就好
    //private api_url = 'api/todos';
    private api_url = 'http://localhost:3000/todos';
    private headers = new Headers({ 'Content-Type':'application/json' });

    constructor(private http : Http){ }

// POST /todos
addTodo(desc:string): Promise<Todo> { //返回值是一个Promise<todo>类型
    let todo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false
    };
    return this.http
            .post(this.api_url, JSON.stringify(todo), {headers: this.headers}) //构造POST类型的HTTP请求，参数为（访问的url,返回request的body并把对象转换成Json，请求头）
            .toPromise()                       //把post返回的observable对象转成promise
            .then(res => res.json() as Todo)   // as Todo相当于返回的数据赋值给Todo[],再当参数传递给组件
            .catch(this.handleError);
  }
  // 把PUT改为PATCH方法，只上传变化的数据 /todos/:id 更新todoitem的完成状态
  toggleTodo(todo: Todo): Promise<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    console.log(url);
    let updatedTodo = Object.assign({}, todo, {completed: !todo.completed});
    console.log("updatedTodo: "+updatedTodo);
    return this.http
            .patch(url, JSON.stringify({completed:!todo.completed}), {headers: this.headers})
            .toPromise()
            .then(() => updatedTodo)
            .catch(this.handleError);
  }
  // DELETE /todos/:id
  deleteTodoById(id: string): Promise<void> {
    const url = `${this.api_url}/${id}`;
    return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
  }

  //Get /todos?completed=true/false
  filterTodos(filter: string): Promise<Todo[]> {
    switch(filter){
      case 'ACTIVE': return this.http
                        .get(`${this.api_url}?completed=false`)
                        .toPromise()
                        .then(res => res.json() as Todo[])
                        .catch(this.handleError);
      case 'COMPLETED': return this.http
                        .get(`${this.api_url}?completed=true`)
                        .toPromise()
                        .then(res => res.json() as Todo[])
                        .catch(this.handleError);
      default:
        return this.getTodos();
    }
  }

  // GET /todos
  getTodos(): Promise<Todo[]> {
    return this.http.get(this.api_url)
      .toPromise()
      .then(res => res.json() as Todo[])
      .catch(this.handleError);
  }

    private handleError(errors: any): Promise<any> {
        console.error('An error occurred', errors);
        return Promise.reject(errors.message || errors);  //reject()一般用来抛出错误
    }
}