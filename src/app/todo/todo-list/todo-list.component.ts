import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../domain/entities';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  _todos: Todo[] = [];
  //用set，get是因为若是把todos当成员变量传入父组件改变的话子组件不知道
  //于是把todos设置成属性方法，set可以监测父组件的数据变化
  @Input()
  set todos(todos:Todo[]){
    this._todos = [...todos];
  }
  get todos() {
    return this._todos;
  }

  @Output() onRemoveTodo = new EventEmitter<Todo>();
  @Output() onToggleTodo = new EventEmitter<Todo>();
  @Output() onToggleAll = new EventEmitter<boolean>();

  constructor(){}

  ngOnInit() {
  }

  onRemoveTriggered(todo: Todo) {
    this.onRemoveTodo.emit(todo);
  }
  onToggleTriggered(todo:Todo) {
    this.onToggleTodo.emit(todo);
  }
  onToggleAllTriggered() {
    this.onToggleAll.emit(true);
  }
}
