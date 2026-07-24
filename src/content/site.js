// ---------------------------------------------------------------
// Site content configuration — edit THIS file to change content.
// To add a series: drop media into public/assets/<category>/<folder>,
// run `npm run manifest`, then add an entry to `series` below.
// ---------------------------------------------------------------

export const SITE = {
  name: "Darshan Jhawar",
  role: "Photographer · drone pilot · editor",
  location: "Bengaluru, India",
  email: "heman.jhawar@gmail.com",
  phone: "+91 94815 12589",
  phoneHref: "tel:+919481512589",
  instagram: "https://www.instagram.com/dash_1357",
  linkedin: "https://www.linkedin.com/in/darshan-jhawar-703161217/",
  tagline: "Available for shoots & collaborations across India.",
};

export const CATEGORIES = [
  {
    slug: "sports",
    name: "Sports",
    color: "#C01818",
    colorHi: "#E04040",
    tile: "/assets/home/sports.jpeg",
    blurb: "Speed, sweat, and split seconds — trackside stories from India's racing grid to the football pitch.",
    series: [
      {
        title: "Indian Formula 4 Weekend – Chennai Street Circuit",
        description: "A high-octane spectacle where speed meets strategy and nerves are tested to their limits. Set against the gritty, sun-scorched backdrop of Chennai’s urban maze, this series captures the raw electricity of India’s premier Formula 4 showdown. Screaming engines echo through tight corners, while drivers thread their way through chaos and control with split-second precision. It’s not just a race — it’s choreography on asphalt, where every turn risks glory or gravel.",
        folder: "sports/f4-weekend",
      },
      {
        title: "Bengaluru Karting Cup",
        description: "Before the grand circuits and roaring crowds, this is where it all begins — the raw, unfiltered world of karting. The Bengaluru Karting Cup dives deep into the adrenaline-fueled chaos of young racers carving their legacy one lap at a time. With screeching tires, unpredictable overtakes, and a crowd buzzing with grassroots energy, this series is an ode to racing's most honest form.",
        folder: "sports/karting",
      },
      {
        title: "Bengaluru FC Edits",
        description: "This isn't just a football club — it’s a movement. In this emotional edit series, we go beyond goals and glory to capture the heartbeats of Bengaluru FC. From tunnel walks and pre-match rituals to last-minute tackles and euphoric celebrations, this story unfolds in fragments of passion. With a cinematic lens, we chronicle a journey of grit, loyalty, and the unbreakable bond between a team and its people.",
        folder: "sports/bfc",
      },
      {
        title: "AbbVie Corporate Cricket Tournament",
        description: "Suits traded for whites, boardrooms for the boundary. AbbVie's corporate cricket tournament brings out a different kind of competitive spirit — between the bat-taps and quick singles, this series catches colleagues turned teammates, chasing wins that have nothing to do with quarterly targets.",
        folder: "sports/abbvie-cricket",
      },
      {
        title: "Sila Tournament",
        description: "Nets, run-ups, and the quiet focus before a ball is bowled. This series follows the Sila Tournament in its unscripted moments, where the preparation is as compelling as the play.",
        folder: "sports/sila-tournament",
      },
      {
        title: "BTM Football Club",
        description: "Est. 2009 and still hungry — BTM Football Club takes the pitch season after season under the Karnataka football association's lights. This series is a record of that hunger: warmups, breakaways, and the unguarded joy of a goal well earned.",
        folder: "sports/btm-fc",
      },
      {
        title: "Racquetly",
        description: "Padel's newest address in Koramangala. Racquetly's courts turn a fast, social sport into a small spectacle of its own — this series is a first look at the space, the light, and the game as it's played after dark.",
        folder: "sports/racquetly",
      },
    ],
  },
  {
    slug: "wildlife",
    name: "Wildlife",
    color: "#2E7D4F",
    colorHi: "#58B37D",
    tile: "/assets/home/wildlife.jpeg",
    blurb: "Patience, light, and the moment the forest decides to reveal itself.",
    series: [
      {
        title: "Kabini Wildlife Reserve",
        description: "Where forest meets river, and silence meets the unexpected. Kabini is where nature speaks in rustles, roars, and glances from the underbrush. This series trails the mystery of this iconic reserve — elusive leopards draped across tree limbs, elephants emerging from fog, and golden light breaking through thick canopy.",
        folder: "wildlife/kabini",
      },
      {
        title: "Birds",
        description: "To watch a bird in flight is to witness freedom at its purest. This series captures the grace, color, and quiet stories of avian life — from the rhythmic stillness of herons to the sudden flutters of finches mid-feed. Each frame preserves the poetry of motion and the quiet elegance of wings in the wild.",
        folder: "wildlife/birds",
      },
      {
        title: "Jim Corbett Wildlife Reserve",
        description: "Legendary in name and legacy, Corbett is more than a reserve — it’s a living epic. Nestled in Uttarakhand’s rich wilderness, its landscapes carry history, mystery, and the ever-present pulse of the wild. This series brings you face-to-face with morning mists curling around sal trees, tiger trails barely visible in the mud, and the quiet confidence of elephants in their element.",
        folder: "wildlife/corbett",
      },
      {
        title: "Backyard",
        description: "Not every wild encounter needs a jungle. This series stays close to home, watching a squirrel go about its ordinary, unbothered business a few feet from the front door.",
        folder: "wildlife/backyard",
      },
    ],
  },
  {
    slug: "travel",
    name: "Travel",
    color: "#2E6BB5",
    colorHi: "#5C97DE",
    tile: "/assets/home/travel.jpeg",
    blurb: "Landscapes, machines, and skies — postcards from the road, and from above it.",
    series: [
      {
        title: "Spiti Valley",
        description: "Remote, rugged, and breathtakingly silent — Spiti isn’t a destination; it’s a feeling. High in the trans-Himalayan belt, this cold desert valley cradles ancient monasteries, frozen rivers, and skies that feel closer to space than Earth. This collection captures its raw solitude and sacred stillness — an invitation to slow down and absorb the untouched.",
        folder: "travel/spiti",
      },
      {
        title: "Aviation",
        description: "From taxi to takeoff, this series salutes the marvel of aviation. These aren't just machines in motion — they are poetry in precision. I’ve tried to frame the symmetry of flight: the anticipation on the runway, the graceful arcs through cloud banks, the sharp lines of wings slicing through atmosphere.",
        folder: "travel/aviation",
      },
      {
        title: "Astrophotography",
        description: "Beneath vast Indian skies, far from the noise of cities, lies a canvas most never see. This series slows time and opens the heavens — galaxies spiraling in silence, star trails painting ancient skies, and Milky Way arcs that seem too perfect to be real. These frames are born from long hours, cold fingers, and a devotion to capturing what the naked eye cannot.",
        folder: "travel/astro",
      },
      {
        title: "Symmetrical Photography",
        description: "There’s harmony in stillness, poetry in patterns. This segment explores symmetry not as technique, but as emotion — in reflections, architecture, and aligned moments that speak to our inner balance. Whether it's a lone building mirroring its surroundings or a human silhouette centered in geometry, symmetry reveals order in a chaotic world.",
        folder: "travel/symmetry",
      },
      {
        title: "Automotive",
        description: "Every badge tells a small story of engineering pride. This series turns the camera close — on chrome, on lines, on the details that get overlooked at speed.",
        folder: "travel/automotive",
      },
      {
        title: "Bengaluru Skies",
        description: "Some evenings the sky over Bengaluru puts on a show worth stopping for. This series collects those moments — storm light breaking over rooftops, clouds stacking into something almost architectural.",
        folder: "travel/skyline",
      },
      {
        title: "Forest Light",
        description: "Morning light through a stand of trees, the kind of stillness that doesn't need a destination attached to it. A quiet detour from the usual road.",
        folder: "travel/forest",
      },
    ],
  },
  {
    slug: "drone",
    name: "Drone",
    color: "#79828C",
    colorHi: "#A3ADB7",
    tile: "/assets/home/drone.jpeg",
    blurb: "The world from where only wings go.",
    sketchfab: "https://sketchfab.com/models/85678e6bf8a74829984193fed2d025b5/embed",
    series: [
      {
        title: "Shoots and Edits",
        description: "High above rooftops and rivers, across coastlines and cityscapes, this gallery captures the language of flight. These edits bring together sweeping panoramas and purposeful transitions, each telling a story of motion, emotion, and perspective. This is where drone footage becomes more than documentation — it becomes direction.",
        folder: "drone/shoots",
      },
      {
        title: "Rush Arena",
        description: "A full sports campus seen the way it's rarely seen — track, pitch, pool, and court laid out like a diagram from four hundred feet up. This series flies the length of Rush Arena, tracing the geometry that hundreds of athletes move through every day.",
        folder: "drone/rush-arena",
      },
    ],
  },
  {
    slug: "pixelstretch",
    name: "Pixel Stretch",
    color: "#6B4FA0",
    colorHi: "#9B7EDB",
    tile: "/assets/home/pixelstretch.jpeg",
    blurb: "Photography pushed past the frame — real subjects, reimagined with digital light and motion.",
    series: [
      {
        title: "Pixel Stretch",
        description: "Where the camera's work becomes raw material for something stranger. This series takes real subjects — athletes, machines, moments already shot — and pushes them through digital light, motion, and color into something a lens alone couldn't produce.",
        folder: "pixelstretch/stretch",
      },
    ],
  },
];

export const bySlug = (slug) => CATEGORIES.find((c) => c.slug === slug);

export const HOME = {
  heroVideo: "/assets/home/hero.mp4",
  heroPoster: "/assets/home/hero-poster.jpg",
  manifesto: "Some frames are shot at two hundred kilometres an hour. Some wait for a leopard to blink. I make room for both.",
};
