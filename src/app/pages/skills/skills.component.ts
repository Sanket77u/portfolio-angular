import { Component } from '@angular/core';

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level?: number;
  description?: string;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  skillCategories: SkillCategory[] = [
    {
      title: 'Programming Languages',
      icon: '💻',
      skills: [
        { name: 'Java', level: 85, description: 'Object-oriented programming, data structures' },
        { name: 'JavaScript (ES6+)', level: 90, description: 'Modern web development, async programming' },
        { name: 'Python', level: 75, description: 'Machine learning, data analysis' },
        { name: 'TypeScript', level: 80, description: 'Type-safe JavaScript development' }
      ]
    },
    {
      title: 'Frontend Development',
      icon: '🎨',
      skills: [
        { name: 'Angular', level: 85, description: 'Component-based architecture, services, routing' },
        { name: 'HTML5', level: 90, description: 'Semantic markup, accessibility' },
        { name: 'CSS3', level: 85, description: 'Responsive design, animations' },
        { name: 'Ant Design (NG-ZORRO)', level: 70, description: 'UI component library for Angular' }
      ]
    },
    {
      title: 'Backend Development',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 85, description: 'Server-side JavaScript runtime' },
        { name: 'Express.js', level: 80, description: 'Web application framework' },
        { name: 'SQL', level: 75, description: 'Database design and queries' },
        { name: 'RESTful APIs', level: 80, description: 'API design and implementation' }
      ]
    },
    {
      title: 'Tools & Technologies',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 85, description: 'Version control, collaboration' },
        { name: 'Postman', level: 80, description: 'API testing and development' },
        { name: 'Jupyter Notebook', level: 75, description: 'Data analysis and prototyping' },
        { name: 'Nodemon', level: 80, description: 'Development workflow automation' }
      ]
    },
    {
      title: 'Core Concepts',
      icon: '🧠',
      skills: [
        { name: 'Data Structures & Algorithms', level: 85, description: 'Problem-solving, optimization' },
        { name: 'Object-Oriented Programming', level: 90, description: 'Design patterns, SOLID principles' },
        { name: 'Machine Learning', level: 70, description: 'Supervised learning, data preprocessing' },
        { name: 'Software Engineering', level: 80, description: 'Development lifecycle, best practices' }
      ]
    }
  ];
}