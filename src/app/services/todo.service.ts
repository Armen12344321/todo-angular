import { Injectable } from '@angular/core';
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  storeTodos(todos: Todo[]) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  getAll(): Todo[]{
    return JSON.parse(localStorage.getItem('todos')?? '[]') as Todo[];
  }
  setAll(todos: Todo[]) {
    localStorage.setItem("todos", JSON.stringify(todos));

  }


  delete(index:number): void {
    const todos=this.getAll();
    todos.splice(index, 1);
    this.setAll(todos);
  }
  save(todo: Todo){

    const todos = this.getAll();
    todos.unshift(todo);
    this.setAll(todos);
  }
  update(todo:Todo,index:number){
    const todos =this.getAll()
    todos[index] =todo;
    this.setAll(todos)
  }
}
