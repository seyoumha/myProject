import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DataService} from './../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  questions = null;
  searchTerm:string;
  @Output() apptEventEmitter = new EventEmitter();

  constructor(private _dataService:DataService) { }

  updateSearchTerm(){
    this.apptEventEmitter.emit(this.searchTerm)
  }

  ngOnInit() {
  }

}
