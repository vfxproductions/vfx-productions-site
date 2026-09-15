/* =============================================================================
   SINGLE SOURCE OF TRUTH for the Work, Services and Industry pages.
   Edit this file, then run:  node tools/build.mjs
   Nothing else needs touching - /work, /work/<slug>, /services and
   /industries/<slug> are all generated from what is below.
   ============================================================================= */

/* ---------------------------------------------------------------------------
   CATEGORIES - the five audiences. `accent` is the ONLY colour that changes
   between them; everything else (type, grid, buttons, spacing) stays shared.
   --------------------------------------------------------------------------- */
export const categories = [
  {
    slug: 'product-technology',
    name: 'Product & Technology',
    short: 'Product & Tech',
    accent: '#5B9DFF',
    tone: 'precise',
    headline: 'MAKING<br>COMPLEX<br>PRODUCTS<br>LEGIBLE.',
    message: 'We help technology and product companies make complex ideas visible through cinematic 3D animation, visualisation, and interactive experiences.',
    intro: 'Most technical products are hard to show. The interesting part is inside the housing, under the water line, or only happens once every ten thousand cycles. We rebuild the product in 3D and film it the way a camera never could — cutaways, exploded views, simulated loads, and motion that follows the engineering rather than decorating it.',
    focus: [
      ['Precision', 'Geometry from your CAD, not a lookalike model. Tolerances and mechanisms stay true.'],
      ['Technical clarity', 'One idea per shot. Cutaways, exploded views, and callouts that survive being watched on a phone.'],
      ['Product storytelling', 'The film explains why the engineering matters, not just that it exists.'],
      ['Simulation and design development', 'Flow, load, assembly and failure shown as motion instead of a slide of numbers.']
    ],
    services: ['technical-visualisation', '3d-animation', 'motion-design', 'interactive-installations'],
    hero: { type: 'video', src: '/assets/Viewport.mp4' }
  },
  {
    slug: 'architecture-spaces',
    name: 'Architecture & Spaces',
    short: 'Architecture',
    accent: '#8FA3B8',
    tone: 'spacious',
    headline: 'SPACE<br>BEFORE<br>IT IS<br>BUILT.',
    message: 'We visualise buildings, interiors, and public environments as they will actually be experienced — light, material, and movement through the space.',
    intro: 'A plan shows where the walls go. It does not show what the room feels like at four in the afternoon in November. We build the space, light it honestly, and move a camera through it at human pace, so a client, a committee, or a tenant can judge the experience rather than the drawing.',
    focus: [
      ['Spatial experience', 'Camera moves at walking speed and eye height. No drone swoop through a wall.'],
      ['Materiality', 'Surfaces that read as concrete, oak, powder-coat and glass — not as grey plastic.'],
      ['Atmosphere', 'Daylight studies, evening states, and weather that match the real site and orientation.'],
      ['Public and commercial environments', 'Retail floors, logistics halls, and civic spaces shown in use, with people at the right density.']
    ],
    services: ['design-visualisation', '3d-animation', 'technical-visualisation', 'motion-design'],
    hero: { type: 'video', src: '/assets/animation.mp4' }
  },
  {
    slug: 'music-culture',
    name: 'Music & Culture',
    short: 'Music & Live',
    accent: '#FF3D7F',
    tone: 'energetic',
    headline: 'VISUAL<br>WORLDS<br>FOR THE<br>STAGE.',
    message: 'We create visual worlds, live visuals, and audiovisual experiences for artists, stages, festivals, and cultural projects.',
    intro: 'A stage show is not a video. It is a set of looks that have to survive a VJ, a lighting desk, an LED wall with the wrong pitch, and a crowd that decides in four seconds whether to look up. We build content in loops and stems that can be cut live, run for a full set, and still land from the back of the field.',
    focus: [
      ['Energy', 'Content cut to the drop, not to a storyboard. Built to be run live, not played back.'],
      ['Motion', 'Loops, stems and transition packs that a VJ can actually mix.'],
      ['Atmosphere', 'Worlds that hold for a whole set without repeating themselves into wallpaper.'],
      ['Artists and performances', 'Show packages built around one artist rather than a generic template pack.'],
      ['Real-time and audiovisual', 'Audio-reactive systems and real-time scenes when the show needs to respond, not replay.']
    ],
    services: ['live-visuals', 'motion-design', '3d-animation', 'vfx-compositing'],
    hero: { type: 'video', src: '/assets/maassilo.mp4' }
  },
  {
    slug: 'fashion-luxury',
    name: 'Fashion & Luxury',
    short: 'Fashion & Luxury',
    accent: '#C8A96A',
    tone: 'atmospheric',
    headline: 'MATERIAL.<br>LIGHT.<br>MOOD.',
    message: 'We create atmospheric 3D imagery and digital environments for fashion, luxury, and design brands.',
    intro: 'Luxury work lives or dies on surface. Cashmere has to read as cashmere at 2000 pixels, and the light has to look like it came from somewhere rather than from a render preset. We build sets that could not be photographed, then light them as carefully as if they could.',
    focus: [
      ['Materials', 'Cloth, leather, metal and glass built as shaders with real thickness and weave, not tiled photos.'],
      ['Detail', 'Stitching, edge wear and finish that hold up at campaign resolution.'],
      ['Light', 'Studio-honest lighting — one considered key, controlled falloff, no flat HDRI wash.'],
      ['Mood and surreal environments', 'Digital sets that go where a location scout cannot, while staying physically plausible.']
    ],
    services: ['3d-animation', 'design-visualisation', 'vfx-compositing', 'motion-design'],
    hero: { type: 'video', src: '/assets/tessaract.mp4' }
  },
  {
    slug: 'film-commercial',
    name: 'Film & Commercial',
    short: 'Film & Commercial',
    accent: '#E04B33',
    tone: 'cinematic',
    headline: 'SHOTS<br>THAT<br>COULD NOT<br>BE FILMED.',
    message: 'We deliver visual effects, animation, and finishing for film, series, and commercial work — the shots that cannot be captured in camera.',
    intro: 'Sometimes the shot exists but the budget for the crane does not. Sometimes the location burned down, or never existed. We handle the part of the edit that has to be built: set extensions, cleanup, simulation, and the CG that has to cut invisibly against plate photography.',
    focus: [
      ['Plate-accurate', 'Tracked, graded and grained to sit inside the edit without announcing itself.'],
      ['Simulation', 'Smoke, water, debris and cloth where practical effects would cost more than the shot is worth.'],
      ['Set extension', 'Build the half of the location that was never there.'],
      ['Finishing', 'Cleanup, comp and delivery in the specs the post house actually asked for.']
    ],
    services: ['vfx-compositing', '3d-animation', 'motion-design', 'technical-visualisation'],
    hero: { type: 'video', src: '/assets/vfx.mp4' }
  }
];

