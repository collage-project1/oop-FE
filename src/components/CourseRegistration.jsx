import React, { useState } from "react";
import CampusList from "./CampusList";
import CollageList from "./CollageList";
import DepartmentList from "./DepartmentList";
import GangjwaList from "./GangjwaList";
import SincheongList from "./SincheongList";
import MiridamgiList from "./MiridamgiList";
import "../style/Sincheong.css"
import "../style/SincheongComponent.css"
import { useNavigate } from "react-router-dom";
import { MIRIDAMGI_API_URL } from "../constants/ApiConstants";
import { SINCHEONG_API_URL } from "../constants/ApiConstants";
import axios from "axios";
import { LOGIN_URL } from "../constants/URLConstants";
import { NOT_DEFINED_ERROR, SESSION_EXPIRED } from "../constants/ErrorMessage";
import { CONFIRM_ADD_MIRIDAMGI, CONFIRM_REMOVE_MIRIDAMGI, CONFIRM_ADD_SINCHEONG, CONFIRM_REMOVE_SINCHEONG} from "../constants/SystemMessage"

const CourseRegistration = () => {
  const [selectedCampus, setSelectedCampus] = useState(1);
  const [selectedCollage, setSelectedCollage] = useState(10);
  const [selectedDepartment, setSelectedDepartment] = useState(101);
  const [miridamgiUpdated, setMiridamgiUpdated] = useState(false);
  const [sincheongUpdated, setSincheongUpdated] = useState(false);

  const navigate = useNavigate();

  const handleError = (error) => {
    if (error.response?.data?.httpStatusCode === 401) {
        alert(SESSION_EXPIRED);
        navigate(LOGIN_URL);
    } else {
        const errorMessage = error.response?.data?.message || NOT_DEFINED_ERROR;
        alert(`${errorMessage}`);
    }
}

  const addMiridamgi = async(gangjwa) => {
    alert(`${gangjwa.name} ${CONFIRM_ADD_MIRIDAMGI}`);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${MIRIDAMGI_API_URL}`, 
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            gangjwaId: gangjwa.gangjwaId,
          },
        }
      );
      alert("성공!");
      setMiridamgiUpdated((prev) => !prev);
    } catch (error) {
      handleError(error, navigate);
    }
  };

  const removeMiridamgi = async(gangjwa) => {
    alert(`${gangjwa.name} ${CONFIRM_REMOVE_MIRIDAMGI}`);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${MIRIDAMGI_API_URL}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            gangjwaId: gangjwa.gangjwaId,
          },
        }
      );
      alert("성공!")
      setMiridamgiUpdated((prev) => !prev);
    } catch (error) {
      handleError(error, navigate);
    }
  };

  const addSincheong = async(gangjwa) => {
    try {
      alert(`${gangjwa.name} ${CONFIRM_ADD_SINCHEONG}`);
      const token = localStorage.getItem('token');
      await axios.post(
        `${SINCHEONG_API_URL}`, 
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            gangjwaId: gangjwa.gangjwaId,
          },
        }
      );
      alert("성공!")
      setSincheongUpdated((prev) => !prev);
    } catch (error) {
      handleError(error, navigate);
    }
  };

  const removeSincheong = async(gangjwa) => {
    try {
      alert(`${gangjwa.name} ${CONFIRM_REMOVE_SINCHEONG}`);
      const token = localStorage.getItem('token');
      await axios.delete(
        `${SINCHEONG_API_URL}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            gangjwaId: gangjwa.gangjwaId,
          },
        }
      );
      alert("성공!");
      setSincheongUpdated((prev) => !prev);
    } catch (error) {
      handleError(error, navigate);
    }
  };

  const miridamgiToSincheong = async(gangjwa) => {
    try {
      alert(`${gangjwa.name} ${CONFIRM_ADD_SINCHEONG}`);
      const token = localStorage.getItem('token');
      await axios.patch(
        `${MIRIDAMGI_API_URL}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            gangjwaId: gangjwa.gangjwaId,
          },
        }
      );
      alert("성공!")
      setMiridamgiUpdated((prev) => !prev);
      setSincheongUpdated((prev) => !prev);
    } catch (error) {
      handleError(error, navigate);
    }
  }



  return (
    <div className="content-panel">
      <div className="selection-panel">
        <div className="hakgwa-selection-panel">
          <div className="campus-panel">
            <CampusList selectedCampus={selectedCampus} setSelectedCampus={setSelectedCampus} />
          </div>
          <div className="collage-panel">
            <CollageList selectedCampus={selectedCampus} selectedCollage={selectedCollage} 
            setSelectedCollage={setSelectedCollage} />
          </div>
          <div className="hakgwa-panel">
            <DepartmentList selectedCollage={selectedCollage} 
            selectedDepartment={selectedDepartment} setSelectedDepartment={setSelectedDepartment}/>
          </div>
        </div>
        <div className="gangjwa-selection-panel">
          <GangjwaList selectedDepartment={selectedDepartment}
           addMiridamgi={addMiridamgi} addSincheong={addSincheong}/>
        </div>
      </div>

      {/* Right Panel */}
      <div className="register-panel">
        <MiridamgiList miridamgiUpdated={miridamgiUpdated} removeMiridamgi={removeMiridamgi} miridamgiToSincheong={miridamgiToSincheong}/>
      </div>
      <div className="register-panel">
        <SincheongList sincheongUpdated={sincheongUpdated} removeSincheong={removeSincheong} />
      </div>
    </div>
  );
};

export default CourseRegistration;