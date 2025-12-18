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
  tag:'Personal' | 'Team'|'Internship';
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
      id: 'Chessdict',
      title: 'ChessDict',
      subtitle: 'Real-Time Online Chess',
      description: 'Web-based chess application featuring intuitive design and seamless gameplay.',
      longDescription: 'A comprehensive chess platform delivering real-time gameplay with an intuitive interface. Roadmap includes multiplayer integration, user authentication, and competitive rating systems.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js'],
      highlights: [
        'Intuitive user interface with clean design',
        'Responsive controls for seamless gameplay',
        'Planned Socket.io multiplayer integration',
        'User authentication and rating system in development',
        'Optimized move processing for real-time performance'
      ],
      status: 'completed',
      featured: true,
      tag: 'Personal',
      links: {
        github: 'https://github.com/Sanket77u/chessDict.git',
        demo: 'https://chessdict.onrender.com/'
      }
    },
    {
      id: 'Smart Traffic',
      title: 'Smart Traffic Management System',
      subtitle: 'AI-Powered Traffic Control',
      description: 'AI-driven vehicle detection and traffic density monitoring system powered by YOLO.',
      longDescription: 'An intelligent traffic management solution leveraging computer vision and machine learning for real-time vehicle detection, density monitoring, and automated signal optimization.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'OpenCV', 'YOLO', 'Machine Learning'],
      highlights: [
        'Led 4-member team as Project Leader',
        'Real-time vehicle detection using YOLO algorithm',
        'Automated signal control based on traffic density',
        'Selected for Smart India Hackathon (SIH)',
        'Recognized for innovation and deployment potential',
        'Computer vision integration with OpenCV',
        'Scalable architecture supporting multiple intersections'
      ],
      status: 'completed',
      tag: 'Team',
      featured: true,
      links: {
        github: 'https://github.com/PranavHGI/Traffic-Light-Control-Management-System-.git'
      }
    },
    {
      id: 'Motivator-cli',
      title: 'Motivator-cli',
      subtitle: 'Command-Line Motivation Tool',
      description: 'Lightweight CLI tool delivering daily motivation and productivity insights via NPM.',
      longDescription: 'A command-line interface tool providing daily motivational quotes and productivity tips. Published as an open-source NPM package with cross-platform support.',
      technologies: ['Node.js', 'JavaScript', 'NPM', 'CLI Development'],
      highlights: [
        'Published on NPM with 300+ downloads in first month',
        'Fast execution with minimal overhead',
        'Daily motivational content delivery',
        'Cross-platform compatibility',
        'Open-source contribution to developer community'
      ],
      status: 'completed',
      tag: 'Personal',
      featured: false,
      links: {
        github: 'https://github.com/Sanket77u/motivator-cli.git'
      }
    },
    {
      id: 'Ticket Khidakee',
      title: 'Ticket Khidakee',
      subtitle: 'Event Ticketing Platform',
      description: 'Digital ticketing solution streamlining event management and ticket distribution.',
      longDescription: 'A comprehensive event ticketing platform designed to simplify ticket booking, distribution, and event management processes for organizers and attendees.',
      technologies: ['Node.js', 'JavaScript', 'Express.js', 'MongoDB'],
      highlights: [
        'Streamlined ticket booking workflow',
        'Real-time availability tracking',
        'Secure payment integration',
        'Event management dashboard',
        'QR code-based ticket verification',
        'Developed during professional internship'
      ],
      status: 'completed',
      tag: 'Internship',
      featured: false,
    },
    {
      id: 'Pockit',
      title: 'Pockit',
      subtitle: 'Electronics E-Commerce Platform',
      description: 'Full-stack e-commerce platform connecting customers with electronic devices and repair services.',
      longDescription: 'A comprehensive service provider platform enabling customers to purchase electronic devices and book repair services. Features include an admin panel for inventory management, order processing, and service provider coordination.',
      technologies: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript', 'Ant Design'],
      highlights: [
        'Complete admin panel for inventory and order management',
        'Customer-facing website for product browsing and purchases',
        'Service booking system for electronic repairs',
        'Full-stack development with Angular and Node.js',
        'Secure payment gateway integration',
        'Real-time order tracking and status updates',
        'RESTful API architecture for scalability'
      ],
      status: 'completed',
      tag: 'Internship',
      featured: true,
    },
    {
      id: 'Ojasvi',
      title: 'Ojasvi',
      subtitle: 'Ayurvedic Products E-Commerce',
      description: 'E-commerce platform specializing in authentic ayurvedic products with comprehensive admin management.',
      longDescription: 'A specialized e-commerce solution for ayurvedic and herbal products, featuring product categorization, detailed descriptions, and an admin panel for inventory and order management. Built to promote traditional wellness through modern technology.',
      technologies: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript', 'Ant Design'],
      highlights: [
        'Product categorization for ayurvedic medicines and wellness items',
        'Detailed product information with ingredients and benefits',
        'Admin panel for inventory and order management',
        'Shopping cart and secure checkout process',
        'Order tracking and customer notification system',
        'Responsive UI optimized for all devices',
        'Product review and rating system'
      ],
      status: 'completed',
      tag: 'Internship',
      featured: true,
      links: {
        github: '',
        demo: ''
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