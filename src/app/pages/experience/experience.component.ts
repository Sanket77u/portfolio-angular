import { Component } from '@angular/core';

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  current?: boolean;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      title: 'Software Developer Intern',
      company: 'GTT Data Solutions',
      period: 'June 2025 – Present',
      location: 'Remote',
      description: 'Working on full-stack development projects, focusing on backend services and Angular frontend development.',
      responsibilities: [
        'Built and maintained backend services using Node.js, Express.js, and JavaScript (ES6+)',
        'Implemented routing, middleware, and error handling for real-world applications',
        'Utilized tools like Postman, Git, and Nodemon for efficient development and testing',
        'Collaborated in team environments with version control best practices',
        'Currently working on Angular development, mastering core concepts',
        'Actively learning NG-ZORRO (Ant Design for Angular) for enhanced UI components'
      ],
      technologies: ['Node.js', 'Express.js', 'JavaScript (ES6+)', 'Angular', 'NG-ZORRO', 'Git', 'Postman', 'Nodemon'],
      current: true
    }
  ];
}