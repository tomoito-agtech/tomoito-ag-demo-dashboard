import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// それぞれ slice.reducer を default export している前提
import  sensorReducer from "./sensor";

const reducer = combineReducers({
  sensor: sensorReducer,
});

const store = configureStore({ reducer });

export default store;