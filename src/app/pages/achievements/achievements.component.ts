import { Component } from '@angular/core';

interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  category: 'competition' | 'project' | 'recognition' | 'certification';
  icon: string;
  details: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  links?: {
    url: string;
    label: string;
  }[];
}

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent {
  achievements: Achievement[] = [
    {
      id: 'gtt-hackathon',
      title: 'Top 15 Finalist',
      subtitle: 'GTT Hackathon',
      description: 'Ranked among top 15 out of 5000+ participating students and received internship offer.',
      date: '2025',
      category: 'competition',
      icon: '🏆',
      details: [
        'Competed against 5000+ students nationwide',
        'Demonstrated exceptional problem-solving skills',
        'Impressed judges with innovative solution approach',
        'Received direct internship offer from GTT Data Solutions',
        'Showcased full-stack development capabilities',
        'Led team collaboration and presentation'
      ],
      metrics: [
        { label: 'Rank', value: 'Top 15' },
        { label: 'Participants', value: '5000+' },
        { label: 'Outcome', value: 'Internship Offer' }
      ]
    },
    {
      id: 'sih-selection',
      title: 'Smart India Hackathon Selection',
      subtitle: 'National Level Recognition',
      description: 'Led team whose Smart Traffic Management System was selected for Smart India Hackathon.',
      date: '2024',
      category: 'competition',
      icon: '🇮🇳',
      details: [
        'Project Leader for Smart Traffic Management System',
        'AI-based real-time vehicle detection using YOLO',
        'Innovative traffic density monitoring solution',
        'Automated signal control implementation',
        'Selected among thousands of project submissions',
        'Recognized for innovation and deployment potential',
        'Team leadership and project management'
      ],
      metrics: [
        { label: 'Role', value: 'Project Leader' },
        { label: 'Technology', value: 'AI/ML' },
        { label: 'Impact', value: 'Traffic Management' }
      ]
    },
    {
      id: 'codeforces',
      title: 'Competitive Programming',
      subtitle: 'Codeforces Problem Solving',
      description: 'Solved 50+ competitive programming problems using Java with solutions maintained on GitHub.',
      date: 'Ongoing',
      category: 'project',
      icon: '💻',
      details: [
        'Consistent problem-solving practice on Codeforces platform',
        'Implemented solutions using Java programming language',
        'Maintained GitHub repository of all solutions',
        'Demonstrated algorithmic thinking and optimization skills',
        'Covered various data structures and algorithms',
        'Regular participation in contests and practice sessions'
      ],
      metrics: [
        { label: 'Problems Solved', value: '50+' },
        { label: 'Language', value: 'Java' },
        { label: 'Platform', value: 'Codeforces' }
      ],
      links: [
        { url: 'https://codeforces.com/profile/Sanket77u', label: 'Codeforces Profile' },
        { url: 'https://github.com/sanket-uphade077', label: 'Solutions Repository' }
      ]
    },
    {
      id: 'motivator-cli',
      title: 'Open Source Contribution',
      subtitle: 'motivator-cli NPM Package',
      description: 'Published CLI tool that achieved 300+ downloads within the first month of release.',
      date: '2024',
      category: 'project',
      icon: '📦',
      details: [
        'Developed and published NPM package from scratch',
        'Created user-friendly command-line interface',
        'Implemented daily motivational content delivery',
        'Achieved significant community adoption quickly',
        'Contributed to open-source developer tools ecosystem',
        'Demonstrated package management and distribution skills'
      ],
      metrics: [
        { label: 'Downloads', value: '300+' },
        { label: 'Platform', value: 'NPM' },
        { label: 'Timeframe', value: '1 Month' }
      ],
      links: [
        { url: 'https://github.com/sanket-uphade077', label: 'GitHub Repository' }
      ]
    }
  ];

  getCategoryColor(category: string): string {
    switch (category) {
      case 'competition': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'project': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'recognition': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'certification': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  }

  getCategoryLabel(category: string): string {
    switch (category) {
      case 'competition': return 'Competition';
      case 'project': return 'Project';
      case 'recognition': return 'Recognition';
      case 'certification': return 'Certification';
      default: return category;
    }
  }
}