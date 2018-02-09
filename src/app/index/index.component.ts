import { Component, OnInit, OnDestroy } from '@angular/core';
import {User} from '../user'
import {DataService} from './../data.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  errors:string = ''
  currentUser:string = null

  constructor(private _dataService: DataService, private _router: Router, private _route: ActivatedRoute) { }

  //logout
  logout(){
    console.log('here logout')
    //this.currentUser = null
    this._dataService.logout()

  }

  // search(searchTerm){
  //   this.searchTerm = searchTerm
  //   if(this.searchTerm == null){
  //     this.filteredQuestions = this.questions
  //   }else{
  //     this.filteredQuestions = this.questions.filter(question => {
  //       return question.user_question.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     })

  //   }


  ngOnInit() {
    //user prompt
    this._dataService.userBehaivorSubject.subscribe(user=>{
      console.log(user)
      this.currentUser = user ? user.name : null

      if(user === null){
        let newUser = prompt("Please enter your name");
        console.log('newUser', newUser)
        if(newUser === ''){
          this._router.navigate(['/errorpage'])
          newUser = prompt("Please enter your name");
        }else if(newUser){
          const user = new User()
          user.name = newUser
          this.currentUser = newUser
          console.log("created user",user)
          this._dataService.createUser(user).subscribe(user=>{})
        }else{
          this._router.navigate(['/errorpage'])
        }
      }else{
        console.log('user is already logged in', user)
      }
    })

    //




  }



  ngOnDestroy() {

  }

}
