import { action, createStore } from "easy-peasy";

const store = createStore({
  images: [],
  addImage: action((state, payload) => {
    state.images.push(payload);
  }),
  removeImage: action((state, payload) => {
    console.log("removed element", payload);
    // console.log(state.images.splice(payload, 1));
    state.images.splice(payload, 1);
  }),
});

export default store;
