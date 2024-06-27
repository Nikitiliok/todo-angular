import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit{
  @Input() title: string = '';
  
  public message: string = '';
  public hidden: boolean = true;

  constructor(
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.messageService.message$.subscribe(res => {
      this.message = res;
      this.hidden = false;
    });
  }
}
