import { createStore, createLogger } from "vuex";

import app, { State as appState, Store as appStore } from "./modules/app";

const debug = process.env.NODE_ENV !== "production";

export type RootState = {
  app: appState;
};

export type Store = appStore<Pick<RootState, "app">>;

const store = createStore({
  modules: {
    app,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

export default store;
