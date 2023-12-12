import { useEffect, useState } from "react";
import UserDetails from "../UserDetails/UserDetails";
import { COUNTRY_API } from "../../constants";
import logo from "../../icons/directory.svg";
import "./UserLists.css";


const UserLists = (props) => {
  const [userDetail, setUserDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [countryData, setCountryData] = useState(null);

  const { user, posts } = props;

  function openDetailsPopup(user, post) {
    setUserDetail({ user, post });
    setShowModal(!showModal);
  }

  async function fetchCountryData() {
    let response = await fetch(COUNTRY_API);
    let countryData = await response.json();
    setCountryData(countryData);
  }

  useEffect(() => {
    fetchCountryData();
  }, []);

  function onClose() {
    setShowModal(!showModal);
  }
  return (
    <div className="content-wrapper">
      {showModal ? (
        <UserDetails
          onClose={onClose}
          details={userDetail}
          countryData={countryData}
        />
      ) : (
        <div className="userlists-wrapper">
          <header className="userlists-header">
            <img src={logo} alt="logo" />
            <h1 className="userlists-heading">Directory</h1>
          </header>
          {user?.map((val, idx) => {
            let userPosts = posts?.filter((post) => {
              return val.id === post.userId;
            });
            return (
              <div
                className="userlists-user"
                onClick={() => {
                  openDetailsPopup(val, userPosts);
                }}
                key={idx}
              >
                <div className="userlists-name">
                  <div className="userlists-name-head">Name : </div>
                  <div className="userlists-name-val">{val.name}</div>
                </div>
                <div className="userlists-post">
                  <div className="userlists-post-head">Posts : </div>
                  <div className="userlists-post-val">{userPosts?.length}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default UserLists;
