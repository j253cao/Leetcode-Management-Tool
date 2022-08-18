import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { selectUserId } from "../../redux/authSlice";
import { addItemEntry } from "../../redux/itemSlice";
import { AppDispatch } from "../../redux/store";

import "./AddItemForm.css";

export default function AddItemForm({
  addingActive,
  setAddingActive,
}: {
  addingActive: boolean;
  setAddingActive: Function;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const [status, setStatus] = useState("");
  const [problemName, setProblemName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [timeTaken, setTimeTaken] = useState("");
  const [dateCompleted, setDateCompleted] = useState("");
  const [topics, setTopics] = useState("");

  const [errors, setErrors] = useState({
    status: false,
    problemName: false,
    difficulty: false,
    timeTaken: false,
    dateCompleted: false,
  });

  const ownerId = useSelector(selectUserId);

  const handleErrorCheck = () => {
    console.log(difficulty);
    setErrors((prevState) => {
      return { ...prevState, status: !status ? true : false };
    });

    setErrors((prevState) => {
      return { ...prevState, problemName: !problemName ? true : false };
    });

    setErrors((prevState) => {
      return { ...prevState, difficulty: !difficulty ? true : false };
    });

    setErrors((prevState) => {
      return { ...prevState, timeTaken: !timeTaken ? true : false };
    });

    setErrors((prevState) => {
      return { ...prevState, dateCompleted: !dateCompleted ? true : false };
    });
  };

  const handleSubmit = async () => {
    const inputData = {
      status,
      problemName,
      difficulty,
      timeTaken,
      dateCompleted,
      topics,
      ownerId,
    };

    try {
      const response = await dispatch(addItemEntry(inputData));
      if (response) {
        // setStatus("");
        // setProblemName("");
        // setDateCompleted("");
        // setDifficulty("");
        // setTopics("");
        // setTimeTaken("");
      }
    } catch (error) {
      handleErrorCheck();
      return error;
    }
    handleErrorCheck();
  };
  return (
    <div className="add-item-form-container">
      <form className="add-item-form-container" style={{ margin: 0 }}>
        <select
          onChange={(event) => setStatus(event.target.value)}
          defaultValue={"status"}
          className="add-item-text-input"
          style={
            errors.status ? { borderStyle: "solid", borderColor: "#FF3333", borderWidth: 1 } : {}
          }
          required
        >
          <option id="status">Status</option>
          <option>Completed</option>
          <option style={{ fontSize: "1.2em" }}>Attempted</option>
          <option style={{ fontSize: "1.2em" }}>To-Do</option>
        </select>

        <input
          className="add-item-text-input"
          onChange={(event) => setProblemName(event.target.value)}
          value={problemName}
          placeholder="Name"
          style={
            errors.problemName
              ? { borderStyle: "solid", borderColor: "#FF3333", borderWidth: 1 }
              : {}
          }
          required
        ></input>

        <select
          onChange={(event) => setDifficulty(event.target.value)}
          value={difficulty}
          className="add-item-text-input"
          style={
            errors.difficulty
              ? { borderStyle: "solid", borderColor: "#FF3333", borderWidth: 1 }
              : {}
          }
          required
        >
          <option>Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <input
          onChange={(event) => setTimeTaken(event.target.value)}
          value={timeTaken}
          type="text"
          className="add-item-text-input"
          placeholder="Time Taken"
          style={
            errors.timeTaken ? { borderStyle: "solid", borderColor: "#FF3333", borderWidth: 1 } : {}
          }
          required
        ></input>

        <input
          onChange={(event) => setDateCompleted(event.target.value)}
          value={dateCompleted}
          className="add-item-text-input"
          type="date"
          style={
            errors.dateCompleted
              ? { borderStyle: "solid", borderColor: "#FF3333", borderWidth: 1 }
              : {}
          }
          required
        ></input>

        <textarea
          onChange={(event) => setTopics(event.target.value)}
          value={topics}
          className="add-item-text-input"
          placeholder="Problem notes.."
        ></textarea>
        <button type="button" onClick={handleSubmit} className="add-item-form-add-button">
          <MdPlaylistAdd size={36} style={{ color: "#5863f8" }} />
        </button>
      </form>
    </div>
  );
}
