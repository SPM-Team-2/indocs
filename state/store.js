import { action, createStore, persist } from "easy-peasy";

const store = createStore(
  persist({
  // {
    images: [],
    addImage: action((state, payload) => {
      state.images.push(payload);
    }),
    removeImage: action((state, payload) => {
      state.images.splice(payload, 1);
    }),
  // }
  })
);

export default store;
