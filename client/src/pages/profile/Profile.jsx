import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Cancel, PermMedia } from "@material-ui/icons";
import { updateProfile } from "../../apiCalls";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [LoggedInUser,setLoggedInUser] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
    const newProfile = {
      userId: user._id,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newProfile.profilePicture = fileName;
      console.log(newProfile);
      try {
        await axios.post("/upload", data);
        const res = await updateProfile(newProfile);
        window.location.reload();
        console.log(res);
        
      } catch (err) {
        console.log(err);
      }
    }
    
  };

  useEffect(() => {
    const user = Array(localStorage.getItem("user"));
    const arr = JSON.parse(user);
    setLoggedInUser(arr);
  }, []);


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              {file ? (
                <img
                  className="profileUserImg"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
              ) : (
                <img
                  className="profileUserImg"
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
              )}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          {LoggedInUser.username === username ?<form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">Update Profile Picture</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>
            <div className="actionButtons">
              {" "}
              {file && (
                <button className="shareButton" type="submit">
                  Upload
                </button>
              )}
              {file && (
                <Cancel
                  className="cancelButton"
                  onClick={() => setFile(null)}
                />
              )}
            </div>
          </form>:""}
          

          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
