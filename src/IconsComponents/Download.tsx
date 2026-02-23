import React from "react";

function Download({ disabled }) {
  return (
    <svg
      width="40"
      height="16"
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 32.5L2 39L37.2193 39L37.2193 32.5"
        stroke={disabled ? "#919191" : "#282828"}
        strokeWidth="4"
      />
      <path
        d="M18.6673 0L18.6673 29.0559"
        stroke={disabled ? "#919191" : "#282828"}
        strokeWidth="4"
      />
      <path
        d="M27.0318 20.3706L18.7611 29.6794L10.3027 20.3706"
        stroke={disabled ? "#919191" : "#282828"}
        strokeWidth="3"
      />
    </svg>
  );
}

export default Download;
