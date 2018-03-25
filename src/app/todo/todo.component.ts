import { Component, OnInit, Inject } from '@angular/core';
import { Todo } from './todo.model';
import { Router, ActivatedRoute, Params } from '@angular/router'; //接收路由参数
//import { TodoService } from './todo.service'

@Component({
  selector: '',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  //providers: [TodoService]
})
//implements用来实现接口，及接口里的所有方法
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  desc = '';

  constructor(
    @Inject('todoService') private service,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {  //运行组件马上触发的事件
    this.route.params.forEach((params: Params) => {   //this.route.params返回Observable,包含所传递的参数
      let filter = params['filter'];
      this.filterTodos(filter);
    });
  }

  filterTodos(filter: string): void {
    this.service
      .filterTodos(filter)
      .then(todos => this.todos = [...todos])
  }

  addTodo(){
    this.service
      .addTodo(this.desc)
      .then(todo => {
        this.todos = [...this.todos, todo]; //‘...’构造出来是一个新的对象，而不是对象的引用
        this.desc = '';
      });
  }
  //更新completed
  toggleTodo(todo: Todo): Promise<void> {
    const i = this.todos.indexOf(todo);
    return this.service
      .toggleTodo(todo)
      .then(t => {          //t：服务return的更新后的这条数据
        this.todos = [
          ...this.todos.slice(0,i),   //截取下标0~i，不包括i
          t,
          ...this.todos.slice(i+1)
          ];
        return null;
      });
  }
  removeTodo(todo: Todo): Promise<void>{
    const i = this.todos.indexOf(todo);
    return this.service
      .deleteTodoById(todo.id)
      .then(()=> {
        this.todos = [
          ...this.todos.slice(0,i),
          ...this.todos.slice(i+1)
        ];
      return null;
      });
  }
  getTodos(): void {
    this.service
      .getTodos()
      .then(todos => this.todos = [...todos]);
  }

  onTextChanges(value) {
    this.desc = value;
  }

  toggleAll() {
    Promise.all(this.todos.map(todo => this.toggleTodo(todo)));
  }

  clearCompleted() {
    const completed_todos = this.todos.filter(todo => todo.completed === true).reverse();
    const active_todos = this.todos.filter(todo => todo.completed === false);
    Promise.all(completed_todos.map(todo => this.service.deleteTodoById(todo.id)))
      .then(() => this.todos = [...active_todos]);
  }
}