# Cycles Custom Cult — Website

A Next.js (App Router) site for Cycles Custom Cult. Monochrome, editorial,
photo-driven — built in the spirit of high-end custom moto sites.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Everything you'll edit lives in ONE file

`data/content.ts` — builds, space photos, FAQ, store products, and your
contact email. No need to touch the page code.

### Add your photos
Drop image files into `public/images/` and reference them in
`data/content.ts` as `/images/your-file.jpg`. Until then, labeled
placeholders show where each photo goes.

Key image filenames the pages look for (rename freely in content.ts):
- `hero.jpg` — homepage hero
- `process-1/2/3.jpg` — the Consultation / Build / Ride trio
- `about.jpg` — founder portrait
- `build-1-cover.jpg` … and gallery `build-1-a/b/c.jpg` (×4 builds)
- `space-1.jpg` … `space-6.jpg` — the build space
- `store-tee.jpg`, `store-cap.jpg`, etc. — products

### Set your email
In `data/content.ts`, change `CONTACT_EMAIL`. The "Send Email" button on the
**Build Me One** page and the store order links use it. It opens the visitor's
mail app pre-filled. (To send without a mail client, swap `handleSend` in
`app/build/page.tsx` for a call to a form service like Formspree or Resend.)

### The 4 builds
Already scaffolded in `data/content.ts` as Build No. 01–04 with placeholder
specs and galleries. Fill in `name`, `description`, `specs`, and image paths.

## Pages
- `/` home · `/builds` + `/builds/[slug]` · `/space` · `/about` · `/store`
  · `/faq` · `/build`

## Logo
`components/Logo.tsx` is an SVG recreation of the badge. To use the real
artwork instead, drop it in `public/images/logo.png` and swap the `<Logo/>`
usage in `components/Nav.tsx` for `<Image src="/images/logo.png" .../>`.
