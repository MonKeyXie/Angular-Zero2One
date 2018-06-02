import { Injectable, Inject } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { UUID } from 'angular2-uuid';

import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Todo } from '../domain/entities';

@Injectable()
export class TodoService {

    //定义假WebAPI地址前半部'api'分无所谓，后半部分'todos'和data.ts返回值相关
    //确保是无法访问的地址就好
    //private api_url = 'api/todos';
    private api_url = 'http://localhost:3000/todos';
    private headers = new Headers({ 'Content-Type':'application/json' });
    private userId: string;
    private dataStore: {  // todo的内存数据库(本地拷贝)
      todos: Todo[]
    };
    private _todos: BehaviorSubject<Todo[]>;

    constructor(private http : Http, @Inject('auth') private authService){
      this.authService.getAuth()
        .filter(auth => auth.user != null)
        .subscribe(auth => this.userId = auth.user.id)
      this.dataStore = { todos:[] };
      this._todos = new BehaviorSubject<Todo[]>([]);
     }

// POST /todos
addTodo(desc:string) { //返回值是一个Promise<todo>类型
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
            .map(res => res.json() as Todo)   // as Todo->将Json数组/对象通过'属性对应'转换为Todo类型
            .subscribe(todo => {
              this.dataStore.todos = [...this.dataStore.todos,todo];
              this._todos.next(Object.assign({}, this.dataStore).todos);  //next推送新元素到Subject数据流
            })
  }
  // 把PUT改为PATCH方法，只上传变化的数据 /todos/:id 更新todoitem的完成状态
  toggleTodo(todo: Todo){
    const url = `${this.api_url}/${todo.id}`;
    const i = this.dataStore.todos.indexOf(todo);
    let updatedTodo = Object.assign({}, todo, {completed: !todo.completed});  //对象todo,并更新completed
    console.log("updatedTodo: "+updatedTodo);
    return this.http
            .patch(url, JSON.stringify({completed:!todo.completed}), {headers: this.headers})
            .subscribe(_ => {
              this.dataStore.todos = [
                ...this.dataStore.todos.slice(0,i),
                updatedTodo,
                ...this.dataStore.todos.slice(i+1)
              ];
              this._todos.next(Object.assign({},this.dataStore).todos); //.next推送一个新元素到数据流
            });
  }
  // DELETE /todos/:id
  deleteTodo(todo: Todo) {
    const url = `${this.api_url}/${todo.id}`;
    const i = this.dataStore.todos.indexOf(todo);
    this.http
    .delete(url, {headers: this.headers})
    .subscribe(_ => {
      this.dataStore.todos = [
        ...this.dataStore.todos.slice(0,i),
        ...this.dataStore.todos.slice(i+1)
      ];
      this._todos.next(Object.assign({},this.dataStore).todos);
    });
  }

  //Get /todos?completed=true/false
  filterTodos(filter: string) {
    const userId:number = +localStorage.getItem('userId');
    const url = `${this.api_url}/?userId=${userId}`;
    switch(filter){
      case 'ACTIVE':    this.http
                        .get(`${url}&completed=false`)
                        .map(res => res.json() as Todo[])
                        .subscribe(todos => this.updataStoreAndSubject(todos));
                        break;
      case 'COMPLETED':  this.http
                        .get(`${url}&completed=true`)
                        .map(res => res.json() as Todo[])
                        .subscribe(todos => this.updataStoreAndSubject(todos));
                        break;
                        //.catch(this.handleError);
      default:
        return this.getTodos();
    }
  }

  // GET /todos
  getTodos() {
    const userId = +localStorage.getItem('userId');
    const url = `${this.api_url}/?userId=${userId}`;
    return this.http.get(url)
      .map(res => res.json() as Todo[])
      .do(t => console.log(t))
      .subscribe(todos => this.updataStoreAndSubject(todos));
  }

  //让其他订阅者可以订阅todos的变化
  get todos(){
    return this._todos.asObservable();
  }

  toggleAll(){
    this.dataStore.todos.forEach(todo => this.toggleTodo(todo));
  }
  clearCompleted(){
    this.dataStore.todos
      .filter(todo => todo.completed)
      .forEach(todo => this.deleteTodo(todo));
  }
  private updataStoreAndSubject(todos) {
    this.dataStore.todos = [...todos];
    this._todos.next(Object.assign({}, this.dataStore).todos);
  }
    // private handleError(errors: any): Promise<any> {
    //     console.error('An error occurred', errors);
    //     return Promise.reject(errors.message || errors);  //reject()一般用来抛出错误
    // }
}