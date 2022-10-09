import { createSlice } from "@reduxjs/toolkit";
import { InitCartAction, storedCartAction } from "../action/CartAction";

const CartSlice = createSlice({
  name: "CartSlice",
  initialState: {
    items: InitCartAction(),
    isLoaded: false,
  },
  reducers: {
    changeAmountItem: (state, action) => {
      ////console.log(action.payload)
      const newItems = state.items.filter((e) => {
        if (e.ID == action.payload.ID) {
          if (parseInt(action.payload.amount) == 0) {
            return false;
          } else {
            e.amount = action.payload.amount;
          }

          return true;
        } else {
          return true;
        }
      });
      ////console.log(newItems);
      state.items = newItems;
      storedCartAction(state.items);
    },
    setData: (state, action) => {
      state.items = action.payload;
      state.isLoaded = true;
    },
    removeData: (state, action) => {
      //console.log(action.payload);
      state.items = state.items.filter((e) => {
        return e.ID != action.payload;
      });
      storedCartAction(state.items);
      state.isLoaded = true;
    },
    removeAll: (state, action) => {
      state.items = [];
      storedCartAction(state.items);
    },
    addToCart: (state, action) => {
      //  //console.log(action.payload)
      const newItems = state.items.filter((e) => {
        if (e.ID == action.payload.ID) {
          e.amount = parseInt(e.amount) + 1;
          return true;
        } else {
          return false;
        }
      });
      if (newItems.length > 0) {
        state.items = newItems;
      } else {
        state.items.push(action.payload);
      }
      storedCartAction(state.items);
    },
  },
});
export default CartSlice.reducer;
export const { setData, removeData, removeAll, addToCart, changeAmountItem } =
  CartSlice.actions;
