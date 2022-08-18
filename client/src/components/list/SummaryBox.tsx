import { RiTodoLine } from "react-icons/ri";
import { BsListOl, BsListCheck } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import "./SummaryBox.css";

type status = "All Problems" | "Completed" | "Attempted" | "To-Do";

export default function SummaryBox({
  status,
  numberOfItems,
  summaryBoxActive,
  setSummaryBoxActive,
}: {
  status: status;
  numberOfItems: number;
  summaryBoxActive: {
    "All Problems": boolean;
    Completed: boolean;
    Attempted: boolean;
    "To-Do": boolean;
  };
  setSummaryBoxActive: Function;
}) {
  const textColors = {
    "All Problems": summaryBoxActive[status] ? "#000" : "#808080",
    Completed: summaryBoxActive[status] ? "#34C700" : "#258E00",
    Attempted: summaryBoxActive[status] ? "#FF8A00" : "#C96D00",
    "To-Do": summaryBoxActive[status] ? "#5863F8" : "#4049B3",
  };

  const handleSummaryBoxState = () => {
    if (status != "All Problems") {
      setSummaryBoxActive({
        ...summaryBoxActive,
        [status]: !summaryBoxActive[status],
        "All Problems": false,
      });
    } else if (!summaryBoxActive[status]) {
      setSummaryBoxActive({
        Completed: false,
        Attempted: false,
        "To-Do": false,
        [status]: !summaryBoxActive[status],
      });
    }
  };

  return (
    <button
      style={
        summaryBoxActive[status]
          ? { boxShadow: `0px 0px 1px 2px ${textColors[status]}` }
          : { border: `solid 2px ${textColors[status]} ` }
      }
      className="summary-box-container"
      onClick={handleSummaryBoxState}
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
        {status === "Attempted" ? (
          <AiOutlineLoading3Quarters size={36} style={{ color: textColors[status] }} />
        ) : null}
        {status === "To-Do" ? <RiTodoLine size={40} style={{ color: textColors[status] }} /> : null}
      </div>
    </button>
  );
}
