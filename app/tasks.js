export const TASKS = [
  {
    id: 1,
    title: "Ripley's Statues",
    type: "single",
    score: 30,
    desc: "Recreate the poses of four different statues outside of Ripley Believe it or Not.",
    x: 28, y: 35,
    image: require("../assets/images/believeOrNot.jpg")
  },
  {
    id: 15,
    title: "Candy Taste Test",
    type: "single",
    score: 45,
    desc: "Try taffy from Newport Candy Shoppe and Newport Candy Basket and add your vote to the discourse.",
    x: 30, y: 30,
    image: require("../assets/images/candy.jpg")
  },
  {
    id: 11,
    title: "Seal Rock (the Rock)",
    type: "single",
    score: 50,
    desc: "Enjoy the natural beauty of seal rock (and don’t forget to check out the bonus challenge).",
    x: 14, y: 60,
    image: require("../assets/images/seal.jpg")
  },
  {
    id: 6,
    title: "Ocean Bay Trail",
    type: "single",
    score: 50,
    desc: "Hike the beautiful Ocean Bay Trail for .67 miles, and attempt to spot the most fungi.",
    x: 20, y: 42,
    image: require("../assets/images/oceanTrail.jpg")
  },
  {
    id: 4,
    title: "Sea Lion Docks",
    type: "single",
    score: 30,
    desc: "Spot a sea lion at the sea lion docks.",
    x: 22, y: 32,
    image: require("../assets/images/seaLion.jpg")
  },
  {
    id: 3,
    title: "Yaquina Tide Pools",
    type: "single",
    score: 75,
    desc: "Find a sea urchin and a sea anemone plus one of starfish or sea cucumber at Yaquina Head outstanding natural area.",
    x: 18, y: 14,
    image: require("../assets/images/tidepools.jpg")
  },
  {
    id: 16,
    title: "Lighthouse Pose",
    type: "single",
    score: 25,
    desc: "Pose as a lighthouse with Yaquina Head lighthouse.",
    x: 16, y: 18,
    image: require("../assets/images/lighthouse.jpg")
  },
  {
    id: 17,
    title: "Life's Spice",
    type: "single",
    score: 30,
    desc: "Meet at 12:30 and have a unique order at Georgie’s beachside grill.",
    x: 25, y: 48,
    image: require("../assets/images/lunch.jpg")
  },
  {
    id: 14,
    title: "Art Gallery Exploration",
    type: "time",
    minutes: 30,
    score: 75,
    desc: "Explore 3 art galleries for 10 minutes each.",
    x: 36, y: 56,
    image: require("../assets/images/paint.jpg")
  },
  {
    id: 9,
    title: "Devil's Punchbowl",
    type: "time",
    minutes: 10,
    score: 60,
    desc: "Soak up the dangerous beauty of Devils Punchbowl Natural Area for at least 10 minutes.",
    x: 15, y: 23,
    image: require("../assets/images/devilsPunchbowl.jpg")
  },
  {
    id: 7,
    title: "Visual Arts Center",
    type: "time",
    minutes: 15,
    score: 30,
    desc: "Explore Newport Visual arts center for at least 15 minutes.",
    x: 28, y: 53,
    image: require("../assets/images/artCenter.jpg")
  },
  {
    id: 8,
    title: "Science Center",
    type: "time",
    minutes: 25,
    score: 35,
    desc: "Spend 25 minutes in Hatfield Marine Science visitor center ($5 per person)",
    x: 48, y: 68,
    image: require("../assets/images/scienceCenter.jpg")
  },
  {
    id: 13,
    title: "Sea Glass Hunt",
    type: "head",
    score: 60,
    desc: "Find the most sea glass on Newport's beaches.",
    x: 14, y: 50,
    image: require("../assets/images/seaGlass.jpg")
  },
  {
    id: 12,
    title: "Whale Mural Search",
    type: "head",
    score: 60,
    desc: "Take the most selfies with murals featuring whales.",
    x: 35, y: 33,
    image: require("../assets/images/whale.jpg")
  },
  {
    id: 5,
    title: "Sand Castle Kickoff",
    type: "judge",
    score: 100,
    desc: "For the kickoff challenge! Build the best sand castle at Nye beach!",
    x: 35.6, y: 36.8,
    image: require("../assets/images/sandCastle.jpg")
  },
  {
    id: 18,
    title: "Picture Newport",
    type: "single",
    score: 50,
    desc: "Take the goofiest and most Newport group photo",
    x: 40, y: 40,
    image: require("../assets/images/camera.jpg")
  },
  {
    id: 19,
    title: "The Seal",
    type: "judge",
    score: 50,
    desc: "Photograph a seal at seal rock.",
    x: 50, y: 50,
    image: require("../assets/images/bonus.jpg")
  }
];

export const TYPE_COLORS = {
  single:  "#1D9E75",
  time:    "#534AB7",
  head:    "#BA7517",
  judge:   "#D85A30",
  group:   "#185FA5",
};