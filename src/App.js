import { POSTS_API, USER_API } from './constants.js';
import UserLists from './component/UserLists/UserLists';
import {useEffect, useState} from "react";
import './App.css';


function App() {
  const [userData, setUserData] = useState(null)
  const [postsData, setPostsData] = useState(null)

  async function fetchUserData(){
    let response = await fetch(USER_API);
    let userData = await response.json();
    setUserData(userData);
  }
  async function fetchPostsData(){
    let response = await fetch(POSTS_API);
    let postsData = await response.json();
    setPostsData(postsData);
  }

  useEffect(()=>{
    fetchUserData();
    fetchPostsData();
  }, [])

  return (
    <div className="App">
      <UserLists user={userData} posts={postsData}/>
    </div>
  );
}

export default App;
