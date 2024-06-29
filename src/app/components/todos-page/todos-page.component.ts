
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../types/todo';
import { MessageService } from '../../services/message.service';
import { TodosService } from '../../services/todos-service.service';
import { Subject, map, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.scss'
})
export class TodosPageComponent implements OnInit{

  editing = false;
  errorMessage = '';
  unsubscriber = new Subject();
  activeTodos$ = this.todosService.todos.pipe(
    map(todos => todos.filter(todo => !todo.completed))
  )
  activeCount$ = this.activeTodos$.pipe(
    map(todos => todos.length)
  )
  completedTodos$ = this.todosService.todos.pipe(
    map(todos => todos.filter(todo => todo.completed))
  )
  visibleTodos$ = this.route.params.pipe(
    switchMap(params => {
      switch (params['status']) {
        case 'active':
          return this.activeTodos$;
        case 'completed':
          return this.completedTodos$;
        default:
          return this.todosService.todos$;
      }
    })
  )
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
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
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

  clearCompleted() {

  }
}

