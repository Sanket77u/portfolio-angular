import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from '@angular/common/http';

// To receive emails, you need to set up one of these services:
// 
// OPTION 1: EmailJS (Recommended - Free & Easy)
// 1. Go to https://www.emailjs.com/
// 2. Create a free account
// 3. Add email service (Gmail, Outlook, etc.)
// 4. Create email template
// 5. Get Service ID, Template ID, and User ID
// 6. Install EmailJS: npm install @emailjs/browser
// 7. Import: import emailjs from '@emailjs/browser';
// 8. Replace the IDs in sendEmailWithEmailJS method
//
// OPTION 2: Backend API
// 1. Create a backend service (Node.js, Python, etc.)
// 2. Set up email sending (Nodemailer, SendGrid, etc.)
// 3. Create API endpoint for receiving form data
// 4. Update sendEmailWithBackend method with your API URL
//
// OPTION 3: Netlify Forms (If hosting on Netlify)
// 1. Add netlify attribute to form
// 2. Form submissions will appear in Netlify dashboard

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Notification {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
}

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  link?: string;
  type: "email" | "location" | "social" | "profile";
}

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit, OnDestroy {
  // Typewriter effect properties
  displayedText = '';
  cursorVisible = true;
  private typewriterInterval: any;
  private cursorInterval: any;
  private currentIndex = 0;
  private isErasing = false;

  // Notification system
  notification: Notification = {
    show: false,
    type: 'success',
    title: '',
    message: ''
  };

  // Form submission state
  isSubmitting = false;

  // Phrases for cycling effect
  private readonly phrases = [
   
    'Contact Me'
    
  ];

  constructor(private http: HttpClient) {}

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
  contactForm: ContactForm = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  contactInfo: ContactInfo[] = [
    {
      icon: "📧",
      label: "Email",
      value: "sanket77gmail.com",
      link: "mailto:sanket77gmail.com",
      type: "email",
    },
    {
      icon: "📍",
      label: "Location",
      value: "Sangli, Maharashtra, India",
      type: "location",
    },
    {
      icon: "💻",
      label: "GitHub",
      value: "sanket-uphade077",
      link: "https://github.com/sanket-uphade077",
      type: "social",
    },
    {
      icon: "🏆",
      label: "Codeforces",
      value: "Sanket77u",
      link: "https://codeforces.com/profile/Sanket77u",
      type: "profile",
    },
  ];

  socialLinks = [
    { name: "GitHub", url: "https://github.com/sanket-uphade077" },
    { name: "Codeforces", url: "https://codeforces.com/profile/Sanket77u" },
    { name: "Email", url: "mailto:sanket77@gmail.com" },
  ];

  onSubmit(): void {
    if (!this.isFormValid()) {
      this.showNotification('error', 'Validation Error', 'Please fill in all required fields with valid information.');
      return;
    }

    this.isSubmitting = true;

    // Email service using EmailJS (free service for sending emails)
    const emailData = {
      to_email: 'sanket77@gmail.com', // Your email
      from_name: this.contactForm.name,
      from_email: this.contactForm.email,
      subject: this.contactForm.subject,
      message: this.contactForm.message,
      reply_to: this.contactForm.email
    };

    // Using EmailJS service (you'll need to set this up)
    this.sendEmail(emailData);
  }

  private sendEmail(emailData: any): void {
    // Method 1: Using EmailJS (Recommended - Free and Easy)
    this.sendEmailWithEmailJS(emailData);
    
    // Method 2: Using your own backend API (Alternative)
    // this.sendEmailWithBackend(emailData);
  }

  private sendEmailWithEmailJS(emailData: any): void {
    // EmailJS configuration (uncomment when ready to use)
    // const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
    // const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
    // const userID = 'YOUR_USER_ID'; // Replace with your EmailJS user ID

    const templateParams = {
      to_email: 'sanket77@gmail.com',
      from_name: emailData.from_name,
      from_email: emailData.from_email,
      subject: emailData.subject,
      message: emailData.message,
      reply_to: emailData.from_email
    };

    // For now, simulate the email sending since EmailJS needs to be set up
    // Uncomment the below code after setting up EmailJS
    
    /*
    // Real EmailJS implementation:
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then(() => {
        this.isSubmitting = false;
        this.showNotification(
          'success', 
          'Message Sent Successfully!', 
          'Thank you for contacting me. I will get back to you within 24 hours.'
        );
        this.resetForm();
      })
      .catch((error) => {
        this.isSubmitting = false;
        this.showNotification(
          'error', 
          'Failed to Send Message', 
          'Something went wrong. Please try again or contact me directly via email.'
        );
        console.error('EmailJS error:', error);
      });
    */

    // Temporary simulation (remove this after setting up EmailJS)
    setTimeout(() => {
      this.isSubmitting = false;
      this.showNotification(
        'success', 
        'Message Sent Successfully!', 
        'Thank you for contacting me. I will get back to you within 24 hours.'
      );
      this.resetForm();
      console.log("Email data that would be sent:", templateParams);
    }, 2000);
  }

  // Alternative method for backend API (uncomment when needed)
  /*
  private sendEmailWithBackend(emailData: any): void {
    // Alternative: Send to your own backend API
    this.http.post('YOUR_BACKEND_API_URL/send-email', emailData)
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.showNotification(
            'success', 
            'Message Sent Successfully!', 
            'Thank you for contacting me. I will get back to you within 24 hours.'
          );
          this.resetForm();
        },
        error: (error) => {
          this.isSubmitting = false;
          this.showNotification(
            'error', 
            'Failed to Send Message', 
            'Something went wrong. Please try again or contact me directly via email.'
          );
          console.error('Backend API error:', error);
        }
      });
  }
  */

  private resetForm(): void {
    this.contactForm = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  }

  private showNotification(type: 'success' | 'error', title: string, message: string): void {
    this.notification = {
      show: true,
      type,
      title,
      message
    };

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      this.hideNotification();
    }, 5000);
  }

  hideNotification(): void {
    this.notification.show = false;
  }

  isFormValid(): boolean {
    return !!(
      this.contactForm.name &&
      this.isValidEmail(this.contactForm.email) &&
      this.contactForm.subject &&
      this.contactForm.message
    );
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getEmailValidationClass(): string {
    if (!this.contactForm.email) return '';
    return this.isValidEmail(this.contactForm.email) 
      ? 'border-green-500 focus:ring-green-500' 
      : 'border-red-500 focus:ring-red-500';
  }
}
