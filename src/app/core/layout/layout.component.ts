import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  home: String = 'home';
  mobileOpen = false;
  year = new Date().getFullYear();

  constructor(private theme: ThemeService) { }

  get isDark(): boolean {
    return this.theme.isDark();
  }

  toggleTheme(): void {
    // Check if CURRENTLY in dark mode (before toggling)
    const isCurrentlyDark = document.documentElement.classList.contains('dark');

    // Add dark class to body if currently dark (for CSS transition)
    if (isCurrentlyDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    // Add transition class
    document.body.classList.add('theme-transitioning');

    // Toggle theme (changes html dark class)
    this.theme.toggle();

    // Update body dark class after toggle
    setTimeout(() => {
      const isNowDark = document.documentElement.classList.contains('dark');
      if (isNowDark) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }, 50);

    // Remove transition class after animation
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 800);
  }
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of your sticky header (h-20 = 80px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}