import { Component, OnInit, OnDestroy } from '@angular/core';
import * as THREE from "three";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {







  
  skills: string[] = [
    'Angular',
    'Node.js',
    'Express',
    'TypeScript',
    'MongoDB',
    'PostgreSQL',
    'REST APIs',
    'Git'
  ];

  roles: string[] = [
    'Full-Stack Developer',
    'Angular Developer',
    'Node.js Developer',
    'React Developer',
    'Express.js Developer'
  ];

  private roleIndex: number = 0;
  private roleInterval: any;

  ngOnInit(): void {
    // Start role animation after component loads
    this.startRoleAnimation();
  }

  ngOnDestroy(): void {
    // Clean up interval when component is destroyed
    if (this.roleInterval) {
      clearInterval(this.roleInterval);
    }
  }

  startRoleAnimation(): void {
    const roleElement = document.getElementById('role-text');
    if (!roleElement) return;

    const typeRole = (text: string, callback?: () => void) => {
      let charIndex = 0;
      roleElement.textContent = '';
      
      const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
          roleElement.textContent += text[charIndex];
          charIndex++;
        } else {
          clearInterval(typeInterval);
          if (callback) {
            setTimeout(callback, 2000); // Wait 2 seconds before erasing
          }
        }
      }, 100); // Type each character every 100ms
    };

    const eraseRole = (callback?: () => void) => {
      const currentText = roleElement.textContent || '';
      let charIndex = currentText.length;
      
      const eraseInterval = setInterval(() => {
        if (charIndex > 0) {
          roleElement.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
        } else {
          clearInterval(eraseInterval);
          if (callback) {
            setTimeout(callback, 300); // Small pause before typing next role
          }
        }
      }, 50); // Erase faster than typing
    };

    const cycleRoles = () => {
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      typeRole(this.roles[this.roleIndex], () => {
        eraseRole(cycleRoles);
      });
    };

    // Start with first role
    typeRole(this.roles[this.roleIndex], () => {
      eraseRole(cycleRoles);
    });
  }
}