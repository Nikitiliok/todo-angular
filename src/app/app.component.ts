import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { Todo } from './types/todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule, TodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  editing = false;
  todoForm = new FormGroup({
    newTodoTitle: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1)]
    })
  })

  todos: Todo[] = [
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

  constructor() {}

  handleFormSubmit() {
    if (this.todoForm.invalid)
      return

    this.addTodo(this.title.value);
    this.title.reset();
  }

  addTodo(title: string) {
    const newElement: Todo = {
      id: this.todos.length + 1,
      title,
      completed: false,
    };

    this.todos = [...this.todos, newElement];
  }

  toggleTodo(id: number) {
    this.todos = this.todos.map(todo => {
      if (todo.id !== id)
        return todo

      return { ...todo, completed: !todo.completed };
    })
  }

  renameTodo(id: number, title: string) {
    this.todos = this.todos.map(todo => {
      if (todo.id !== id)
        return todo

      return { ...todo, title };
    })
  }

  onDeleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  onClear() {
    this.todos = this.todos.filter(todo => todo.completed !== true);
  }
}
