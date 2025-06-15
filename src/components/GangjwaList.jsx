import axios from "axios";
import React, { useEffect, useState } from "react";
import { DATA_LOAD_FAIL } from "../constants/ErrorMessage";
import { GANGJWA_API_URL } from "../constants/ApiConstants";
import "../style/gangjwaComponent.css"

const GangjwaList = ({ selectedDepartment, addMiridamgi, addSincheong }) => {
  const [gangjwas, setGangjwas]=useState([]);

  const getGangjwaList = async () => {
    try{
      const gangjwaList = await axios.get(`${GANGJWA_API_URL}/${selectedDepartment}`);
      setGangjwas(gangjwaList.data.data);
    }catch(error){
      alert(DATA_LOAD_FAIL)
    }
  }

  useEffect(()=>{
    getGangjwaList();
  },[selectedDepartment]);

  return (
    <div className="gangjwa-container">
      <h3 className="gangjwa-title">강좌 목록</h3>
      <table className="gangjwa-table">
        <thead>
          <tr>
            <th>강좌 ID</th>
            <th>강좌명</th>
            <th>교수명</th>
            <th>학점</th>
            <th>시간</th>
            <th>신청</th>
          </tr>
        </thead>
        <tbody>
          {gangjwas.map((gangjwa) => (
            <tr
              key={gangjwa.gangjwaId}
            >
              <td>{gangjwa.gangjwaId}</td>
              <td>{gangjwa.name}</td>
              <td>{gangjwa.profName}</td>
              <td>{gangjwa.credit}</td>
              <td>{gangjwa.time}</td>
              <td>
                <button
                  className="miridamgi-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addMiridamgi(gangjwa);
                  }}
                >
                  미리담기
                </button>
                <button
                  className="sincheong-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addSincheong(gangjwa);
                  }}
                >
                  신청
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GangjwaList;