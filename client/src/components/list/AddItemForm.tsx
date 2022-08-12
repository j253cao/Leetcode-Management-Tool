import { stat } from "fs";
import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { selectUserId } from "../../redux/authSlice";
import { addItemEntry, status } from "../../redux/itemSlice";
import { AppDispatch } from "../../redux/store";

import "./AddItemForm.css";

export default function AddItemForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [status, setStatus] = useState("");
  const [problemName, setProblemName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [timeTaken, setTimeTaken] = useState("");
  const [dateCompleted, setDateCompleted] = useState("");
  const [topics, setTopics] = useState("");
  const ownerId = useSelector(selectUserId);
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
    } catch (error) {}
  };
  return (
    <div className="add-item-form-container">
      <form className="add-item-form-container" style={{ margin: 0 }}>
        <select
          onChange={(event) => setStatus(event.target.value)}
          defaultValue={"status"}
          className="add-item-text-input"
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
          required
        ></input>

        <select
          onChange={(event) => setDifficulty(event.target.value)}
          value={difficulty}
          className="add-item-text-input"
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
          required
        ></input>

        <input
          onChange={(event) => setDateCompleted(event.target.value)}
          value={dateCompleted}
          className="add-item-text-input"
          type="date"
          required
        ></input>

        <textarea
          onChange={(event) => setTopics(event.target.value)}
          value={topics}
          className="add-item-text-input"
          style={{ paddingTop: 8, height: 22 }}
          placeholder="Problem notes.."
        ></textarea>
        <button type="button" onClick={handleSubmit} className="add-item-form-add-button">
          <MdPlaylistAdd size={36} style={{ color: "#5863f8" }} />
        </button>
      </form>
    </div>
  );
}
