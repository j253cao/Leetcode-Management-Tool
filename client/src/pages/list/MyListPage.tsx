import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { MdPlaylistAdd } from "react-icons/md";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

import "./MyListPage.css";
import SummaryBox from "../../components/list/SummaryBox";
import { authLogout, selectUserId } from "../../redux/authSlice";
import ListItem from "../../components/list/ListItem";
import AddItemForm from "../../components/list/AddItemForm";
import { AiOutlineClose } from "react-icons/ai";
import {
  fetchAllItems,
  selectFilteredItems,
  selectPagedAttemptedItems,
  selectPagedCompletedItems,
  selectPagedToDoItems,
} from "../../redux/itemSlice";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  setPage,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="search-bar-container">
      <FiSearch size={20} style={{ marginLeft: 10 }} />
      <input
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
        value={searchTerm}
        className="search-bar-input"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default function MyListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [addingActive, setAddingActive] = useState<boolean>(false);
  const [summaryBoxActive, setSummaryBoxActive] = useState({
    "All Problems": true,
    Completed: false,
    Attempted: false,
    "To-Do": false,
  });
  const [page, setPage] = useState(1);
  const userId = useSelector(selectUserId);
  useEffect(() => {
    const dispatchAllEntries = async () => {
      await dispatch(fetchAllItems({ ownerId: userId }));
    };
    dispatchAllEntries();
  }, [userId]);
  const [searchTerm, setSearchTerm] = useState("");
  const allCompletedItems = useSelector(selectPagedCompletedItems);
  const allAttemptedItems = useSelector(selectPagedAttemptedItems);
  const allToDoItems = useSelector(selectPagedToDoItems);
  const filteredList = useSelector((state: RootState) =>
    selectFilteredItems(state, summaryBoxActive),
  );
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
        {/* <div
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
        </div> */}
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

  const handleFilteredPageLogic = () => {
    let total = 0;
    if (summaryBoxActive["All Problems"]) {
      return allAttemptedItems.length + allCompletedItems.length + allToDoItems.length;
    }
    if (summaryBoxActive["Attempted"]) total += allAttemptedItems.length;
    if (summaryBoxActive["Completed"]) total += allCompletedItems.length;
    if (summaryBoxActive["To-Do"]) total += allToDoItems.length;
    return total;
  };

  useEffect(() => {
    setPage(1);
  }, [summaryBoxActive]);

  return (
    <div className="list-page-container">
      <NavigationTab />
      <div className="list-page-body">
        <div className="list-page-summary-box-row-container">
          <SummaryBox
            summaryBoxActive={summaryBoxActive}
            setSummaryBoxActive={setSummaryBoxActive}
            status={"All Problems"}
            numberOfItems={
              allAttemptedItems.length + allCompletedItems.length + allToDoItems.length
            }
          />
          <SummaryBox
            summaryBoxActive={summaryBoxActive}
            setSummaryBoxActive={setSummaryBoxActive}
            status={"Completed"}
            numberOfItems={allCompletedItems.length}
          />
          <SummaryBox
            summaryBoxActive={summaryBoxActive}
            setSummaryBoxActive={setSummaryBoxActive}
            status={"Attempted"}
            numberOfItems={allAttemptedItems.length}
          />
          <SummaryBox
            summaryBoxActive={summaryBoxActive}
            setSummaryBoxActive={setSummaryBoxActive}
            status={"To-Do"}
            numberOfItems={allToDoItems.length}
          />
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setPage={setPage} />
        <div className="list-header-container">
          {headerCategories.map((category, index) => {
            return (
              <h3 key={index} className="header-text">
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
        {filteredList
          ? filteredList
              .filter((val) => {
                if (!searchTerm) {
                  return val;
                } else if (val.problemName.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val;
                }
              })
              .slice((page - 1) * 10, page * 10)
              .map((item, index) => {
                return (
                  <>
                    <div style={{ marginTop: 5 }} />
                    <ListItem key={index} data={item} />
                  </>
                );
              })
          : null}
      </div>
      <div className="switch-page-container">
        <button
          className="switch-buttons"
          onClick={
            page > 1
              ? () =>
                  setPage((prevPage) => {
                    return prevPage - 1;
                  })
              : () => {
                  return null;
                }
          }
        >
          {page > 1 ? (
            <AiFillCaretLeft size={30} />
          ) : (
            <AiFillCaretLeft size={30} style={{ opacity: 0 }} />
          )}
        </button>
        <p style={{ fontSize: "2em", padding: 0, margin: 0 }}>{page}</p>
        <button
          className="switch-buttons"
          onClick={
            handleFilteredPageLogic() > page * 10
              ? () =>
                  setPage((prevPage) => {
                    return prevPage + 1;
                  })
              : () => {
                  return null;
                }
          }
        >
          {handleFilteredPageLogic() > page * 10 ? (
            <AiFillCaretRight size={30} />
          ) : (
            <AiFillCaretRight size={30} style={{ opacity: 0 }} />
          )}
        </button>
      </div>
    </div>
  );
}
