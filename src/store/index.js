import { createStore } from "vuex";
import { getCollection } from "../composable/getCollection";

const { note } = getCollection();

export default createStore({
  state: {
    notes: null,
  },
  getters: {
    getNotes: (state) => {
      console.log("store: ", state.notes);
      return state.notes;
    },
  },
  mutations: {
    clickOn(state) {
      state.notes = note;
    },
  },
  actions: {
    clickOn(context) {
      context.commit("clickOn");
    },
  },
  modules: {},
});
