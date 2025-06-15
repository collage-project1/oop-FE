import React, { useEffect, useState } from "react";
import { DATA_LOAD_FAIL } from "../constants/ErrorMessage";
import { SINCHEONG_API_URL } from "../constants/ApiConstants";
import axios from "axios";
import "../style/gangjwaComponent.css"

const SincheongList = ({ sincheongUpdated, removeSincheong }) => {
  const [sincheongGangjwas, setSincheongGangjwas]=useState([]);

  const getSincheongList = async () => {
    try{
      const token = localStorage.getItem('token');
      const sincheongList = await axios.get(`${SINCHEONG_API_URL}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      const data = sincheongList.data.data; // "data" 배열
      // "gangjwaResponse"만 추출
      const extractedSincheongResponses = data.map((item) => item.gangjwaResponse);
      setSincheongGangjwas(extractedSincheongResponses);
    }catch(error){
      alert(DATA_LOAD_FAIL);
    }
  }

  useEffect(()=> {
    getSincheongList();
  }, []);

  useEffect(() => {
    getSincheongList();
  }, [sincheongUpdated]);

  return (
    <div className="gangjwa-container">
      <h3 className="gangjwa-title">신청</h3>
      <table className="gangjwa-table">
        <thead>
          <tr>
            <th>강좌 ID</th>
            <th>강좌명</th>
            <th>교수명</th>
            <th>학점</th>
            <th>신청</th>
          </tr>
        </thead>
        <tbody>
          {sincheongGangjwas.map((gangjwa) => (
            <tr>
              <td>{gangjwa.gangjwaId}</td>
              <td>{gangjwa.name}</td>
              <td>{gangjwa.profName}</td>
              <td>{gangjwa.credit}</td>
              <td>
                <button 
                className="delete-button" 
                onClick={() => removeSincheong(gangjwa)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SincheongList;