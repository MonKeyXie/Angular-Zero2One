import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { UUID } from 'angular2-uuid';

import 'rxjs/add/operator/toPromise';

import { Todo } from '../domain/entities';

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
  //'+'一个把string转成number的简易方法
  const userId:number = +localStorage.getItem('userId');
    let todo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false,
      userId
    };
    return this.http
            .post(this.api_url, JSON.stringify(todo), {headers: this.headers}) //构造POST类型的HTTP请求，参数为（访问的url,返回request的body并把对象转换成Json，请求头）
            .toPromise()                       //把post返回的observable对象转成promise
            .then(res => res.json() as Todo)   // as Todo->将Json数组/对象通过'属性对应'转换为Todo类型
            .catch(this.handleError);
  }
  // 把PUT改为PATCH方法，只上传变化的数据 /todos/:id 更新todoitem的完成状态
  toggleTodo(todo: Todo): Promise<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    console.log(url);
    let updatedTodo = Object.assign({}, todo, {completed: !todo.completed});  //对象todo,并更新completed
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
    const userId:number = +localStorage.getItem('userId');
    const url = `${this.api_url}/?userId=${userId}`;
    switch(filter){
      case 'ACTIVE': return this.http
                        .get(`${url}&completed=false`)
                        .toPromise()
                        .then(res => res.json() as Todo[])
                        .catch(this.handleError);
      case 'COMPLETED': return this.http
                        .get(`${url}&completed=true`)
                        .toPromise()
                        .then(res => res.json() as Todo[])
                        .catch(this.handleError);
      default:
        return this.getTodos();
    }
  }

  // GET /todos
  getTodos(): Promise<Todo[]> {
    const userId = +localStorage.getItem('userId');
    const url = `${this.api_url}/?userId=${userId}`;
    return this.http.get(url)
      .toPromise()
      .then(res => res.json() as Todo[])
      .catch(this.handleError);
  }

    private handleError(errors: any): Promise<any> {
        console.error('An error occurred', errors);
        return Promise.reject(errors.message || errors);  //reject()一般用来抛出错误
    }
}