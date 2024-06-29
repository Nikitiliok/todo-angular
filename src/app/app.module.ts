import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, RouterOutlet, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TodoComponent } from "./components/todo/todo.component";
import { IncompletedTodosPipe } from "./pipes/incompleted-todos.pipe";
import { MessageComponent } from "./components/message/message.component";
import { TodosPageComponent } from "./components/todos-page/todos-page.component";
import { AboutComponent } from "./components/about/about.component";
import { FilterComponent } from "./components/filter/filter.component";

const routes: Routes = [
    {path: 'todos/:status', component: TodosPageComponent},
    {path: 'about', component: AboutComponent},
    {path: '**', redirectTo: '/todos/all', pathMatch: 'full'},
];

@NgModule({
    declarations: [
        AppComponent,
        TodoComponent,
        MessageComponent,
        TodosPageComponent,
        AboutComponent,
        FilterComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
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