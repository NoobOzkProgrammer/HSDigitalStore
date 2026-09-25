# HSDigitalStore — Official Brand Guidelines & Design System

## 1. Locked Logo Direction & Master Identity
The master brand mark is based on the layered cards and digital file motif:
- **Central Card:** Golden-Yellow (`#FFC21A`) file folder with rounded corners, top-right fold, and structural Deep Navy outline (`#102D5C`).
- **Monogram:** Custom stylized "HS" lettermark in Deep Navy.
- **Back Layered Cards:** Angled Cyan (`#14BDEB`), Teal (`#0D9DA6`), and Golden Orange (`#FFA500`) cards representing creative versatility across digital & physical media.
- **Wordmark:** Geometric bold typography `HSDigitalStore` with dual-tone emphasis.

### Logo Asset Directory (`/public/brand/`)
- `logo-primary.svg` & `logo-stacked.svg`: Full mark with centered wordmark below.
- `logo-horizontal.svg`: Scaled mark with right-aligned wordmark for navigation headers.
- `logo-inverse.svg`: White/Cream & Yellow treatment optimized for Deep Navy backgrounds.
- `logo-monochrome.svg`: Single-color navy version for print and high-contrast scenarios.
- `/marks/hs-mark.svg` & `hs-mark-small.svg`: Icon mark only for favicons, mobile headers, and watermarks.
- `/marks/watermark.svg`: Low-opacity monochrome version for product preview protection.
- `/favicons/`: Comprehensive multi-resolution favicons (`16x16`, `32x32`, `180x180`, `192x192`, `512x512`).

## 2. Core Color Palette
| Color Name | Hex Code | Primary Applications |
| :--- | :--- | :--- |
| **Deep Navy** | `#102D5C` | Outer strokes, primary headings, navbars, footers, primary buttons |
| **Golden Yellow** | `#FFC21A` | Hero accents, badges, sale highlights, primary focal elements |
| **Cyan** | `#14BDEB` | Secondary interactive accents, tags, digital download highlights |
| **Teal** | `#0D9DA6` | Category accents, supporting decorative graphics, borders |
| **Warm Cream** | `#F6F1E8` | Main site background, card surfaces, packaging motifs |

### Supporting UI Neutrals & States
- **Light Surface:** `#FAF7F2`
- **Card Surface:** `#FFFFFF`
- **Border Default:** `#E2DDD5`
- **Border Muted:** `#ECE7DE`
- **Text Strong:** `#102D5C`
- **Text Secondary:** `#3E4D64`
- **Text Muted:** `#6B7B96`
- **Success:** `#0E9F6E`
- **Error:** `#D9383A`
- **Warning:** `#D97706`

## 3. Clear Space & Minimum Sizes
- **Clear Space:** Maintain a minimum clear space equal to `1.0x` the stroke width of the central navy border around all sides of the logo.
- **Minimum Horizontal Logo Size:** 130px width on desktop, 100px on mobile.
- **Minimum Icon Mark Size:** 16px for favicons, 28px in app headers.

## 4. Typography System
- **Display / Headings:** Sans-serif / Inter / Geist Sans with tight letter tracking (`-0.025em`) and font weights 700/800.
- **Body & Product Content:** Clean modern sans-serif, high x-height, comfortable leading (`1.6`), font weights 400/500/600.
- **Monospace / SKU / Codes:** Monospace for technical file metadata, coupon codes, and order references.

## 5. UI Components & Design System
- **Buttons:**
  - *Primary Button:* Deep Navy background (`#102D5C`), white text, rounded corners (`rounded-xl`), soft hover lift.
  - *Accent CTA:* Golden Yellow background (`#FFC21A`), Deep Navy text (`#102D5C`), bold weight.
  - *Secondary / Ghost:* Warm Cream or White background with `#E2DDD5` border and `#102D5C` text.
- **Product Badges:**
  - *Digital Download:* Cyan pill (`bg-cyan-500/10 text-cyan-800 border-cyan-300`) with Download cloud icon.
  - *Print-on-Demand:* Teal pill (`bg-teal-500/10 text-teal-800 border-teal-300`) with Package icon.
  - *Best Seller:* Golden Yellow pill (`bg-amber-400 text-navy-900 font-bold`).
- **Border Radius:**
  - Badges/Tags: `rounded-full`
  - Buttons & Inputs: `rounded-xl` (12px)
  - Cards & Containers: `rounded-2xl` (16px)
  - Hero Panels: `rounded-3xl` (24px)

## 6. Logo Rules (Do's & Don'ts)
- **DO** use the official SVG / high-resolution PNG assets with transparent backgrounds.
- **DO** maintain strong contrast by using `logo-inverse.svg` on dark navy backgrounds.
- **DO NOT** stretch, distort, or skew the logo geometry.
- **DO NOT** alter the color sequence of the background layered cards.
- **DO NOT** replace the HS monogram with standard system typefaces.
- **DO NOT** crowd the logo mark with surrounding text or busy background photography.