/* ---------------------------------------------------------------------------
   SERVICES - what a client can hire the studio for.
   `deep` points at the existing long-form page where one exists.
   --------------------------------------------------------------------------- */
export const services = [
  {
    slug: '3d-animation',
    name: '3D animation and product films',
    deep: '/animation',
    summary: 'Cinematic 3D films that show a product, a process, or an idea in motion. From a single hero shot to a full film with voice-over and score.',
    body: 'We model or take over your CAD, build the look, light it, animate it, and finish it. Camera work is planned against the story rather than added afterwards, so the cut already exists before the first frame is rendered.',
    deliverables: [
      'Previz or animatic before any render time is spent',
      'Master film in your delivery spec, plus social crops (16:9, 1:1, 9:16)',
      'Clean plates and isolated elements on request',
      'Stills pulled from the final render for press and web use'
    ],
    industries: ['product-technology', 'architecture-spaces', 'fashion-luxury', 'film-commercial']
  },
  {
    slug: 'technical-visualisation',
    name: 'Technical and product visualisation',
    deep: '/animation',
    summary: 'Cutaways, exploded views, assembly sequences and simulation-driven explanations for products that are hard to photograph or hard to understand.',
    body: 'Built from engineering data where you have it. The aim is comprehension: an engineer should not find it wrong and a buyer should not find it confusing.',
    deliverables: [
      'Technical animation sequences (assembly, operation, maintenance)',
      'Still renders for manuals, data sheets and tender documents',
      'An annotated version and a clean version of each shot',
      'Turntables and colourway variants where the product has options'
    ],
    industries: ['product-technology', 'architecture-spaces']
  },
  {
    slug: 'vfx-compositing',
    name: 'VFX and compositing',
    deep: '/vfx',
    summary: 'Set extensions, tracking, cleanup, simulations and stylised looks — CG that has to sit invisibly inside live-action footage.',
    body: 'Plate-first work: match the lens, match the grain, match the grade. If the effect is noticed as an effect, it was the wrong effect.',
    deliverables: [
      'Shot-by-shot breakdown and bid before work starts',
      'Graded, tracked and comped shots back in your edit spec',
      'Rig and object removal, beauty and cleanup passes',
      'A breakdown video you can use on your own reel'
    ],
    industries: ['film-commercial', 'music-culture', 'fashion-luxury']
  },
  {
    slug: 'motion-design',
    name: 'Motion design',
    deep: '/animation',
    summary: 'Titles, infographics, UI animation and brand motion systems — the graphic layer that carries information rather than decoration.',
    body: 'Typography and timing built on your existing brand. Delivered as a system you can extend, not a one-off file nobody can open.',
    deliverables: [
      'Animated titles, lower thirds and end cards',
      'Data and process infographics',
      'Motion guidelines: timing curves, transitions, and what not to do',
      'Editable source files and reusable templates'
    ],
    industries: ['product-technology', 'film-commercial', 'music-culture']
  },
  {
    slug: 'live-visuals',
    name: 'Live visuals and music content',
    deep: '/visuals',
    summary: 'Show packages, festival screen content, artist visuals and audio-reactive scenes built to be run live.',
    body: 'Content arrives as loops and stems with a naming convention a VJ can read in the dark, cut to the tempo and structure of the actual set.',
    deliverables: [
      'Loop and transition packs at screen resolution and pixel pitch',
      'Stems and alternate cuts for live mixing',
      'Scene files for the software the show actually runs on',
      'On-site support, or a run sheet for the VJ and the LED tech'
    ],
    industries: ['music-culture', 'film-commercial']
  },
  {
    slug: 'interactive-installations',
    name: 'Interactive installations and experiences',
    deep: '/technology',
    summary: 'Physical installations that respond to the people standing in front of them, built to survive an exhibition floor.',
    body: 'Hardware, software and content as one piece of work: sensors, controls, enclosure, real-time graphics, and the fallback for when a visitor does something unexpected.',
    deliverables: [
      'Concept, interaction model and technical plan before anything is built',
      'Fabricated console or enclosure and the software that runs on it',
      'Install, on-site calibration and a handover document',
      'Remote support and a spare-parts list for touring installations'
    ],
    industries: ['product-technology', 'music-culture', 'architecture-spaces']
  },
  {
    slug: 'design-visualisation',
    name: 'Design visualisation',
    deep: '/animation',
    summary: 'Architectural and spatial visualisation: buildings, interiors, retail environments and public spaces shown before they are built.',
    body: 'Daylight studies, material studies and walk-through films at human pace. Used for approval, for tenants, and for tender.',
    deliverables: [
      'Still visualisations at print and presentation resolution',
      'Walk-through or fly-through film',
      'Daylight, evening and seasonal variants of the key views',
      'Material and finish studies as directly comparable stills'
    ],
    industries: ['architecture-spaces', 'product-technology', 'fashion-luxury']
  },
  {
    slug: 'aerial-capture',
    name: 'Aerial capture',
    deep: '/droneoperator',
    summary: 'Licensed drone and FPV work for locations, events, architecture and commercial shoots.',
    body: 'Flown to EU regulation with the paperwork done in advance. Used on its own, or as plate photography for the CG work above.',
    deliverables: [
      'Licensed pilot, insurance and flight authorisation handled',
      'Graded aerial footage in your edit spec',
      'FPV and cinematic gimbal work',
      'Photogrammetry passes when the footage also has to become geometry'
    ],
    industries: ['architecture-spaces', 'film-commercial', 'music-culture']
  }
];

/* ---------------------------------------------------------------------------
   PROJECTS

   status: 'published' -> a full /work/<slug>/ case study page is generated
           'draft'     -> appears on /work as a clearly marked placeholder card,
                          NO page is generated (so there are no weak empty pages)

   To promote a draft: fill in the fields below it and set status:'published'.
   Draft entries are deliberately empty - nothing here has been invented.
   --------------------------------------------------------------------------- */
