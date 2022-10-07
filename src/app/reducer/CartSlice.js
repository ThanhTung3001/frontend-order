import { createSlice } from "@reduxjs/toolkit";



const CartSlice = createSlice({
    name: "CartSlice",
    initialState: {
        items: [],
        isLoaded: false
    },
    reducers: {
        changeAmountItem: (state, action) => {
            console.log(action.payload)
            const newItems = state.items.filter(e => {
                if (e.ID == action.payload.ID) {
                    if (parseInt(action.payload.amount) == 0) {
                        return false;
                    }
                    e.amount = action.payload.amount
                    return true;
                }
            });
            console.log(newItems)
            state.items = newItems;
        },
        setData: (state, action) => {
            state.items = action.payload;
            state.isLoaded = true;
        },
        removeData: (state, action) => {
            state.items.filter(e => {
                return e.ID != action.ID
            });
            state.isLoaded = true;
        },
        removeAll: (state, action) => {
            state.items = [];
        },
        addToCart: (state, action) => {
            //  console.log(action.payload)
            const newItems = state.items.filter(e => {
                if (e.ID == action.payload.ID) {

                    e.amount = e.amount + 1;
                    return true;
                }
            });
            if (newItems.length > 0) {
                state.items = newItems;
            } else {
                state.items.push(action.payload);
            }
        }
    }
})
export default CartSlice.reducer;
export const { setData, removeData, removeAll, addToCart, changeAmountItem } = CartSlice.actions;