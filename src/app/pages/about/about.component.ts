import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  // Typewriter effect properties
  displayedText = '';
  cursorVisible = true;
  private typewriterInterval: any;
  private cursorInterval: any;
  private currentIndex = 0;
  private isErasing = false;

  // Phrases for cycling effect
  private readonly phrases = [
    'About Me',
    'My Story',
    'Who I Am',
    'My Journey'
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