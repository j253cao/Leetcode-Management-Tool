import "./Backdrop.css";
export default function BackDrop() {
  return (
    <div className="backdrop-container">
      <span className="backdrop-left-block-filler" />
      <div className="backdrop-contents-container">
        <h1 style={{ fontSize: "3em" }}>Features</h1>
        <ul className="backdrop-contents-list">
          <li>Track your Leetcode progress</li>
          <li>Plan to ace your interviews</li>
          <li>Sign up for free</li>
        </ul>
      </div>
    </div>
  );
}
