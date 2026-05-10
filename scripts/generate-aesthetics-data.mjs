import fs from "node:fs";
import path from "node:path";

const SOURCE_REFERENCES = [
  {
    label: "Aesthetics Wiki list and visual index",
    url: "https://aesthetics.fandom.com/wiki/List_of_Aesthetics"
  },
  {
    label: "Figma web design trends",
    url: "https://www.figma.com/resource-library/web-design-trends/"
  },
  {
    label: "Swiss Style overview",
    url: "https://en.wikipedia.org/wiki/Swiss_Style_(design)"
  },
  {
    label: "New Wave typography overview",
    url: "https://en.wikipedia.org/wiki/New_Wave_(design)"
  },
  {
    label: "Vaporwave visual aesthetic overview",
    url: "https://en.wikipedia.org/wiki/Vaporwave"
  },
  {
    label: "Internet aesthetic overview",
    url: "https://en.wikipedia.org/wiki/Internet_aesthetic"
  }
];

const SEED_TEXT = `
Acid Graphics|Graphic Movements|Contemporary|experimental|acid, poster, rave, chroma
Acid House Flyer|Entertainment Events|1990s|loud|club, flyer, neon, music
Adaptive Color UI|Web UI|2026|balanced|accessibility, personalization, color
Afrofuturist Editorial|Editorial Print|Contemporary|bold|future, culture, pattern, story
AI Glass Dashboard|Web UI|2020s|balanced|ai, glass, product, interface
Alpine Expedition|Commerce Hospitality|Contemporary|balanced|outdoor, rugged, maps, travel
Analog Hi-Fi|Tech Futurism|1970s|balanced|audio, knobs, walnut, equipment
Anti-Design|Graphic Movements|2020s|experimental|chaos, web, raw, type
Apple Aqua|Web UI|2000s|bold|gloss, translucent, aqua, software
Arcade Neon|Internet Culture|1980s|loud|games, neon, pixel, night
Architectural Atelier|Interiors Architecture|Contemporary|quiet|plans, grid, concrete, portfolio
Archive Minimal|Editorial Print|Contemporary|quiet|library, documents, metadata, calm
Art Brut Poster|Graphic Movements|Modern|experimental|raw, outsider, drawing, poster
Art Deco Luxe|Graphic Movements|1920s|premium|gold, geometry, glamour, symmetry
Art Nouveau Botanical|Graphic Movements|1900s|premium|organic, floral, ornament, curves
Arts And Crafts|Craft Material|1900s|balanced|handmade, pattern, wood, textile
Atompunk|Tech Futurism|1950s|bold|atomic, space, retro, chrome
Avant Basic|Fashion Beauty|2020s|quiet|minimal, fashion, clean, ironic
Balletcore Editorial|Fashion Beauty|2020s|quiet|soft, ribbon, blush, delicate
Baroque Digital|Graphic Movements|Contemporary|maximal|ornate, chrome, drama, pattern
Bauhaus|Graphic Movements|1920s|bold|primary, geometry, rational, school
Bauhaus UI|Web UI|Contemporary|balanced|grid, primary, functional, interface
Bio-Tech Organic|Tech Futurism|Contemporary|experimental|biology, lab, synthetic, organic
Biophilic Calm|Interiors Architecture|Contemporary|quiet|plants, daylight, natural, wellness
Blackletter Modern|Editorial Print|Contemporary|bold|gothic, newspaper, contrast, type
Blob UI|Web UI|2020s|bold|soft, shapes, playful, interface
Blueprint Interface|Web UI|Contemporary|balanced|technical, drawing, grid, line
Bookish Academia|Internet Culture|2020s|quiet|books, study, wool, library
Boutique Hotel|Commerce Hospitality|Contemporary|premium|hospitality, rooms, local, elegant
Brazilian Modern|Interiors Architecture|1960s|balanced|tropical, concrete, wood, modern
Brat Green Pop|Fashion Beauty|2020s|loud|green, pop, music, rough
Bridal Minimal|Fashion Beauty|Contemporary|quiet|white, editorial, ceremony, soft
Brutalist Editorial|Editorial Print|Contemporary|bold|hard, type, raw, contrast
Brutalist Interior|Interiors Architecture|Contemporary|bold|concrete, mass, shadow, texture
Brutalist Minimalism|Web UI|2026|balanced|contrast, sparse, typography, web
Bubblegum Pop|Fashion Beauty|2000s|loud|pink, sweet, glossy, youth
Cabincore|Internet Culture|2020s|quiet|woods, wool, cabin, cozy
California Modern|Interiors Architecture|1950s|balanced|sun, glass, wood, indoor-outdoor
Candycore|Internet Culture|2020s|loud|sweet, pastel, glossy, color
Carson-Dellosa Classroom|Graphic Movements|1990s|loud|school, stickers, primary, playful
Cassette Futurism|Tech Futurism|1980s|balanced|analog, plastic, interface, sci-fi
Checkerboard Cafe|Commerce Hospitality|Contemporary|bold|restaurant, tile, diner, pattern
Chrome And Leather|Fashion Beauty|Contemporary|premium|chrome, black, fashion, sleek
Cinematic Noir|Editorial Print|1940s|quiet|shadow, film, detective, contrast
Civic Public Service|Civic Institutional|Contemporary|balanced|accessible, public, service, trust
Claymorphism|Web UI|2020s|balanced|soft, dimensional, pastel, app
Clean Girl Editorial|Fashion Beauty|2020s|quiet|beauty, neutral, minimal, polish
Cluttercore|Internet Culture|2020s|maximal|collection, shelf, layered, home
Coastal Gallery|Commerce Hospitality|Contemporary|quiet|sea, gallery, airy, art
Coastal Grandmother|Fashion Beauty|2020s|quiet|linen, coastal, neutral, lifestyle
Coastal Modern|Interiors Architecture|Contemporary|quiet|air, white, blue, relaxed
Code Noir|Web UI|Contemporary|quiet|dark, developer, mono, product
Collage Punk|Graphic Movements|1970s|loud|cutout, ransom, paper, music
Comic Pop|Graphic Movements|1960s|loud|halftone, speech, primary, comic
Command Line Chic|Web UI|Contemporary|balanced|terminal, mono, developer, dark
Constructivist Poster|Graphic Movements|1920s|bold|red, diagonal, propaganda, type
Corporate Memphis|Web UI|2010s|balanced|illustration, rounded, people, startup
Cottagecore|Internet Culture|2020s|quiet|pastoral, handmade, flowers, slow
Craft Beer Label|Commerce Hospitality|Contemporary|bold|label, illustration, can, local
Cyber Dashboard|Web UI|Contemporary|bold|data, dark, neon, control
Cyberdelic|Tech Futurism|Contemporary|experimental|psychedelic, cyber, glow, pattern
Cyberpunk|Tech Futurism|1980s|loud|neon, rain, city, dystopia
Dada Collage|Graphic Movements|1920s|experimental|absurd, cutout, type, collage
Dark Academia|Internet Culture|2020s|quiet|library, tweed, candle, study
Dark Mode Deluxe|Web UI|2020s|premium|dark, product, glow, interface
Data Editorial|Editorial Print|Contemporary|balanced|charts, publication, evidence, grid
De Stijl|Graphic Movements|1920s|bold|primary, grid, abstraction, modern
Decora Pop|Fashion Beauty|1990s|loud|accessories, color, maximal, youth
Desert Modern|Interiors Architecture|Contemporary|quiet|sand, stucco, terracotta, light
Dieselpunk|Tech Futurism|1940s|bold|industrial, machine, metal, retro
Digital Scrapbook|Internet Culture|2026|bold|notes, stickers, personal, collage
Diner Americana|Commerce Hospitality|1950s|bold|chrome, red, menu, roadside
Dopamine Decor|Interiors Architecture|2020s|loud|color, joy, pattern, home
Dopamine UI|Web UI|2026|loud|saturated, playful, bright, web
Dreamcore|Internet Culture|2020s|experimental|dream, soft, uncanny, surreal
Editorial SaaS|Web UI|Contemporary|balanced|product, type, business, calm
Electric Brutalism|Web UI|2020s|loud|brutalist, neon, grid, web
Emo Revival|Fashion Beauty|2000s|bold|black, pink, music, youth
Enterprise Calm|Web UI|Contemporary|quiet|b2b, product, trust, dashboard
Experimental Type Lab|Graphic Movements|Contemporary|experimental|letters, motion, variable, poster
Fashion Monochrome|Fashion Beauty|Contemporary|premium|black, white, runway, editorial
Festival Poster|Entertainment Events|Contemporary|loud|lineup, type, ticket, music
Financial Trust|Civic Institutional|Contemporary|quiet|finance, navy, consultation, stable
Flat 2.0|Web UI|2010s|balanced|flat, color, interface, simple
Food Zine|Commerce Hospitality|Contemporary|bold|recipes, tomato, print, casual
Frasurbane|Internet Culture|1990s|premium|sitcom, urban, polished, sophisticated
French New Wave Poster|Editorial Print|1960s|bold|film, type, grain, cinema
Frutiger Aero|Internet Culture|2000s|bold|aqua, glass, sky, technology
Frutiger Metro|Internet Culture|2000s|bold|urban, vector, transit, color
Futurist Typography|Graphic Movements|1910s|experimental|speed, type, motion, machine
Gallery White Cube|Interiors Architecture|Contemporary|quiet|gallery, white, art, space
Game Manual Retro|Editorial Print|1990s|bold|manual, game, diagram, pixel
Gilded Minimalism|Fashion Beauty|Contemporary|premium|gold, quiet, luxury, sparse
Glassmorphism|Web UI|2020s|balanced|glass, blur, depth, interface
Glitch Art|Internet Culture|2000s|experimental|corrupt, digital, error, pixel
Glossy Magazine|Editorial Print|Contemporary|premium|fashion, editorial, image, type
Gorpcore Retail|Fashion Beauty|2020s|balanced|outdoor, technical, utility, retail
Gradient Mesh|Web UI|2020s|bold|gradient, smooth, digital, color
Grandmillennial|Interiors Architecture|2020s|premium|floral, classic, pattern, home
Graphic Novel Noir|Editorial Print|Contemporary|bold|ink, panels, shadow, story
Grunge Revival|Graphic Movements|1990s|bold|distressed, music, texture, type
Hand-Drawn SaaS|Web UI|2026|balanced|illustration, human, software, sketch
Hard Edge Abstraction|Graphic Movements|1960s|bold|flat, geometric, color, edge
Harajuku Street|Fashion Beauty|1990s|loud|street, color, layered, youth
Heritage Workwear|Fashion Beauty|Contemporary|balanced|canvas, denim, utility, vintage
High Gloss Magazine|Editorial Print|Contemporary|premium|fashion, glossy, cover, editorial
High Tech Industrial|Interiors Architecture|1980s|bold|steel, exposed, systems, architecture
Holographic Chrome|Fashion Beauty|2020s|loud|iridescent, chrome, beauty, future
Hypercard Revival|Web UI|1980s|balanced|cards, bitmap, old mac, interface
Hyperpop Visuals|Internet Culture|2020s|loud|music, neon, collage, distortion
Indie Sleaze|Fashion Beauty|2000s|bold|flash, nightlife, denim, rough
Industrial Loft|Interiors Architecture|1990s|balanced|brick, steel, open, urban
Ink Illustration|Craft Material|Timeless|quiet|line, paper, drawing, handmade
International Typographic Style|Graphic Movements|1950s|quiet|grid, sans, rational, Swiss
Italian Futurist Poster|Graphic Movements|1910s|bold|speed, machine, diagonal, type
Japandi|Interiors Architecture|Contemporary|quiet|wood, calm, Japanese, Scandinavian
Japanese City Pop|Internet Culture|1980s|bold|pastel, city, music, nostalgia
Japanese Modernism|Interiors Architecture|1960s|quiet|wood, void, asymmetry, restraint
Kawaii Interface|Web UI|Contemporary|loud|cute, pastel, icons, playful
Kidcore|Internet Culture|2020s|loud|primary, toys, stickers, childhood
Kinetic Typography|Web UI|2026|bold|motion, type, interaction, hero
Kitsch Americana|Commerce Hospitality|1960s|bold|novelty, roadside, diner, souvenirs
Laboratory Clean|Tech Futurism|Contemporary|quiet|lab, white, sterile, biotech
Learning Lab|Civic Institutional|Contemporary|balanced|education, course, progress, friendly
Light Academia|Internet Culture|2020s|quiet|study, cream, books, sunlight
Liminal Space|Internet Culture|2020s|experimental|empty, uncanny, architecture, quiet
Liquid Metal UI|Web UI|2026|premium|metal, fluid, interface, chrome
Lo-Fi Zine|Editorial Print|Contemporary|bold|xerox, photocopy, music, paper
Logomania|Fashion Beauty|1990s|bold|logo, pattern, fashion, brand
Luxury Mono Gallery|Commerce Hospitality|Contemporary|premium|monochrome, gallery, refined, image
Mallsoft|Internet Culture|2010s|quiet|mall, vapor, ambient, commerce
Material Design|Web UI|2010s|balanced|system, shadow, motion, interface
Maximalist Collage|Graphic Movements|Contemporary|maximal|layered, image, color, poster
McBling|Fashion Beauty|2000s|loud|rhinestone, pink, chrome, celebrity
Mediterranean Modern|Interiors Architecture|Contemporary|balanced|plaster, tile, blue, sun
Memphis Milano|Graphic Movements|1980s|loud|squiggle, laminate, pattern, color
Memphis UI|Web UI|Contemporary|bold|pattern, shapes, interface, playful
Metaverse Retail|Commerce Hospitality|2020s|experimental|3d, avatar, digital, shop
Mexican Modernist|Interiors Architecture|1950s|bold|color, courtyard, tile, modern
Micro-Luxury App|Web UI|2020s|premium|premium, product, detail, dark
Mid-Century Modern|Interiors Architecture|1950s|balanced|wood, clean, furniture, modern
Minimalist Longform|Editorial Print|Contemporary|quiet|reading, serif, essay, calm
Mission Revival|Interiors Architecture|1910s|balanced|stucco, arch, tile, heritage
Modern Farmhouse|Interiors Architecture|2010s|quiet|white, wood, rural, simple
Modular Swiss SaaS|Web UI|Contemporary|quiet|grid, product, typography, precise
Monochrome Product|Web UI|Contemporary|premium|black, white, product, sparse
Moroccan Mosaic|Interiors Architecture|Timeless|bold|tile, pattern, courtyard, color
Museum Label|Editorial Print|Contemporary|quiet|caption, art, institution, clean
Mystic CMS Oracle|Internet Culture|Contemporary|bold|cards, symbols, occult, archive
Neo Bauhaus Commerce|Commerce Hospitality|Contemporary|bold|shop, geometric, primary, product
Neo-Brutalist App|Web UI|2020s|bold|border, flat, loud, interface
Neo-Expressionist Poster|Graphic Movements|1980s|loud|paint, gesture, art, poster
Neon Control Room|Tech Futurism|Contemporary|bold|control, data, glow, dark
Neon Night Market|Entertainment Events|Contemporary|loud|vendors, night, signs, event
Neumorphism|Web UI|2020s|quiet|soft, embossed, app, surface
New Romantic|Fashion Beauty|1980s|bold|dramatic, satin, music, fashion
New Wave Typography|Graphic Movements|1970s|experimental|type, postmodern, kinetic, layout
Nightclub Minimal|Entertainment Events|Contemporary|premium|dark, club, sparse, type
No-Code Pastel|Web UI|2020s|quiet|creator, pastel, templates, friendly
Nordic Editorial|Editorial Print|Contemporary|quiet|minimal, serif, white, culture
Normcore|Fashion Beauty|2010s|quiet|plain, everyday, anti-style, neutral
Nouveau Tech|Tech Futurism|Contemporary|premium|organic, technology, elegant, line
Op Art|Graphic Movements|1960s|experimental|optical, pattern, black-white, movement
Organic Wellness|Commerce Hospitality|Contemporary|quiet|botanical, appointment, calm, health
Outrun|Internet Culture|1980s|loud|sunset, grid, car, neon
Pacific Northwest Brand|Commerce Hospitality|Contemporary|balanced|forest, craft, local, outdoor
Parisian Apartment|Interiors Architecture|Timeless|premium|molding, parquet, art, classic
Pastel Brutalism|Web UI|2020s|bold|pastel, border, web, type
Pixel Shrine|Internet Culture|1990s|bold|pixel, web, shrine, bitmap
Playful Maker Studio|Commerce Hospitality|Contemporary|bold|creator, studio, color, portfolio
Poetcore|Internet Culture|2026|quiet|poetry, books, romantic, soft
Pop Art|Graphic Movements|1960s|loud|consumer, comic, bright, repetition
Post-Internet Gallery|Graphic Movements|2010s|experimental|digital, gallery, screen, culture
Postmodern Corporate|Graphic Movements|1980s|bold|corporate, color, geometry, irony
Precision Grid|Web UI|Contemporary|quiet|grid, product, alignment, system
Product Docs|Web UI|Contemporary|quiet|documentation, search, code, utility
Psychedelic Poster|Graphic Movements|1960s|experimental|swirl, color, music, type
Quiet Luxury|Fashion Beauty|2020s|premium|cashmere, neutral, refined, sparse
Quiet SaaS|Web UI|Contemporary|quiet|b2b, calm, dashboard, trust
Racing Stripe Modern|Entertainment Events|1970s|bold|speed, sport, stripe, retro
Radical Simplicity|Graphic Movements|2026|quiet|minimal, bold, structure, clarity
Reality Warp|Internet Culture|2026|experimental|liminal, surreal, dream, ai
Regencycore|Fashion Beauty|2020s|premium|romantic, period, pastel, formal
Retro Web 1.0|Web UI|1990s|bold|web, table, gif, nostalgic
Retrofuturism|Tech Futurism|Contemporary|bold|future, retro, chrome, optimism
Risograph|Craft Material|Contemporary|bold|print, grain, ink, poster
Rococo Revival|Fashion Beauty|Contemporary|maximal|ornate, pastel, gold, romance
Royalcore|Fashion Beauty|2020s|premium|velvet, crown, palace, formal
Scandinavian Modern|Interiors Architecture|1950s|quiet|wood, white, functional, cozy
Scene Graphics|Internet Culture|2000s|loud|music, neon, hair, internet
Sci-Fi Medical|Tech Futurism|Contemporary|quiet|clinic, future, clean, data
Scrapbook Notes|Editorial Print|2026|bold|paper, sticker, personal, handwritten
Sea Glass UI|Web UI|Contemporary|quiet|coastal, translucent, soft, blue
Seapunk|Internet Culture|2010s|loud|aqua, web, ocean, neon
Shabby Chic|Interiors Architecture|1990s|quiet|whitewash, floral, vintage, soft
Skeuomorphic Desk|Web UI|2000s|balanced|leather, paper, object, app
Skater Zine|Internet Culture|1990s|bold|skate, photocopy, sticker, youth
Soft Grunge|Fashion Beauty|2010s|bold|pastel, black, music, tumblr
Soft Rounded App|Web UI|2020s|quiet|rounded, friendly, product, mobile
Solarpunk|Tech Futurism|Contemporary|balanced|green, future, community, sun
Space Age|Tech Futurism|1960s|bold|space, white, chrome, curves
Sports Card Americana|Entertainment Events|1960s|bold|cards, stats, team, vintage
Stained Glass Modern|Craft Material|Contemporary|bold|color, lead, light, geometric
Steampunk|Tech Futurism|Victorian|bold|brass, gears, leather, retro
Streetwear Drop|Fashion Beauty|Contemporary|bold|limited, hype, product, urban
Streamline Moderne|Graphic Movements|1930s|premium|speed, chrome, curve, deco
Studio Grit|Craft Material|Contemporary|balanced|process, paint, dust, studio
Suprematist Grid|Graphic Movements|1910s|bold|abstract, square, white, modern
Surreal Editorial|Editorial Print|Contemporary|experimental|dream, fashion, art, image
Swiss International|Graphic Movements|1950s|quiet|grid, Helvetica, poster, rational
Swiss Punk|Graphic Movements|1980s|bold|grid, disruption, type, music
Synthwave|Internet Culture|1980s|loud|neon, grid, sunset, synth
Tactile Plaster|Craft Material|Contemporary|quiet|plaster, texture, neutral, material
Techwear Interface|Fashion Beauty|Contemporary|balanced|black, utility, modular, future
Terminal Green|Web UI|1980s|balanced|terminal, green, mono, code
Terrazzo Pop|Craft Material|Contemporary|bold|chips, material, colorful, surface
Textile Folk Modern|Craft Material|Contemporary|balanced|weaving, pattern, handmade, global
Theater Playbill|Entertainment Events|Timeless|bold|type, ticket, stage, print
Tiny Studio Portfolio|Web UI|Contemporary|quiet|portfolio, personal, minimal, art
Tomato Girl Summer|Fashion Beauty|2020s|bold|tomato, mediterranean, food, lifestyle
Toy-Like Product|Commerce Hospitality|Contemporary|loud|plastic, color, product, playful
Translucent AI|Web UI|Contemporary|premium|ai, glass, gradient, product
Tropical Modern|Interiors Architecture|Contemporary|balanced|plants, concrete, resort, breeze
Tuscan Revival|Interiors Architecture|1990s|balanced|stone, warm, vineyard, rustic
Typographic Brutalism|Editorial Print|Contemporary|bold|type, black, raw, publication
Ukiyo-e Pop|Graphic Movements|Contemporary|bold|woodblock, wave, flat, illustration
Ultra-Minimal Fashion|Fashion Beauty|Contemporary|quiet|white, black, sparse, runway
Utopian Virtual|Internet Culture|2010s|experimental|vapor, chrome, mall, synthetic
Vaporwave|Internet Culture|2010s|loud|vapor, mall, roman, glitch
VHS Horror Poster|Entertainment Events|1980s|bold|vhs, tape, grain, film
Victorian Specimen|Editorial Print|1800s|maximal|ornament, type, catalog, antique
Vintage Botanical|Craft Material|Timeless|quiet|plant, engraving, paper, natural
Vintage Newspaper|Editorial Print|1930s|balanced|newsprint, column, masthead, archive
Vogue Minimal|Fashion Beauty|Contemporary|premium|fashion, serif, white, image
Warm Minimalism|Interiors Architecture|Contemporary|quiet|wood, beige, light, calm
Webcore|Internet Culture|2000s|bold|desktop, icons, browser, nostalgia
Weird Web|Internet Culture|1990s|experimental|internet, handmade, odd, bitmap
Western Gothic|Fashion Beauty|Contemporary|bold|desert, black, silver, cinematic
White Cube Commerce|Commerce Hospitality|Contemporary|premium|gallery, product, sparse, retail
Woodblock Poster|Craft Material|Timeless|balanced|print, carved, ink, texture
Xerox Zine|Editorial Print|1980s|bold|copy, punk, texture, staple
Y2K Chrome|Internet Culture|2000s|loud|chrome, bubble, blue, glossy
Y3K Interface|Tech Futurism|2020s|experimental|future, chrome, avatar, digital
Zen Monochrome|Interiors Architecture|Contemporary|quiet|black, white, calm, void
3D Clay Mascot|Web UI|2020s|balanced|3d, mascot, clay, friendly
3D Inflatable Type|Graphic Movements|2020s|loud|type, inflatable, glossy, playful
90s Nickelodeon Splash|Internet Culture|1990s|loud|orange, slime, kids, tv
90s Rave Poster|Entertainment Events|1990s|loud|rave, flyer, acid, club
Airport Wayfinding|Civic Institutional|1960s|quiet|signage, arrows, systems, transit
Album Liner Notes|Editorial Print|1970s|balanced|music, booklet, typography, credits
Apothecary Label|Commerce Hospitality|Timeless|premium|label, serif, medicine, glass
App Store Clean|Web UI|2010s|quiet|mobile, product, white, app
Art School Portfolio|Editorial Print|Contemporary|experimental|student, portfolio, critique, mixed
Athletic Club Heritage|Entertainment Events|1930s|balanced|sport, crest, type, badge
Banker's Modern|Civic Institutional|Contemporary|quiet|finance, marble, navy, trust
Beauty Lab|Fashion Beauty|Contemporary|premium|skincare, lab, glass, clean
Bento Grid|Web UI|2020s|balanced|cards, modular, product, layout
Book Cover Modernist|Editorial Print|1960s|balanced|cover, grid, type, literature
Botanical Pharmacy|Commerce Hospitality|Contemporary|quiet|plants, wellness, label, calm
Branded Utility|Web UI|Contemporary|balanced|system, brand, practical, product
Brass Instrument Shop|Commerce Hospitality|Timeless|premium|music, brass, craft, warm
Camera Store Retro|Commerce Hospitality|1970s|balanced|photo, lens, analog, shop
Campus Modern|Civic Institutional|Contemporary|balanced|education, brick, map, institution
Ceramic Studio|Craft Material|Contemporary|quiet|clay, handmade, kiln, shop
Chocolate Box Luxury|Commerce Hospitality|Timeless|premium|packaging, brown, gold, gift
City Government Classic|Civic Institutional|Contemporary|quiet|service, public, seal, clear
Color Field Gallery|Graphic Movements|1960s|bold|large, color, art, abstract
Concert Bootleg|Entertainment Events|1990s|bold|shirt, music, merch, distressed
Construction Manual|Editorial Print|Contemporary|balanced|diagram, steps, utility, yellow
Contemporary Museum|Civic Institutional|Contemporary|quiet|museum, exhibition, white, type
Cosmic Wellness|Commerce Hospitality|Contemporary|experimental|stars, calm, ritual, wellness
Country Club Prep|Fashion Beauty|1980s|premium|prep, green, stripe, sport
Data Center Cool|Tech Futurism|Contemporary|quiet|server, blue, infrastructure, clean
Day Spa Neutral|Commerce Hospitality|Contemporary|quiet|spa, stone, linen, calm
Deep Sea Tech|Tech Futurism|Contemporary|bold|blue, depth, data, exploration
Digital Brutalist Museum|Web UI|Contemporary|bold|museum, type, black, web
Downtown Arts District|Entertainment Events|Contemporary|bold|arts, posters, urban, culture
Editorial Commerce|Commerce Hospitality|Contemporary|premium|shop, magazine, product, story
Emergency Info System|Civic Institutional|Contemporary|bold|alert, utility, public, high-contrast
Energy Drink Maximal|Commerce Hospitality|Contemporary|loud|can, sport, neon, extreme
Experimental Archive|Editorial Print|Contemporary|experimental|archive, database, art, metadata
Field Guide|Editorial Print|Timeless|balanced|nature, diagrams, notes, practical
Film Festival Modern|Entertainment Events|Contemporary|premium|cinema, schedule, poster, culture
Fine Dining Menu|Commerce Hospitality|Contemporary|premium|restaurant, menu, serif, restrained
Fitness App Pulse|Web UI|Contemporary|bold|fitness, metrics, motion, app
Floral maximalism|Interiors Architecture|Contemporary|maximal|floral, wallpaper, color, home
Furniture Catalog Modern|Commerce Hospitality|Contemporary|quiet|furniture, product, grid, showroom
Futuristic Finance|Tech Futurism|Contemporary|premium|finance, data, dark, digital
Gaming Clan UI|Entertainment Events|Contemporary|loud|esports, badge, dark, neon
Garden Center|Commerce Hospitality|Contemporary|balanced|plants, retail, green, local
GeoCities Handmade|Internet Culture|1990s|loud|web, homemade, gif, nostalgia
Grocery Circular|Commerce Hospitality|1980s|loud|sale, food, print, bold
Handmade Market|Craft Material|Contemporary|balanced|maker, stall, craft, local
Hardware Store Utility|Commerce Hospitality|Timeless|balanced|tools, aisle, yellow, practical
Healthcare Clarity|Civic Institutional|Contemporary|quiet|health, accessible, blue, calm
Herbarium Archive|Editorial Print|Timeless|quiet|plants, specimen, archive, label
High Desert Motel|Commerce Hospitality|1970s|bold|motel, sign, desert, retro
Humanist Tech|Web UI|Contemporary|balanced|technology, people, warm, interface
Indigo Workshop|Craft Material|Timeless|quiet|dye, cloth, handmade, blue
Jazz Club Poster|Entertainment Events|1950s|premium|jazz, night, type, music
Journal App|Web UI|Contemporary|quiet|notes, writing, personal, calm
Kinetic Sports Broadcast|Entertainment Events|Contemporary|loud|sports, motion, stats, broadcast
Law Office Modern|Civic Institutional|Contemporary|quiet|legal, trust, serif, professional
Library Card Catalog|Civic Institutional|Timeless|quiet|library, cards, wood, archive
Limited Edition Drop|Commerce Hospitality|Contemporary|bold|streetwear, launch, product, timer
Little Magazine|Editorial Print|1960s|balanced|literary, small press, serif, archive
Local Newsroom|Civic Institutional|Contemporary|balanced|news, community, clear, archive
Luxury Fragrance|Fashion Beauty|Contemporary|premium|perfume, glass, black, gold
Machine Age Poster|Graphic Movements|1930s|bold|industry, gear, speed, poster
Magazine Index|Editorial Print|Contemporary|balanced|contents, issue, grid, publishing
Manga Screentone|Graphic Movements|Contemporary|bold|screentone, panel, ink, pop
Marble Clinic|Civic Institutional|Contemporary|premium|clinic, marble, calm, trust
Marketplace Directory|Web UI|Contemporary|balanced|search, listings, filters, commerce
Material Honesty|Interiors Architecture|2026|quiet|wood, concrete, plaster, sustainable
Microcopy Friendly|Web UI|Contemporary|quiet|friendly, product, copy, interface
Minimal Wedding|Commerce Hospitality|Contemporary|premium|wedding, white, serif, elegant
Monastic Minimal|Interiors Architecture|Timeless|quiet|stone, silence, restraint, light
Music Blog 2007|Internet Culture|2000s|bold|blog, mp3, sidebar, indie
Naturalist Brand|Commerce Hospitality|Contemporary|quiet|nature, texture, organic, product
Newspaper Website Modern|Web UI|Contemporary|balanced|news, subscription, grid, reading
Night Train Deco|Entertainment Events|1930s|premium|travel, deco, dark, gold
Office Supply Nostalgia|Internet Culture|1990s|balanced|paper, binder, desktop, office
Old Money Equestrian|Fashion Beauty|Timeless|premium|heritage, leather, cream, sport
Organic Grocery|Commerce Hospitality|Contemporary|balanced|food, produce, green, local
Paper Engineering|Craft Material|Contemporary|balanced|fold, cut, paper, shadow
Pharma Futurism|Tech Futurism|Contemporary|quiet|medical, data, clean, science
Photo Contact Sheet|Editorial Print|Timeless|balanced|photography, archive, black, grid
Pictogram System|Civic Institutional|1960s|quiet|icons, signage, public, clarity
Pixel Art Commerce|Commerce Hospitality|Contemporary|bold|pixel, shop, games, product
Plastic Fantastic|Fashion Beauty|1960s|loud|plastic, mod, color, pop
Podcast Network|Entertainment Events|Contemporary|balanced|audio, show, cover, media
Political Campaign Modern|Civic Institutional|Contemporary|bold|campaign, poster, civic, action
Poolside Modern|Commerce Hospitality|1960s|premium|resort, pool, sun, leisure
Postcard Travel|Commerce Hospitality|Timeless|bold|travel, postcard, stamp, destination
Premium Tech Support|Web UI|Contemporary|quiet|support, trust, product, help
Psychedelic Wellness|Commerce Hospitality|Contemporary|experimental|color, therapy, pattern, calm
Public Transit Modern|Civic Institutional|Contemporary|balanced|transit, map, schedule, signage
Pulp Paperback|Editorial Print|1950s|bold|cover, pulp, drama, illustration
Queer Club Poster|Entertainment Events|Contemporary|loud|club, identity, poster, nightlife
Reading App Serenity|Web UI|Contemporary|quiet|reading, app, sepia, calm
Research Lab|Civic Institutional|Contemporary|quiet|science, institute, data, white
Resort Editorial|Commerce Hospitality|Contemporary|premium|travel, resort, magazine, sunny
Roadside Motel|Commerce Hospitality|1960s|bold|sign, neon, travel, retro
Robot Toy Future|Tech Futurism|1960s|bold|toy, chrome, future, playful
Sailor Stripe Classic|Fashion Beauty|Timeless|balanced|stripe, navy, coastal, crisp
School Workbook|Civic Institutional|1990s|balanced|education, worksheet, bright, clear
Science Fair|Civic Institutional|1990s|bold|poster, experiment, school, playful
Security Console|Tech Futurism|Contemporary|balanced|security, dashboard, dark, alert
Serif Startup|Web UI|2020s|quiet|startup, serif, minimal, warm
Service Directory|Civic Institutional|Contemporary|balanced|directory, public, cards, search
Silicon Valley 2014|Web UI|2010s|balanced|startup, blue, illustration, app
Slow Fashion Atelier|Fashion Beauty|Contemporary|quiet|fabric, studio, craft, ethical
Social App Candy|Web UI|2020s|loud|social, bright, mobile, playful
Soft Corporate|Web UI|Contemporary|quiet|business, rounded, calm, professional
Soft Industrial|Interiors Architecture|Contemporary|balanced|metal, warm, loft, texture
Space Colony UI|Tech Futurism|Contemporary|bold|space, interface, modular, technical
Speculative Architecture|Interiors Architecture|Contemporary|experimental|render, future, concept, space
Spiritual Minimal|Commerce Hospitality|Contemporary|quiet|retreat, serif, calm, white
Sports Analytics|Entertainment Events|Contemporary|balanced|sports, data, stats, dashboard
Startup Gradient|Web UI|2020s|bold|gradient, product, hero, startup
Stationery Boutique|Commerce Hospitality|Contemporary|quiet|paper, shop, pastel, grid
Street Food Market|Commerce Hospitality|Contemporary|loud|food, vendor, sign, night
Subway Tile Diner|Commerce Hospitality|Timeless|balanced|tile, menu, chrome, local
Supergraphic Walls|Interiors Architecture|1970s|loud|walls, type, color, architecture
Tech Conference|Entertainment Events|Contemporary|balanced|conference, schedule, product, stage
Techno-Organic Architecture|Interiors Architecture|Contemporary|experimental|organic, future, structure, biomorphic
Tennis Club Retro|Entertainment Events|1970s|premium|tennis, stripe, green, sport
Text-Only Brutalism|Web UI|Contemporary|bold|text, link, black, web
The New Sincerity|Editorial Print|2020s|quiet|personal, human, essay, warm
Theme Park Map|Entertainment Events|1990s|loud|map, attraction, color, playful
Thrift Store Eclectic|Commerce Hospitality|Contemporary|maximal|vintage, objects, retail, layered
Travel Brochure Modern|Commerce Hospitality|1960s|bold|travel, poster, destination, color
University Press|Editorial Print|Timeless|quiet|books, academic, serif, catalog
Utility Sportswear|Fashion Beauty|Contemporary|balanced|sport, utility, nylon, practical
Variable Font Playground|Web UI|2026|experimental|type, interaction, web, playful
Vegan Cafe|Commerce Hospitality|Contemporary|quiet|plants, menu, green, warm
Video Store Nostalgia|Commerce Hospitality|1980s|bold|vhs, rental, film, neon
Vinyl Record Shop|Commerce Hospitality|1970s|bold|music, crate, analog, warm
Virtual Gallery|Tech Futurism|Contemporary|experimental|3d, gallery, digital, art
Warm Data|Web UI|Contemporary|balanced|analytics, warm, charts, product
Weather App Poetic|Web UI|Contemporary|quiet|weather, gradient, calm, app
Wedding Editorial|Commerce Hospitality|Contemporary|premium|wedding, photography, serif, romance
Wellness Clinic|Civic Institutional|Contemporary|quiet|health, appointment, calm, trust
Western Americana|Commerce Hospitality|Timeless|bold|western, denim, sign, heritage
Whole Earth Catalog|Editorial Print|1970s|balanced|catalog, ecology, tools, counterculture
Wood And Stone|Craft Material|Timeless|quiet|material, natural, tactile, craft
Workshop Manual|Editorial Print|Timeless|balanced|manual, diagrams, tools, practical
Youth Center|Civic Institutional|Contemporary|bold|community, color, youth, programs
Zero-Waste Store|Commerce Hospitality|Contemporary|quiet|sustainable, refill, kraft, retail
Zine Wall|Editorial Print|Contemporary|maximal|zine, wall, posters, culture
`;

