import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import CartSlice from "./reducer/CartSlice";
import UserSlice from "./reducer/UserSlice";

export const store = configureStore({
  reducer: {
    userReducer: UserSlice,
    cartReducer: CartSlice
  },
});
