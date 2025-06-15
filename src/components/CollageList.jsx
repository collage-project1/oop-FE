import axios from "axios";
import React, { useEffect, useState } from "react";
import { DATA_LOAD_FAIL } from "../constants/ErrorMessage";
import { COLLAGE_API_URL } from "../constants/ApiConstants";

const CollageList = ({ selectedCampus, selectedCollage, setSelectedCollage }) => {
  const [collages, setCollages]=useState([]);

  const getCollageList = async () => {
    try{
      const collageList = await axios.get(`${COLLAGE_API_URL}/${selectedCampus}`);
      setCollages(collageList.data.data);
    }catch(error){
      alert(DATA_LOAD_FAIL)
    }
  }

  useEffect(()=>{
    getCollageList();
  },[selectedCampus]);

  return (
    <div className="directory-container">
      <h3 className="directory-title">대학</h3>
      <ul className="directory-list">
        {collages.map((collage) => (
          <li
            key={collage.id}
            className={`directory-item ${selectedCollage === collage.id ? "selected" : ""}`}
            onClick={() => setSelectedCollage(collage.id)}
          >
            {collage.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollageList;