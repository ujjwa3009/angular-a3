import { Component } from '@angular/core';
import { Task } from './interface/task';
import { HttpClient } from '@angular/common/http';
import { Observable, map} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-a3';
  
    
  
}
