import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./Atestms.css";
import { Feedbackcard } from "./Feedbackcard";
import { useAuth } from "../Auth/AuthContext";

export const Atestms = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/admin/testimonials", {
        headers: {
          authorization: `${token}`,
        },
      });
      setFeedbacks(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching feedback data.");
      setLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="maincontainer">
      <div className="title">
        <h1>WHAT OUR CLIENTS SAY</h1>
      </div>
      <div className="cardcontainer">
        {feedbacks.map((feedback) => (
          <Feedbackcard key={feedback._id} feedback={feedback} onAction={fetchFeedbacks} />
        ))}
      </div>
    </div>
  );
};
