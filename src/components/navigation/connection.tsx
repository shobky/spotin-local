"use client";

import { Dot } from "lucide-react";
import { useEffect, useState } from "react";

const OnlineStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnlineStatus = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/1",
          { method: "GET" }
        );
        setIsOnline(response.ok);
      } catch (error) {
        setIsOnline(false);
      }
    };

    // Initial check
    checkOnlineStatus();

    // Check online status periodically (e.g., every 5 seconds)
    const intervalId = setInterval(checkOnlineStatus, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (isOnline === null) {
    // Loading state, you can render a loader here
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isOnline ? (
        <p className="flex  items-center">
          <Dot className="text-green-500 scale-[1.8]" />
          {` Connected (Cloud DB)`}
        </p>
      ) : (
        <p className="flex  items-center">
          <Dot className="text-primary scale-[1.8]" />{" "}
          {`Disconnected (Local Db)`}
        </p>
      )}
    </div>
  );
};

export default OnlineStatus;
