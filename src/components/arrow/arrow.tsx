import { FC } from "react";
import "./arrow.css";
type Props = {
  direction: "up" | "down" | "left" | "right";
  index: number;
};

const Arrow: FC<Props> = ({ direction, index }) => {
  const degreesInDirection = {
    right: 0,
    down: 90,
    left: 180,
    up: 270,
  };

  return (
    <div style={{ transform: `rotate(${degreesInDirection[direction]}deg)` }}>
      <svg
        style={{ animationDelay: `.${index}s` }}
        className="arrow"
        viewBox="0 0 9 14"
      >
        <path
          className="svg-arrow"
          d="M6.660,8.922 L6.660,8.922 L2.350,13.408 L0.503,11.486 L4.813,7.000 L0.503,2.515 L2.350,0.592 L8.507,7.000 L6.660,8.922 Z"
        ></path>
      </svg>
    </div>
  );
};
export default Arrow;
