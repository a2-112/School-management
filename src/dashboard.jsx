import { Users, School, BookOpen, TrendingUp } from "lucide-react";
import { useState } from "react";
import "./dash.css";
import {grades} from './studentData'

export function StatCard({ title, value, icon }) {
  const Icon = icon;

  return (
    <div className="stat-card">
      <span className="stat-icon">
        <Icon size={24} />
      </span>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

export function StudentRow({ surName, lastName, grade, score }) {
  return (
    <tr>
      <td>{surName}</td>
      <td>{lastName}</td>
      <td>{grade}</td>
      <td>{score}%</td>
      <td>
        <button onClick={() => alert(`${surName} ${lastName}`)}>View</button>
      </td>
    </tr>
  );
}

function Dashboard({student}) {
  const [displayCount, setDisplayCount] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");

  const allStudent = student

  const totalScore = allStudent.reduce((sum, num) => {
    if(!num.score) return sum
   return sum + num.score
},0)
const average = allStudent.length ? Math.round(totalScore /allStudent.length ) : totalScore


const statistics = [
  { id: 1, title: "Total Students", value: allStudent.length, icon: Users },
  { id: 2, title: "Total Classes", value: 6, icon: School },
  { id: 3, title: "Total Subjects", value: 12, icon: BookOpen },
  { id: 4, title: "Average Performance", value: `${average}%`, icon: TrendingUp },
];

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

  const foundStudent = allStudent.filter((item) => {
    const first = item.surName.toLowerCase();
    const last = item.lastName.toLowerCase();
    const value = searchTerm.toLowerCase();

    const matchesSearch =
      !searchTerm.trim() || first.includes(value) || last.includes(value);

    const matchesClass =
      selectedClass === "All" || item.grade === selectedClass;

    return matchesSearch && matchesClass;
  });

  return (
    <div className="container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, Administrator</p>
        <p>Here's an overview of your school activities.</p>
      </header>

      <section className="stats-grid">
        {statistics.map((item) => (
          <StatCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </section>

   <div className="student-filters">
  <div className="filter-group">
    <label>
            Find Student:
            <input
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

      <section className="students-section">
        <h2>Recent Students</h2>
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
                <StudentRow
                  key={item.id}
                  surName={item.surName}
                  lastName={item.lastName}
                  grade={item.grade}
                  score={item.score}
                />
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
      </section>
    </div>
  );
}

export default Dashboard;
