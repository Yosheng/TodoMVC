import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  private requestOptions = new RequestOptions({
    headers: new Headers({
      'authorization': 'token 2724594d-21e6-444b-b91b-1f1586908b37'
    })
  });

  getTodo () {
    return this.http.get('./me/todomvc', this.requestOptions).map(res => {
      return res.json();
    }).catch(error => {
      console.log(error);
      return Observable.of<any[]>([]);
    });
  }

  saveTodos (newTodos: any[]) {
    return this.http.post('./me/todomvc', newTodos, this.requestOptions).map(res => {
      return res.json();
    }).catch(error => {
      console.log(error);
      return Observable.of<any[]>([]);
    });
  }

}
