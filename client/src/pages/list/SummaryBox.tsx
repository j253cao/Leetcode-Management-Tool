import { FcTodoList } from "react-icons/fc";
import { BsListOl, BsListCheck } from "react-icons/bs";

import "./SummaryBox.css";

type status = "All Problems" | "Completed" | "In-Progress" | "To-Do";

export default function SummaryBox({
  status,
  numberOfItems,
}: {
  status: status;
  numberOfItems: number;
}) {
  const textColors = {
    "All Problems": "#000",
    Completed: "#34C700",
    "In-Progress": "#FF8A00",
    "To-Do": "#5863F8",
  };
  return (
    <div className="summary-box-container">
      <div className="summary-box-text">
        <h3 style={{ margin: 0, color: textColors[status], alignSelf: "flex-start" }}>{status}</h3>
      </div>
      <div className="summary-box-image-container">
        <h1 style={{ margin: 0, fontSize: "1.7em", marginTop: 5 }}>{numberOfItems}</h1>
        {status === "All Problems" ? <BsListOl size={50} /> : null}
        {status === "Completed" ? <BsListCheck size={50} style={{ color: "#34C700" }} /> : null}
        {status === "In-Progress" ? <BsListOl size={50} /> : null}
        {status === "To-Do" ? <FcTodoList size={48} /> : null}
      </div>
    </div>
  );
}
