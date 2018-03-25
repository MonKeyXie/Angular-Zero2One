import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  //声明itemCount是一个可输入(可以让父组件输入)的
  //子组件中声明，父组件就可传数据过来了
  @Input() itemCount: number;
  @Output() onClear = new EventEmitter<boolean>();

  onClick() {
    this.onClear.emit(true);
  }

  constructor() { }

  ngOnInit() {
  }

}
