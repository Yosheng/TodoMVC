import { Component, OnInit } from '@angular/core';



import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  inputHint = 'What needs to be done???';
  todos: any[] = [];
  todo = '';
  filterType = 'All';
  toggleAll = false;


  constructor (private dataSvc: DataService) {

  }

  ngOnInit () {
    this.dataSvc.getTodo().subscribe(data => {
      this.todos = data;
    });
  }

  addTodo () {
    let newTodos = [...this.todos];
    newTodos.push({
      text: this.todo,
      done: false
    });
    this.dataSvc.saveTodos(newTodos).subscribe(data => {
      this.todo = '';
    });
  }

  clearCompleted () {
    let newTodos = this.todos.filter(item => !item.done);
    this.dataSvc.saveTodos(newTodos).subscribe(data => {});
  }

  filterTypeChanged (filterType: string) {
    this.filterType = filterType;
  }

  toggleAllChange (value: boolean) {
    let newTodos = [...this.todos];
    newTodos.forEach(item => {
      item.done = value;
    });
    this.dataSvc.saveTodos(newTodos).subscribe(data => {});
  }

  updateToggleAllState () {
    this.toggleAll = this.todos.filter(item => !item.done).length === 0;
    this.dataSvc.saveTodos(this.todos).subscribe(data => {});
  }

  removeTodo (item)  {
    let newTodos = [...this.todos];
    newTodos.splice(this.todos.indexOf(item), 1);
    this.dataSvc.saveTodos(newTodos).subscribe(data => {});
  }


}
