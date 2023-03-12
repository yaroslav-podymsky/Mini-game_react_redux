import { FC, useEffect, useMemo, useState } from "react";
import Cell from "../cell/cell";
import "./field.css";
import { useAppDispatch } from "../../store";
import { removeShowModal } from "../../redux/reducers/root.slice";
import { useAppSelector } from "../../hooks";
import Modal from "../modal/modal";
import FieldSign from "../field_sign/field_sign";
import uniqid from "uniqid";

const Field: FC = () => {
  const dispatch = useAppDispatch();
  const [estimatedNumber, setEstimatedNumber] = useState<number>(3); //root of number of cells
  const [fieldSize, setFieldSize] = useState<string>("");
  const isShowModal = useAppSelector((state) => state.rootReducer.isShowModal);
  const numberCells = useAppSelector((state) => state.rootReducer.numberCells);

  useEffect(() => {
    dispatch(removeShowModal(true));
  }, [numberCells]);

  useEffect(() => {
    setFieldSize(`${estimatedNumber * 4 + 0.2 * estimatedNumber}vw`); // taking into account the margin (0.4 * estimatedNumber)
  }, [estimatedNumber]);

  useEffect(() => {
    setEstimatedNumber(Math.sqrt(numberCells));
  }, [numberCells]);

  const cellsArr = useMemo(() => {
    const result = [];
    for (let i = 0; i < numberCells; i++) {
      result.push(i);
    }
    return result;
  }, [numberCells]);

  return (
    <div className="field" style={{ width: `${fieldSize}` }}>
      {isShowModal && (
        <Modal
          fieldSize={fieldSize}
          numberCells={numberCells}
          estimatedNumber={estimatedNumber}
        />
      )}
      <FieldSign
        signClassName="field_left_sign"
        cellsArr={cellsArr}
        estimatedNumber={estimatedNumber}
      />
      {cellsArr.map((cell: number) => {
        return <Cell key={uniqid()} cellNumber={cell} />;
      })}
      <FieldSign
        signClassName="field_bottom_sign"
        cellsArr={cellsArr}
        estimatedNumber={estimatedNumber}
      />
    </div>
  );
};
export default Field;
