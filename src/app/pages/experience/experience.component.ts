import { Component, OnInit, OnDestroy } from '@angular/core';

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
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit, OnDestroy {
  // Typewriter effect properties
  displayedText = '';
  cursorVisible = true;
  private typewriterInterval: any;
  private cursorInterval: any;
  private currentIndex = 0;
  private isErasing = false;

  // Phrases for cycling effect
  private readonly phrases = [
    'Work Experience',
  ];

  experiences: Experience[] = [
    {
      title: 'Software Developer Intern',
      company: 'GTT Data Solutions',
      period: 'June 2025 – December 2025',
      location: 'OnSite',
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

  ngOnInit(): void {
    this.startTypewriter();
  }

  ngOnDestroy(): void {
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
    }
    if (this.cursorInterval) {
      clearInterval(this.cursorInterval);
    }
  }

  private startTypewriter(): void {
    // Start with cursor blinking
    this.cursorInterval = setInterval(() => {
      this.cursorVisible = !this.cursorVisible;
    }, 500);

    // Start typewriter effect after a short delay
    setTimeout(() => {
      this.typewriteText();
    }, 1000);
  }

  private typewriteText(): void {
    const currentPhrase = this.phrases[this.currentIndex];

    if (!this.isErasing) {
      // Typing effect
      if (this.displayedText.length < currentPhrase.length) {
        this.displayedText += currentPhrase[this.displayedText.length];
      } else {
        // Finished typing, wait before erasing
        setTimeout(() => {
          this.isErasing = true;
        }, 2000);
      }
    } else {
      // Erasing effect
      if (this.displayedText.length > 0) {
        this.displayedText = this.displayedText.slice(0, -1);
      } else {
        // Finished erasing, move to next phrase
        this.isErasing = false;
        this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
      }
    }

    // Continue the effect
    this.typewriterInterval = setTimeout(() => {
      this.typewriteText();
    }, this.isErasing ? 100 : 150); // Faster erasing, slower typing
  }





  
}