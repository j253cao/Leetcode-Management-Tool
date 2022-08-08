import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiTodoLine } from "react-icons/ri";

import "./ListItem.css";

interface Data {
  status: string;
  name: string;
  difficulty: string;
  topics: string;
  timeTaken: number;
  dateCompleted: Date;
}

export default function ListItem({ data }: { data: Data }) {
  const { status, name, difficulty, topics, timeTaken, dateCompleted } = data;
  const listItemValueKeys = [
    "status",
    "name",
    "difficulty",
    "topics",
    "timeTaken",
    "dateCompleted",
  ];
  const listItemValues = {
    status: {
      completed: <AiOutlineCheck size={24} style={{ color: "#34C700" }} />,
      inProgress: <AiOutlineLoading3Quarters size={24} style={{ color: "#FF8A00" }} />,
      toDo: <RiTodoLine size={24} style={{ color: "#5863f8" }} />,
    },
    name,
    difficulty,
    topics,
    timeTaken,
    dateCompleted,
  };
  return (
    <div className="list-item-container">
      <h3>Status</h3>
      <h3>name</h3>
      <h3>difficulty</h3>
      <h3>topics</h3>
      <h3>time taken</h3>
      <h3>date Com</h3>
    </div>
  );
}
