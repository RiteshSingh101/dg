import React, { useState, useEffect } from "react";

export default function DC() {
  const [time, setTime] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState("");
 
  // Function to update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  // Function to format the time to HH:MM:SS
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Function to calculate the time of the selected city
  const calculateSelectedCityTime = (city) => {
    const utcOffsets = {
      Mumbai: 5.5,
      "New York": -4,
      London: 1,
      Tokyo: 9,
      Melbourne: 10,
    };

    const currentUTCOffset = time.getTimezoneOffset() * 60 * 1000; // Get the current UTC offset in milliseconds
    const selectedCityOffset = utcOffsets[city] * 60 * 60 * 1000; // Convert the selected city's offset to milliseconds
    const selectedCityTime = new Date(time.getTime() + currentUTCOffset + selectedCityOffset);
    return selectedCityTime;
  };

  // Handle the change in the select element
  const handleCityChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCity(selectedValue);
  };

  return (
    <>
      <center>
        <h1>DIGITAL CLOCK</h1>
        <form>
          <div className="container">
            <input type="text" value={formatTime(selectedCity ? calculateSelectedCityTime(selectedCity) : time)} id="timeInput" readOnly />
	  </div>
	  <div className="container">
            <select name="dc" id="dc" value={selectedCity} onChange={handleCityChange} required>
              <option value="">Select City</option>
              <option value="Mumbai">Mumbai</option>
              <option value="New York">New York</option>
              <option value="London">London</option>
              <option value="Tokyo">Tokyo</option>
              <option value="Melbourne">Melbourne</option>
            </select>
          </div>
        </form>
      </center>
    </>
  );
}
