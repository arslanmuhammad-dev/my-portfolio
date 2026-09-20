# Portfolio development

## Commands

- `npm start` — Create React App development server.
- `npm run build` — production assets in `build/`.
- `CI=true npm test -- --watchAll=false` — contact form regression tests.
- `npx eslint src --max-warnings=0` — lint all source files.

The directory name contains an `=` sign; quote absolute paths in shell commands.

## Architecture

React 18 and Create React App, with the existing MUI ThemeProvider. This is a single anchor-navigation page; the installed react-router-dom dependency is not used. Preserve section anchors and existing control IDs.

`App.js` composes Header, Hero, About, Projects, Experience, Contact, and Footer. Shared reveal, arrow, navigation, and social components live in `components/Shared.js`. Personal project, experience, skills, and statistics data are centralized in `data/portfolio.js`; do not invent or silently change this information.

Global design tokens, responsive section styles, and animation definitions live in `index.css`. The design uses deep plum surfaces, cream text, a peach accent, Inter, and Fraunces. Original CSS geometry provides decorative imagery. `src/assets/avatar.png` is the existing personal portrait.

Motion uses CSS transforms and IntersectionObserver, without an animation dependency. Respect reduced-motion preferences. Reveals are progressive enhancements. Hero animation pauses outside the viewport. The native modal dialog provides focus containment and Escape dismissal. Desktop projects use native horizontal scroll snapping, filters, arrow controls, and keyboard navigation; mobile projects form a vertical list.

## Contact

EmailJS uses build-time `REACT_APP_EMAILJS_SERVICE_ID`, `REACT_APP_EMAILJS_TEMPLATE_ID`, and `REACT_APP_EMAILJS_PUBLIC_KEY`. Preserve the form field names `name`, `email`, `subject`, and `message`, which bind to the EmailJS template. Do not commit `.env` values. Tests mock EmailJS; do not send unsolicited test emails.

## Deployment

Existing Vercel project: `muhammad-arslan-portfolio`. Existing repository: `sheikh622/my-portfolio`, branch `main`. Keep `.vercel/`, `.env`, and generated `build/` gitignored. No hosting configuration changes are needed for this redesign.
