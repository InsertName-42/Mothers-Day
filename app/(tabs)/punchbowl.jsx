import PostcardScreen from "../PostcardScreen";
import { TASKS } from "../tasks";

const task = TASKS.find((t) => t.id === 9);

export default function PunchbowlScreen() {
  return (
    <PostcardScreen
      image={require("../../assets/images/postcard-punchbowl.png")} // placeholder
      task={task}
      notecardText="Natural rock bowl carved by waves. Free entry — explore the dramatic cove."
    />
  );
}