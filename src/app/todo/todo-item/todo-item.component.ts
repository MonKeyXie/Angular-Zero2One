import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() isChecked: boolean = false;
  @Input() todoDesc: string = '';
  @Output() onToggleTriggered = new EventEmitter<boolean>();
  @Output() onRemoveTriggered = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }
  //onToggleTriggered在用户点击checkbox或label时发射这个事件给（通知）父组件
  toggle() {
    this.onToggleTriggered.emit(true);
  }

  remove() {
    this.onRemoveTriggered.emit(true);
  }

}
