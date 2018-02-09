import { Component, OnInit, OnDestroy } from '@angular/core';
import {User} from '../user'
import {DataService} from './../data.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import {Question} from '../question'
import {Answer} from '../answer'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  errors:string = ''
  currentUser = ''
  searchTerm = ''
  questions:Question[] = []
  filteredQuestions:Question[]= []
  answers:Answer[]=[]
  answer_counts = {}



  constructor(private _dataService: DataService, private _router: Router, private _route: ActivatedRoute) { }

  //logout
  logout(){
    console.log('here logout')
    this._dataService.logout()
    this._router.navigate(['/index'])

  }

  search(searchTerm){
    this.searchTerm = searchTerm
    if(this.searchTerm == null){
      this.filteredQuestions = this.questions
    }else{
      this.filteredQuestions = this.questions.filter(question => {
        return question.user_question.toLowerCase().includes(this.searchTerm.toLowerCase())
      })

    }
  }


  ngOnInit() {
    //user prompt
    this._dataService.userBehaivorSubject.subscribe(user=>{
      console.log(user)
      if(user == null){
        this._router.navigate(['/index'])
      }
      else{
        this.currentUser = user
      }
    })
    //fetch questions
    this._dataService.getQuestions()
    this._dataService.questionBehaivorSubject.subscribe(questions =>{
      this.questions = questions
      this.filteredQuestions = questions
    })

    //fetch answers
    this._dataService.getAnswers()
    this._dataService.answerBehaivorSubject.subscribe(answers =>{
      this.answers = answers
      this.answer_counts = {}
      //create answer_count (reference hash/dictionary)
      answers.forEach(ans => {
        if(this.answer_counts[ans.question_id] == null){
          this.answer_counts[ans.question_id] = 0
        }
        this.answer_counts[ans.question_id] += 1
      })
    })

  }
  getCount(qid):number{
    const count = this.answer_counts[qid]
    if(count == null)return 0
    return count
  }
  ngOnDestroy() {

  }

}
