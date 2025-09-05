import { Compiler, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { map, catchError, retry, retryWhen, delayWhen } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';

  constructor(private http: HttpClient) { }

  getData() : Observable<any>{
    return this.http.get(this.apiUrl).pipe(
      map((data : any) =>( {
        id: data.id,
        title : data.title,
        completed  : data.completed ? 'Done' : 'Pending'
        
      }))
    )
  }
}
