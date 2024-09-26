import { createSlice } from "@reduxjs/toolkit";

export interface autoIncrement {
    counter: number;
}

const initialState: autoIncrement = {
    counter: 1
}

const CounterNIP = createSlice({
    name: "counterState",
    initialState,
    reducers: {
        setIncrementCounter(state){
            state.counter+=1
        },
        setDecrementCounter(state){
            state.counter-=1
        }
    }
});

export const {setIncrementCounter, setDecrementCounter} = CounterNIP.actions;
export default CounterNIP.reducer