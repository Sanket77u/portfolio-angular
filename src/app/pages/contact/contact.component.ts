import { Component } from '@angular/core';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  link?: string;
  type: 'email' | 'location' | 'social' | 'profile';
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  contactInfo: ContactInfo[] = [
    {
      icon: '📧',
      label: 'Email',
      value: 'sanket77gmail.com',
      link: 'mailto:sanket77gmail.com',
      type: 'email'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Sangli, Maharashtra, India',
      type: 'location'
    },
    {
      icon: '💻',
      label: 'GitHub',
      value: 'sanket-uphade077',
      link: 'https://github.com/sanket-uphade077',
      type: 'social'
    },
    {
      icon: '🏆',
      label: 'Codeforces',
      value: 'Sanket77u',
      link: 'https://codeforces.com/profile/Sanket77u',
      type: 'profile'
    }
  ];

  socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/sanket-uphade077',
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>`
    },
    {
      name: 'Codeforces',
      url: 'https://codeforces.com/profile/Sanket77u',
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5S3 20.328 3 19.5V9c0-.828.672-1.5 1.5-1.5zm7.5 0C12.828 7.5 13.5 8.172 13.5 9v10.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V9c0-.828.672-1.5 1.5-1.5zm7.5 0c.828 0 1.5.672 1.5 1.5v10.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V9c0-.828.672-1.5 1.5-1.5z"/>
      </svg>`
    },
    {
      name: 'Email',
      url: 'mailto:sanket77gmail.com',
      icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>`
    }
  ];

  onSubmit(): void {
    // In a real application, you would send this data to a backend service
    console.log('Contact form submitted:', this.contactForm);

    // Reset form after submission
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };

    // Show success message (you could implement a toast notification here)
    alert('Thank you for your message! I will get back to you soon.');
  }

  isFormValid(): boolean {
    return !!(this.contactForm.name && 
             this.contactForm.email && 
             this.contactForm.subject && 
             this.contactForm.message);
  }
}