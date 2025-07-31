import React from "react";
import "../styles/LocationModal.css";

const countries = [
  { name: "India", code: "IN", lang: "EN", flag: "🇮🇳" },
  { name: "Japan", code: "JP", lang: "JP", flag: "🇯🇵" },
  { name: "New Zealand", code: "NZ", lang: "EN", flag: "🇳🇿" },
  { name: "Singapore", code: "SG", lang: "EN", flag: "🇸🇬" },
  { name: "Austria", code: "AT", lang: "EN", flag: "🇦🇹" },
  { name: "Belgium", code: "BE", lang: "EN", flag: "🇧🇪" },
  { name: "Czech Republic", code: "CZ", lang: "EN", flag: "🇨🇿" },
  { name: "Denmark", code: "DK", lang: "EN", flag: "🇩🇰" },
];

// 👇 modal component
const LocationModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="location-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Select your location</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-global">
          <span className="globe-icon">🌐</span> Global | EN
        </div>

        <input
          type="text"
          placeholder="Search location..."
          className="search-box"
        />

        <div className="country-list">
          {countries.map((country) => (
            <div key={country.code} className="country-item">
              <span className="flag">{country.flag}</span>
              {country.name} | {country.lang}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
