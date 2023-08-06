import axios from "axios";

export const handleGetCityName = async (latitude, longitude, setCityName) => {
  try {
    const { data } = await axios.get(
      `https://us1.locationiq.com/v1/reverse?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&lat=${latitude}&lon=${longitude}&format=json`
    );

    const town = data?.address?.town;
    const state = data?.address?.state;
    const country = data?.address?.country;

    const city = `${town}, ${state}, ${country}`;
    setCityName(city);
  } catch (error) {
    console.error("Error fetching city name:", error);
  }
};