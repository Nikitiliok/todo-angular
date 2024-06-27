import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../types/todo';

@Pipe({
  name: 'incompletedTodos',
  standalone: true
})
export class IncompletedTodosPipe implements PipeTransform {

  transform(todos: Todo[]): Todo[] {
    return todos.filter(todo => todo.completed === false);
  }

}
