import os
from PIL import Image, ImageDraw, ImageFont

brand_dir = os.path.join(os.getcwd(), "public", "brand")
os.makedirs(os.path.join(brand_dir, "marks"), exist_ok=True)
os.makedirs(os.path.join(brand_dir, "favicons"), exist_ok=True)
os.makedirs(os.path.join(brand_dir, "social"), exist_ok=True)
os.makedirs(os.path.join(brand_dir, "hero"), exist_ok=True)
os.makedirs(os.path.join(brand_dir, "patterns"), exist_ok=True)
os.makedirs(os.path.join(brand_dir, "decor"), exist_ok=True)

def get_hs_mark_svg(navy="#102D5C", yellow="#FFC21A", cyan="#14BDEB", teal="#0D9DA6", orange="#FFA500", fold_light="#FFE57F"):
    return f"""<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none">
  <!-- Back Navy Structural Outer Frame -->
  <rect x="35" y="20" width="130" height="155" rx="10" stroke="{navy}" stroke-width="9" fill="none" />
  
  <!-- Angled Layered Colorful Cards Behind Center -->
  <!-- Top-Right Accent Card -->
  <rect x="110" y="25" width="45" height="65" rx="16" transform="rotate(25, 132, 57)" fill="{orange}" />
  
  <!-- Top Cyan Angle Card -->
  <rect x="65" y="20" width="75" height="75" rx="18" transform="rotate(35, 102, 57)" fill="{cyan}" />
  
  <!-- Bottom-Left Teal Angle Card -->
  <rect x="25" y="65" width="75" height="85" rx="18" transform="rotate(-15, 62, 107)" fill="{teal}" />
  
  <!-- Bottom Cyan Accent Card -->
  <rect x="70" y="110" width="85" height="65" rx="18" transform="rotate(18, 112, 142)" fill="{cyan}" />
  
  <!-- Central Golden-Yellow File Card with Dog-Ear Fold -->
  <g>
    <path d="M 55 45 C 55 36, 61 32, 70 32 L 125 32 C 127 32, 130 34, 132 36 L 148 52 C 150 54, 151 57, 151 60 L 151 155 C 151 164, 145 168, 136 168 L 65 168 C 56 168, 55 164, 55 155 Z" 
          fill="{yellow}" 
          stroke="{navy}" 
          stroke-width="9" 
          stroke-linejoin="round" />
          
    <!-- Dog-ear fold top-right -->
    <path d="M 125 33 L 125 53 C 125 56, 127 58, 130 58 L 150 58" 
          stroke="{navy}" 
          stroke-width="8" 
          stroke-linejoin="round" 
          fill="{fold_light}" />
  </g>
  
  <!-- Stylized Monogram HS in Deep Navy -->
  <g fill="none" stroke="{navy}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">
    <!-- Letter H -->
    <line x1="78" y1="76" x2="78" y2="130" />
    <line x1="78" y1="102" x2="100" y2="102" />
    <!-- Letter S looping seamlessly -->
    <path d="M 124 85 C 118 75, 96 74, 96 90 C 96 103, 128 98, 128 115 C 128 132, 106 132, 96 123" />
  </g>
</svg>"""

# 1. HS Marks
with open(os.path.join(brand_dir, "marks", "hs-mark.svg"), "w", encoding="utf-8") as f:
    f.write(get_hs_mark_svg())

with open(os.path.join(brand_dir, "marks", "hs-mark-small.svg"), "w", encoding="utf-8") as f:
    f.write(get_hs_mark_svg())

