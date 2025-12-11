import { Component, OnInit, OnDestroy } from '@angular/core'
interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  highlights: string[];
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  links?: {
    github?: string;
    demo?: string;
    documentation?: string;
  };
  image?: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  // Typewriter effect properties
  displayedText = '';
  cursorVisible = true;
  private typewriterInterval: any;
  private cursorInterval: any;
  private currentIndex = 0;
  private isErasing = false;

  // Phrases for cycling effect
  private readonly phrases = [
    'My Projects'
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
  projects: Project[] = [
    {
      id: 'chessdict',
      title: 'ChessDict',
      subtitle: 'Realtime Chess Online',
      description: 'Web-based chess application with clean UI and smooth gameplay experience.',
      longDescription: 'A comprehensive chess platform featuring real-time gameplay, intuitive user interface, and plans for advanced features like multiplayer integration, user authentication, and rating systems.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js'],
      highlights: [
        'Clean and intuitive user interface design',
        'Smooth gameplay experience with responsive controls',
        'Planned multiplayer integration using Socket.io',
        'User authentication and rating system on roadmap',
        'Fast transaction processing for game moves',
        'Mobile-responsive design for cross-device play'
      ],
      status: 'in-progress',
      featured: true,
      links: {
        github: 'https://github.com/sanket-uphade077'
      }
    },
    {
      id: 'smart-traffic',
      title: 'Smart Traffic Management System',
      subtitle: 'AI-Powered Traffic Control',
      description: 'AI-based real-time vehicle detection and density monitoring system using YOLO algorithm.',
      longDescription: 'An innovative traffic management solution that uses computer vision and machine learning to detect vehicles in real-time, monitor traffic density, and automatically control traffic signals for optimal flow.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'OpenCV', 'YOLO', 'Machine Learning'],
      highlights: [
        'Led a 5-member team as Project Leader',
        'Real-time vehicle detection using YOLO algorithm',
        'Traffic density analytics and monitoring',
        'Automated signal control based on traffic patterns',
        'Selected for Smart India Hackathon (SIH)',
        'Recognized for innovation and deployment potential',
        'Computer vision integration with OpenCV',
        'Scalable architecture for multiple intersections'
      ],
      status: 'completed',
      featured: true,
      links: {
        github: 'https://github.com/sanket-uphade077'
      }
    },
    {
      id: 'motivator-cli',
      title: 'motivator-cli',
      subtitle: 'Command Line Motivation Tool',
      description: 'Open-source CLI tool for daily motivation and productivity, published on NPM.',
      longDescription: 'A lightweight command-line interface tool that provides daily motivational quotes and productivity tips. Built with Node.js and published as an NPM package.',
      technologies: ['Node.js', 'JavaScript', 'NPM', 'CLI Development'],
      highlights: [
        'Published as NPM package with 300+ downloads in first month',
        'Simple and intuitive command-line interface',
        'Daily motivational content delivery',
        'Lightweight and fast execution',
        'Cross-platform compatibility',
        'Open-source contribution to developer community'
      ],
      status: 'completed',
      featured: false,
      links: {
        github: 'https://github.com/sanket-uphade077'
      }
    }
  ];

  get featuredProjects(): Project[] {
    return this.projects.filter(p => p.featured);
  }

  get otherProjects(): Project[] {
    return this.projects.filter(p => !p.featured);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'in-progress': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'planned': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'planned': return 'Planned';
      default: return status;
    }
  }
}