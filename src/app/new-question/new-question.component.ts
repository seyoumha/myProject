import { Component, OnInit } from '@angular/core';
import {Question} from '../question'
import {Answer} from '../answer'
import {DataService} from './../data.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {
  title = "New Question"
  newQuestion:Question = new Question()
  currentUser = ''
  errors = ''
  msg = ''
  user = ''
  constructor(private _dataService: DataService, private _router: Router) { }


  clear(question, desc){
    this.newQuestion = new Question();
   }

   postQuestion(){
    this.newQuestion.user_name = this.currentUser
    this._dataService.postQuestion(this.newQuestion).subscribe(question=>{
      this._router.navigate(['/'])
   },
   error=> this.errors = error.json()
  )

  }


  ngOnInit() {
    this._dataService.userBehaivorSubject.subscribe(user=>{
      console.log('new user',user)
      if(user == null){
        this._router.navigate(['/index'])
      }
      else{
        this.currentUser = user
      }
    })
  }

}
