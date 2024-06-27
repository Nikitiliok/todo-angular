import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TodoComponent } from "./components/todo/todo.component";
import { IncompletedTodosPipe } from "./pipes/incompleted-todos.pipe";
import { MessageComponent } from "./components/message/message.component";

@NgModule({
    declarations: [
        AppComponent,
        TodoComponent,
        MessageComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterOutlet,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IncompletedTodosPipe
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }