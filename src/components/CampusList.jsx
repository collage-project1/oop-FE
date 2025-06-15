import React, { useEffect, useState } from "react";
import axios from "axios";
import { CAMPUS_API_URL } from "../constants/ApiConstants";
import { DATA_LOAD_FAIL } from "../constants/ErrorMessage";
import "../style/Directory.css"

const CampusList = ({selectedCampus, setSelectedCampus}) => {
  const [campuses, setCampuses]=useState([]);

  const getCampusList = async () => {
    try{
     const test = await axios.get(CAMPUS_API_URL);
     setCampuses(test.data.data);
    }catch(error){
      alert(DATA_LOAD_FAIL)
    }
  }

  useEffect(()=>{
    getCampusList();
  },[]);

  return (
    <div className="directory-container">
      <h3 className="directory-title">캠퍼스</h3>
      <ul className="directory-list">
        {campuses.map((campus) => (
          <li
            key={campus.id}
            className={`directory-item ${selectedCampus === campus.id ? "selected" : ""}`}
            onClick={() => setSelectedCampus(campus.id)}
          >
            {campus.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampusList;