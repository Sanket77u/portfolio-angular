import { Component, OnInit, OnDestroy } from "@angular/core";

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

  // Phrases for cycling effect
  private readonly phrases = [
    'Get in Touch',
    'Let\'s Connect',
    'Contact Me',
    'Reach Out'
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
    // In a real application, you would send this data to a backend service
    console.log("Contact form submitted:", this.contactForm);

    // Reset form after submission
    this.contactForm = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    // Show success message (you could implement a toast notification here)
    alert("Thank you for your message! I will get back to you soon.");
  }

  isFormValid(): boolean {
    return !!(
      this.contactForm.name &&
      this.contactForm.email &&
      this.contactForm.subject &&
      this.contactForm.message
    );
  }
}
