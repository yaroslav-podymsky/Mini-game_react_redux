import { FC, useMemo } from "react";
import { getLeftBorder } from "../../utils";
import "./field_sign.css";
import uniqid from "uniqid";

type Props = {
  cellsArr: number[];
  estimatedNumber: number;
  signClassName: string;
};

const FieldSign: FC<Props> = ({ cellsArr, estimatedNumber, signClassName }) => {
  const leftBorder = useMemo(() => {
    const resultMessage = getLeftBorder(estimatedNumber);
    return resultMessage;
  }, [estimatedNumber]);

  return (
    <div className={signClassName}>
      {cellsArr
        .filter((el) => leftBorder.includes(el))
        .map((cell: number, index: number) => {
          return (
            <div key={uniqid()} className="field_sign">
              {index + 1}
            </div>
          );
        })}
    </div>
  );
};
export default FieldSign;
