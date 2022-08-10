import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";

import "./AddItemForm.css";

export default function AddItemForm() {
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [topics, setTopics] = useState("");

  const handleSubmit = () => {
    console.log(status, name, difficulty, time, date, topics);
  };

  return (
    <div className="add-item-form-container">
      <form className="add-item-form-container" style={{ margin: 0 }}>
        <select
          onChange={(event) => setStatus(event.target.value)}
          value={status}
          className="add-item-text-input"
          required
        >
          <option selected={true}>Status</option>
          <option>Completed</option>
          <option style={{ fontSize: "1.2em" }}>Attempted</option>
          <option style={{ fontSize: "1.2em" }}>To-Do</option>
        </select>

        <input
          className="add-item-text-input"
          onChange={(event) => setName(event.target.value)}
          value={name}
          placeholder="Name"
          required
        ></input>

        <select
          onChange={(event) => setDifficulty(event.target.value)}
          value={difficulty}
          className="add-item-text-input"
          required
        >
          <option selected={true}>Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <input
          onChange={(event) => setTime(event.target.value)}
          value={time}
          type="text"
          className="add-item-text-input"
          placeholder="Time Taken"
          required
        ></input>

        <input
          onChange={(event) => setDate(event.target.value)}
          value={date}
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
