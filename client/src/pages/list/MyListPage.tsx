import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { MdInbox, MdPlaylistAdd } from "react-icons/md";
import Modal from "react-modal";

import "./MyListPage.css";
import SummaryBox from "../../components/list/SummaryBox";
import { authLogout } from "../../redux/authSlice";
import ListItem from "../../components/list/ListItem";
import AddItemForm from "../../components/list/AddItemForm";

Modal.setAppElement("#root");

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <FiSearch size={20} style={{ marginLeft: 10 }} />
      <input className="search-bar-input" type="text" placeholder="Search" />
    </div>
  );
};

const ListHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const changeModalState = () => {
    setModalOpen(!modalOpen);
  };

  const headerCategories = [
    "Status",
    "Name",
    "Difficulty",
    "Topics",
    "Time Taken",
    "Date Completed",
  ];
  return (
    <div className="list-header-container">
      {headerCategories.map((category) => {
        return (
          <h3 style={{ fontWeight: "normal", width: "15%", fontSize: "1.2em" }}>{category}</h3>
        );
      })}
      <button className="list-header-add-item-button" onClick={changeModalState}>
        <MdPlaylistAdd size={36} style={{ color: "#5863f8", alignSelf: "flex-end" }} />
      </button>

      <Modal isOpen={modalOpen} onRequestClose={changeModalState} contentLabel="Example Modal">
        <AddItemForm />
      </Modal>
    </div>
  );
};

export default function MyListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleUserLogout = async () => {
    localStorage.clear();
    const response = await dispatch(authLogout());
    if (response) {
      navigate("/login");
    }
  };

  const NavigationTab = () => {
    const [trackerActive, setTrackerActive] = useState(true);
    const activeHeaderStyle = {
      borderBottom: "5px solid",
      borderColor: "#5863F8",
    };
    return (
      <div className="my-list-header-container">
        <div
          style={trackerActive ? activeHeaderStyle : {}}
          className="my-list-header-button-tracker-container"
        >
          <button
            onClick={() => setTrackerActive(true)}
            style={
              trackerActive
                ? {
                    color: "#5863F8",
                  }
                : {}
            }
            className="my-list-header-button-tracker "
          >
            Tracker
          </button>
        </div>
        <div
          style={!trackerActive ? activeHeaderStyle : {}}
          className="my-list-header-button-statistics-container"
        >
          <button
            onClick={() => setTrackerActive(false)}
            className="my-list-header-button-statistics"
            style={
              !trackerActive
                ? {
                    color: "#5863F8",
                  }
                : {}
            }
          >
            Statistics
          </button>
        </div>
        <div className="my-list-header-button-tracker-container">
          <button onClick={handleUserLogout} className="my-list-header-button-tracker ">
            Logout
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="list-page-container">
      <NavigationTab />
      <div className="list-page-body">
        <div className="list-page-summary-box-row-container">
          <SummaryBox status={"All Problems"} numberOfItems={256} />
          <SummaryBox status={"Completed"} numberOfItems={148} />
          <SummaryBox status={"In-Progress"} numberOfItems={94} />
          <SummaryBox status={"To-Do"} numberOfItems={14} />
        </div>
        <SearchBar />
        <ListHeader />
      </div>
    </div>
  );
}
