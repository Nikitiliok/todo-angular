import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  editing = false;
  todoForm = new FormGroup({
    newTodoTitle: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(1)]
    })
  })

  todos = [
    { id: 1, title: 'HTML + CSS', completed: true },
    { id: 2, title: 'JS', completed: false },
    { id: 3, title: 'React', completed: false },
    { id: 4, title: 'Vue.js', completed: false },
  ];

  get title () {
    return this.todoForm.get('newTodoTitle') as FormControl;
  }

  get activeTodos() {
    return this.todos.filter(todo => !todo.completed);
  }

  onAddClick() {
    if (this.todoForm.invalid) {
      return
    }
    
    console.log(this.todoForm.invalid);
    const newElement = {
      id: this.todos.length + 1,
      title: this.title.value,
      completed: false,
    }
    this.todos.push(newElement);

    this.title.reset();
  }

  onClear() {
    this.todos = this.todos.filter(todo => todo.completed !== true);
  }
}
