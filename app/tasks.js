// All scavenger hunt tasks with their map positions (as % of image size)
// x/y are percentage values 0-100 so they work on any screen size
export const TASKS = [
  {
    id: 3,
    title: "Find a sea urchin",
    type: "single",
    desc: "Yaquina Head Outstanding Natural Area. Search the tide pools for sea urchins along the rocky shore.",
    x: 18, y: 14,
  },
  {
    id: 16,
    title: "Selfie with the lighthouse",
    type: "single",
    desc: "Take a selfie with the iconic Yaquina Head Lighthouse — tallest on the Oregon coast at 93 feet.",
    x: 16, y: 18,
  },
  {
    id: 4,
    title: "See a sea lion",
    type: "single",
    desc: "See a sea lion at the Newport Sea Lion Docks. Free admission — watch them lounge on the floating docks!",
    x: 22, y: 32,
  },
  {
    id: 15,
    title: "Taste test candy",
    type: "single",
    desc: "Try taffy from Newport Candy Shop AND Belinda's Candies. Cast your vote — which is better?",
    x: 30, y: 30,
  },
  {
    id: 12,
    title: "Whale mural selfies",
    type: "head",
    desc: "Take selfies with the most murals featuring whales around Newport. Most murals wins!",
    x: 35, y: 33,
  },
  {
    id: 6,
    title: "Ocean to Bay Trail",
    type: "single",
    desc: "Hike the Ocean to Bay Trail — 0.67 miles connecting Nye Beach to Yaquina Bay.",
    x: 20, y: 42,
  },
  {
    id: 5,
    title: "Best sand castle",
    type: "judge",
    desc: "Build the best sand castle at Nye Beach! Judged on creativity, size, and craftsmanship.",
    x: 16, y: 46,
  },
  {
    id: 13,
    title: "Find the most sea glass",
    type: "head",
    desc: "Scour the beaches for the most sea glass. The collector with the most pieces wins.",
    x: 14, y: 50,
  },
  {
    id: 7,
    title: "Visual Arts Center",
    type: "time",
    desc: "Explore Newport Visual Arts Center — free admission. Features rotating exhibitions from local and regional artists.",
    x: 28, y: 53,
  },
  {
    id: 14,
    title: "Explore 3 art galleries",
    type: "time",
    desc: "Find and explore at least 3 art galleries around Newport. Document each visit.",
    x: 36, y: 56,
  },
  {
    id: 9,
    title: "Devil's Punchbowl",
    type: "time",
    desc: "Visit Devil's Punchbowl Natural Area — free. Watch waves crash into this dramatic collapsed sea cave bowl.",
    x: 15, y: 23,
  },
  {
    id: 11,
    title: "Spot seals at Seal Rock",
    type: "single",
    desc: "Spot some seals on the Seal Rock State Recreation Area Trail — 0.4 miles along the bluff.",
    x: 14, y: 60,
  },
  {
    id: 8,
    title: "Hatfield Marine Science Ctr",
    type: "special",
    desc: "Hatfield Marine Science Visitor Center — $5 per person. Interactive exhibits on ocean science and marine life.",
    x: 48, y: 68,
  },
];

// Colors for each event type
export const TYPE_COLORS = {
  single:  "#1D9E75",
  time:    "#534AB7",
  head:    "#BA7517",
  judge:   "#D85A30",
  special: "#185FA5",
};