const PALETTES = [
  { name: "Ink Paper Signal", colors: ["#F6F0E2", "#121212", "#E4372E", "#2D5B7C", "#D9C7A3"] },
  { name: "Swiss Primary", colors: ["#F7F4ED", "#101010", "#E11D2E", "#0057B8", "#F4C430"] },
  { name: "Night Neon", colors: ["#080B16", "#F6F7FF", "#00D5FF", "#FF3EA5", "#B7FF3C"] },
  { name: "Warm Editorial", colors: ["#FFF8EA", "#23201B", "#A33D2B", "#355C4A", "#D6A84F"] },
  { name: "Aqua Chrome", colors: ["#E9FBFF", "#11222B", "#3AB8FF", "#7CDAE8", "#9EA7FF"] },
  { name: "Botanical Calm", colors: ["#F3EFE5", "#25362E", "#7D9572", "#C8765B", "#B9C6B2"] },
  { name: "Luxury Mono", colors: ["#F7F5EF", "#101010", "#9B7A3A", "#CFC7B8", "#2D2D2D"] },
  { name: "Candy Store", colors: ["#FFF5FB", "#2B1F2E", "#FF5FA2", "#66D9EF", "#FFE45E"] },
  { name: "Archive Green", colors: ["#F5EBD8", "#201D18", "#2F5E4E", "#7D2E2E", "#637381"] },
  { name: "Concrete Blue", colors: ["#F2F3F1", "#1E2528", "#235789", "#BFC2BA", "#A55233"] },
  { name: "Desert Modern", colors: ["#F4E3C7", "#2C211A", "#B76342", "#53705A", "#D6A35D"] },
  { name: "Vapor Mall", colors: ["#F2D7FF", "#1C1530", "#FF71CE", "#01CDFE", "#05FFA1"] },
  { name: "Terminal", colors: ["#06120D", "#DDFBEA", "#24D17E", "#F4B942", "#46D9FF"] },
  { name: "Civic Trust", colors: ["#FFFFFF", "#102A43", "#1261A6", "#2F7D5C", "#F6C343"] },
  { name: "Riso Print", colors: ["#F8EFD9", "#191510", "#F15A24", "#2BA84A", "#2F5DA8"] },
  { name: "Black Pink Chrome", colors: ["#070707", "#F7F0F5", "#F43F8D", "#B9C2FF", "#BFC7C9"] },
  { name: "Studio Pastel", colors: ["#FFF8EA", "#202124", "#6C63FF", "#EE5A8A", "#B6D94C"] },
  { name: "Public Utility", colors: ["#F9FAFB", "#1F2937", "#2563EB", "#16A34A", "#F97316"] },
  { name: "Gothic Cream", colors: ["#F1E6CF", "#19120F", "#6B2438", "#2B3348", "#C5A15A"] },
  { name: "Poolside", colors: ["#F9F2E8", "#173642", "#4D9FB5", "#F08A5D", "#F4D35E"] }
];

