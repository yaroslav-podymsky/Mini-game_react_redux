import { TStep } from "./types";

export function getRandomNumber(
  numberLength: number = 1,
  maxCount: number = 9
) {
  const randomNumbersArray = new Uint32Array(1);
  const finiteArray = crypto.getRandomValues(randomNumbersArray);
  let intermediateResultToString = finiteArray[0]
    .toString()
    .substring(finiteArray[0].toString().length - numberLength);

  let result = Number(intermediateResultToString);
  for (let i = 0; result > maxCount; i++) {
    if (result > maxCount) {
      result = Math.round(result / 4);
    }
  }

  return result;
}

export function up(num: number, step: number) {
  return num - step;
}
export function down(num: number, step: number) {
  return num + step;
}

export function left(num: number, step: number) {
  return num - 1;
}
export function right(num: number, step: number) {
  return num + 1;
}

export function getRightBorder(step: number) {
  const result = [];
  let factor = 1;
  for (let i = 1; i < step + 1; i++) {
    result.push(step * factor - 1);
    factor++;
  }

  return result;
}

export function getLeftBorder(step: number) {
  const result = [];
  let factor = 0;
  for (let i = 1; i < step + 1; i++) {
    result.push(step * factor);
    factor++;
  }

  return result;
}

export function moveOneStep(
  num: number,
  step: number,
  maxCount: number,
  randomCount: number
) {
  const rightBorder = getRightBorder(step);
  const leftBorder = getLeftBorder(step);

  let result: TStep = { count: 0, direction: "up" };

  if (randomCount === 0 || randomCount === 4 || randomCount === 9) {
    result = { count: up(num, step), direction: "up" };
  }
  if (randomCount === 3 || randomCount === 5 || randomCount === 7) {
    result = { count: down(num, step), direction: "down" };
  }
  if (randomCount === 1 || randomCount === 6) {
    if (leftBorder.includes(num)) {
      result = { count: right(num, step), direction: "right" };
    } else result = { count: left(num, step), direction: "left" };
  }
  if (randomCount === 2 || randomCount === 8) {
    if (rightBorder.includes(num)) {
      result = { count: left(num, step), direction: "left" };
    } else result = { count: right(num, step), direction: "right" };
  }

  if (result.count < 0) {
    return (result = { count: num + step, direction: "down" });
  }
  if (result.count >= maxCount) {
    return (result = { count: num - step, direction: "up" });
  }

  return result;
}

export function pathDefinition(
  startCount: number,
  step: number,
  maxCount: number
) {
  let newPosition: TStep;
  let thisStartCount: number;
  const steps: TStep[] = [];
  for (let i = 0; i < 10; i++) {
    if (steps.length === 0) {
      thisStartCount = startCount;
    } else {
      thisStartCount = steps[steps.length - 1].count;
    }
    newPosition = moveOneStep(
      thisStartCount,
      step,
      maxCount,
      getRandomNumber()
    );
    steps.push(newPosition);
  }

  return steps;
}
