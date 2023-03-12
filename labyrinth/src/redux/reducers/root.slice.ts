import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { TStep } from "../../types";

export interface IDataEntity {
  path: TStep[];
  numberCells: number;
  lastPointIndex: number;
  firstPointIndex: number;
  selectedCellIndex: number;
  isShowModal: boolean;
  resultMessage: string;
  showResult: boolean;
}

const datasAdapter = createEntityAdapter<IDataEntity>();

const rootSlice = createSlice({
  name: "field",
  initialState: datasAdapter.getInitialState<{
    path: TStep[];
    numberCells: number;
    lastPointIndex: number;
    firstPointIndex: number;
    selectedCellIndex: number;
    isShowModal: boolean;
    resultMessage: string;
    showResult: boolean;
  }>({
    path: [],
    numberCells: 9,
    lastPointIndex: 0,
    firstPointIndex: 0,
    selectedCellIndex: 0,
    isShowModal: true,
    resultMessage: "",
    showResult: false,
  }),
  reducers: {
    addPath: (state, { payload }: PayloadAction<TStep[]>) => {
      state.path = payload;
      state.lastPointIndex = state.path[state.path.length - 1].count;
      state.firstPointIndex = state.path[0].count;
    },
    removeNumberCells: (state, { payload }: PayloadAction<number>) => {
      state.numberCells = payload;
      state.resultMessage = "";
      state.showResult = false;
    },
    selectCell: (state, { payload }: PayloadAction<number>) => {
      state.selectedCellIndex = payload;
      state.isShowModal = true;
      state.showResult = true;
      if (payload === state.lastPointIndex) {
        state.resultMessage = "great";
      } else {
        state.resultMessage = "fail";
      }
    },
    removeShowModal: (state, { payload }: PayloadAction<boolean>) => {
      state.isShowModal = payload;
    },
    removeShowResult: (state, { payload }: PayloadAction<boolean>) => {
      state.showResult = payload;
    },
  },
});

export const selectRoot = (state: RootState) => state.rootReducer;

export const {
  addPath,
  removeNumberCells,
  selectCell,
  removeShowModal,
  removeShowResult,
} = rootSlice.actions;

export default rootSlice.reducer;
