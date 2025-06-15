import axios from "axios";
import React, { useEffect, useState } from "react";
import { MIRIDAMGI_API_URL } from "../constants/ApiConstants";
import { DATA_LOAD_FAIL } from "../constants/ErrorMessage";
import "../style/gangjwaComponent.css"

const MiridamgiList = ({ miridamgiUpdated, removeMiridamgi, miridamgiToSincheong}) => {
  const [miridamgiGangjwas, setMiridamgiGangjwas]=useState([]);

  const getMiridamgiList = async () => {
    try{
      const token = localStorage.getItem('token');
      const miridamgiList = await axios.get(`${MIRIDAMGI_API_URL}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      const data = miridamgiList.data.data
      const extractedMiridamgiResponses = data.map((item) => item.gangjwaResponse);
      setMiridamgiGangjwas(extractedMiridamgiResponses)
    }catch(error){
      alert(DATA_LOAD_FAIL)
    }
  }

  useEffect(() => {
    getMiridamgiList(); // 컴포넌트가 처음 마운트될 때 실행
  }, []);

  useEffect(() => {
    getMiridamgiList();
  }, [miridamgiUpdated])

  return (
    <div className="gangjwa-container">
      <h3 className="gangjwa-title">미리담기</h3>
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
          {miridamgiGangjwas.map((gangjwa) => (
            <tr>
              <td>{gangjwa.gangjwaId}</td>
              <td>{gangjwa.name}</td>
              <td>{gangjwa.profName}</td>
              <td>{gangjwa.credit}</td>
              <td className="button-td">
                <button
                  className="sincheong-button"
                  onClick={() => {
                    miridamgiToSincheong(gangjwa);
                  }}
                >
                  신청
                </button>
                <button
                className="delete-button" 
                onClick={() => {
                  removeMiridamgi(gangjwa);
                }}
                >
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

export default MiridamgiList;