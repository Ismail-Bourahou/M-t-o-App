import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    clouds: undefined,
    main: {
        feels_like: undefined,
        temp_max: undefined,
        temp_min: undefined,
        humidity: undefined,
        pressure: undefined
    },
    name: undefined,
    sys: {
        country: undefined,
        sunrise: undefined,
        sunset: undefined
    },
    weather: undefined,
    wind: {
        speed: undefined
    },
    isloaded: false
};

export const WeatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setData: (state , action) =>{
            const {clouds,main,name,sys,weather,wind} = action.payload
            state.clouds = clouds
            state.main = main
            state.name = name
            state.sys = sys
            state.weather = weather
            state.wind = wind
            state.isloaded = true
        },
        resetData: (state) =>{
            state.isloaded = false;
        }
    }
}) 

export const {setData , resetData} = WeatherSlice.actions;
export default WeatherSlice.reducer;