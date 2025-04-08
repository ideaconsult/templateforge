import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div data-cy="not-found-page" className="not-found-page">
      <div>
        <h2 style={{ paddingBottom: "1rem" }}>Sorry, page not found.</h2>
        <button className="back-home-btn" onClick={() => navigate("/")}>
          Back to Home page
        </button>
      </div>
    </div>
  );
}
