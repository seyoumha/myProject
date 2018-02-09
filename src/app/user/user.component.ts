import { Component, OnInit } from '@angular/core';
import { User} from '../user'
import {DataService} from './../data.service'
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  newUser:User = new User()

  constructor(private _dataService: DataService, private _router: Router) { }

  createUser(){
    console.log('newUser', this.newUser)
    this._dataService.createUser(this.newUser).subscribe(user=>{
      this._router.navigate(['/'])
    })


  }

  ngOnInit() {
  }

}
