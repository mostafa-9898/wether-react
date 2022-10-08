import axios from 'axios';
import cities from '../../lib/city.list.json'
import Image from 'next/image';
import Head from 'next/head'
import Style from '../../styles/City.module.scss'
import Moment from 'react-moment';
import { KEY_ULR } from '../../helpers/key';


const City = ({ weatherData }) => {
    return (
        <>
            <Head>
                <title>{weatherData.name}</title>
                <link rel="icon" type="image/x-icon" href='weather_cloudy.ico'></link>
            </Head>

            <div className={Style.container}>

                <div className={Style.headers}>

                    <div className={Style.name}>
                        <h1>{weatherData.name} ({weatherData.sys.country})</h1>
                        <h3>{weatherData.main.temp.toFixed(0)}&deg;C</h3>
                    </div>

                    <div className={Style.image}>
                        <Image src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='/'
                            width='150px' height='150px'
                        />
                        <span>{weatherData.weather[0].description}</span>
                    </div>
                </div>

                <div className={Style.details}>
                    <div>
                        <span>feels like</span>
                        <p>{weatherData.main.feels_like.toFixed(0)}&deg;C</p>
                    </div>
                    <div>
                        <span>humidity</span>
                        <p>{weatherData.main.humidity}%</p>
                    </div>
                    <div>
                        <span>sunrise</span>
                        <p><Moment unix format="hh:mm:ss">{weatherData.sys.sunrise}</Moment> AM</p>
                    </div>
                    <div>
                        <span>sunset</span>
                        <p><Moment unix format="hh:mm:ss">{weatherData.sys.sunset}</Moment> PM</p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default City;

export async function getServerSideProps(context) {

    // get the city's data from your search
    const cityData = context.params.city;
    const city = getCity(cityData);

    // get data from API
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${KEY_ULR}&units=metric&exclude=minutely`)
    const resData = await res.data;

    return {
        props: {
            weatherData: resData
        }
    }
}

const getCity = (param) => {
    const cityParam = param.trim();

    // get the id of the city
    const splitCity = cityParam.split("-");
    const id = splitCity[splitCity.length - 1];

    const city = cities.find(item => item.id.toString() == id);

    if (city) {
        return city
    } else { return null }
}