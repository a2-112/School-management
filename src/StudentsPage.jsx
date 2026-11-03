import { useState } from "react";
import {grades} from './studentData'

function StudentsPage({ student }) {
     const [searchTerm, setSearchTerm] = useState("");
       const [selectedClass, setSelectedClass] = useState("All");
        const [displayCount, setDisplayCount] = useState(5);
  const records = student;

  const foundStudent = records.filter((item) => {
    const first = item.surName.toLowerCase();
    const last = item.lastName.toLowerCase();
    const value = searchTerm.toLowerCase();

    const matchesSearch =
      !searchTerm.trim() || first.includes(value) || last.includes(value);

    const matchesClass =
      selectedClass === "All" || item.grade === selectedClass;

    return matchesSearch && matchesClass;
  });

   const handleSearch = (e) => {
    const { name, value } = e.target;
    if (name === "search") {
      setSearchTerm(value);
      setDisplayCount(5)
    }
  };

  const handleClass = (e) => {
    setSelectedClass(e.target.value);
     setDisplayCount(5)
  };

  return (
    <div>
         <div className="student-filters">
          <div className="filter-group">
            <label htmlFor="student-search">
                    Find Student:
                    <input
                      id="student-search"
                      type="search"
                      value={searchTerm}
                      name="search"
                      onChange={(e) => handleSearch(e)}
                    />
                  </label>
                </div>
                 <div className="filter-group">
            <label>
                Class:
                <select onChange={(e) => handleClass(e)} value = {selectedClass}>
                  <option value="All">All Classes</option>
                  {grades.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                </label>
            </div>
        </div>

      <div className="table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Class</th>
              <th>Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {foundStudent.slice(0, displayCount).map((item) => (
              <tr key={item.id}>
                <td>{item.surName}</td>
                <td>{item.lastName}</td>
                <td>{item.grade}</td>
                <td>{item.score}%</td>
                <td>
                  <button
                    onClick={() => alert(`${item.surName} ${item.lastName}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
           {displayCount < foundStudent.length && (
            <button
              className="load-more-btn"
              onClick={() => setDisplayCount((prev) => prev + 5)}
            >
              Load more
            </button>
          )}
      </div>
    </div>
  );
}
export default StudentsPage;
