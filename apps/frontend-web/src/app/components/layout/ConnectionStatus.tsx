"use client";
import { useState, useEffect } from "react";

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const checkConnection = async () => {
    try {
      const response = await fetch("/api/health");
      setIsConnected(response.ok);
    } catch (error) {
      setIsConnected(false);
      console.log(error);
    }
  };

  useEffect(() => {
    checkConnection();

    // Check connection every 30 seconds
    const intervalId = setInterval(checkConnection, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="connection-status">
      <span
        className={`status-dot ${
          isConnected === null
            ? "bg-gray-400"
            : isConnected
              ? "connected"
              : "disconnected"
        }`}
      ></span>
      <span className="status-text">
        {isConnected === null
          ? "Checking connection..."
          : isConnected
            ? "Connected to server"
            : "Server disconnected"}
      </span>
    </div>
  );
};

export default ConnectionStatus;
