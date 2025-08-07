import { Card } from "react-bootstrap";
import styles from "./Weather.module.scss";
import placeIcon from "../../assets/img/weather/placeholder.png";
import weatherIcon from "../../assets/img/weather/atmospheric-conditions.png";
import heatIcon from "../../assets/img/weather/termometer.png";
import clockIcon from "../../assets/img/weather/clock.png";
import windIcon from "../../assets/img/weather/umbrella.png";
import heatIcon2 from "../../assets/img/weather/sun.png";
import { useSelector } from "react-redux";
import moment from "moment";

export const Weather = () => {
  const weather = useSelector(({ weather }) => weather);
  const lastupdate = moment().format("llll");
  console.log(weather);

  return (
    <>
      <Card className={styles.container}>
        {weather.isloaded ? (
          <Card.Body>
            <Card.Title>
              {weather.name}, {weather.sys.country}
              <img className={styles.place_icon} src={placeIcon} alt="" />
              <div className={styles.clockText}>
                Last update: {lastupdate}
                <img className={styles.clockIcon} src={clockIcon} alt="" />
              </div>
            </Card.Title>
            <Card.Text as={"div"} className={styles.weather_infos}>
              <div>
                {" "}
                <img className={styles.weatherIcon} src={weatherIcon} alt="" />
              </div>
              <div className={styles.temperature}>
                {weather.main.feels_like} °C
                <img className={styles.heatIcon} src={heatIcon} alt="" />
              </div>

              <div className={styles.separator}></div>
              <div className={styles.infos}>
                <div className={styles.border_right}>
                  <img className={styles.heatIcon2} src={heatIcon2} alt="" />
                  <div>SUNRISE</div>
                  <div>{moment.unix(weather.sys.sunrise).format("HH:mm")}</div>
                </div>
                <div className={styles.border_right}>
                  <img className={styles.windIcon} src={windIcon} alt="" />
                  <div>WIND</div>
                  <div>{weather.wind.speed} m/s</div>
                </div>
                <div className={styles.border_right}>
                  <img className={styles.heatIcon2} src={heatIcon2} alt="" />
                  <div>HUMIDITY</div>
                  <div> {weather.main.humidity} %</div>
                </div>
                <div className={styles.border_right}>
                  <img className={styles.heatIcon2} src={heatIcon2} alt="" />
                  <div>TEMP MAX</div>
                  <div> {weather.main.temp_max} ° C</div>
                </div>
                <div className={styles.border_right}>
                  <img className={styles.heatIcon2} src={heatIcon2} alt="" />
                  <div>PRESSURE</div>
                  <div> {weather.main.pressure} hPa</div>
                </div>
                <div>
                  <img className={styles.heatIcon2} src={heatIcon2} alt="" />
                  <div>SUNSET</div>
                  <div> {moment.unix(weather.sys.sunset).format("HH:mm")}</div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
         ) : (
          <Card.Title>Please choose a city</Card.Title>
        )} 
      </Card>
    </>
  );
};
