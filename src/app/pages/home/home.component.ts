import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  skills = [
    'Angular', 'Node.js', 'Express', 'TypeScript', 'SQL', 'Ant Design (NG-ZORRO)'
  ];
}