//把逻辑放在TodoService中，组件不关心逻辑只负责调用
import { Component, OnInit, Inject } from '@angular/core';
import { Todo } from '../domain/entities';
import { Router, ActivatedRoute, Params } from '@angular/router'; //接收路由穿过来的参数
//import { TodoService } from './todo.service'

import { Observable } from 'rxjs/Observable';

@Component({
  selector: '',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  //providers: [TodoService]
})
//implements用来实现接口，及接口里的所有方法
export class TodoComponent implements OnInit {
  todos: Observable<Todo[]>;
  //desc = '';

  constructor(
    @Inject('todoService') private service,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {  //运行组件马上触发的事件
    this.route.params
      .pluck('filter')
      .subscribe(filter => {
        this.service.filterTodos(filter);
        this.todos = this.service.todos;
      })
    console.log(this.todos)
  }

  addTodo(desc: string){
    this.service.addTodo(desc);
  }
  //更新completed
  toggleTodo(todo: Todo) {
    this.service.toggleTodo(todo);
  }
  removeTodo(todo: Todo){
    this.service.deleteTodoById(todo)
  }

  toggleAll() {
    this.service.toggleAll();
  }

  clearCompleted() {
    this.service.clearCompleted();
  }
  // getTodos(): void {
  //   this.service
  //     .getTodos()
  //     .then(todos => this.todos = [...todos]);
  // }

  // filterTodos(filter: string): void {
  //   this.service
  //     .filterTodos(filter)
  //     .then(todos => this.todos = [...todos])
  // }

  // onTextChanges(value) {
  //   this.desc = value;
  // }

}