export const projects = [
  {
    slug: 'cyberaware',
    status: 'published',
    title: 'CYBERAWARE',
    category: 'product-technology',
    year: '2026',
    client: 'Self-initiated',
    summary: 'An interactive cybersecurity awareness installation that turns an abstract threat into something visitors operate with their hands.',
    hero: { type: 'video', src: '/assets/cyberaware_timelapse.mp4', poster: '/assets/cyberaware_console.jpg' },
    thumb: '/assets/cyberaware_console.jpg',
    description: 'A fully 3D-printed surveillance console with live CCTV feeds running over Raspberry Pi, physical controls, and a game that puts the visitor in the chair of a cybersecurity officer. Exhibited in Utrecht, 2026, and now touring as a bookable experience.',
    challenge: 'Cybersecurity is invisible. Posters and e-learning modules describe it, which is why almost nobody remembers them. The problem was not explaining the subject — it was turning an abstract, screen-bound risk into something a person could physically touch, get wrong, and learn from in the ninety seconds they will actually give an exhibition stand.',
    approach: 'Built as one piece of work rather than content bolted onto a rented kiosk: a console modelled and 3D-printed in-house, physical switches and dials wired through a Raspberry Pi, live CCTV feeds from cameras placed around the building, and a real-time game layer that reacts to what the visitor does. Interaction is deliberately physical — you operate something and the room responds. Everything had to work for an untrained visitor, unattended, for a full exhibition day, and still pack into a van afterwards.',
    result: 'CYBERAWARE premiered in Utrecht in 2026 and is now touring and bookable for events, conferences and educational programmes. The console, the camera layer and the control layout are documented below.',
    role: 'Concept, hardware design and build, real-time software, interaction design, 3D content, installation and on-site operation.',
    serviceSlugs: ['interactive-installations', '3d-animation', 'motion-design'],
    gallery: [
      { src: '/assets/cyberaware_console.jpg', alt: 'The CYBERAWARE console with its physical controls' },
      { src: '/assets/cyberaware_handson.jpg', alt: 'A visitor operating the installation' },
      { src: '/assets/cyberaware_cameras.jpg', alt: 'Live camera feeds built into the installation' },
      { src: '/assets/cyberaware_exhibition.jpg', alt: 'CYBERAWARE on the exhibition floor' },
      { src: '/assets/cyberaware_controls.jpg', alt: 'Close-up of the control layout' },
      { src: '/assets/cyberaware_render.jpg', alt: 'Render of the CYBERAWARE console' }
    ],
    watch: { src: '/assets/cyberaware_walkthrough.webm', poster: '/assets/cyberaware_walkthrough_poster.jpg', label: 'Full walkthrough' },
    deepLink: { href: '/technology', label: 'Interactive design' }
  },

  {
    slug: 'ai-head',
    status: 'published',
    title: 'Giving an AI a Face',
    category: 'product-technology',
    year: '',            /* EDIT: year */
    client: '',          /* EDIT: the AI startup's name, once it can be named */
    summary: 'A concept render for an AI art piece — a glass head with an LED cube suspended inside it, standing on a dock you can talk to.',
    hero: { type: 'video', src: '/assets/aihead.mp4', poster: '/assets/aihead_poster.jpg' },
    thumb: '/assets/aihead_3.jpg',
    description: 'An AI you speak to has no face. It answers from a speaker, or from a text box, and everything it is thinking stays invisible. This piece gives it one. A head cast in glass holds an LED cube at its centre; the cube is the thinking made visible, rendering what the system is processing as light inside the skull. The circular dock beneath it carries the technology that lets you talk to it the way you would talk to any assistant — except this one is looking back.',
    challenge: 'A face is the fastest way to make a machine feel present, and the fastest way to make it feel wrong. The concept had to read as an object worth standing in front of — sculptural, still, unmistakably a head — while staying honest about being a machine. Glass over an LED matrix does both: you are looking at a face and at the circuitry at the same time, and neither one is hidden.',
    approach: 'The render was built to settle the design language before any hardware exists: how the glass refracts the cube, how much of the matrix should be readable through the surface, how the dock reads as a base rather than a plinth, and what the light does to the room around it. Everything is lit from the cube itself and the ring in the dock, so the piece is its own only light source — which is how it will have to work when it is built.',
    result: 'The concept is live work. The head is being developed as an art piece, with the dock designed to house the conversational layer so the visualisation and the voice belong to the same object.',
    role: 'Concept design, modelling, glass and emissive shading, lighting, animation and rendering.',
    serviceSlugs: ['interactive-installations', '3d-animation', 'technical-visualisation'],
    gallery: [
      { src: '/assets/aihead_1.jpg', alt: 'The glass head lit only by the LED cube inside it' },
      { src: '/assets/aihead_6.jpg', alt: 'LED matrix read through the refracting glass surface' },
      { src: '/assets/aihead_9.jpg', alt: 'The illuminated circular dock beneath the head' }
    ]
  },

  {
    slug: 'cyberphone',
    status: 'published',
    title: 'Cyberphone',
    category: 'product-technology',
    year: '',            /* EDIT: year */
    client: 'Self-initiated concept',
    summary: 'A concept phone drawn in the Tesla Cybertruck’s design language — flat planes, hard folds, exposed stainless, and a flip.',
    hero: { type: 'video', src: '/assets/cyberphone.mp4', poster: '/assets/cyberphone_poster.jpg' },
    thumb: '/assets/cyberphone_02.jpg',
    description: 'The Cybertruck works because it refuses to do the one thing every other vehicle does: it will not curve. Flat panels, single folds, no draw-formed surfaces, no paint. This concept asks what a phone looks like under the same rules. The result is a flip — faceted body, exposed brushed panels, a telescopic aerial, a light bar down one edge, an illuminated icon grid where the keypad would be, and a second angled screen carrying playback.',
    challenge: 'Phones have spent fifteen years converging on the same object: a rounded rectangle of glass with the hardware hidden behind it. Applying a design language built for a three-tonne vehicle to something that lives in a pocket means every decision that makes the truck work — the sheer size of the planes, the absence of radii, the raw finish — has to survive being scaled down to 150 millimetres without becoming uncomfortable or unreadable.',
    approach: 'The geometry was kept deliberately crude: straight cuts, no fillets where the language would not allow one, and panel breaks placed where a fold would actually have to happen. Everything that would normally be hidden is left visible — the hinge barrel, the antenna, the panel seams. The interface follows the same logic: the icon grid is a flat lit plane rather than a screen pretending to be glass, and the light bar is the only element allowed to be a pure colour.',
    result: '',          /* EDIT */
    role: 'Concept, hard-surface modelling, materials, UI design, lighting, animation and rendering.',
    serviceSlugs: ['3d-animation', 'design-visualisation', 'motion-design'],
    gallery: [
      { src: '/assets/cyberphone_01.jpg', alt: 'The Cyberphone closed, showing the faceted body' },
      { src: '/assets/cyberphone_02.jpg', alt: 'Opened, with the illuminated icon grid and secondary screen' },
      { src: '/assets/cyberphone_b.jpg', alt: 'Telescopic aerial and hinge detail' },
      { src: '/assets/cyberphone_c.jpg', alt: 'Light bar running along the lower edge' }
    ]
  },

  {
    slug: 'sea-and-shore',
    status: 'published',
    title: 'Sea and Shore Services',
    category: 'product-technology',
    year: '',            /* EDIT: year */
    client: 'Sea and Shore Services B.V.',
    summary: 'Brand identity worked out in 3D for a logistics company — putting the mark on container ships and container stacks to see how it actually behaves at scale.',
    hero: { type: 'image', src: '/assets/seashore_ship.jpg' },
    thumb: '/assets/seashore_ship.jpg',
    description: 'Branding for a shipping and logistics company, developed on the objects the brand will actually live on. A container vessel was built and liveried in the company’s deep teal, the mark carried on the hull and repeated across every container on deck, and a separate loop tracks along a stacked wall of containers so the identity can be judged as a repeating pattern rather than as a logo on a page.',
    challenge: 'A logistics brand does not get seen on a business card. It gets seen at 200 metres from a quayside, half-obscured, repeated hundreds of times across stacked steel boxes, in whatever light the North Sea is offering. None of that can be judged from a flat logo presentation.',
    approach: 'Build the objects, then apply the identity and look at it honestly. The vessel is rendered at sea in low sun so the hull mark has to hold against water glare, and the container loop puts the same mark into dense repetition to test what it does as a texture. Both are experiments as much as deliverables — the point is to see the brand fail or hold before anyone paints real steel.',
    result: '',          /* EDIT */
    role: 'Vessel and container modelling, livery and brand application, shading, lighting and rendering.',
    serviceSlugs: ['3d-animation', 'design-visualisation', 'technical-visualisation'],
    gallery: [
      { src: '/assets/seashore_ship2.jpg', alt: 'Second view of the liveried container vessel' },
      { src: '/assets/seashore_cont_a.jpg', alt: 'Branded containers stacked in the yard' },
      { src: '/assets/seashore_cont_b.jpg', alt: 'The mark repeating across a wall of containers' }
    ],
    watch: { src: '/assets/seashore_containers.mp4', poster: '/assets/seashore_cont_a.jpg', label: 'Container loop' }
  },

  {
    slug: 'vr-driving-simulator',
    status: 'published',
    title: 'Driving, Simulated',
    category: 'product-technology',
    year: '',            /* EDIT: year */
    client: '',          /* EDIT: the VR simulator startup, once it can be named */
    summary: 'A brand commercial for a VR driving-simulator startup, built around the moment the real car and the simulated one turn out to be the same thing.',
    hero: { type: 'image', src: '/assets/vr_xray.jpg' },
    thumb: '/assets/vr_xray.jpg',
    description: 'A commercial for a startup building VR driving simulators. The film opens on a car alone on an endless white plane, moving as a real car moves. Then the bodywork turns to glass and the driver appears inside it, and the cut widens to reveal the same person sitting in a headset with their hands on a wheel that is not there. The argument is made entirely by the transition: what you just watched was already the simulation.',
    challenge: 'Selling a simulator is a trap. Show the hardware and it looks like a chair with a screen; show the virtual world and it looks like a video game. Neither communicates the thing the product is actually selling, which is the feeling that you are driving.',
    approach: 'Strip everything that is not the idea. No environment, no set, no colour — a white infinite plane, a single car, and one figure. The whole film hangs on one x-ray transition where the car becomes transparent and the driver inside it is revealed to be the person in the headset. Because the world is deliberately empty, there is nothing to distract from that reveal, and the viewer works the point out a beat before the film says it.',
    result: '',          /* EDIT */
    role: 'Concept, vehicle and character modelling, animation, look-dev, lighting and rendering.',
    serviceSlugs: ['3d-animation', 'motion-design', 'interactive-installations'],
    gallery: [
      { src: '/assets/vr_road.jpg', alt: 'The car alone on an endless white plane' },
      { src: '/assets/vr_car.jpg', alt: 'The car driving, seen from behind' },
      { src: '/assets/vr_headset.jpg', alt: 'The same driver, in a headset, hands on a wheel that is not there' },
      { src: '/assets/vr_close.jpg', alt: 'Close on the headset' }
    ],
    watch: { src: '/assets/vr_simulator_commercial.mp4', poster: '/assets/vr_poster.jpg', label: 'The commercial' }
  },

  /* ---- Product & Technology ------------------------------------------------ */
  { slug: 'medical-design-knee', status: 'draft', title: 'Medical design — knee', category: 'product-technology',
    summary: '', description: '', challenge: '', approach: '', result: '', role: '', year: '', client: '',
    serviceSlugs: ['technical-visualisation', '3d-animation'], thumb: '/assets/spec_med.jpg', gallery: [] },

  { slug: 'offshore-drilling-platform', status: 'draft', title: 'Offshore structures — drilling platform', category: 'product-technology',
    summary: '', description: '', challenge: '', approach: '', result: '', role: '', year: '', client: '',
    serviceSlugs: ['technical-visualisation', '3d-animation'], thumb: '/assets/spec_oil.jpg', gallery: [] },

  { slug: 'boat-design-catamaran', status: 'draft', title: 'Boat design — catamaran', category: 'product-technology',
    summary: '', description: '', challenge: '', approach: '', result: '', role: '', year: '', client: '',
    serviceSlugs: ['3d-animation', 'design-visualisation'], thumb: '/assets/spec_cat.jpg', gallery: [] },

  /* ---- Architecture & Spaces ----------------------------------------------- */
  {
    slug: 'hooiberg',
    status: 'published',
    title: 'Hooiberg',
    category: 'architecture-spaces',
    year: '',            /* EDIT: year */
    client: '',          /* EDIT: client or architect */
    summary: 'An architectural animation of a house that borrows its structure from the Dutch hooiberg — the hay barn whose roof rides on masts — and rebuilds it as a modern home.',
    hero: { type: 'video', src: '/assets/hooiberg.mp4', poster: '/assets/hooiberg_poster.jpg' },
    thumb: '/assets/hooiberg_02.jpg',
    description: 'A full 3D visualisation of a house built on the logic of a traditional hooiberg: a hipped roof carried clear of the building on four corner masts, the volume beneath it glazed and open on every side, solar panels set into the roof pitch, and the whole thing standing in a flowering meadow. The camera orbits at eye height under a clear sky, so the overhangs, the reflections in the glass and the depth of the terrace read the way they would on site.',
    /* EDIT: fill challenge / approach / result and those sections appear automatically. */
    challenge: '',
    approach: '',
    result: '',
    role: '3D modelling, materials, lighting, camera animation and rendering.',
    serviceSlugs: ['design-visualisation', '3d-animation'],
    gallery: [
      { src: '/assets/hooiberg_01.jpg', alt: 'The house seen across the flowering meadow' },
      { src: '/assets/hooiberg_03.jpg', alt: 'Corner mast and the roof carried clear of the structure' },
      { src: '/assets/hooiberg_04.jpg', alt: 'Glazed ground floor and terrace level' }
    ]
  },

  {
    slug: 'dhg-logwise',
    status: 'published',
    title: 'DHG — Logwise',
    category: 'architecture-spaces',
    year: '2025',
    client: 'DHG',       /* EDIT: confirm how the client should be credited */
    summary: 'Visualisation for a portfolio of Logwise distribution centres — a film for the flagship site plus site models for individual locations.',
    hero: { type: 'image', src: '/assets/logwise_approach.jpg' },
    thumb: '/assets/logwise_approach.jpg',
    description: 'A set of visualisations for Logwise logistics developments. The main film moves from an aerial over a fully solar-panelled roof down to ground level, through the planting and the birch screen, along the branded facade, past the liveried trailers standing at the docks, and finishes at the glazed office entrance. Alongside it, individual sites — Lelystad and Kwadrantweg — are presented as isolated site models on black, so each location can be read as a whole footprint.',
    challenge: 'A distribution centre is a very large grey box, and that is exactly how it usually gets rendered: a shed on an empty plot, seen from a drone, with nothing around it. That image is accurate and completely unpersuasive. For a developer letting the space, the question a tenant or a municipality actually asks is what it is like to arrive at, work next to and look at from the road.',
    approach: 'The film was shot at human height for most of its length. Planting, hedgerows, birch and rough grass do as much work as the building does, the daylight is a real Dutch overcast rather than a rendered sunset, and the operation is running — trailers at the docks, the yard in use. The site models take the opposite approach on purpose: lifted out of context onto black, labelled, so the footprint, the roof area and the dock arrangement can be compared site to site without the landscape getting in the way.',
    result: '',          /* EDIT: what were these used for - letting, planning, tender? */
    role: '3D modelling, materials, landscape and planting, lighting, camera animation and rendering.',
    serviceSlugs: ['design-visualisation', 'technical-visualisation', '3d-animation'],
    gallery: [
      { src: '/assets/logwise_aerial.jpg', alt: 'Aerial over the fully solar-panelled roof' },
      { src: '/assets/logwise_facade.jpg', alt: 'Branded facade seen through the birch planting' },
      { src: '/assets/logwise_docks.jpg', alt: 'Liveried trailers at the loading docks' },
      { src: '/assets/logwise_office.jpg', alt: 'Glazed office entrance at the end of the building' },
      { src: '/assets/logwise_lelystad.jpg', alt: 'Lelystad site model showing the full roof and dock layout', fit: 'contain' },
      { src: '/assets/logwise_kwadrantweg.jpg', alt: 'Kwadrantweg quayside site model with dock crane', fit: 'contain' }
    ],
    watch: { src: '/assets/logwise_film.mp4', poster: '/assets/logwise_poster.jpg', label: 'The film' }
  },

  {
    slug: 'fountain-fuel',
    status: 'published',
    title: 'Fountain Fuel — Brand Movie',
    category: 'architecture-spaces',
    year: '2024',
    client: 'Fountain Fuel',
    summary: 'A brand film for a Dutch hydrogen and fast-charging network, built around a station that mostly did not exist yet.',
    hero: { type: 'image', src: '/assets/fountainfuel_station.jpg' },
    thumb: '/assets/fountainfuel_station.jpg',
    description: 'Fountain Fuel builds refuelling stations for hydrogen and electric vehicles across the Netherlands. The film makes the case for them: it opens on energy dependence, names the answer, reveals the station as an object, and then places that same structure into the ordinary Dutch contexts it will actually stand in — a roadside forecourt, a taxi rank, a polder in the morning mist. Made in collaboration with Astrolads.',
    challenge: 'Almost none of it was built. A film selling a national network has to show a thing the camera cannot go and photograph, and it has to do that without looking like an architectural flythrough — because the argument is not really about a building. It is about energy dependence, and that has to land in the first ten seconds, before a single station appears.',
    approach: 'The structure of the film does the work. It starts with the problem rather than the product: pylons under a bruised sky, the phrase energie afhankelijkheid. The answer arrives as a flat brand statement, then the canopy is revealed alone in the dark — lit as an object, not as a place — so the form registers before any context dilutes it. Only then does the film widen out: the map with the rollout count going from three stations to eleven, and finally the same canopy dropped into three completely different everyday settings so it reads as infrastructure rather than as one render.',
    result: 'The film closes on the ambition it was made to carry: fifty Fountain Fuels.',
    /* EDIT: confirm the exact split of work between the studio and Astrolads. */
    role: '3D visualisation and animation, in collaboration with Astrolads.',
    serviceSlugs: ['design-visualisation', '3d-animation', 'motion-design'],
    gallery: [
      { src: '/assets/fountainfuel_pylons.jpg', alt: 'Opening frame: pylons under the line energie afhankelijkheid', fit: 'contain' },
      { src: '/assets/fountainfuel_canopy.jpg', alt: 'The station canopy revealed alone in the dark', fit: 'contain' },
      { src: '/assets/fountainfuel_map.jpg', alt: 'Rollout map of the Netherlands counting from three stations to eleven', fit: 'contain' },
      { src: '/assets/fountainfuel_taxi.jpg', alt: 'The same canopy serving a taxi rank', fit: 'contain' },
      { src: '/assets/fountainfuel_mist.jpg', alt: 'A station in morning mist with a windmill behind it', fit: 'contain' },
      { src: '/assets/fountainfuel_statement.jpg', alt: 'Brand statement card reading Daarom bouwen we Fountain Fuels', fit: 'contain' }
    ],
    watch: { src: '/assets/fountainfuel_brandmovie.mp4', poster: '/assets/fountainfuel_poster.jpg', label: 'The brand movie' }
  },

  {
    slug: 'carbon-neutral',
    status: 'published',
    title: 'Off To A Better Future',
    category: 'architecture-spaces',
    year: '',            /* EDIT: year */
    client: 'DAF, Sunrock, Logwise, Hyzon and DHG',
    summary: 'A brand film for five companies building a carbon-neutral logistics centre together — solar in, hydrogen out, trucks running on it.',
    hero: { type: 'image', src: '/assets/cn_warehouse.jpg' },
    thumb: '/assets/cn_warehouse.jpg',
    description: 'Five companies, one facility. Sunrock puts solar on the roof, that power splits water into hydrogen with Hyzon, DAF trucks run on the hydrogen, and DHG and Logwise provide the logistics and storage the whole thing exists to serve. The film follows that chain from sunlight to fuel to a truck leaving the yard, and closes on the line it was built around: off to a better future.',
    challenge: 'The story is a supply chain, and supply chains are the least cinematic thing in the world — five companies, five logos, and a process that happens invisibly across a roof, an electrolyser and a fuel nozzle. It also had to belong to all five partners at once without becoming any single one of their brand films.',
    approach: 'Everything is rendered in a single white, near-monochrome material so no partner’s colour dominates and the facility reads as one system rather than five logos on a wall. The copy is built as extruded 3D type standing inside the scenes — WHY NOT START TODAY, FROM SOLAR TO H2 FUEL — so the argument lives in the same space as the buildings instead of being pasted over the top. The logistics centres were modelled from scratch, and the facility arrives on screen as an exploded view assembled with geometry nodes, so the building explains its own parts as it comes together.',
    result: 'The film ends on the partner lockup — DAF, Sunrock, Logwise, Hyzon, DHG — under one line: OFF TO A BETTER FUTURE.',
    role: 'All animation in house. Modelling of the logistics facilities, the geometry-nodes exploded-view system, 3D typography, lighting, look-dev and rendering.',
    serviceSlugs: ['design-visualisation', '3d-animation', 'motion-design', 'technical-visualisation'],
    gallery: [
      { src: '/assets/cn_today.jpg', alt: 'Extruded 3D type reading why not start today', fit: 'contain' },
      { src: '/assets/cn_warehouse.jpg', alt: 'The logistics facility modelled in white', fit: 'contain' },
      { src: '/assets/cn_solar.jpg', alt: 'From solar to H2 fuel, set inside the electrolyser plant', fit: 'contain' },
      { src: '/assets/cn_truck.jpg', alt: 'A Hyzon truck at the hydrogen dispenser', fit: 'contain' },
      { src: '/assets/cn_logos.jpg', alt: 'Closing lockup: off to a better future, with all five partners', fit: 'contain' }
    ],
    watch: { src: '/assets/carbonneutral_film.mp4', poster: '/assets/cn_poster.jpg', label: 'The film' }
  },

  {
    slug: 'ready-set-studios',
    status: 'published',
    title: 'Ready Set Studios',
    category: 'architecture-spaces',
    year: '',            /* EDIT: year */
    client: 'Ready Set Studios',
    summary: 'A dimensioned 3D model of a film studio, built from the architectural drawings so clients could judge the space before booking it.',
    hero: { type: 'image', src: '/assets/rss_front_angle.jpg' },
    thumb: '/assets/rss_front_angle.jpg',
    description: 'Ready Set Studios needed to show prospective clients what their stage actually offered. The building was rebuilt in 3D from the architectural drawings and rendered as a ghosted shell, so the volume, the lighting grid, the LED wall and the shooting areas can all be read at once without the walls getting in the way. Every critical figure is annotated on the render: 27 by 18.5 metres of floor, 8 metres to the grid, the green screen and cyc footprints, and where the 32, 63 and 125 amp power and the water point sit. The set was used on the studio’s own website.',
    challenge: 'A producer deciding where to shoot needs three things fast: does my set fit, can I light it, and can I power it. A floor plan answers the first badly and the other two not at all, and photographs of an empty stage tell you nothing about height or clearance. Nobody books a stage they cannot picture.',
    approach: 'Model the real building from the drawings, then take the walls down to a ghost so the interior volume is the subject rather than the architecture. Dimensions are placed in 3D against the thing they measure instead of being listed beside the image, and the technical points a production actually asks about — power, water, grid height, shooting areas — are tagged in place. Four views cover it: two three-quarter angles for volume, a front elevation for height, and a top-down for floor layout.',
    result: 'The renders were used on the studio’s website to show clients the scale of the space.',
    role: '3D modelling from architectural drawings, annotation and dimensioning, lighting, look-dev and rendering.',
    serviceSlugs: ['technical-visualisation', 'design-visualisation', '3d-animation'],
    gallery: [
      { src: '/assets/rss_back.jpg', alt: 'Three-quarter view from the back of the stage showing the lighting grid', fit: 'contain' },
      { src: '/assets/rss_front.jpg', alt: 'Front elevation with the 8 metre grid height dimensioned', fit: 'contain' },
      { src: '/assets/rss_top.jpg', alt: 'Top-down view showing the floor layout and the LED wall', fit: 'contain' }
    ]
  },

  /* ---- Music & Culture ------------------------------------------------------ */
  {
    slug: 'broederliefde',
    status: 'published',
    title: 'Broederliefde × AFAS Live',
    category: 'music-culture',
    year: '',            /* EDIT: year of the show */
    client: 'FunX Music Awards',
    summary: 'Show visuals for Broederliefde’s set at the FunX Music Awards — content built for the arena’s main LED wall and run live behind the group for the whole set.',
    hero: { type: 'image', src: '/assets/broederliefde_afas.jpg' },
    thumb: '/assets/broederliefde_afas.jpg',
    description: 'Show content for Broederliefde performing at the FunX Music Awards in AFAS Live. The set was built for the arena’s main LED wall: an industrial brick hall with steel beams and lighting rigs, matched to the stage so the physical set and the screen read as one space, and cut to run live behind the group for the full performance.',
    challenge: 'Arena LED is unforgiving. The content has to survive a pixel pitch you do not control, stage lighting firing straight at it, and a camera cut that can go wide at any moment — while still reading from the back of the floor.',
    approach: '',        /* EDIT */
    result: '',          /* EDIT */
    role: 'Show content design, 3D environment, look-dev and delivery for the LED wall.',
    serviceSlugs: ['live-visuals', 'vfx-compositing'],
    gallery: []
  },

  {
    slug: 'flaire-maassilo',
    status: 'published',
    title: 'FLAIRE × Maassilo',
    category: 'music-culture',
    year: '',            /* EDIT */
    client: 'FLAIRE',
    summary: 'A show package for FLAIRE built around a rendered Rotterdam skyline, made for the big screens at the Maassilo.',
    hero: { type: 'video', src: '/assets/maassilo.mp4', poster: '/assets/flaire_maassilo.jpg' },
    thumb: '/assets/flaire_maassilo.jpg',
    description: 'Show content for FLAIRE at the Maassilo in Rotterdam. The package is built on a 3D rig of the Rotterdam skyline — the Erasmusbrug and the waterfront at night — with the artist name staged inside it on pallets and truss, lit in the show’s own palette so the screen content and the room agree.',
    challenge: '',       /* EDIT */
    approach: '',        /* EDIT */
    result: '',          /* EDIT */
    role: '3D environment, type design, look-dev, lighting and render for the venue screens.',
    serviceSlugs: ['live-visuals', 'motion-design', '3d-animation'],
    gallery: [],
    deepLink: { href: '/visuals', label: 'Live visuals' }
  },

  {
    slug: 'tessaract',
    status: 'published',
    title: 'Tessaract',
    category: 'music-culture',
    year: '',            /* EDIT */
    client: 'Self-initiated',
    summary: 'An infinite mirror room — a reflective real-time environment built as a loop for screens and installations.',
    hero: { type: 'video', src: '/assets/tessaract.mp4', poster: '/assets/tessaract_room.jpg' },
    thumb: '/assets/tessaract_room.jpg',
    description: 'A reflective environment that folds back into itself, built to loop seamlessly and to run on a screen or inside an installation rather than play once as a film. Everything in frame is geometry and light — no plate, no set — so the room can be re-lit and re-cut for whatever it is playing behind.',
    challenge: '',       /* EDIT */
    approach: '',        /* EDIT */
    result: '',          /* EDIT */
    role: 'Concept, environment build, shading, lighting and the loop itself.',
    serviceSlugs: ['live-visuals', '3d-animation'],
    gallery: [],
    deepLink: { href: '/visuals', label: 'Live visuals' }
  },

  { slug: 'live-visuals-shows', status: 'draft', title: 'Live visuals — other shows', category: 'music-culture',
    summary: '', description: '', challenge: '', approach: '', result: '', role: '', year: '', client: '',
    serviceSlugs: ['live-visuals'], gallery: [],
    deepLink: { href: '/visuals', label: 'Live visuals' } },

  /* ---- Fashion & Luxury ----------------------------------------------------- */
  {
    slug: 'loro-piana-open-walk',
    status: 'published',
    title: 'Loro Piana — Open Walk',
    category: 'fashion-luxury',
    year: '',            /* EDIT: year */
    client: 'Self-initiated spec',
    summary: 'A spec commercial rebuilding the Loro Piana Open Walk in black suede, down to the crest stamped into the footbed — made to prove an existing product can be recreated in full CG.',
    hero: { type: 'video', src: '/assets/loropiana_outside.mp4', poster: '/assets/loropiana_out_20.jpg' },
    thumb: '/assets/loropiana_out_20.jpg',
    description: 'A self-initiated piece with one job: take a product that already exists, that people already know by sight, and rebuild it in 3D closely enough that the difference stops mattering. The Open Walk in black suede — nap, tan leather lining, white cup sole, and the Loro Piana crest printed into the footbed — modelled, shaded and lit as a commercial rather than as a turntable.',
    challenge: 'Recreating a product nobody recognises is easy. Recreating a famous one is not: the viewer already knows what suede does in raking light, how a cup sole meets the upper, and how a slip-on collapses when nothing is inside it. Every one of those is a place the render can quietly fail.',
    approach: 'The work went into the surface and the light. Suede is the whole brief here — it has direction, it catches light differently as the camera moves, and it has to stay matte without going flat. The lining is a different leather entirely, with its own sheen, and the footbed carries printed artwork that has to sit on the material rather than float above it. Lighting is a single considered key with controlled falloff, the way the product would actually be shot.',
    result: 'Two pieces came out of it: an exterior commercial pass on the pair, and a macro pass that pushes into the footbed to show the branding holds up under a close lens. Together they are the argument — if this product can be rebuilt this closely, so can yours.',
    role: 'Modelling, suede and leather shading, footbed artwork, lighting, camera animation and rendering.',
    serviceSlugs: ['3d-animation', 'technical-visualisation', 'design-visualisation'],
    gallery: [
      { src: '/assets/loropiana_out_6.jpg',  alt: 'The recreated Open Walk pair in black suede' },
      { src: '/assets/loropiana_in_20.jpg',  alt: 'Macro on the tan footbed with the Loro Piana crest' },
      { src: '/assets/loropiana_out_33.jpg', alt: 'Cup sole and suede upper in raking light' },
      { src: '/assets/loropiana_in_33.jpg',  alt: 'Close detail of the leather lining' }
    ],
    watch: { src: '/assets/loropiana_inside.mp4', poster: '/assets/loropiana_in_20.jpg', label: 'Inside look' }
  },

  {
    slug: 'cp-company-mask',
    status: 'published',
    title: 'C.P. Company — Integrated Mask',
    category: 'fashion-luxury',
    year: '2020',
    client: '',          /* EDIT: confirm - commissioned by C.P. Company, or speculative concept? */
    summary: 'A concept study from the COVID period: a face mask built into the garment itself, clipped on and off, in the language of C.P. Company.',
    hero: { type: 'image', src: '/assets/company_mask_1.jpg' },
    thumb: '/assets/company_mask_1.jpg',
    description: 'A design concept that treats the face mask as part of the garment rather than an accessory carried alongside it. The mask attaches to the collar of a knit high-neck with a clip at the jaw, so it can be worn, dropped or removed without ever leaving the wearer. Two constructions were studied — a moulded technical shell and a soft fabric panel that reads as an extension of the collar itself.',
    challenge: 'In 2020 the face mask became a thing everyone carried and nobody wanted to look at. Treated as a medical object it stayed medical. The question was whether protective equipment could be absorbed into a garment as a considered design element instead — without the result looking like a gimmick, and without leaving the brand’s own visual language.',
    approach: 'The concept was built around C.P. Company’s own vocabulary: technical black fabric, matte utilitarian hardware, and the lens badge at the shoulder. A single clip carries the whole idea — it is the fastening, the hinge and the reason the mask never becomes something separate to lose. Everything was modelled, shaded and lit as a product render so the two mask constructions could be compared as finished garments rather than sketches.',
    result: '',          /* EDIT: was this presented, and what came of it? */
    role: 'Concept, garment and hardware modelling, shading, lighting and rendering.',
    serviceSlugs: ['3d-animation', 'design-visualisation'],
    gallery: [
      { src: '/assets/company_mask_2.jpg', alt: 'Second view of the moulded mask attached at the collar' },
      { src: '/assets/company_mask_3.jpg', alt: 'Soft fabric mask variant reading as an extension of the collar' }
    ]
  },

  {
    slug: 'llokaal-expeditie',
    status: 'published',
    title: 'Llokaal Expeditie',
    category: 'film-commercial',
    year: '2022',
    client: 'Llokaal',
    summary: 'A launch film announcing Llokaal Expeditie, a new branch of Llokaal, explained in low-poly 3D inside the brand’s own magenta.',
    hero: { type: 'image', src: '/assets/llokaal_step.jpg' },
    thumb: '/assets/llokaal_step.jpg',
    description: 'Llokaal was launching a new branch, Llokaal Expeditie, and needed people to understand what it actually offered: guidance towards work and education, one to one or in a group. The film explains that in full 3D, using simple low-poly figures and buildings staged in the brand’s existing magenta, with the Dutch copy set directly into the scenes.',
    challenge: 'Announcing a sub-brand is harder than announcing a brand. It has to feel unmistakably like the parent, so nobody reads it as a separate organisation, while still being distinct enough that the new offer registers as something new. And the offer itself — help moving towards work and education — is an abstraction with nothing to photograph.',
    approach: 'Work inside Llokaal’s existing identity rather than around it: the magenta is theirs, and the film commits to it completely, using it as the ground the entire world stands on. Everything else is stripped back to white low-poly figures and buildings, so the only colour in frame is the brand itself. Abstractions get objects — a building with a graduation cap for education, one with a briefcase for work — and the copy is placed in the scene as dimensional type so it reads as part of the world.',
    result: '',          /* EDIT: how was it rolled out - social, site, in-house? */
    role: 'Concept, 3D animation, low-poly art direction, typography, lighting and rendering.',
    serviceSlugs: ['motion-design', '3d-animation'],
    gallery: [
      { src: '/assets/llokaal_title.jpg', alt: 'Title card reading llokaal expeditie', fit: 'contain' },
      { src: '/assets/llokaal_group.jpg', alt: 'Low-poly figures illustrating one to one or in a group', fit: 'contain' },
      { src: '/assets/llokaal_city.jpg', alt: 'Buildings marked with a graduation cap and a briefcase', fit: 'contain' },
      { src: '/assets/llokaal_end.jpg', alt: 'Closing frame of the film', fit: 'contain' }
    ],
    watch: { src: '/assets/llokaal_expeditie.mp4', poster: '/assets/llokaal_poster.jpg', label: 'The film' }
  },

  /* ---- Film & Commercial ---------------------------------------------------- */
  {
    slug: 'street-takeover',
    status: 'published',
    title: 'Street Takeover',
    category: 'film-commercial',
    year: '',            /* EDIT */
    client: '',          /* EDIT: agency or brand, if it can be named */
    summary: 'A full-CG delivery truck dropped into a live-action street plate — modelled, tracked and comped to sit in the shot as if it drove past the camera.',
    hero: { type: 'image', src: '/assets/street_takeover.jpg' },
    thumb: '/assets/street_takeover.jpg',
    description: 'A beverage truck built entirely in 3D and placed into a plate shot on a Dutch residential street. The whole vehicle — body, livery, glass, wheels and shadow contact — is CG; the street, the light and the camera move are real.',
    challenge: 'Nothing about a CG vehicle in a daylight plate is forgiving. The paint has to pick up the same sky, the shadow has to land on the same camber, and the track has to hold while the truck passes foreground objects.',
    approach: 'Plate-first: match the lens and the camera solve, build the truck to real dimensions, light it from the plate rather than from a preset, then comp with the plate’s own grain and grade so nothing announces itself.',
    result: '',          /* EDIT */
    role: 'Modelling, look-dev, tracking and compositing.',
    serviceSlugs: ['vfx-compositing', '3d-animation'],
    gallery: []
  },

  {
    slug: 'el-eternauta',
    status: 'published',
    title: 'El Eternauta',
    category: 'film-commercial',
    year: '2025',
    client: 'Netflix, via VFX studio Planet X',
    summary: 'Environment and prop modelling for the Netflix series — rebuilding blocks of Buenos Aires, and the things left lying in them.',
    hero: { type: 'image', src: '/assets/eternauta_city.jpg' },
    thumb: '/assets/eternauta_city.jpg',
    description: 'Work on the Netflix series El Eternauta, delivered through VFX studio Planet X. The job was the city the story happens in: blocks of Buenos Aires rebuilt from reference so they could be extended, damaged and shot from angles the location never allowed. Alongside the buildings came the set dressing that makes a street read as lived-in — municipal recycling containers carrying the real Ciudad de Buenos Aires markings, and shattered aircraft window panels.',
    challenge: 'A city that a local audience knows by heart cannot be approximated. The rooflines, the shop fronts, the way a low-rise block meets a railway cutting — all of it has to match a real place closely enough to survive being cut against plate photography, while still being built light enough to hand back to a pipeline and dress, damage and relight.',
    approach: 'Reference first: street photography and aerials of the actual neighbourhood assembled into a board, then the block laid out in flat colour to get massing and proportion right before a single texture exists. Only once the silhouette reads does the detail go on. Props were built the same way — a crushed recycling container modelled and weathered with its real municipal graphics intact, and window panels broken as geometry with clean UVs so the damage could be re-dressed shot to shot rather than baked in.',
    result: '',          /* EDIT: anything you can say about shots delivered or how it was used */
    role: 'Environment and asset modelling, texturing and set-dressing props.',
    serviceSlugs: ['vfx-compositing', '3d-animation', 'technical-visualisation'],
    gallery: [
      { src: '/assets/eternauta_reference.jpg', alt: 'Reference board: street and aerial photography of the neighbourhood beside the 3D block', fit: 'contain' },
      { src: '/assets/eternauta_blocking.jpg', alt: 'The city block laid out in flat colour to judge massing before texturing', fit: 'contain' },
      { src: '/assets/eternauta_building.jpg', alt: 'A textured and weathered commercial building' },
      { src: '/assets/eternauta_container.jpg', alt: 'Crushed municipal recycling container' },
      { src: '/assets/eternauta_container2.jpg', alt: 'The container showing its Ciudad de Buenos Aires markings' },
      { src: '/assets/eternauta_windows.jpg', alt: 'Shattered aircraft window panels built as geometry with clean UVs', fit: 'contain' }
    ]
  },

  { slug: 'animation-vfx-work', status: 'draft', title: 'Animation and VFX work', category: 'film-commercial',
    summary: '', description: '', challenge: '', approach: '', result: '', role: '', year: '', client: '',
    serviceSlugs: ['vfx-compositing', '3d-animation'], gallery: [],
    deepLink: { href: '/vfx', label: 'VFX' } }
];

/* Studio-wide copy reused across the generated pages. */
export const studio = {
  name: 'Vision For Xperiences',
  positioning: 'Vision For Xperiences creates cinematic 3D, animation, and interactive visuals for products, spaces, performances, and ideas that are difficult to show.',
  email: 'studio@vfx.productions'
};
