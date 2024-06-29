import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit, OnDestroy{
  @Input() title: string = '';

  unsubscriber = new Subject();
  
  public message: string = '';
  public hidden: boolean = true;

  constructor(
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.messageService.message$
    .pipe(takeUntil(this.unsubscriber))
    .subscribe(res => {
      this.message = res;
      this.hidden = false;
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next(null);
    this.unsubscriber.complete();
  }
}
