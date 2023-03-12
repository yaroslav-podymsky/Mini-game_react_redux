import { FC } from "react";
import { getRandomNumber, pathDefinition } from "../../utils";
import "./modal.css";
import { useAppDispatch } from "../../store";
import {
  addPath,
  removeNumberCells,
  removeShowModal,
  removeShowResult,
} from "../../redux/reducers/root.slice";
import { useAppSelector } from "../../hooks";
import greate from "../../assets/icons/greate.svg";
import fail from "../../assets/icons/fail.svg";
type Props = {
  estimatedNumber: number;
  numberCells: number;
  fieldSize: string;
};

const Modal: FC<Props> = ({ estimatedNumber, numberCells, fieldSize }) => {
  const dispatch = useAppDispatch();
  const resultMessage = useAppSelector(
    (state) => state.rootReducer.resultMessage
  );
  const selectedCellIndex = useAppSelector(
    (state) => state.rootReducer.selectedCellIndex
  );

  return (
    <div
      style={{ width: `${fieldSize}`, height: `${fieldSize}` }}
      className="modal"
    >
      {resultMessage && (
        <img
          src={resultMessage === "great" ? greate : fail}
          className="modal_img"
          alt=""
        />
      )}

      <button
        className="modal_button"
        onClick={() => {
          dispatch(removeShowResult(false));
          dispatch(removeShowModal(false));
          dispatch(
            addPath(
              pathDefinition(
                getRandomNumber(numberCells > 9 ? 2 : 1, numberCells),
                estimatedNumber,
                numberCells
              )
            )
          );
        }}
      >
        {selectedCellIndex ? "Restart" : "New game"}
      </button>
      <div className="modal_select_wrapper">
        <label className="modal_select_label" htmlFor="pet-select">
          number of cells
        </label>
        <select
          value={numberCells}
          onChange={(e) => dispatch(removeNumberCells(Number(e.target.value)))}
          className="modal_select"
          name="pets"
          id="pet-select"
        >
          <option value="9">9</option>
          <option value="16">16</option>
          <option value="25">25</option>
          <option value="36">36</option>
          <option value="49">49</option>
        </select>
      </div>
    </div>
  );
};
export default Modal;
