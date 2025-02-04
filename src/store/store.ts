import {create} from 'zustand';
import { persist } from 'zustand/middleware';

interface StopwatchState {
    time: number;
    isRunning:boolean;
    start:()=>void;
    stop:()=>void;
    reset:()=>void;
    increment:()=>void;
}

const useStopwatchStore = create<StopwatchState>()(
    persist((set)=>({
        time:0,
        isRunning:false,
        start: () => set(state => ({...state, isRunning: true })),
        stop: () => set(state => ({...state, isRunning: false })),
        reset: () => set(state => ({...state, time: 0,isRunning: false})),
        increment: () => set(state => (state.isRunning?{time:state.time+1}:{})),
    }),{
        name:'stopwatch',
    })
);

export default useStopwatchStore;