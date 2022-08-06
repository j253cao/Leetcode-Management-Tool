import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInState, verifyExistingLogin } from "../../redux/authSlice";
import { AppDispatch } from "../../redux/store";
import { userLogout } from "../../redux/userSlice";

import "./MyListPage.css";
import SummaryBox from "./SummaryBox";

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <FiSearch size={20} style={{ marginLeft: 10 }} />
      <input className="search-bar-input" type="text" placeholder="Search" />
    </div>
  );
};

const ListHeader = () => {
  return (
    <div className="list-header-container">
      <h3 style={{ fontWeight: "normal" }}>Status</h3>
      <h3 style={{ fontWeight: "normal" }}>Name</h3>
      <h3 style={{ fontWeight: "normal" }}>Difficulty</h3>
      <h3 style={{ fontWeight: "normal" }}>Topics</h3>
      <h3 style={{ fontWeight: "normal" }}>Time Taken</h3>
      <h3 style={{ fontWeight: "normal" }}>Date Completed</h3>
    </div>
  );
};

export default function MyListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const test = useSelector(selectLoggedInState);
  console.log(test);
  useEffect(() => {
    const persistedLogin = async () => {
      const localUser = localStorage.getItem("profile");
      if (localUser) {
        const { email, password } = JSON.parse(localUser);
        await dispatch(verifyExistingLogin({ email, password }));
      }
    };
    persistedLogin();
  }, []);

  const handleUserLogout = () => {
    localStorage.clear();
    dispatch(userLogout());
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
