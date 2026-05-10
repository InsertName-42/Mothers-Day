// tasks.js

// 1. Pre-cache icon references to prevent lag during map interactions
const Icons = {
  believeOrNot: require("../assets/images/believeOrNot.webp"),
  candy: require("../assets/images/candy.webp"),
  seal: require("../assets/images/seal.webp"),
  oceanTrail: require("../assets/images/oceanTrail.webp"),
  seaLion: require("../assets/images/seaLion.webp"),
  tidepools: require("../assets/images/tidepools.webp"),
  lighthouse: require("../assets/images/lighthouse.webp"),
  lunch: require("../assets/images/lunch.webp"),
  paint: require("../assets/images/paint.webp"),
  devilsPunchbowl: require("../assets/images/devilsPunchbowl.webp"),
  artCenter: require("../assets/images/artCenter.webp"),
  scienceCenter: require("../assets/images/scienceCenter.webp"),
  seaGlass: require("../assets/images/seaGlass.webp"),
  whale: require("../assets/images/whale.webp"),
  sandCastle: require("../assets/images/sandCastle.webp"),
  camera: require("../assets/images/camera.webp"),
  bonus: require("../assets/images/bonus.webp"),
  rockFace: require("../assets/images/rockFace.webp"),
};

export const TASKS = [
  {
    id: 1,
    title: "Ripley's Statues",
    type: "single",
    score: 30,
    desc: "Recreate the poses of four different statues outside of Ripley Believe it or Not.",
    x: 70, y: 53.7,
    image: Icons.believeOrNot
  },
  {
    id: 15,
    title: "Candy Taste Test",
    type: "single",
    score: 45,
    desc: "Try taffy from Newport Candy Shoppe and Newport Candy Basket and add your vote to the discourse.",
    x: 38.6, y: 59.7,
    image: Icons.candy
  },
  {
    id: 11,
    title: "Seal Rock (the Rock)",
    type: "single",
    score: 50,
    desc: "Enjoy the natural beauty of seal rock (and don’t forget to check out the bonus challenge).",
    x: 20, y: 10,
    image: Icons.seal
  },
  {
    id: 6,
    title: "Ocean Bay Trail",
    type: "single",
    score: 50,
    desc: "Hike the beautiful Ocean Bay Trail for .67 miles, and attempt to spot the most fungi.",
    x: 51.4, y: 15,
    image: Icons.oceanTrail
  },
  {
    id: 4,
    title: "Sea Lion Docks",
    type: "single",
    score: 30,
    desc: "Spot a sea lion at the sea lion docks.",
    x: 58.1, y: 59.9,
    image: Icons.seaLion
  },
  {
    id: 3,
    title: "Yaquina Tide Pools",
    type: "single",
    score: 75,
    desc: "Find a sea urchin and a sea anemone plus one of starfish or sea cucumber at Yaquina Head outstanding natural area.",
    x: 12, y: 13.3,
    image: Icons.tidepools
  },
  {
    id: 16,
    title: "Lighthouse Pose",
    type: "single",
    score: 25,
    desc: "Pose as a lighthouse with Yaquina Head lighthouse.",
    x: 7, y: 10.1,
    image: Icons.lighthouse
  },
  {
    id: 17,
    title: "Life's Spice",
    type: "single",
    score: 30,
    desc: "Meet at 12:30 and have a unique order at Georgie’s beachside grill.",
    x: 20.3, y: 62.4,
    image: Icons.lunch
  },
  {
    id: 14,
    title: "Art Gallery Exploration",
    type: "time",
    minutes: 30,
    score: 75,
    desc: "Explore 3 art galleries for 10 minutes each.",
    x: 47.4, y: 42.3,
    image: Icons.paint,
    glow: true
  },
  {
    id: 9,
    title: "Devil's Punchbowl",
    type: "time",
    minutes: 10,
    score: 60,
    desc: "Soak up the dangerous beauty of Devils Punchbowl Natural Area for at least 10 minutes.",
    x: 28, y: 3.5,
    image: Icons.devilsPunchbowl
  },
  {
    id: 7,
    title: "Visual Arts Center",
    type: "time",
    minutes: 15,
    score: 30,
    desc: "Explore Newport Visual arts center for at least 15 minutes.",
    x: 34.5, y: 41,
    image: Icons.artCenter
  },
  {
    id: 8,
    title: "Science Center",
    type: "time",
    minutes: 25,
    score: 35,
    desc: "Spend 25 minutes in Hatfield Marine Science visitor center ($5 per person)",
    x: 53.9, y: 69.6,
    image: Icons.scienceCenter
  },
  {
    id: 13,
    title: "Sea Glass Hunt",
    type: "head",
    score: 60,
    desc: "Find the most sea glass on Newport's beaches.",
    x: 38.1, y: 22.6,
    image: Icons.seaGlass,
    glow: true
  },
  {
    id: 12,
    title: "Whale Mural Search",
    type: "head",
    score: 60,
    desc: "Take the most selfies with murals featuring whales.",
    x: 62.3, y: 32.6,
    image: Icons.whale,
    glow: true
  },
  {
    id: 5,
    title: "Sand Castle Kickoff",
    type: "judge",
    score: 100,
    desc: "For the kickoff challenge! Build the best sand castle at Nye beach!",
    x: 35.6, y: 36.9,
    image: Icons.sandCastle
  },
  {
    id: 18,
    title: "Picture Newport",
    type: "single",
    score: 50,
    desc: "Take the goofiest and most Newport group photo",
    x: 30.7, y: 70.4,
    image: Icons.camera,
    glow: true
  },
  {
    id: 19,
    title: "The Seal",
    type: "judge",
    score: 50,
    desc: "Photograph a seal at seal rock.",
    x: 77, y: 31,
    image: Icons.bonus
  },
  {
    id: 20,
    title: "Rock Face",
    type: "single",
    score: 10,
    desc: "Take a photo with the face in the rock.",
    x: 13.9, y: 59.6,
    image: Icons.rockFace
  }
];

export const TYPE_COLORS = {
  single:  "#1D9E75",
  time:    "#534AB7",
  head:    "#BA7517",
  judge:   "#D85A30",
  group:   "#185FA5",
};