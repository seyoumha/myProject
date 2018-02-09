import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import {User} from './user'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of'
import {Answer} from './answer'
import {Question} from './question'

@Injectable()
export class DataService {
  api = 'http://localhost:5000'
  userBehaivorSubject :BehaviorSubject <any> = new BehaviorSubject(null);
  questionBehaivorSubject :BehaviorSubject <any> = new BehaviorSubject([]);
  answerBehaivorSubject: BehaviorSubject <any> = new BehaviorSubject([]);


  constructor(private _http: Http) { }

  logout(){
    this.userBehaivorSubject.next(null)
  }

  //Questions
  getQuestions():void{
    this._http.get('/questions').subscribe(response=>{
      const questions = response.json() as Question[]
      this.questionBehaivorSubject.next(questions)
    })
  }
  getAnswers():void{
    console.log("getAnswers() called!")
    this._http.get('/answers').subscribe(response=>{
      const answers = response.json() as Answer[]
      this.answerBehaivorSubject.next(answers)
      console.log('bh', this.answerBehaivorSubject)
    })
  }
  postQuestion(question: Question):Observable<void>{
    console.log('thsis service' ,question)
    return this._http.post('/questions', question)
    .map(response => response.json())
  }

  answerQuestion(answer: Answer):Observable<void>{
    return this._http.post('/answers', answer)
    .map(response => response.json())
  }

  //user
  createUser(user: User):Observable<void>{
    return this._http.post('/users', user)
    .map(response => response.json())
    .map(user =>{
      this.userBehaivorSubject.next(user)
    })
  }

  vote(answer: Answer):Observable<Answer>{
    const id = answer._id
    return this._http.put(`/answers/${id}`,answer, {})
    .map(response => {
      this.getAnswers()
      return response.json()
    })
  }
}