const CATEGORY_TRAITS = {
  "Web UI": ["responsive components", "interactive states", "systematic spacing", "homepage-ready modules", "clear product hierarchy"],
  "Graphic Movements": ["strong composition", "recognizable visual rules", "poster logic", "intentional type treatment", "art-historical signal"],
  "Internet Culture": ["nostalgic cues", "subculture references", "screen-native texture", "meme-adjacent symbolism", "high personality"],
  "Editorial Print": ["headline hierarchy", "issue structure", "caption systems", "reading rhythm", "print-informed grids"],
  "Commerce Hospitality": ["conversion paths", "inspectable imagery", "trust cues", "product or place evidence", "clear calls to action"],
  "Art Object": ["object-first presentation", "gallery pacing", "material sensitivity", "caption discipline", "quiet metadata"],
  "Interiors Architecture": ["spatial rhythm", "material palette", "room-scale imagery", "precise alignment", "environmental mood"],
  "Fashion Beauty": ["aspirational imagery", "texture and styling", "editorial crop logic", "brand attitude", "seasonal palette"],
  "Tech Futurism": ["technical surfaces", "future-facing symbolism", "data or control motifs", "speculative materials", "glow used with restraint"],
  "Craft Material": ["tactile texture", "process imagery", "handmade irregularity", "material honesty", "warm details"],
  "Civic Institutional": ["plain language", "accessible contrast", "service navigation", "trust structure", "usable forms"],
  "Entertainment Events": ["date and ticket clarity", "lineup hierarchy", "poster energy", "social proof", "venue or schedule cues"]
};

