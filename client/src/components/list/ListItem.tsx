import { AiOutlineCheck, AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiTodoLine } from "react-icons/ri";
import { FcCollapse, FcExpand } from "react-icons/fc";

import { useState } from "react";
import { useDispatch } from "react-redux";

import "./ListItem.css";
import { deleteItemEntry, item } from "../../redux/itemSlice";
import { AppDispatch } from "../../redux/store";

export default function ListItem({ data }: { data: item }) {
  const dispatch = useDispatch<AppDispatch>();

  const { status, problemName, difficulty, topics, timeTaken, dateCompleted, _id } = data;
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

  const handleDeleteItem = async () => {
    try {
      const response = await dispatch(deleteItemEntry({ _id }));
      if (response) setExpaned(false);
    } catch (error) {
      return error;
    }
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
  //delete, edit?
  const ExpandedItem = () => {
    return (
      <div
        className="list-item-container"
        style={{
          borderColor:
            status === "To-Do" ? "#5863f8" : status === "Completed" ? "#34C700" : "#FF8A00",
          height: 60,
        }}
      >
        <div className="list-item-property" style={{ height: 43 }}>
          {listItemValues.status[status]}
        </div>

        <h3 className="list-item-property" style={{ height: "auto" }}>
          {problemName}
        </h3>
        <h3 className="list-item-property" style={{ color: listItemValues.difficulty[difficulty] }}>
          {difficulty}
        </h3>
        <h3 className="list-item-property">{timeTaken}</h3>
        <h3 className="list-item-property">{dateCompleted}</h3>
        <h3 className="list-item-property">
          {topics ? (topics.length > 25 ? `${topics.slice(0, 25)}...` : topics) : null}
        </h3>
        <div style={{ width: 48, padding: 0, margin: 0 }}>
          <button onClick={() => setExpaned(false)} className="list-item-edit-button">
            <FcCollapse size={24} />
          </button>
          <button onClick={handleDeleteItem} className="list-item-edit-button">
            <AiOutlineClose size={24} color={"#FF3333"} />
          </button>
        </div>
      </div>
    );
  };
  return expanded ? <ExpandedItem /> : <RegularItem />;
}
