import { useState,memo } from "react";
import { grades } from "./studentData";
import { Trash2, Edit } from "lucide-react";

function StudentsPage({
  student,
  deleteStudent,
  editStudent,
  setViewStudent,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [displayCount, setDisplayCount] = useState(5);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

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
      setDisplayCount(5);
    }
  };

  const handleClass = (e) => {
    setSelectedClass(e.target.value);
    setDisplayCount(5);
  };
  const handleProfile = (id) => {
    setViewStudent(id);
  };
 
  return (
    <div className="students-page">
      <h2>Student Directory</h2>
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
            <select onChange={(e) => handleClass(e)} value={selectedClass}>
              <option value="All">All Classes</option>
              {grades.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
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
              <th colSpan={3}>Action</th>
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
                  <button onClick={() => handleProfile(item.id)}>View</button>
                </td>
                <td>
                  <button onClick={() => setSelectedStudentId(item.id)}>
                    <span>
                      <Trash2 size={16} />
                    </span>
                  </button>
                </td>
                <td>
                  <button onClick={() => editStudent(item.id)}>
                    <span>
                      <Edit size={16} />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedStudentId !== null && (
        <div className="delete-modal" role="dialog" aria-modal="true">
          <div className="delete-modal-content">
            <h2>Delete Student</h2>
            <p>Are you sure you want to delete this student?</p>
            <p>
              This action cannot be undone and all your data will be permanently
              removed.
            </p>
            <div>
              <button onClick={() => setSelectedStudentId(null)}>Cancel</button>
              <button
                onClick={() => {
                  deleteStudent(selectedStudentId);
                  setSelectedStudentId(null);
                }}
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
      {displayCount < foundStudent.length && (
        <button
          className="load-more-btn"
          onClick={() => setDisplayCount((prev) => prev + 5)}
        >
          Load more
        </button>
      )}
    </div>
  );
}
export default memo(StudentsPage);
