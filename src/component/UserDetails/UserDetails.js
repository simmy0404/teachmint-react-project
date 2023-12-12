import { useEffect, useState } from "react";
import { COUNTRY_API } from "../../constants";
import Postpopup from "../PostPopup/PostPopup";
import "./UserDetails.css";

const UserDetails = (props) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date(0));
  const [clockPaused, setClockPaused] = useState(false);
  const [countryChanged, setCountryChanged] = useState(false);
  const [postData, setPostData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(null);

  async function fetchTime() {
    if (selectedCountry && countryChanged) {
      const res = await fetch(
        `${COUNTRY_API}/${selectedCountry}`
      );
      const data = await res.json();
      setCurrentTime(new Date(data.datetime));
      setCountryChanged(false);
    } else {
      if (countryChanged && selectedCountry === "") {
        setCurrentTime(new Date(0));
      } else {
        setCurrentTime((prevTime) => new Date(prevTime.getTime() + 1000));
      }
    }
  }

  useEffect(() => {
    let timer;
    fetchTime();
    if (!clockPaused) {
      timer = setInterval(fetchTime, 1000);
    }
    return function () {
      clearInterval(timer);
    };
  }, [selectedCountry, clockPaused]);

  const handleCountryChange = (event) => {
    setCountryChanged(true);
    setSelectedCountry(event.target.value);
  };

  const openPostPopup = (postData) => {
    setPostData(postData)
    setIsPopupOpen(!isPopupOpen)
  }

  const closePostPopup = (postData) => {
    setPostData(postData)
    setIsPopupOpen(false)
  }

  const formatTime = (date) => {
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    return `${hours} : ${minutes} : ${seconds}`;
  };

  const handlePausePlay = () => {
    setClockPaused(!clockPaused);
  };

  const {
    details: {
      post,
      user: {
        address: { suite, street, city, zipcode },
        company: { catchPhrase },
        email,
        name,
        phone,
        username,
      },
    },
    countryData,
  } = props;

  return (
    <div>
      <header className="header">
        <button className="detail-button" onClick={props.onClose}>
          Back
        </button>
        <div className="detail-country">
            <select className="detail-dropdown" onChange={handleCountryChange}>
              <option>Select Country</option>
              {countryData?.map((country, idx) => {
                return <option className="dropDownData" key={idx}>{country}</option>
              })}
            </select>
          <div className="detail-timecounter">{formatTime(currentTime)}</div>
          <button className="detail-counter-button" onClick={handlePausePlay}>
            {clockPaused ? "Play" : "Pause"}
          </button>
        </div>
      </header>
      <div className="detail-heading">Profile Page</div>

      <div className="detail-user-container">
        <div className="detail-user1">
          <div className="detail-name">Name : {name}</div>
          <span className="detail-username">Username : {username}</span>
          <span className="detail-catch">| Catch Phrase : {catchPhrase}</span>
        </div>
        <div className="detail-user2">
          <div className="detail-address">
            {suite}, {street}, {city}, {zipcode}
          </div>
          <span className="detail-email">Email : {email}</span>
          <span className="detail-phone">| Phone : {phone}</span>
        </div>
      </div>
      <div className="detail-post-wrapper">
        {post?.map((val, idx) => {
          return (
            <div className="detail-post" key={idx} onClick={()=>{openPostPopup(val)}}>
              <div className="detail-title">{val.title}</div>
              <div className="detail-post-body">{val.body}</div>
            </div>
          );
        })}
      </div>
      {isPopupOpen && <Postpopup postData={postData} close={closePostPopup}/>}
      {isPopupOpen && <div className="postpopup-wrapper"></div>}
    </div>
  );
};

export default UserDetails;
