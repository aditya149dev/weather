import { Link } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import { useWeatherQuery } from "../services/weatherApi";
import { simpleErrorMessage } from "../utilities/simpleErrorMessage";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  changeLocationQuery,
  selectLocationQuery,
} from "../features/location/locationSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const locationQuery = useAppSelector(selectLocationQuery);

  const { data, error, isLoading, refetch } = useWeatherQuery(
    locationQuery || "fetch:ip"
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <Link
        to="/ai"
        className="absolute top-4 left-4 p-1 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none text-white text-sm font-bold min-w-[3rem] flex items-center justify-center"
      >
        AI
      </Link>
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <WeatherCard
            weatherData={data || null}
            onRefresh={() => refetch()}
            isLoading={isLoading}
            onSearch={(query) => dispatch(changeLocationQuery(query))}
            error={simpleErrorMessage(error)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