# 2. Favicons
with open(os.path.join(brand_dir, "favicons", "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(get_hs_mark_svg())

with open(os.path.join(os.getcwd(), "public", "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(get_hs_mark_svg())

# 3. Stacked & Primary Logo
logo_primary = f"""<svg viewBox="0 0 300 330" xmlns="http://www.w3.org/2000/svg" fill="none">
  <g transform="translate(50, 15)">
    {get_hs_mark_svg()}
  </g>
  <text x="150" y="295" 
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif" 
        font-size="28" 
        font-weight="800" 
        fill="#102D5C" 
        letter-spacing="-0.5px" 
        text-anchor="middle">
    HSDigitalStore
  </text>
</svg>"""

with open(os.path.join(brand_dir, "logo-primary.svg"), "w", encoding="utf-8") as f:
    f.write(logo_primary)

with open(os.path.join(brand_dir, "logo-stacked.svg"), "w", encoding="utf-8") as f:
    f.write(logo_primary)

# 4. Horizontal Logo
logo_horizontal = f"""<svg viewBox="0 0 340 70" xmlns="http://www.w3.org/2000/svg" fill="none">
  <g transform="translate(5, 5) scale(0.3)">
    {get_hs_mark_svg()}
  </g>
  <text x="75" y="46" 
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif" 
        font-size="28" 
        font-weight="800" 
        fill="#102D5C" 
        letter-spacing="-0.7px">
    HSDigital<tspan fill="#0D9DA6">Store</tspan>
  </text>
</svg>"""

with open(os.path.join(brand_dir, "logo-horizontal.svg"), "w", encoding="utf-8") as f:
    f.write(logo_horizontal)

# 5. Inverse Logo for Dark backgrounds
logo_inverse = f"""<svg viewBox="0 0 340 70" xmlns="http://www.w3.org/2000/svg" fill="none">
  <g transform="translate(5, 5) scale(0.3)">
    {get_hs_mark_svg(navy="#FFFFFF", yellow="#FFC21A", cyan="#14BDEB", teal="#2DD4BF", orange="#FBBF24", fold_light="#FEF08A")}
  </g>
  <text x="75" y="46" 
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif" 
        font-size="28" 
        font-weight="800" 
        fill="#F6F1E8" 
        letter-spacing="-0.7px">
    HSDigital<tspan fill="#FFC21A">Store</tspan>
  </text>
</svg>"""

with open(os.path.join(brand_dir, "logo-inverse.svg"), "w", encoding="utf-8") as f:
    f.write(logo_inverse)

# 6. Monochrome Logo
logo_mono = f"""<svg viewBox="0 0 340 70" xmlns="http://www.w3.org/2000/svg" fill="none">
  <g transform="translate(5, 5) scale(0.3)">
    {get_hs_mark_svg(navy="#102D5C", yellow="#E2E8F0", cyan="#CBD5E1", teal="#94A3B8", orange="#94A3B8", fold_light="#F1F5F9")}
  </g>
  <text x="75" y="46" 
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif" 
        font-size="28" 
        font-weight="800" 
        fill="#102D5C" 
        letter-spacing="-0.7px">
    HSDigitalStore
  </text>
</svg>"""

with open(os.path.join(brand_dir, "logo-monochrome.svg"), "w", encoding="utf-8") as f:
    f.write(logo_mono)

# 7. Watermark SVG
watermark_svg = f"""<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none" opacity="0.25">
  {get_hs_mark_svg(navy="#102D5C", yellow="#102D5C", cyan="#102D5C", teal="#102D5C", orange="#102D5C", fold_light="#FFFFFF")}
</svg>"""

with open(os.path.join(brand_dir, "marks", "watermark.svg"), "w", encoding="utf-8") as f:
    f.write(watermark_svg)

# 8. Patterns
pattern_light = """<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="24" height="32" rx="4" stroke="#102D5C" stroke-width="1.5" stroke-opacity="0.05" fill="none" transform="rotate(12, 22, 26)"/>
  <rect x="25" y="18" width="24" height="32" rx="4" stroke="#0D9DA6" stroke-width="1.5" stroke-opacity="0.06" fill="none" transform="rotate(-8, 37, 34)"/>
</svg>"""
with open(os.path.join(brand_dir, "patterns", "card-pattern-light.svg"), "w", encoding="utf-8") as f:
    f.write(pattern_light)

pattern_dark = """<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="24" height="32" rx="4" stroke="#F6F1E8" stroke-width="1.5" stroke-opacity="0.04" fill="none" transform="rotate(12, 22, 26)"/>
  <rect x="25" y="18" width="24" height="32" rx="4" stroke="#14BDEB" stroke-width="1.5" stroke-opacity="0.06" fill="none" transform="rotate(-8, 37, 34)"/>
</svg>"""
with open(os.path.join(brand_dir, "patterns", "card-pattern-dark.svg"), "w", encoding="utf-8") as f:
    f.write(pattern_dark)

# 9. Decor clusters
decor_01 = """<svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" fill="none">
  <rect x="60" y="30" width="110" height="140" rx="16" transform="rotate(18, 115, 100)" fill="#14BDEB" fill-opacity="0.12" stroke="#14BDEB" stroke-width="2" stroke-opacity="0.25"/>
  <rect x="30" y="50" width="120" height="150" rx="16" transform="rotate(-12, 90, 125)" fill="#0D9DA6" fill-opacity="0.10" stroke="#0D9DA6" stroke-width="2" stroke-opacity="0.25"/>
  <rect x="50" y="40" width="110" height="140" rx="16" fill="#FFC21A" fill-opacity="0.15" stroke="#FFC21A" stroke-width="2" stroke-opacity="0.35"/>
</svg>"""
with open(os.path.join(brand_dir, "decor", "card-cluster-01.svg"), "w", encoding="utf-8") as f:
    f.write(decor_01)

decor_02 = """<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none">
  <rect x="40" y="30" width="90" height="120" rx="14" transform="rotate(24, 85, 90)" fill="#FFC21A" fill-opacity="0.12"/>
  <rect x="30" y="40" width="90" height="120" rx="14" transform="rotate(-15, 75, 100)" fill="#14BDEB" fill-opacity="0.12"/>
  <rect x="45" y="35" width="85" height="110" rx="12" stroke="#102D5C" stroke-width="2" stroke-opacity="0.18" fill="none"/>
</svg>"""
with open(os.path.join(brand_dir, "decor", "card-cluster-02.svg"), "w", encoding="utf-8") as f:
    f.write(decor_02)

corner_accent = """<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none">
  <path d="M0 0 L120 0 C90 30, 70 70, 70 120 L0 120 Z" fill="#102D5C" fill-opacity="0.03"/>
  <circle cx="40" cy="40" r="22" fill="#FFC21A" fill-opacity="0.2"/>
  <circle cx="75" cy="30" r="12" fill="#14BDEB" fill-opacity="0.25"/>
</svg>"""
with open(os.path.join(brand_dir, "decor", "corner-accent.svg"), "w", encoding="utf-8") as f:
    f.write(corner_accent)

section_divider = """<svg width="100%" height="24" viewBox="0 0 1200 24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" fill="none">
  <path d="M0,12 C300,24 600,0 900,12 C1050,18 1150,12 1200,12 L1200,24 L0,24 Z" fill="#FAF7F2"/>
</svg>"""
with open(os.path.join(brand_dir, "decor", "section-divider.svg"), "w", encoding="utf-8") as f:
    f.write(section_divider)

# 10. Hero backgrounds
hero_bg_light = """<svg width="1440" height="600" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg" fill="none">
  <defs>
    <radialGradient id="heroGrad1" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#FFC21A" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#FFC21A" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="heroGrad2" cx="10%" cy="80%" r="50%">
      <stop offset="0%" stop-color="#14BDEB" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#14BDEB" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1440" height="600" fill="#F6F1E8"/>
  <rect width="1440" height="600" fill="url(#heroGrad1)"/>
  <rect width="1440" height="600" fill="url(#heroGrad2)"/>
</svg>"""
with open(os.path.join(brand_dir, "hero", "hero-background-light.svg"), "w", encoding="utf-8") as f:
    f.write(hero_bg_light)

hero_bg_dark = """<svg width="1440" height="600" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg" fill="none">
  <defs>
    <radialGradient id="darkGrad1" cx="75%" cy="25%" r="55%">
      <stop offset="0%" stop-color="#14BDEB" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#14BDEB" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="darkGrad2" cx="20%" cy="85%" r="45%">
      <stop offset="0%" stop-color="#FFC21A" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#FFC21A" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1440" height="600" fill="#102D5C"/>
  <rect width="1440" height="600" fill="url(#darkGrad1)"/>
  <rect width="1440" height="600" fill="url(#darkGrad2)"/>
</svg>"""
with open(os.path.join(brand_dir, "hero", "hero-background-dark.svg"), "w", encoding="utf-8") as f:
    f.write(hero_bg_dark)

# 11. Generate OG Default Image (1200x630) using Pillow
og_img = Image.new("RGB", (1200, 630), color="#F6F1E8")
draw = ImageDraw.Draw(og_img)

# Decorative background rects
draw.rounded_rectangle([750, 60, 1140, 560], radius=32, fill="#FFFFFF", outline="#102D5C", width=4)
draw.rounded_rectangle([790, 100, 1100, 520], radius=24, fill="#FFFBEB")

# Overlay logo mark on right
logo_path = os.path.join(brand_dir, "logo-primary.png")
if os.path.exists(logo_path):
    mark_img = Image.open(logo_path).convert("RGBA")
    mark_img = mark_img.resize((320, 320), Image.Resampling.LANCZOS)
    og_img.paste(mark_img, (810, 140), mark_img)

# Headline text representation
draw.text((80, 160), "HSDigitalStore", fill="#102D5C")
draw.text((80, 240), "Creative Marketplace & Design Studio", fill="#0D9DA6")
draw.text((80, 310), "Digital Downloads • Printable Art • Original Collections • POD", fill="#3E4D64")

og_img.save(os.path.join(brand_dir, "social", "og-default.png"))

print("All brand assets generated successfully!")
