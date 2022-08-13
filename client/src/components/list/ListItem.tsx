import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiTodoLine } from "react-icons/ri";
import { FcCollapse, FcExpand } from "react-icons/fc";

import "./ListItem.css";
import { item } from "../../redux/itemSlice";
import { useState } from "react";

export default function ListItem({ data }: { data: item }) {
  const { status, problemName, difficulty, topics, timeTaken, dateCompleted } = data;
  const [expanded, setExpaned] = useState(false);
  const listItemValues = {
    status: {
      Completed: <AiOutlineCheck size={30} style={{ color: "#34C700" }} />,
      Attempted: <AiOutlineLoading3Quarters size={24} style={{ color: "#FF8A00" }} />,
      "To-Do": <RiTodoLine size={27} style={{ color: "#5863f8" }} />,
    },
    difficulty: {
      Easy: "#34C700",
      Medium: "#FF8A00",
      Hard: "#FF3333",
    },
  };

  const RegularItem = () => {
    return (
      <div className="list-item-container">
        <div className="list-item-property" style={{ height: 43 }}>
          {listItemValues.status[status]}
        </div>

        <h3 className="list-item-property">
          {problemName.length > 25 ? `${problemName.slice(0, 25)}...` : problemName}
        </h3>
        <h3 className="list-item-property" style={{ color: listItemValues.difficulty[difficulty] }}>
          {difficulty}
        </h3>
        <h3 className="list-item-property">{timeTaken}</h3>
        <h3 className="list-item-property">{dateCompleted}</h3>
        <h3 className="list-item-property">
          {topics ? (topics.length > 25 ? `${topics.slice(0, 25)}...` : topics) : null}
        </h3>
        <button onClick={() => setExpaned(true)} className="list-item-edit-button">
          <FcExpand size={24} />
        </button>
      </div>
    );
  };
  const ExpandedItem = () => {
    return (
      <div className="list-item-container">
        <div className="list-item-property" style={{ height: 43 }}>
          {listItemValues.status[status]}
        </div>

        <h3 className="list-item-property" style={{ height: "auto" }}>
          {problemName}asjkdnaskjdnalasajdnlajsndlaansld
        </h3>
        <h3 className="list-item-property" style={{ color: listItemValues.difficulty[difficulty] }}>
          {difficulty}
        </h3>
        <h3 className="list-item-property">{timeTaken}</h3>
        <h3 className="list-item-property">{dateCompleted}</h3>
        <h3 className="list-item-property">
          {topics ? (topics.length > 25 ? `${topics.slice(0, 25)}...` : topics) : null}
        </h3>
        <button onClick={() => setExpaned(false)} className="list-item-edit-button">
          <FcCollapse size={24} />
        </button>
      </div>
    );
  };
  return expanded ? <ExpandedItem /> : <RegularItem />;
}
