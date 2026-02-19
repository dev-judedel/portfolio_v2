# Jude Dela Cruz — Portfolio

Built with Next.js 15, Framer Motion, and EmailJS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Setup Checklist

### 1. EmailJS (Contact Form)
1. Go to [emailjs.com](https://www.emailjs.com/) and create a free account
2. Create an **Email Service** (Gmail recommended) → copy the **Service ID**
3. Create an **Email Template** with these variables:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{subject}}` — subject
   - `{{message}}` — message body
4. Copy your **Template ID** and **Public Key**
5. Open `components/Contact.tsx` and replace:
   ```ts
   const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
   const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
   const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
   ```

### 2. CV Download
Place your CV PDF at: `public/cv/Jude_Dela_Cruz_CV.pdf`

### 3. Deploy to Vercel
```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments.

## Customization
- **Colors** → `app/globals.css` (CSS variables at `:root`)
- **Content** → Each component in `components/`
- **GitHub links** → Update `href` in `Projects.tsx` and `Footer.tsx`
