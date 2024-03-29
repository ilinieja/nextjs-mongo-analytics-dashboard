import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";

import { FiltersState } from "./filters.slice";

const getFiltersState = (rootState: RootState) =>
  rootState.filters as FiltersState;

const getDateRange = createSelector(
  getFiltersState,
  ({ dateRange }) => dateRange
);

const getBreakdownStatsChartDimension = createSelector(
  getFiltersState,
  ({ breakdownStatsChartDimension }) => breakdownStatsChartDimension
);

export const filtersSelectors = {
  getDateRange,
  getBreakdownStatsChartDimension,
};
