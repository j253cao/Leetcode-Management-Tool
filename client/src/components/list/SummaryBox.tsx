import { RiTodoLine } from "react-icons/ri";
import { BsListOl, BsListCheck } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
    <div
      style={{ boxShadow: `0px 0px 1px 2px ${textColors[status]}` }}
      className="summary-box-container"
    >
      <div className="summary-box-text">
        <h3 style={{ margin: 0, color: textColors[status], alignSelf: "flex-start" }}>{status}</h3>
      </div>
      <div className="summary-box-image-container">
        <h1 style={{ margin: 0, fontSize: "1.7em", marginTop: 5 }}>{numberOfItems}</h1>
        {status === "All Problems" ? <BsListOl size={40} /> : null}
        {status === "Completed" ? (
          <BsListCheck size={40} style={{ color: textColors[status] }} />
        ) : null}
        {status === "In-Progress" ? (
          <AiOutlineLoading3Quarters size={36} style={{ color: textColors[status] }} />
        ) : null}
        {status === "To-Do" ? <RiTodoLine size={40} style={{ color: textColors[status] }} /> : null}
      </div>
    </div>
  );
}
