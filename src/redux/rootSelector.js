import { createSelector } from "reselect";
import Immutable from "immutable";

/**
 * Select domain
 */
export const selectDomain = (state, key) => {
  return {
    state, key
  };
};

export const selectRecords = createSelector(
  selectDomain,
  data => {
    if (!data.key) {
      return data.state;
    }
    return (data.state instanceof Immutable.Map) ? data.state.get(data.key) : data.state[data.key];
  }
);