const KEYWORD_TRAITS = [
  [/brut|punk|anti|xerox|grunge/i, ["hard borders", "raw type", "visible seams", "high contrast"]],
  [/swiss|grid|typographic|minimal/i, ["modular grid", "left alignment", "generous white space", "sans-serif discipline"]],
  [/glass|chrome|aqua|holographic|translucent/i, ["refraction", "specular highlights", "layered depth", "cool gradients"]],
  [/botanical|organic|wellness|biophilic|garden|natural/i, ["botanical forms", "soft surfaces", "natural light", "muted greens"]],
  [/vapor|y2k|frutiger|webcore|geocities|retro web|mallsoft/i, ["old web cues", "glossy nostalgia", "surreal consumer fragments", "digital artifacts"]],
  [/cyber|neon|synth|outrun|night/i, ["dark grounds", "neon accents", "grid horizons", "electric contrast"]],
  [/luxury|fashion|fragrance|gilded|gloss|vogue|mono/i, ["image-led restraint", "premium spacing", "thin rules", "high-end typography"]],
  [/craft|ceramic|wood|riso|textile|paper|handmade/i, ["paper grain", "handmade marks", "limited ink palette", "process detail"]],
  [/civic|public|health|library|research|service|government/i, ["legible navigation", "search-first structure", "accessible states", "direct labeling"]],
  [/food|restaurant|cafe|grocery|diner/i, ["menu readability", "appetizing color", "hours and location clarity", "local character"]],
  [/sports|racing|club|athletic|fitness/i, ["stats treatment", "team color blocking", "badges", "motion cues"]],
  [/poster|festival|club|rave|concert|theater/i, ["date-first hierarchy", "large display type", "ticket action", "bold event rhythm"]]
];

