import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  mobileOpen = false;
  year = new Date().getFullYear();

  constructor(private theme: ThemeService) {}

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
}