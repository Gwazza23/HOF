import { useState } from "react";
import "./ExtraInfoForm.css";
import { countries } from "../../util/CountryList";
import axios from "axios";
import { fetchUserData } from "../../slices/userSlice";

function ExtraInfoForm({ id, dispatch }) {
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://house-of-fashion.onrender.com/users/info", {
        id,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        postcode,
        country,
      });
      dispatch(fetchUserData(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="extra-info-form" onSubmit={handleSubmit}>
      <div className="extra-info-title">
        <h3>Contact Details</h3>
      </div>
      <div className="extra-info">
        <div className="info-label">
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>
        <div className="info-label">
          <label htmlFor="address-line-1">Address Line 1:</label>
          <input
            id="address-line-1"
            type="text"
            value={addressLine1}
            onChange={(event) => setAddressLine1(event.target.value)}
            required
          />
        </div>
        <div className="info-label">
          <label htmlFor="address-line-2">Address Line 2:</label>
          <input
            id="address-line-2"
            type="text"
            value={addressLine2}
            onChange={(event) => setAddressLine2(event.target.value)}
            required
          />
        </div>
        <div className="info-label">
          <label htmlFor="city">City:</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
          />
        </div>
        <div className="info-label">
          <label htmlFor="state">State/Province:</label>
          <input
            id="state"
            type="text"
            value={state}
            onChange={(event) => setState(event.target.value)}
            required
          />
        </div>
        <div className="info-label">
          <label htmlFor="postcode">Postal Code:</label>
          <input
            id="postcode"
            type="text"
            value={postcode}
            onChange={(event) => setPostcode(event.target.value)}
            required
          />
        </div>
        <div className="info-label">
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            onChange={(event) => setCountry(event.target.value)}
          >
            <option></option>
            {countries.map((country) => {
              return (
                <option key={country} value={country}>
                  {country}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="extra-info-button">
        <button>Submit</button>
      </div>
    </form>
  );
}

export default ExtraInfoForm;
