import { FC } from "react";
import { useAppSelector } from "../../hooks";
import { useAppDispatch } from "../../store";
import { selectCell } from "../../redux/reducers/root.slice";

import "./cell.css";
type Props = {
  cellNumber: number;
};

const Cell: FC<Props> = ({ cellNumber }) => {
  const isShowModal = useAppSelector((state) => state.rootReducer.isShowModal);
  const dispatch = useAppDispatch();
  const firstPointIndex = useAppSelector(
    (state) => state.rootReducer.firstPointIndex
  );
  const finiteIndex = useAppSelector(
    (state) => state.rootReducer.lastPointIndex
  );
  const showResult = useAppSelector((state) => state.rootReducer.showResult);
  const click = () => {
    dispatch(selectCell(cellNumber));
  };

  return (
    <div className="cell" onClick={() => click()}>
      {!isShowModal && firstPointIndex === cellNumber ? (
        <div className="cell_start">start</div>
      ) : null}
      {showResult && finiteIndex === cellNumber ? (
        <div className="cell_finish">finish</div>
      ) : null}
    </div>
  );
};
export default Cell;
