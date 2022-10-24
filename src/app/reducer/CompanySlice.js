import { createSlice } from "@reduxjs/toolkit";
import { initInfoCompany } from "../action/CompanyAction";



const CompanySlice = createSlice({
    name:"CompanySlice",

    initialState:{
        data:{},
        loaded:false
    },
    reducers:{
        storedCompany:(state,action)=>{
                state.data= action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(initInfoCompany.fulfilled, (state, action) => {
           // console.log(action.payload.data[0])
            state.data = action.payload.data;
            state.loaded = true;
            
          });
    }

});
export const {storedCompany} = CompanySlice.actions;
export default CompanySlice.reducer;