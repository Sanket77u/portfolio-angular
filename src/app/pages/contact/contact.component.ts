import { Component } from "@angular/core";

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
export class ContactComponent {
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
