import React from "react";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
`;

const Rating = ({ value = 0 }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<FaStar key={i} color="#FFD700" />);
    } else if (value >= i - 0.7) {
      stars.push(<FaStarHalfAlt key={i} color="#FFD700" />);
    } else {
      stars.push(<FaRegStar key={i} color="#FFD700" />);
    }
  }

  return <StarContainer>{stars} ({value})</StarContainer>;
};

export default Rating;
