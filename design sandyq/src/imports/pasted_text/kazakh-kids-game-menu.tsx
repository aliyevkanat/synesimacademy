Create a children's educational game main menu screen inspired by the 
reference image I'm attaching. The UI should be colorful, playful, and 
designed for 5-year-old Kazakh children.

=== OVERALL LAYOUT ===

Outer container:
- Large rounded rectangle (like a tablet frame)
- Background: deep purple (#5c35c5) as the outer frame
- Inner area: light sky-blue background with cartoon nature scene
  (rolling green hills, trees, clouds, blue sky)

=== TOP BAR ===

Left side: Fox character avatar (🦊) with name "Түлкішақ" and subtitle "Сиқырлы сандық"
Right side: Two round yellow buttons (settings ⚙️ and refresh 🔄)

=== THREE MAIN CARDS (center of screen) ===

Three large cards side by side with slight overlap effect.
Each card has a colored header section on top and white body below.

CARD 1 — "Ыстық және Суық" (Hot and Cold):
- Header background: warm orange-yellow gradient
- Header title: "Ыстық және Суық"
- Small cute thermometer character peeking from top of card
- Card body: illustration showing a hot desert sun on left 
  and cold snowflake/ice on right
- Bottom button: rounded purple button with text "Ойнау" (Play)
- Card accent color: orange #FF9500

CARD 2 — "Жұмсақ және Қатты" (Soft and Hard):
- Header background: bright yellow gradient  
- Header title: "Жұмсақ және Қатты"
- Small cute stone/pillow character peeking from top
- Card body: illustration showing a fluffy pillow on left 
  and a rock/stone on right
- Bottom button: rounded purple button with text "Ойнау" (Play)
- Card accent color: yellow #FFD700

CARD 3 — "Жеңіл және Ауыр" (Light and Heavy):
- Header background: fresh green gradient
- Header title: "Жеңіл және Ауыр"
- Small cute scale/balance character peeking from top
- Card body: illustration showing a feather on left 
  and a heavy weight on right
- Bottom button: rounded purple button with text "Ойнау" (Play)
- Card accent color: green #4CAF50

CARD STYLE for all three:
- border-radius: 24px
- box-shadow: 0 8px 24px rgba(0,0,0,0.2)
- width: ~300px each
- White body section with soft inner illustrations
- Small decorative character sitting on top corner of each card
  (like the panda in the reference image)

=== BOTTOM NAVIGATION BAR ===

Dark purple rounded bar at the bottom.
Three icon buttons on springs/platforms (like in the reference image):
- 🌡️ icon on spring → label "Ыстық-Суық"
- 🪨 icon on spring → label "Жұмсақ-Қатты"  
- ⚖️ icon on spring → label "Жеңіл-Ауыр"

Each bottom icon:
- Sits on a small spring/platform
- Rounded pill label below
- Active state: highlighted with white glow

=== BACKGROUND SCENE ===

Inside the main area behind the cards:
- Light blue sky
- Green cartoon hills
- Cartoon trees on left and right sides
- Small white clouds
- Overall feel: cheerful storybook illustration

=== DECORATIVE CHARACTERS ===

- Fox character (🦊) peeking from bottom-left corner, 
  holding a steering wheel (like the panda driver in reference)
- Small cute animal characters near each card
- Floating sparkles ✨ and stars scattered around

=== COLOR PALETTE ===

- Outer frame: #5c35c5 (deep purple)
- Sky background: #87CEEB (light blue)  
- Card 1 header: #FF9500 → #FFB347
- Card 2 header: #FFD700 → #FFF176
- Card 3 header: #66BB6A → #A5D6A7
- Buttons: #6B3FCC (purple)
- Button text: white, font-weight 700

=== TYPOGRAPHY ===

- Card titles: bold, white, 18-20px
- Button text: bold white, 16px
- Bottom nav labels: white, 12px
- Use a rounded friendly font (Nunito or Fredoka One)

=== TECHNICAL ===

Build as a single React component with Tailwind CSS.
Use framer-motion for:
- Cards: entrance animation staggered (delay 0.1, 0.2, 0.3)
- Bottom icons: bounce animation on the springs
- Fox character: subtle floating animation
Make it fully responsive for tablet (768px-1024px width).