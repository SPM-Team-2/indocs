import { action, createStore } from "easy-peasy";

const store = createStore({
  images: [],
  addImage: action((state, payload) => {
    state.images.push(payload);
  }),
});

export default store;
