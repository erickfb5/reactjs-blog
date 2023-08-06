import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const IsOffline = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const handleOffline = () => {
    setIsOffline(true);
    toast.error("Oops! It looks like you've lost internet connection.");
    console.error("Oops! It looks like you've lost internet connection.");
  };

  const handleOnline = () => {
    setIsOffline(false);
    toast.success("You're back online!");
  };

  useEffect(() => {
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return isOffline ? (
    <main className="About">
      <h1><FontAwesomeIcon icon={faFrown} />&nbsp;No internet</h1>
      <br />
      <p>Try the following steps to reconnect:</p>
      <ul style={{ marginLeft: "2.75rem" }}>
        <li>Check the network cables, modem, and router</li>
        <li>Reconnect to Wi-Fi</li>
      </ul>
    </main>
  ) : (
    <Outlet />
  );
};

export default IsOffline;