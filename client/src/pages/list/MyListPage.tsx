import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { MdPlaylistAdd } from "react-icons/md";

import "./MyListPage.css";
import SummaryBox from "../../components/list/SummaryBox";
import { authLogout, selectUserId } from "../../redux/authSlice";
import ListItem from "../../components/list/ListItem";
import AddItemForm from "../../components/list/AddItemForm";
import { AiOutlineClose } from "react-icons/ai";
import {
  fetchAllItems,
  selectPagedAttemptedItems,
  selectPagedCompletedItems,
  selectPagedItems,
  selectPagedToDoItems,
} from "../../redux/itemSlice";

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <FiSearch size={20} style={{ marginLeft: 10 }} />
      <input className="search-bar-input" type="text" placeholder="Search" />
    </div>
  );
};

export default function MyListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [addingActive, setAddingActive] = useState<boolean>(false);

  const userId = useSelector(selectUserId);
  useEffect(() => {
    const dispatchAllEntries = async () => {
      await dispatch(fetchAllItems({ ownerId: userId }));
    };
    dispatchAllEntries();
  }, [userId]);

  const items = useSelector((state: RootState) => selectPagedItems(state, 1));
  const allItems = useSelector(selectPagedItems);
  const allCompletedItems = useSelector(selectPagedCompletedItems);
  const allAttemptedItems = useSelector(selectPagedAttemptedItems);
  const allToDoItems = useSelector(selectPagedToDoItems);

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

  const headerCategories = [
    "Status",
    "Name",
    "Difficulty",
    "Time Taken",
    "Date Completed",
    "Topics",
  ];

  return (
    <div className="list-page-container">
      <NavigationTab />
      <div className="list-page-body">
        <div className="list-page-summary-box-row-container">
          <SummaryBox status={"All Problems"} numberOfItems={allItems.length} />
          <SummaryBox status={"Completed"} numberOfItems={allCompletedItems.length} />
          <SummaryBox status={"In-Progress"} numberOfItems={allAttemptedItems.length} />
          <SummaryBox status={"To-Do"} numberOfItems={allToDoItems.length} />
        </div>
        <SearchBar />
        <div className="list-header-container">
          {headerCategories.map((category, index) => {
            return (
              <h3
                key={index}
                style={{
                  fontWeight: "normal",
                  width: "15%",
                  fontSize: "1.2em",
                  textAlign: "center",
                }}
              >
                {category}
              </h3>
            );
          })}
          <button
            className="list-header-add-item-button"
            onClick={() => {
              setAddingActive(!addingActive);
            }}
            style={{ width: 48 }}
          >
            {addingActive ? (
              <AiOutlineClose size={24} color={"#FF3333"} />
            ) : (
              <MdPlaylistAdd size={36} style={{ color: "#5863f8" }} />
            )}
          </button>
        </div>
        {addingActive && (
          <AddItemForm addingActive={addingActive} setAddingActive={setAddingActive} />
        )}
        {items
          ? items.map((item, index) => {
              return <ListItem key={index} data={item} />;
            })
          : null}
      </div>
    </div>
  );
}
