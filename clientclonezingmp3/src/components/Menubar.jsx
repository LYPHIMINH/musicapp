import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/menubar.css";
import {
  faBars,
  faChartSimple,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ModalCreatePlaylist from "./ModalCreatePlaylist";
import LoginModal from "./ModalLogin";
import { ApiFindPlaylistByUser } from "../api/indext";
import { Link } from "react-router-dom";
import { setListPlaylistOfUser, useAppContext } from "../context/AppContext";
import { getPlaylistByUserId } from "../service/PlaylistService";
import { Alert } from "react-bootstrap";

function MenuBar() {
  const [selected, setSelected] = useState(null);
  const [showModalCreatePlaylist, setShowModalCreatePlaylist] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [listPlaylist, setListPlaylist] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [reload, setReload] = useState(false);
  const { state, dispatch } = useAppContext();
  const handleReload = () => {
    setReload(!reload);
  };
  const handleCreatePlaylist = () => {
    if (localStorage.getItem("user")) {
      setShowModalCreatePlaylist(true);
    } else {
      setShowModalLogin(true);
    }
  };
  const fetchPlaylistByUser = () => {
    if (!localStorage.getItem("user")) {
      return;
    }
    const id = JSON.parse(localStorage.getItem("user")).data.id;
    getPlaylistByUserId(id).then((data) => {
      console.warn(data);
      console.log(data);
      data.reverse();
      setListPlaylist(data);
      dispatch(setListPlaylistOfUser(data));
    });
  };
  useEffect(() => {
    fetchPlaylistByUser();
  }, []);
  const screenWidth = window.innerWidth;

  if (screenWidth > 600) {
    return (
      <nav className="menubar">
        <ModalCreatePlaylist
          showed={showModalCreatePlaylist}
          onHide={() => setShowModalCreatePlaylist(false)}
          onReload={handleReload}
        />
        <LoginModal
          showed={showModalLogin}
          onHide={() => setShowModalLogin(false)}
          role={"USER"}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/ZingMP3logo.svg/1280px-ZingMP3logo.svg.png"
          style={{ height: "auto", maxWidth: "100%", padding: 10 }}></img>
        <ul>
          <li
            style={{ backgroundColor: selected === 1 ? "#3A3344" : "#231B2E" }}>
            <Link to={"/"} className="menu-item" onClick={() => setSelected(1)}>
              <FontAwesomeIcon
                icon={faCompactDisc}
                style={{ color: "#fcfcfc" }}
              />{" "}
              &nbsp; Khám phá
            </Link>
          </li>
          {/* <li style={{backgroundColor: selected===2?"#3A3344":"#231B2E"}} onClick={()=>setSelected(2)}><a className="menu-item">
            <FontAwesomeIcon icon={faChartSimple} style={{color: "#ffffff",}}/>  &nbsp;
                #zingchart</a></li> */}
          <li
            style={{ backgroundColor: selected === 3 ? "#3A3344" : "#231B2E" }}
            onClick={() => setSelected(3)}>
            <Link to={"/song"} className="menu-item">
              <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff" }} />{" "}
              &nbsp; Thư viện
            </Link>
          </li>
          <li
            style={{ backgroundColor: selected === 3 ? "#3A3344" : "#231B2E" }}>
            <div
              className="menu-item"
              onClick={() => {
                handleCreatePlaylist();
              }}>
              <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff" }} />{" "}
              &nbsp; Thêm Playlist{" "}
            </div>
          </li>
          <div style={{ overflow: "auto" }}>
            {user &&
              listPlaylist.map((item) => {
                return (
                  <li
                    style={{
                      backgroundColor: selected === 3 ? "#3A3344" : "#231B2E",
                    }}>
                    <a className="menu-item" href={`/playlist/${item.id}`}>
                      {item.name}
                    </a>
                  </li>
                );
              })}
          </div>
        </ul>
      </nav>
    );
  } else {
    return <div className="menubar"></div>;
  }
}

export default MenuBar;
