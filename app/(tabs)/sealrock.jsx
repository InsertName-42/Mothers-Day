import PostcardScreen from "../PostcardScreen";
import { TASKS } from "../tasks";

const task = TASKS.find((t) => t.id === 11);

export default function SealRockScreen() {
  return (
    <PostcardScreen
      image={require("../../assets/images/postcard-sealrock.png")} // placeholder
      task={task}
      notecardText="0.4 mile trail at Seal Rock State Recreation Area. Spot harbor seals on the rocks below!"
    />
  );
}