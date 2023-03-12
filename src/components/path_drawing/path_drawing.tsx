import { FC } from "react";
import { useAppSelector } from "../../hooks";
import Arrow from "../arrow/arrow";
import "./path_drawing.css";
import uniqid from "uniqid";

const PathDrawing: FC = () => {
  const path = useAppSelector((state) => state.rootReducer.path);
  return (
    <div className="path_drawing">
      {path
        .filter((el, index) => index > 0)
        .map((el, index) => (
          <div key={uniqid()} className="path_drawing_element">
            <Arrow index={index} direction={el.direction} />
          </div>
        ))}
    </div>
  );
};
export default PathDrawing;
