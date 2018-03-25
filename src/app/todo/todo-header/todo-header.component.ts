import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {
  inputValue: string="";
  @Input() placeholder: string = 'What needs to be done';
  @Input() delay: number = 300;
  
  //检测键盘输入并输出他到父组件
  @Output() textChanges = new EventEmitter<string>();   //EventEmitter为‘事件发射器’。
  //检测回车事件并输出他到父组件
  @Output() onEnterUp =new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {
    const event$ = Observable.fromEvent(elementRef.nativeElement, 'keyup')
      .map(() => this.inputValue )
      .debounceTime(this.delay)
      .distinctUntilChanged();
    event$.subscribe(input => this.textChanges.emit(input));
   }

  ngOnInit() {
  }

  enterUp(){
    this.onEnterUp.emit(true);
    this.inputValue = '';
  }
}
