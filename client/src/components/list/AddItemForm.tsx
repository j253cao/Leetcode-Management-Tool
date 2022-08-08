import "./AddItemForm.css";

export default function AddItemForm() {
  return (
    <div className="add-item-form-container">
      <div className="add-item-form-header">
        <h1>Add Item</h1>
        <button className="add-item-form-close-button">close</button>
      </div>
      <form className="add-item-form">
        <label style={{ fontSize: "2em", marginTop: "0.4em" }}>Name</label>
        <input type="text" placeholder="name" className="add-item-form-input"></input>
        <label style={{ fontSize: "2em", marginTop: "0.4em" }}>Name</label>
        <input type="text" placeholder="name" className="add-item-form-input"></input>
        <label style={{ fontSize: "2em", marginTop: "0.4em" }}>Name</label>
        <input type="text" placeholder="name" className="add-item-form-input"></input>
        <label style={{ fontSize: "2em", marginTop: "0.4em" }}>Name</label>
        <input type="text" placeholder="name" className="add-item-form-input"></input>
      </form>
    </div>
  );
}
