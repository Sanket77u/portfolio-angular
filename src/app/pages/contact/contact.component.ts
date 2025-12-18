import { BackendService } from './../../service/backend.service';
import { Component, OnInit, OnDestroy, Renderer2, ViewChild, ElementRef, AfterViewInit, HostListener } from "@angular/core";

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

interface ReviewDialog {
  isVisible: boolean;
  rating: number;
  name: string;
  feedback: string;
  isSubmitted: boolean;
}

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('contactSection') contactSection!: ElementRef;

  // Typewriter effect properties
  ratings: any[] = [];
  displayedText = '';
  cursorVisible = true;
  private typewriterInterval: any;
  private cursorInterval: any;
  private currentIndex = 0;
  private isErasing = false;
  private hasShownReview = false;
  private isNearBottom = false;

  constructor(private renderer: Renderer2, private ratingService: BackendService) { }

  // Phrases for cycling effect
  private readonly phrases = ['Get in Touch'];

  ngOnInit(): void {
    this.loadRatings();
    this.startTypewriter();
    
    // Check if review was already submitted in this session
    const reviewSubmitted = sessionStorage.getItem('reviewSubmitted');
    if (reviewSubmitted === 'true') {
      this.hasShownReview = true;
    }
  }

  ngAfterViewInit(): void {
    // No auto-show on page load
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Check if user has scrolled to near bottom
    const scrollPosition = window.pageYOffset + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const bottomThreshold = pageHeight - 300; // 300px from bottom

    if (scrollPosition >= bottomThreshold && !this.isNearBottom) {
      this.isNearBottom = true;
      
      // Show review dialog if not shown before and not submitted
      const reviewSubmitted = sessionStorage.getItem('reviewSubmitted');
      if (!this.hasShownReview && reviewSubmitted !== 'true') {
        setTimeout(() => {
          this.showReviewDialog();
        }, 500);
      }
    } else if (scrollPosition < bottomThreshold) {
      this.isNearBottom = false;
    }
  }

  ngOnDestroy(): void {
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
    }
    if (this.cursorInterval) {
      clearInterval(this.cursorInterval);
    }

    // Clean up body scroll prevention
    this.renderer.removeClass(document.body, 'no-scroll');
    window.removeEventListener('wheel', this.scrollHandler);
    window.removeEventListener('touchmove', this.scrollHandler);
    window.removeEventListener('keydown', this.keyHandler);
  }

  private startTypewriter(): void {
    this.cursorInterval = setInterval(() => {
      this.cursorVisible = !this.cursorVisible;
    }, 500);

    setTimeout(() => {
      this.typewriteText();
    }, 1000);
  }

  private typewriteText(): void {
    const currentPhrase = this.phrases[this.currentIndex];

    if (!this.isErasing) {
      if (this.displayedText.length < currentPhrase.length) {
        this.displayedText += currentPhrase[this.displayedText.length];
      } else {
        setTimeout(() => {
          this.isErasing = true;
        }, 2000);
      }
    } else {
      if (this.displayedText.length > 0) {
        this.displayedText = this.displayedText.slice(0, -1);
      } else {
        this.isErasing = false;
        this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
      }
    }

    this.typewriterInterval = setTimeout(() => {
      this.typewriteText();
    }, this.isErasing ? 100 : 150);
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

  // Review Dialog properties
  reviewDialog: ReviewDialog = {
    isVisible: false,
    rating: 0,
    name: '',
    feedback: '',
    isSubmitted: false
  };

  readonly maxStars = 5;

  onSubmit(): void {
    console.log("Contact form submitted:", this.contactForm);
    this.contactForm = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
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

  // Review Dialog methods
  private scrollHandler = (event: Event) => {
    event.preventDefault();
  };

  private keyHandler = (event: KeyboardEvent) => {
    const scrollKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    if (scrollKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  showReviewDialog(): void {
    this.reviewDialog.isVisible = true;
    this.reviewDialog.isSubmitted = false;
    this.reviewDialog.rating = 0;
    this.reviewDialog.name = '';
    this.reviewDialog.feedback = '';
    this.hasShownReview = true;

    this.renderer.addClass(document.body, 'no-scroll');
    window.addEventListener('wheel', this.scrollHandler, { passive: false });
    window.addEventListener('touchmove', this.scrollHandler, { passive: false });
    window.addEventListener('keydown', this.keyHandler, { passive: false });
  }

  hideReviewDialog(): void {
    this.reviewDialog.isVisible = false;
    this.renderer.removeClass(document.body, 'no-scroll');

    window.removeEventListener('wheel', this.scrollHandler);
    window.removeEventListener('touchmove', this.scrollHandler);
    window.removeEventListener('keydown', this.keyHandler);

    setTimeout(() => {
      this.reviewDialog.isSubmitted = false;
      this.reviewDialog.rating = 0;
      this.reviewDialog.name = '';
      this.reviewDialog.feedback = '';
    }, 300);
  }

  setRating(rating: number): void {
    this.reviewDialog.rating = rating;
    console.log('Rating selected:', rating);
  }

  isStarActive(starIndex: number): boolean {
    return starIndex <= this.reviewDialog.rating;
  }

  getStarStyle(starIndex: number): any {
    const isActive = this.isStarActive(starIndex);
    const isDarkTheme = document.documentElement.classList.contains('dark');

    if (isActive) {
      if (isDarkTheme) {
        return {
          'fill': 'url(#starGradientDark)',
          'stroke': '#7c3aed',
          'stroke-width': '1.5',
          'filter': 'drop-shadow(0 0 6px rgba(124, 58, 237, 0.4))'
        };
      } else {
        return {
          'fill': 'url(#starGradientLight)',
          'stroke': '#3b82f6',
          'stroke-width': '1.5',
          'filter': 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))'
        };
      }
    } else {
      return {
        'fill': '#d1d5db',
        'stroke': '#9ca3af',
        'stroke-width': '1',
        'filter': 'none'
      };
    }
  }

  submitReview(): void {
    if (this.reviewDialog.rating === 0) {
      alert('⭐ Please select a rating!');
      return;
    }

    if (!this.reviewDialog.name || this.reviewDialog.name.trim() === '') {
      alert('👤 Please enter your name!');
      return;
    }

    const reviewData = {
      rating: this.reviewDialog.rating.toString(),
      rating_message: this.reviewDialog.feedback.trim() || 'No message provided',
      username: this.reviewDialog.name.trim()
    };

    console.log('Submitting review:', reviewData);

    this.ratingService.submitRating(reviewData).subscribe({
      next: (response) => {
        console.log('Review saved successfully:', response);
        this.reviewDialog.isSubmitted = true;
        
        // Mark as submitted in session
        sessionStorage.setItem('reviewSubmitted', 'true');

        setTimeout(() => {
          this.hideReviewDialog();
        }, 3000);
      },
      error: (error) => {
        console.error('Error saving review:', error);
        alert('❌ Failed to submit review. Please try again.');
      }
    });
  }

  canCloseDialog(): boolean {
    return true;
  }

  loadRatings(): void {
    this.ratingService.getRatings().subscribe({
      next: (response) => {
        console.log('Ratings fetched successfully:', response);
        this.ratings = response;
      },
      error: (error) => {
        console.error('Error fetching ratings:', error);
      }
    });
  }

  resetReviewDialog(): void {
    sessionStorage.removeItem('reviewSubmitted');
    this.hasShownReview = false;
    alert('Review dialog reset! Scroll to bottom to see it again.');
  }
}