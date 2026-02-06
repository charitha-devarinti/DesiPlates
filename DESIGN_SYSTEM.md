# DesiPlates Design System

A lightweight design system built with CSS custom properties for consistency across the DesiPlates application.

---

## Color Palette

All colors are defined as CSS custom properties in `src/index.css`.

### Brand Colors

| Token                    | Value                      | Usage                          |
|--------------------------|----------------------------|--------------------------------|
| `--color-primary`        | `#CB202D`                  | Buttons, links, active states  |
| `--color-primary-hover`  | `#af1320`                  | Hover states on primary color  |
| `--color-primary-light`  | `rgba(203, 32, 45, 0.08)`  | Focus rings, subtle highlights |

### Text Colors

| Token                     | Value     | Usage                   |
|---------------------------|-----------|-------------------------|
| `--color-text`            | `#1a1a1a` | Primary body text       |
| `--color-text-secondary`  | `#555`    | Supporting text         |
| `--color-text-muted`      | `#888`    | Placeholder, captions   |
| `--color-text-inverse`    | `#fff`    | Text on dark/colored bg |

### Background Colors

| Token                  | Value                   | Usage                     |
|------------------------|-------------------------|---------------------------|
| `--color-bg`           | `#f5f5f5`               | Page background           |
| `--color-bg-card`      | `#fff`                  | Card surfaces             |
| `--color-bg-header`    | `#fff`                  | Header background         |
| `--color-bg-secondary` | `#f9f9f9`               | Info boxes, extra details |

### Border Colors

| Token                  | Value  | Usage              |
|------------------------|--------|--------------------|
| `--color-border`       | `#e5e5e5` | Standard borders |
| `--color-border-light` | `#eee`    | Subtle borders   |

### State Colors (Regional)

| Token               | Value     | Region           |
|---------------------|-----------|------------------|
| `--color-state-ap`  | `#E91E63` | Andhra Pradesh   |
| `--color-state-ts`  | `#9C27B0` | Telangana        |
| `--color-state-pb`  | `#FF9800` | Punjab           |
| `--color-state-rj`  | `#795548` | Rajasthan        |
| `--color-state-kl`  | `#2E7D32` | Kerala           |

---

## Spacing Scale

A consistent 4px-based spacing scale:

| Token          | Value  | Common Usage              |
|----------------|--------|---------------------------|
| `--space-xs`   | `4px`  | Tight gaps, badge padding |
| `--space-sm`   | `8px`  | Inner padding, small gaps |
| `--space-md`   | `16px` | Standard padding/margins  |
| `--space-lg`   | `24px` | Section spacing           |
| `--space-xl`   | `32px` | Page margins              |
| `--space-2xl`  | `48px` | Section breaks            |

---

## Border Radius

| Token            | Value      | Usage                     |
|------------------|------------|---------------------------|
| `--radius-sm`    | `8px`      | Badges, small elements    |
| `--radius-md`    | `12px`     | Cards, images             |
| `--radius-lg`    | `20px`     | Dropdowns, large elements |
| `--radius-full`  | `9999px`   | Pills, circles, buttons   |

---

## Shadows

| Token              | Value                            | Usage               |
|--------------------|----------------------------------|----------------------|
| `--shadow-sm`      | `0 1px 3px rgba(0,0,0,0.06)`    | Subtle lift          |
| `--shadow-md`      | `0 4px 12px rgba(0,0,0,0.08)`   | Card hover           |
| `--shadow-lg`      | `0 8px 24px rgba(0,0,0,0.1)`    | Elevated elements    |
| `--shadow-header`  | `0 2px 8px rgba(0,0,0,0.06)`    | Header bottom shadow |

---

## Typography

**Font Family:** Poppins (loaded via Google Fonts)

| Token          | Value         | Equivalent | Usage                  |
|----------------|---------------|------------|------------------------|
| `--font-xs`    | `0.75rem`     | 12px       | Badges, captions       |
| `--font-sm`    | `0.8125rem`   | 13px       | Extra info text        |
| `--font-base`  | `0.875rem`    | 14px       | Body text, inputs      |
| `--font-md`    | `1rem`        | 16px       | Buttons, dropdowns     |
| `--font-lg`    | `1.125rem`    | 18px       | Dish names             |
| `--font-xl`    | `1.25rem`     | 20px       | Prices                 |

### Font Weights

| Weight | Usage                              |
|--------|------------------------------------|
| 300    | Not currently used (available)     |
| 400    | Body text                          |
| 500    | Filter buttons                     |
| 600    | Headings, buttons, links, prices   |
| 700    | Bold emphasis                      |

---

## Transitions

| Token                  | Value        | Usage                   |
|------------------------|--------------|-------------------------|
| `--transition-fast`    | `0.15s ease` | Hover color changes     |
| `--transition-normal`  | `0.25s ease` | Transform animations    |

---

## Components

### DishCard (`.dishCard`)
- White card with light border and 12px radius
- Hover: lifts 6px with large shadow
- Contains: image container, info section, add-to-cart button
- Min height: 420px, max width: 280px
- Button stays pinned to bottom via `margin-top: auto`

### Rating Badge (`.rating-badge`)
- Positioned top-right of image container
- Dark green background with star + number
- Rounded corners (8px)

### State Badge (`.state-badge`)
- Positioned bottom-left of image container
- Dynamic background color based on state
- Small text with rounded corners

### Filter Buttons (`.filter-btn`)
- Pill-shaped (full radius) with 2px primary border
- Two states: `.active` (filled primary) and `.inactive` (white with primary text)
- Hover: lifts 2px with shadow

### Search Area (`.search-area`)
- Pill-shaped container with input + clear + search button
- Focus-within: primary border color with soft glow ring

### Add to Cart (`.add-cart-btn`)
- Full-width primary colored button
- 8px radius, 600 weight
- Hover: slightly darker with subtle shadow

### Load More (`.show-more-btn`)
- Centered, primary background, 8px radius
- Hover: darker background, lifts 2px

---

## Responsive Breakpoints

| Breakpoint    | Grid Columns | Margin       |
|---------------|-------------|--------------|
| > 1200px      | 4 columns   | 32px         |
| 901–1200px    | 3 columns   | 32px         |
| 561–900px     | 2 columns   | 16px         |
| ≤ 560px       | 1 column    | 16px         |

---

## File Structure

```
src/
├── index.css          ← Design tokens (:root custom properties)
├── App.css            ← Global styles, card grid, dish card, buttons
├── header.css         ← Header bar, search, dropdowns, cart
├── small_header.css   ← Filter button bar
└── components/
    ├── Header.jsx
    ├── SmallHeader.jsx
    ├── DishComponent.jsx
    └── DishList.jsx
```

---

## Usage Guidelines

1. **Always use design tokens** — never hardcode colors, spacing, or radius values
2. **Prefer CSS classes** over inline styles in JSX
3. **Only the state badge color** is set inline (dynamic per dish via `style={{ backgroundColor: badgeColor }}`)
4. **Use semantic class names** — `.dish-name`, `.dish-price`, `.dish-place` instead of targeting `p:nth-child()`
5. **Keep transitions consistent** — use `--transition-fast` for color changes, `--transition-normal` for transforms
