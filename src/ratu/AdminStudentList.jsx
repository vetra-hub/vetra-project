import React, { useState } from "react";  
import studentData from "./students.json";  

export default function AdminStudentList() {  
  const [searchTerm, setSearchTerm] = useState("");  
  const [selectedClass, setSelectedClass] = useState("");  
  const [selectedAge, setSelectedAge] = useState("");  

  // Handle changes in input fields  
  const handleChange = (evt) => {  
    const { name, value } = evt.target;  
    if (name === "searchTerm") {  
      setSearchTerm(value);  
    } else if (name === "selectedClass") {  
      setSelectedClass(value);  
    } else if (name === "selectedAge") {  
      setSelectedAge(value);  
    }  
  };  

  // Filtering logic based on search term, selected class and selected age  
  const filteredStudents = studentData.filter((student) => {  
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());  
    const matchesClass = selectedClass ? student.class.includes(selectedClass) : true;  
    const matchesAge = selectedAge ? student.age === parseInt(selectedAge) : true;  
    return matchesSearch && matchesClass && matchesAge;  
  });  

  // Unique classes and ages extraction  
  const allClasses = [...new Set(studentData.map(student => student.class))];  
  const allAges = [...new Set(studentData.map(student => student.age))];  

  return (  
    <div className="p-8">  
      <input  
        type="text"  
        name="searchTerm"  
        placeholder="Search student..."  
        className="w-full p-2 border border-gray-300 rounded mb-4"  
        value={searchTerm}  
        onChange={handleChange}  
      />  

      <select  
        name="selectedClass"  
        className="w-full p-2 border border-gray-300 rounded mb-4"  
        value={selectedClass}  
        onChange={handleChange}  
      >  
        <option value="">All Classes</option>  
        {allClasses.map((classItem, index) => (  
          <option key={index} value={classItem}>  
            {classItem}  
          </option>  
        ))}  
      </select>  

      <select  
        name="selectedAge"  
        className="w-full p-2 border border-gray-300 rounded mb-4"  
        value={selectedAge}  
        onChange={handleChange}  
      >  
        <option value="">All Ages</option>  
        {allAges.map((age, index) => (  
          <option key={index} value={age}>  
            {age}  
          </option>  
        ))}  
      </select>  

      <div className="overflow-x-auto">  
        <table className="min-w-full border border-gray-300">  
          <thead>  
            <tr className="bg-gray-100">  
              <th className="border border-gray-300 p-4">ID</th>  
              <th className="border border-gray-300 p-4">Name</th>  
              <th className="border border-gray-300 p-4">Age</th>  
              <th className="border border-gray-300 p-4">Class</th>  
              <th className="border border-gray-300 p-4">Address</th>  
              <th className="border border-gray-300 p-4">Parent</th>  
              <th className="border border-gray-300 p-4">Contact</th>  
              <th className="border border-gray-300 p-4">Photo</th>  
            </tr>  
          </thead>  
          <tbody>  
            {filteredStudents.map((student) => (  
              <tr key={student.id}>  
                <td className="border border-gray-300 p-4">{student.id}</td>  
                <td className="border border-gray-300 p-4">{student.name}</td>
                <td className="border border-gray-300 p-4">{student.age}</td>  
                <td className="border border-gray-300 p-4">{student.class}</td>  
                <td className="border border-gray-300 p-4">{student.details.address}</td>  
                <td className="border border-gray-300 p-4">{student.details.parent.name}</td>  
                <td className="border border-gray-300 p-4">{student.details.parent.contact}</td>  
                <td className="border border-gray-300 p-4">  
                  <img src={student.photo} alt={student.name} className="h-16 w-16 object-cover rounded" />  
                </td>  
              </tr>  
            ))}  
          </tbody>  
        </table>  
      </div>  
    </div>  
  );  
}  