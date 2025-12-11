# Email Setup Guide for Contact Form

Your contact form is ready! Here's how to set it up to receive actual emails:

## 🚀 Quick Setup with EmailJS (Recommended)

EmailJS is free and works directly from your frontend without needing a backend.

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

### Step 2: Add Email Service
1. Go to "Email Services" in your dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note down your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

4. Note down your **Template ID**

### Step 4: Get User ID
1. Go to "Account" → "General"
2. Find your **User ID** (Public Key)

### Step 5: Install EmailJS
```bash
npm install @emailjs/browser
```

### Step 6: Update Your Code
1. Open `src/app/pages/contact/contact.component.ts`
2. Add import at the top:
```typescript
import emailjs from '@emailjs/browser';
```

3. Replace these values in `sendEmailWithEmailJS` method:
```typescript
const serviceID = 'YOUR_SERVICE_ID'; // From Step 2
const templateID = 'YOUR_TEMPLATE_ID'; // From Step 3
const userID = 'YOUR_USER_ID'; // From Step 4
```

4. Uncomment the EmailJS code and remove the simulation code

### Step 7: Test
1. Fill out your contact form
2. Check your email inbox
3. You should receive the message!

---

## 🔧 Alternative: Backend API Setup

If you prefer using your own backend:

### Option A: Node.js + Nodemailer
```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

app.post('/send-email', (req, res) => {
  const { from_name, from_email, subject, message } = req.body;
  
  const mailOptions = {
    from: from_email,
    to: 'sanket77@gmail.com',
    subject: `Contact Form: ${subject}`,
    text: `From: ${from_name} (${from_email})\n\n${message}`
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      res.json({ message: 'Email sent successfully' });
    }
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### Option B: Netlify Forms (If hosting on Netlify)
1. Add `netlify` attribute to your form tag
2. Add hidden input: `<input type="hidden" name="form-name" value="contact" />`
3. Form submissions will appear in your Netlify dashboard

---

## 📧 Where Will You See Messages?

### With EmailJS:
- Messages will be sent to the email you configured in EmailJS
- Check your **inbox** for new contact form submissions

### With Backend API:
- Messages will be sent to the email specified in your backend code
- Check your **inbox** for new contact form submissions

### With Netlify Forms:
- Go to your Netlify dashboard
- Navigate to "Forms" section
- View all form submissions there

---

## 🎯 Current Status

Right now, your contact form:
- ✅ Has proper validation
- ✅ Shows professional notifications
- ✅ Has email functionality ready
- ⏳ Needs EmailJS setup to actually send emails

The form is **fully functional** - you just need to complete one of the setup options above to start receiving emails!

---

## 🆘 Need Help?

If you need help setting up EmailJS or have questions:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. Test with a simple setup first
3. Make sure your email service is properly configured

Your contact form will work perfectly once you complete the setup! 🚀