import { Component , EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: false,
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent  {

  @Input() start = 0;
  @Output()  mesage = new EventEmitter<string>(); 


}
