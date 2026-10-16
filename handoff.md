# JGPS website — handoff for the next chat

## The assignment

Take ownership of making the JGPS website genuinely good. The homepage has gone through several rounds of AI-sounding copy and generic “editorial” styling. The user has clearly rejected the current result (2/10): it feels bland, not cool or distinctive enough, has too little interactivity, and fails to use the photography they supplied.

This is an implementation brief, not a request for another plan or another round of questions. Inspect the actual site, source code, and photographs; make the improvements; run and inspect the result.

## What the user wants

- A distinctive, beautifully art-directed website for JGPS Property Services—not a stock contractor template or an AI-generated-looking landing page.
- A homepage that puts JGPS’s real project work and abundant, user-provided photography front and centre.
- Meaningful interaction that helps people explore the work, not decorative animation for its own sake.
- Content grounded in the business and visible evidence. Avoid generic marketing filler and do not invent project names, locations, testimonials, credentials, or claims.
- A responsive, polished result that feels intentional on both desktop and mobile.

The business describes itself as renovation specialists, with a focus on renovations, kitchens, and bathrooms. It is based in Dublin and works across Leinster. The supplied logo uses black and white with an orange accent.

## Repository and current state

- Workspace: `C:\jgps`
- Git repository: `ryderwebsolutions/-jgps`
- Branch: `main`
- `origin`: `https://github.com/ryderwebsolutions/-jgps`
- Last known committed homepage work: `48069f6` — “Replace generic homepage copy with real project details.”
- At handoff, the only untracked work is `public/images/archive/`, containing 116 WebP conversions of the user's supplied JPEGs. Preserve and use these files; do not reconvert or remove them without a reason.
- No homepage redesign has yet been implemented in response to the user's latest 2/10 feedback.
- A shared browser tab may have the Vite site open at `http://127.0.0.1:5173/`. Reuse it if it is still running; otherwise start the dev server.

### Photo archive

The original photos are in the user's Downloads folder:

- `C:\Users\ryder\Downloads\WhatsApp Unknown 2026-10-13 at 20.41.34` — 67 bathroom photographs.
- `C:\Users\ryder\Downloads\WhatsApp Unknown 2026-10-13 at 20.41.49` — 49 additional interior photographs, including kitchens and bathrooms.

The converted files are in `public/images/archive/`:

- `bathroom-001.webp` through `bathroom-067.webp`
- `interior-001.webp` through `interior-049.webp`

These assets have not yet been added to the site's data model or displayed in the UI. Inspect the images themselves before writing image-specific captions or alt text. Do not pass off every frame as a separate project.

There are also 11 already-used optimized WebPs in `public/images/projects/`.

## Technical map

- React 19, TypeScript, Vite, React Router, and Lucide icons.
- `src/App.tsx` contains the site header/footer, all routes, the existing project lightbox, and `HomePage()`.
- `src/data.ts` contains project/service records, contact details, and the current homepage feature copy.
- `src/styles.css` is a large stylesheet (over 4,500 lines) containing multiple iterations and old homepage rules. Inspect relevant selectors and avoid adding another layer of redundant, contradictory overrides.
- `package.json` includes `npm run build` (TypeScript build plus Vite) and `npm run typecheck`.
- Existing routes: Home, Services, Projects, About, Contact.

The phone, WhatsApp, and email details currently in `src/data.ts` were drawn from public listings and have not been confirmed by the user. Do not invent additional contact details or make stronger claims about these existing ones.

## Instructions for the new chat

1. Read this handoff, then inspect the live homepage at desktop and mobile sizes, the relevant source files, the git diff/status, and the actual supplied photographs. Treat the existing page as a rejected baseline, not as a design direction to preserve.
2. Make an original, coherent design decision based on the real JGPS imagery and identity. Prioritize the photography, strong composition, specific visual details, confident typography, and a clear browsing experience over generic hero slogans and decorative effects.
3. Implement the homepage (and any directly related gallery/data changes) in the repo. Use the 116 new WebPs intelligently, with a fast initial render; avoid dumping 116 full-size images into the first screen. Provide real, accessible ways to browse and enlarge the work. Keep labels and captions factual.
4. Preserve existing routes and useful behavior. Use semantic HTML, keyboard-accessible controls, visible focus states, responsive layouts, and reduced-motion support where motion is introduced. Check image loading and browser-console errors.
5. Run `npm run build`, fix errors caused by the work, and inspect the rendered result in the browser at desktop and mobile sizes. Iterate against the actual screen, not just the source code.
6. Respect existing and user-owned changes. Do not reset, overwrite, force-push, or commit without explicit authorization. Report clearly what changed and what validation was run.

## Copy/paste prompt for the new chat

> You are taking over the JGPS website in `C:\jgps`. Read `handoff.md` first. The user has rejected the current homepage as a 2/10: generic, AI-looking, bland, not distinctive, insufficiently interactive, and not using enough of their photography. Do not just propose another concept or polish the existing copy—inspect the rendered page, source code, and the real project photos, then implement a noticeably better website.
>
> Your goal is a bespoke, modern, visually confident JGPS site rooted in real work and the supplied black/white/orange identity. Make the photography the substance of the experience. The archive has 116 converted WebPs in `public/images/archive/`; inspect the images before describing them. Present meaningful photo browsing and image enlargement, with performance, accessibility, and mobile usability handled properly. Do not mistake repeated photos for separate projects.
>
> Keep all claims factual. JGPS describes itself as renovation specialists focused on renovations, kitchens, and bathrooms, based in Dublin and working across Leinster. Do not invent project names, locations, testimonials, credentials, awards, outcomes, or generic “luxury/transformation” claims.
>
> Work end to end: inspect Git status and current browser output; make a strong, coherent design choice; implement it in the existing React/TypeScript/Vite app; run `npm run build`; and inspect the actual desktop and mobile pages in the browser and refine them. Preserve the other routes and existing user changes. Do not reset or overwrite user work, and do not commit or push without explicit authorization. In your final response, summarize the concrete improvements and validation honestly.
