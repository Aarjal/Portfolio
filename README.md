# Aarjal's Personal Portfolio

This repository contains the source code for my personal portfolio website. It is a single-page static site built with HTML, CSS, and vanilla JavaScript. The design features a dark/light glassmorphism style, smooth animations, and an interactive canvas particle background.

Live site: [aarjalbhattarai.com.np](http://aarjalbhattarai.com.np)

---

## Features and Interactions

The site is built entirely with native web standards to keep loading times fast and avoid heavy external framework dependencies. Key interactions include:

- **Custom Preloader:** A loading screen that fades out once all page assets are fully loaded.
- **Dynamic Particle Background:** An interactive HTML5 canvas particle system in the hero section that renders a moving network of nodes.
- **Custom Cursor:** A smooth dual-element cursor (a core dot with a trailing ring) that grows and reacts when hovering over links, buttons, and cards.
- **Typing Effect:** A simple looping typewriter animation displaying core developer disciplines.
- **Animated Counters:** Statistics (projects, experience years, happy clients) that count up dynamically when the page first loads.
- **Scroll Progress Indicator:** A bar at the top of the viewport indicating the user's current scroll percentage.
- **Theme Toggle:** Dark and light modes with preference persistence using localStorage.
- **Viewport Scroll Reveals:** Dynamic entry animations for sections as the user scrolls down, handled using the Intersection Observer API.
- **Project Filtering:** Clean scale and fade transitions when sorting projects by category (Websites, Web Apps, UI/UX).
- **Interactive Contact Form:** Styled input fields with floating labels, active border transitions, and visual success states upon form submission.

---

## Project Structure

- **index.html** - Main page structure and semantic content.
- **css/style.css** - Entry point stylesheet that imports base.css and sections.css.
- **css/base.css** - Global styles, resets, CSS custom variables, preloader, custom scrollbar, and cursor styles.
- **css/sections.css** - Layouts and stylings for individual page sections (Navbar, Hero, About, Skills, Projects, Services, Journey, Contact, Footer).
- **js/main.js** - Interactive behaviors, theme toggling, particle rendering, filter state, and reveal animations.
- **CNAME** - Configured custom domain for hosting.

---

## Customization

### Content and Text
All page text and layouts are structured in `index.html`. 
- **Hero / Stats:** Edit greeting texts and numerical statistics around line 58.
- **About:** Adjust bio, email, location, and info points around line 111.
- **Skills:** Modify titles, icons, and skill percentage values via the `data-skill` and `data-width` attributes around line 168.
- **Projects:** Add or edit project cards around line 229. Use `data-category="web"`, `"app"`, or `"ui"` to control the category filters.
- **Journey / Timeline:** Update experience items, roles, and dates around line 409.

### Dynamic Scripts
In `js/main.js`, you can modify key animation parameters:
- **Typing Text:** Update the words displayed in the typing loop around line 143:
  ```javascript
  const words = ['Modern Websites', 'Clean Code', 'Responsive UIs', 'Dynamic Animations'];
  ```
- **Particle Count:** Adjust the number of background particles by modifying `particleCount` on line 178.

### Styling and Themes
The design colors and variables are configured at the top of `css/base.css`. You can change the primary colors, background gradients, and accents:
```css
:root[data-theme="dark"] {
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121e;
  --accent: #7c5cfc; /* Primary brand color */
  ...
}

:root[data-theme="light"] {
  --bg-primary: #f9fafb;
  --bg-secondary: #ffffff;
  --accent: #6366f1; /* Primary brand color */
  ...
}
```

---

## Running Locally

To view the website locally, just double-click `index.html` to open it in your web browser.

---

## Deployment

The portfolio is deployed via GitHub Pages to a custom domain.

1. Set up a GitHub repository and push this directory.
2. Under repository **Settings** -> **Pages**, choose your branch (e.g. `main`) and root folder as the source.
3. The project includes a `CNAME` file configured with `aarjalbhattarai.com.np`. To map this correctly, ensure your domain provider's DNS records point to GitHub's server IPs.

---

## License

Feel free to clone, modify, and use this code for your own personal portfolio.
