import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Todo } from '../../types/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Output() deleteTodo = new EventEmitter();
  @Output() rename = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();
  @ViewChild('editingInput')
  set editInput(element: ElementRef) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  editing: boolean = false;
  title: string = '';

  public edit() {
    this.editing = true;
    this.title = this.todo.title;
  }

  public onSaveChanges() {
    if(!this.editing)
      return

    this.editing = false;
    this.rename.emit(this.title);
  }

  public onDeleteTodo() {
    this.deleteTodo.emit();
  }
}
