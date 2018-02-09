import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import {User} from './user'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of'

@Injectable()
export class DataService {
  api = 'http://localhost:5000'
  userBehaivorSubject :BehaviorSubject <any> = new BehaviorSubject(null);

  constructor(private _http: Http) { }

  //user create

  logout(){
    this.userBehaivorSubject.next(null)
  }

  createUser(user: User):Observable<void>{
    return this._http.post('/users', user)
    .map(response => {
      console.log("resoponse ", response)
      return response.json()
    })
    .map(user =>{
      this.userBehaivorSubject.next(user)
    })
  }

}
