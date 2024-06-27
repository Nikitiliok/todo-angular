import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './types/todo';
import { TodosService } from './services/todos-service.service';
import { take } from 'rxjs';
import { MessageService } from './services/message.service';

const todosFromServer: Todo[] = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS', completed: false },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Vue.js', completed: false },
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit{

  todos: Todo[] = [];
  editing = false;
  errorMessage = '';
  todoForm = new FormGroup({
    newTodoTitle: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1)]
    })
  })

  get title () {
    return this.todoForm.get('newTodoTitle') as FormControl;
  }

  constructor(
    private todosService: TodosService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todosService.todos
    .subscribe(res => {
      this.todos = res
    });

    this.todosService.getTodos().subscribe({
      error: () => {
        this.messageService.message$.next("Unable to load todos");
      }
    });
  }

  handleFormSubmit() {
    if (this.todoForm.invalid)
      return

    this.addTodo(this.title.value);
    this.title.reset();
  }

  addTodo(title: string) {
    this.todosService.createTodo(title).subscribe({
      error: () => {
        this.messageService.message$.next("Unable to create the todo");
      }
    });
  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.todosService.updateTodo(todo).subscribe({
      error: () => {
        this.messageService.message$.next("Unable to change the todo");
      }
    });
  }

  renameTodo(todo: Todo, title: string) {
    todo.title = title;
    this.todosService.updateTodo(todo).subscribe({
      error: () => {
        this.messageService.message$.next("Unable to rename the todo");
      }
    });
  }

  onDeleteTodo(todo: Todo) {
    this.todosService.deleteTodo(todo).subscribe({
      error: () => {
        this.messageService.message$.next("Unable to delete the todo");
      }
    });
  }

  onClear() {
    this.todos = this.todos.filter(todo => todo.completed !== true);
  }
}
