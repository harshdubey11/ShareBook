import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Menu } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@material-ui/core";
import { searchUsers } from "../../apiCalls";
import { useHistory } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();
  const history = useHistory();
  function navigateTo() {
    history.push("/search");
  }

  function debounce(func, delay) {
    let timeoutID = null;
    return function () {
      clearTimeout(timeoutID);
      let args = arguments;
      let that = this;
      timeoutID = setTimeout(function () {
        func.apply(that, args);
      }, delay);
    };
  }

  const [inputFields, setInputFields] = useState({});
  const [foundUsers, setFoundUsers] = useState([]);

  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleInputChange = ({ target: { name, value } }) => {
    setInputFields((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (location.pathname == "/")
      localStorage.setItem("foundUsers", JSON.stringify([]));
  }, []);

  // const searchUsersByQuery = debounce(function () {
  //   fetchUsers();
  // }, 1000);

  async function fetchUsers() {
    try {
      const searchResult = await searchUsers(inputFields.name);
      setFoundUsers(searchResult);
      localStorage.setItem("foundUsers", JSON.stringify(searchResult));
      navigateTo();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ShareBook</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for People"
            className="searchInput"
            type="text"
            name="name"
            autoComplete="off"
            value={inputFields.name}
            onChange={handleInputChange}
          />
          {inputFields.name?<Button className="btn" onClick={fetchUsers}>Search</Button>:''}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to="/logout">
              <Button>Logout</Button>
            </Link>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
