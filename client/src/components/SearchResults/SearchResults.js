import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import "./search.css";
import Topbar from "../topbar/Topbar";
import { Link } from "react-router-dom";
import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { searchUsers } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
function SearchResults() {
  const [parsedArray, setArray] = useState([]);
  useEffect(() => {
    const users = Array(localStorage.getItem("foundUsers"));
    const arr = JSON.parse(users);
    setArray(arr);
  }, []);

  const [inputFields, setInputFields] = useState({});
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleInputChange = ({ target: { name, value } }) => {
    setInputFields((prev) => ({ ...prev, [name]: value }));
  };
  async function fetchUsers() {
    try {
      const searchResult = await searchUsers(inputFields.name);
      setArray(searchResult);
      localStorage.setItem("foundUsers", JSON.stringify(searchResult));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
              value={inputFields.name}
              autoComplete="off"
              onChange={handleInputChange}
            />
            {inputFields.name ? (
              <Button className="btn" onClick={fetchUsers}>
                Search
              </Button>
            ) : (
              ""
            )}
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
      <div className="parent">
        {parsedArray.map((user) => (
          <Link to={`/profile/${user.username}`}>
            <Card
              key={user.id}
              username={user.username}
              profilePicture={user.profilePicture}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

export default SearchResults;