const TYPE_SYSTEMS = [
  { test: /swiss|grid|civic|product|docs|app|interface|saas|airport|transit/i, value: "Grotesk sans plus mono metadata" },
  { test: /luxury|fashion|hotel|wedding|fragrance|vogue|gallery|fine/i, value: "High-contrast serif plus refined sans" },
  { test: /terminal|code|cyber|tech|data|security|dashboard|console/i, value: "Monospace-first technical stack" },
  { test: /zine|punk|xerox|grunge|flyer|rave|poster/i, value: "Condensed display type plus rough sans" },
  { test: /academic|library|newspaper|longform|book|press|poet/i, value: "Readable serif with small sans metadata" },
  { test: /kid|kawaii|candy|playful|toy|classroom/i, value: "Rounded sans with chunky display accents" },
  { test: /art nouveau|victorian|rococo|baroque|deco/i, value: "Ornamental display with disciplined body text" }
];

const LAYOUTS = [
  { test: /swiss|grid|bauhaus|de stijl|dashboard|docs|directory/i, value: "modular grid with strict alignment" },
  { test: /zine|collage|scrapbook|punk|dada|maximal/i, value: "layered collage over a responsive underlying grid" },
  { test: /gallery|museum|luxury|fashion|architecture|atelier/i, value: "image-led gallery pacing with sparse metadata" },
  { test: /restaurant|hotel|commerce|store|retail|market|shop/i, value: "conversion-first sections with practical detail near the top" },
  { test: /terminal|code|console|security/i, value: "panel-based interface with command or log-like rhythm" },
  { test: /festival|event|club|sports|theater/i, value: "poster-like hero, schedule blocks, and repeated action bands" }
];

