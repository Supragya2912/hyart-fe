import React from "react";

const Image = ({ imgSrc, className }) => {
  return <img className={className} src={imgSrc} alt={imgSrc}  style={{ width: "300px", height: "300px" }} />;
};

export default Image;