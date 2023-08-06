import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

import { useAuth } from "../hooks";
import { handleGetCityName, handleGetCurrentTime } from "../utils";
import { customStyles } from "../customStyles";

const Header = ({ title }) => {
  const {
    auth: { username },
    setAuth,
  } = useAuth();

  const [currentTime, setCurrentTime] = useState("");
  const [cityName, setCityName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [currentTimeLoading, setCurrentTimeLoading] = useState(true);
  const [cityNameLoading, setCityNameLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(handleGetCurrentTime());
      setCurrentTimeLoading(false); // Mark currentTime as loaded
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await handleGetCityName(latitude, longitude, setCityName);
        setCityNameLoading(false); // Mark cityName as loaded
      },
      (error) => console.error("Error getting user's location:", error)
    );
  }, []);

  // Check if both current time and city name are loaded
  const bothLoaded = !currentTimeLoading && !cityNameLoading;

  return (
    <>
      <div className="logged-out">
        {!bothLoaded && <div></div>}
        {bothLoaded && (
          <div className="current-time">
            {currentTime && cityName ? <>{currentTime} in {cityName}</>
            : currentTime ? <>{currentTime}</>
            : cityName ? <>You're in (or near) {cityName}</>
            : null}
          </div>
        )}
        {!username && ( <Link to={"/login"}> <FaSignInAlt className="log-in-icon" /> </Link> )}
      {username && (
        <>
          <p className="logged-in" onClick={handleOpenModal}>
            {/* Logged in as */}
            &nbsp;<strong> @{username}</strong>
          </p>
          <ReactModal isOpen={showModal} contentLabel="onRequestClose Example" onRequestClose={handleCloseModal} style={customStyles}>
            <p>Are you sure you want to log out?</p> <br />
            <div className="modal-buttons">
              <button style={{ backgroundColor: "var(--charcoal)" }} onClick={handleCloseModal}>Cancel</button>
              <button style={{ backgroundColor: "red" }} onClick={() => { toast.warn("You've been logged out!"); setAuth({});}}>
                Log Out
                </button>
            </div>
          </ReactModal>
        </>
      )}
      </div>
      <header className="Header">
        <h1>{title}</h1>
      </header>
    </>
  );
};

export default Header;