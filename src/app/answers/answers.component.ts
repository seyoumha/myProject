import { Component, OnInit } from '@angular/core';
import {Question} from '../question'
import {Answer} from '../answer'
import {DataService} from './../data.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  errors = ''
  questions:Question[] = []
  answers: Answer[]=[]
  id = ''
  private sub: any;
  question = ''
  desc = ''
  user =''

  constructor(private _dataService: DataService, private _router: Router, private _route: ActivatedRoute) { }
  logout(){
    console.log('here logout')
    this._dataService.logout()
    this._router.navigate(['/index'])

  }

  vote(id){
    const answer = this.answers.filter(answer => answer._id == id)[0]
    this._dataService.vote(answer).subscribe(
      answer=> console.log('answer updated', answer),
      error=> this.errors = error.json()
    )
  }

  ngOnInit() {
    this.sub = this._route.params.subscribe(params=>{
      this.id = params['id'];
    })

    this._dataService.getQuestions()
    this._dataService.questionBehaivorSubject.subscribe(questions =>{
      questions
        .filter(q => q._id == this.id)
        .forEach(q => {
          this.question = q.user_question
          this.desc = q.description
        })
    })

    this.refreshList()

  }
  refreshList(){
    this._dataService.getAnswers()
    this._dataService.answerBehaivorSubject.subscribe(answers =>{
      this.answers = answers.filter(answer=> answer.question_id === this.id)
    })
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

