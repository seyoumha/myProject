import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SearchComponent } from './search/search.component';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: IndexComponent,
    children:[]
  },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component: IndexComponent,
  //   children:[]
  // },

  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component: IndexComponent,
  //   children:[]
  // },

  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component: IndexComponent,
  //   children:[]
  // },

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
