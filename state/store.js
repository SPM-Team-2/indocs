import { action, createStore, persist } from "easy-peasy";

const store = createStore(
  persist({
    // {
    // * STATE
    images: [],

    // * ACTIONS
    addImage: action((state, payload) => {
      state.images.push(payload);
    }),
    addImageArray: action((state, payload) => {
      state.images.push(...payload);
    }),
    removeImage: action((state, payload) => {
      state.images.splice(payload, 1);
    }),
    removeAllImages: action((state) => {
      state.images = [];
    }),
    replaceImage: action((state, { activeSlide, url }) => {
      state.images[activeSlide] = { ...state.images[activeSlide], src: url };
    }),
    // }
  })
);

export default store;
