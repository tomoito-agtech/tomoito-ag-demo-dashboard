import { createSlice } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";

// Stateの初期状態
const initialState = [
  ["Raspberry Pi A",],
  ["Raspberry Pi B",],
  ["Raspberry Pi C",],
  ["Raspberry Pi E",],
  ["Raspberry Pi F",],
  ["Raspberry Pi G",],
  ["Raspberry Pi H",],
  ["Raspberry Pi I",],
  ["Raspberry Pi J",]

]

// Sliceを生成する
const slice = createSlice({
  name: "sensor",
  initialState,
  reducers: {
    setName: (state, action) => {
      return {
        ...state,
        name:action.payload
      }
    },
    setAll:(state,action)=>{
      const lst=[]
      console.log(action.payload)
      action.payload.map((i) => {
        const sensor = state.find(x => x[0] === i[0])
        let flg = false
        if(sensor){
          flg = sensor[2]
        }
        
        console.log(i[1])
        lst.push([i[0],i[1],flg]) 
      })      
      return lst
    },
    addSensor:(state,action)=>{
      const {sno,title} = action.payload
      state.push({ sno, title,flg:false}) // state に新規の値を追加している
    },
    checkSensor:(state,action)=>{
      const sensor = state.find(i => i[0] === action.payload)
      console.log("payload is ",action.payload)
      console.log("state is ",sensor)
      if(sensor){
        sensor[2] = !sensor[2]
      }
    }
    // etc...
  }
});

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
export const { setName,checkSensor,setAll } = slice.actions;