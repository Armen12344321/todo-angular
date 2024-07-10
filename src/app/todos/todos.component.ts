import {Component} from '@angular/core';
import {Todo} from "../models/todo";
import {FormsModule} from "@angular/forms";
import {NgFor, NgIf, NgClass} from "@angular/common";
import {TodoService} from "../services/todo.service";

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass,],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  todos: Todo[] = [];
  inputvalue = "";
  isEditing = false;
  is = false

  constructor(private todoService: TodoService) {
    this.fetchTodos();
  }


  onAddClick() {
    if (this.inputvalue) {
      let todo: Todo = {description: this.inputvalue, completed: false, isEditing: false};
      this.todoService.save(todo);
      this.fetchTodos();
      this.inputvalue = ""
      this.is = false

    }
  }
  ondelateall() {
    if (confirm("are you sure")) {
      this.fetchTodos();
      this.todos.splice(0,this.todos.length)
      this.todoService.setAll(this.todos)
      this.is = false
    }

  }
  onDelateclick(index: number) {
    if (confirm("are you sure")){
      this.todoService.delete(index)
      this.fetchTodos();
      this.is = false
    }

  }

  onEdit(index: number) {
    if(this.is == false) {
      this.todos[index].isEditing = true
      this.is = true
    }
  }

  onSave(index: number, value: string) {
    const edited = this.todos[index];
    if(value != "") {
      edited.isEditing = false;
      edited.description = value;
      this.todos[index].completed = false
      this.todoService.update(edited, index)
      this.fetchTodos()
      this.is = false
    }
    else{
      alert("You dont input value")
    }
  }

  onCancel(index: number, value: string) {
    this.todos[index].isEditing = false;
    this.todos[index] = {...this.todos[index]}
    this.is = false
  }

  onCheckboxchenge(todo: Todo, index: number) {
    this.todoService.update(todo, index);
    this.fetchTodos();
  }

  private fetchTodos(): void {
    this.todos = this.todoService.getAll()
  }
}
