import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  toggleTheme() {
    throw new Error('Method not implemented.');
  }
  private storageKey = 'theme';

  isDark(): boolean {
    return document.documentElement.classList.contains('dark');
  }

  setDark(dark: boolean): void {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem(this.storageKey, dark ? 'dark' : 'light');
  }

  toggle(): void {
    this.setDark(!this.isDark());
  }
}