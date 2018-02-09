import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SearchComponent } from './search/search.component';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { UserComponent } from './user/user.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { NewAnswerComponent } from './new-answer/new-answer.component';
import { AnswersComponent } from './answers/answers.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: IndexComponent,
    children:[]
  },
  {
    path: 'index',
    pathMatch: 'full',
    component: UserComponent,
    children:[]
  },

  {
    path: 'new_question',
    pathMatch: 'full',
    component: NewQuestionComponent,
    children:[]
  },

  {
    path: 'question/:id',
    pathMatch: 'full',
    component: AnswersComponent,
    children:[]
  },
  {
    path: 'question/:id/new_answer',
    pathMatch: 'full',
    component: NewAnswerComponent,
    children:[]
  },

  {
    path: '**',
    pathMatch: 'full',
    component: ErrorPageComponent,
    children:[]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
