import { Component, OnInit, OnDestroy } from '@angular/core';
import {User} from '../user'
import {Question} from '../question'
import {Answer} from '../answer'
import {DataService} from './../data.service'
import { Router, ActivatedRoute } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.css']
})
export class NewAnswerComponent implements OnInit {

question = ''
description = ''
private sub: any;
id:''
newAnswer:Answer = new Answer()
errors=''
user = ''

  constructor(private _dataService: DataService, private _router: Router, private route: ActivatedRoute) { }


  clear(answer, detail){
    this.newAnswer = new Answer()
  }

  answerQuestion(){
    this._dataService.userBehaivorSubject.subscribe(user=>{
      if(user === ''){
        this._router.navigate(['/index'])
      }
      this.user = user.name

    })
    this.newAnswer.user_name = this.user
    this.newAnswer.question_id = this.id
    this._dataService.answerQuestion(this.newAnswer).subscribe(answer =>{
      this._router.navigate(['/question/'+this.id])
     },
     error=> this.errors = error.json()
    )

  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
    })

    this._dataService.questionBehaivorSubject.subscribe(questions =>{
      questions.forEach(question =>{
        if(question._id === this.id){
          this.question = question.user_question
          this.description = question.description
        }
      })
    })
   }

   ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