const PREVIEW_STYLES = [
  { test: /swiss|grid|bauhaus|de stijl|international|precision|bento/i, value: "grid" },
  { test: /glass|chrome|aqua|holographic|translucent|y2k/i, value: "glass" },
  { test: /neon|cyber|synth|outrun|arcade|night/i, value: "neon" },
  { test: /zine|xerox|punk|scrapbook|collage|dada|grunge/i, value: "collage" },
  { test: /botanical|organic|wellness|biophilic|garden|natural/i, value: "organic" },
  { test: /terminal|code|console|docs|security/i, value: "terminal" },
  { test: /luxury|fashion|gallery|hotel|fragrance|wedding|mono/i, value: "luxury" },
  { test: /riso|woodblock|craft|ceramic|textile|paper|handmade/i, value: "print" },
  { test: /festival|poster|club|rave|sports|theater|concert/i, value: "poster" },
  { test: /brut|anti|raw|text-only/i, value: "brutal" }
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function hash(value) {
  let h = 2166136261;
  for (const char of value) {
    h ^= char.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

function pick(list, seed, offset = 0) {
  return list[(seed + offset) % list.length];
}

function matchValue(list, name, fallback) {
  const found = list.find((item) => item.test.test(name));
  return found ? found.value : fallback;
}

function paletteFor(seed) {
  const name = seed.name;
  if (/neon|cyber|synth|outrun|arcade|night|club|rave/i.test(name)) return PALETTES[2];
  if (/swiss|bauhaus|de stijl|primary|playbill/i.test(name)) return PALETTES[1];
  if (/glass|chrome|aqua|frutiger|y2k|holographic|translucent/i.test(name)) return PALETTES[4];
  if (/wellness|organic|botanical|garden|biophilic|vegan/i.test(name)) return PALETTES[5];
  if (/luxury|mono|fashion|fragrance|wedding|hotel|gallery|fine/i.test(name)) return PALETTES[6];
  if (/candy|kid|kawaii|bubblegum|toy|classroom/i.test(name)) return PALETTES[7];
  if (/library|academic|archive|research|museum|university/i.test(name)) return PALETTES[8];
  if (/architect|blueprint|concrete|industrial|construction/i.test(name)) return PALETTES[9];
  if (/desert|western|tuscan|mediterranean|motel/i.test(name)) return PALETTES[10];
  if (/vapor|mallsoft|seapunk|webcore|geocities/i.test(name)) return PALETTES[11];
  if (/terminal|code|console/i.test(name)) return PALETTES[12];
  if (/civic|public|health|service|government|transit|law/i.test(name)) return PALETTES[13];
  if (/riso|zine|print|woodblock|flyer|poster/i.test(name)) return PALETTES[14];
  if (/emo|gothic|noir|black|nightclub/i.test(name)) return PALETTES[15];
  if (/maker|studio|playful|pastel|blob|clay/i.test(name)) return PALETTES[16];
  if (/data|docs|enterprise|support|utility/i.test(name)) return PALETTES[17];
  if (/victorian|rococo|baroque|oracle|regency/i.test(name)) return PALETTES[18];
  if (/pool|coastal|sea|resort/i.test(name)) return PALETTES[19];
  return PALETTES[hash(name) % PALETTES.length];
}

function traitsFor(seed) {
  const base = [...(CATEGORY_TRAITS[seed.category] || [])];
  for (const item of KEYWORD_TRAITS) {
    if (item[0].test(seed.name) || item[0].test(seed.tags.join(" "))) {
      base.push(...item[1]);
    }
  }
  const seen = [];
  for (const trait of base) {
    if (!seen.includes(trait)) seen.push(trait);
  }
  return seen.slice(0, 7);
}

function useCasesFor(category) {
  return {
    "Web UI": ["SaaS site", "tool dashboard", "documentation portal"],
    "Graphic Movements": ["campaign identity", "poster system", "editorial package"],
    "Internet Culture": ["community site", "creator brand", "experimental archive"],
    "Editorial Print": ["magazine", "blog", "newsletter"],
    "Commerce Hospitality": ["shop", "restaurant", "hotel or venue"],
    "Art Object": ["gallery", "portfolio", "collection archive"],
    "Interiors Architecture": ["studio portfolio", "property site", "lookbook"],
    "Fashion Beauty": ["lookbook", "beauty launch", "lifestyle shop"],
    "Tech Futurism": ["AI product", "security tool", "research lab"],
    "Craft Material": ["maker shop", "studio site", "process journal"],
    "Civic Institutional": ["public service", "nonprofit", "education site"],
    "Entertainment Events": ["festival", "venue", "ticketed event"]
  }[category] || ["brand site", "theme concept", "visual exploration"];
}

function parseSeeds() {
  return SEED_TEXT.trim().split("\n").map((line) => {
    const [name, category, era, energy, tags] = line.split("|").map((part) => part.trim());
    return {
      name,
      category,
      era,
      energy,
      tags: tags.split(",").map((tag) => tag.trim())
    };
  });
}

const seeds = parseSeeds();
const aesthetics = seeds.map((seed, index) => {
  const id = slugify(seed.name);
  const palette = paletteFor(seed);
  const traits = traitsFor(seed);
  const seedHash = hash(seed.name);
  const typography = matchValue(TYPE_SYSTEMS, `${seed.name} ${seed.tags.join(" ")}`, pick([
    "Humanist sans plus expressive display",
    "Editorial serif plus practical sans",
    "Rounded sans plus compact labels",
    "Condensed display plus clean body",
    "Geometric sans plus mono details"
  ], seedHash));
  const layout = matchValue(LAYOUTS, `${seed.name} ${seed.category} ${seed.tags.join(" ")}`, pick([
    "balanced editorial sections with a strong visual opener",
    "dense index with feature modules and clear filters",
    "hero-first structure with reusable pattern blocks",
    "asymmetric composition that still collapses cleanly on mobile"
  ], seedHash, 3));
  const previewStyle = matchValue(PREVIEW_STYLES, `${seed.name} ${seed.tags.join(" ")}`, pick([
    "grid",
    "glass",
    "neon",
    "collage",
    "organic",
    "terminal",
    "luxury",
    "print",
    "poster",
    "brutal"
  ], seedHash, 7));
  const texture = pick([
    "smooth digital surfaces",
    "paper grain and ink spread",
    "subtle material texture",
    "crisp flat color",
    "photographic depth",
    "soft tactile shadows",
    "raw scan artifacts"
  ], seedHash, 11);
  const motion = pick([
    "mostly static with deliberate hover states",
    "subtle transitions and reveal timing",
    "kinetic hero type and scroll emphasis",
    "utility motion only",
    "looping ambience kept away from body copy"
  ], seedHash, 17);
  const article = /^[aeiou]/i.test(seed.energy) ? "An" : "A";
  const summary = `${article} ${seed.energy} ${seed.category.toLowerCase()} aesthetic built around ${traits.slice(0, 3).join(", ")}.`;

  return {
    id,
    name: seed.name,
    category: seed.category,
    era: seed.era,
    energy: seed.energy,
    tags: seed.tags,
    summary,
    palette: {
      name: palette.name,
      colors: palette.colors
    },
    visualDNA: traits,
    typography,
    layout,
    texture,
    motion,
    previewStyle,
    bestFor: useCasesFor(seed.category),
    themeAngles: [
      `Hero: lead with ${traits[0] || "a strong signature visual"} and immediate purpose.`,
      `Patterns: build reusable sections for ${traits[1] || "content groups"} and ${traits[2] || "clear navigation"}.`,
      `Theme.json: start with the ${palette.name} palette, then define ${typography.toLowerCase()}.`
    ],
    promptSeed: `${seed.name} WordPress theme, ${seed.tags.join(", ")}, ${traits.slice(0, 4).join(", ")}`,
    collectionIndex: index + 1
  };
});

const duplicates = aesthetics
  .map((item) => item.id)
  .filter((id, index, ids) => ids.indexOf(id) !== index);

if (duplicates.length) {
  throw new Error(`Duplicate aesthetic ids: ${duplicates.join(", ")}`);
}

const database = {
  schemaVersion: "2.0.0",
  generatedAt: new Date().toISOString(),
  title: "WeirdPress Aesthetic Atlas",
  purpose: "A large browsable catalog of visual design aesthetics for WordPress theme ideation.",
  sourceReferences: SOURCE_REFERENCES,
  counts: {
    aesthetics: aesthetics.length,
    categories: [...new Set(aesthetics.map((item) => item.category))].length
  },
  aesthetics
};

const outputPath = path.join("data", "design-aesthetics.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(database, null, 2)}\n`);
console.log(`Generated ${aesthetics.length} aesthetics at ${outputPath}`);
