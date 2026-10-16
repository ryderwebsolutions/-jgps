# JGPS Property Services

A responsive showcase website for JGPS Property Services, built with React, TypeScript, and Vite.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`; preview it locally with `npm run preview`.

## Deploy to Vercel

Import this repository in Vercel or run `vercel --prod` from the project directory. Vercel builds the site into `dist` and serves client-side routes such as `/services` directly.

## Site content

- Pages: Home, Services, Projects, About, and Contact.
- Portfolio photography is stored as optimized WebP files in `public/images/projects/`.
- Brand artwork is in `public/logo.png`.
- Contact details and project imagery labels are maintained in `src/data.ts`.
- The enquiry form opens a pre-filled email in the visitor’s default email app. It does not submit to or store information on a server.

The phone, WhatsApp number, and email currently use details found in public business listings and should be confirmed by JGPS before launch.
