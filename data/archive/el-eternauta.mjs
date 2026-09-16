/* ARCHIVED - not part of the site.
   Pulled from /work on the owner's instruction while the Planet X agreement
   is unconfirmed. Nothing references this file; the build never reads it.

   To put it back:
     1. paste the object below into the `projects` array in ../site.mjs
     2. copy assets/_archive/el-eternauta/*.jpg back into assets/
     3. node tools/build.mjs
*/

export const elEternauta =
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
    description: 'Work on the Netflix series El Eternauta, delivered through VFX studio Planet X as part of the asset team — modelling and texturing, not compositing or shot work. The job was the city the story happens in: blocks of Buenos Aires rebuilt from reference so they could be extended, damaged and shot from angles the location never allowed. Alongside the buildings came the set dressing that makes a street read as lived-in — municipal recycling containers carrying the real Ciudad de Buenos Aires markings, and shattered aircraft window panels.',
    challenge: 'A city that a local audience knows by heart cannot be approximated. The rooflines, the shop fronts, the way a low-rise block meets a railway cutting — all of it has to match a real place closely enough to survive being cut against plate photography, while still being built light enough to hand back to a pipeline and dress, damage and relight.',
    approach: 'Reference first: street photography and aerials of the actual neighbourhood assembled into a board, then the block laid out in flat colour to get massing and proportion right before a single texture exists. Only once the silhouette reads does the detail go on. Props were built the same way — a crushed recycling container modelled and weathered with its real municipal graphics intact, and window panels broken as geometry with clean UVs so the damage could be re-dressed shot to shot rather than baked in.',
    result: '',          /* EDIT: anything you can say about shots delivered or how it was used */
    role: 'Environment and asset modelling, texturing and set-dressing props, as part of the asset team. No compositing or VFX work on this production — asset creation only. Everything shown on this page was built by the studio; assets worked on with others are deliberately not included.',
    serviceSlugs: ['vfx-compositing', '3d-animation', 'technical-visualisation'],
    gallery: [
      { src: '/assets/eternauta_reference.jpg', alt: 'Reference board: street and aerial photography of the neighbourhood beside the 3D block', fit: 'contain' },
      { src: '/assets/eternauta_blocking.jpg', alt: 'The city block laid out in flat colour to judge massing before texturing', fit: 'contain' },
      { src: '/assets/eternauta_building.jpg', alt: 'A textured and weathered commercial building' },
      { src: '/assets/eternauta_container.jpg', alt: 'Crushed municipal recycling container' },
      { src: '/assets/eternauta_container2.jpg', alt: 'The container showing its Ciudad de Buenos Aires markings' },
      { src: '/assets/eternauta_windows.jpg', alt: 'Shattered aircraft window panels built as geometry with clean UVs', fit: 'contain' }
    ]
  };
