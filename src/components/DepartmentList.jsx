import React, { useEffect, useState } from "react";
import { DATA_LOAD_FAIL } from "../constants/ErrorMessage";
import axios from "axios";
import { DEPARTMENT_API_URL } from "../constants/ApiConstants";

const DepartmentList = ({ selectedCollage, selectedDepartment, setSelectedDepartment }) => {
  const [departments, setDepartments]=useState([]);

  const getDepartmentList = async () => {
    try{
      const departmentList = await axios.get(`${DEPARTMENT_API_URL}/${selectedCollage}`)
      setDepartments(departmentList.data.data)
    }catch(error){
      alert(DATA_LOAD_FAIL)
    }
  }

  useEffect(()=>{
    getDepartmentList();
  },[selectedCollage]);

  return (
    <div className="directory-container">
      <h3 className="directory-title">학과</h3>
      <ul className="directory-list">
        {departments.map((department) => (
          <li
            key={department.id}
            className={`directory-item ${selectedDepartment === department.id ? "selected" : ""}`}
            onClick={() => setSelectedDepartment(department.id)}
          >
            {department.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;