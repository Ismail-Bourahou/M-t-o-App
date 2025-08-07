import { Button, Form } from "react-bootstrap";
import styles from "./SearchBar.module.scss";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetData, setData } from "../../features/weather/WeatherSlice";

export const SearchBar = () => {
  const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [unity, setUnity] = useState("metric");

  const handleInputChange = (e, inputvalue) => {
    const { value } = e.currentTarget;
    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=${GEO_API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (!json.features) return;
        const result = json.features.map(({ properties }) => {
          const { country, city, lat, lon, formatted } = properties;
          return { country, city, lat, lon, formatted };
        });
        setCities(result);
      });
  };

  const handleSelectedcity = (e, value) => {
    if (value != null) {
      const { lat, lon } = value;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=${unity}&lon=${lon}&appid=${WEATHER_API_KEY}`
      )
        .then((response) => response.json())
        .then((json) => {
          const { clouds, main, name, sys, weather, wind } = json;
          dispatch(setData({ clouds, main, name, sys, weather, wind }));
        });
    }else{
      dispatch(resetData())
    }
  };

  return (
    <>
      <Form>
        <Form.Group className={`${styles.searchContainer}`}>
          <Autocomplete
            getOptionLabel={(option) => option.formatted}
            clearOnBlur={false}
            onInputChange={handleInputChange}
            onChange={handleSelectedcity}
            className={styles.search_Input}
            renderInput={(params) => (
              <TextField {...params} label={"Enter your city..."} />
            )}
            options={cities}
          />
          <Button size={"sm"} variant="primary">
            Search
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};
