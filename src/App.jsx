import Dashboard from "./dashboard.jsx";
import StudentsPage from "./StudentsPage.jsx";
import { initialStudents } from "./studentData";
import { useState } from "react";
import { X, BookOpen, School, PanelLeft } from "lucide-react";
import "./sidebar.css";

function App() {
  const [student, setStudent] = useState(initialStudents);
  const [currentPage, setCurrentPage] = useState("Dashboard");

  return (
    <div>
      <Sidebar current={currentPage} func={setCurrentPage} />
      {currentPage === "Dashboard" ? <Dashboard student={student} /> : <StudentsPage student={student}/> }
    </div>
  );
}

export function Sidebar({ current, func }) {
  
  const cancel = <X size={20} />;
  const book = <BookOpen size={20} />;
  const school = <School size={20} />;
  const bar = <PanelLeft size={24} />;
  const [showBar, setShowBar] = useState(true);

  return (
    <>
      {showBar ? (
        <aside className="sidebar">
          <button onClick={() => setShowBar(false)}>{cancel}</button>
          <div>
            <button
              onClick={() => func("Dashboard")}
              className={current === "Dashboard" ? "active" : ""}
            >
              <span>{book}</span>
              Dashboard
            </button>
            <button
              onClick={() => func("Students")}
              className={current === "Students" ? "active" : ""}
            >
              <span>{school}</span>
              Students
            </button>
          </div>
        </aside>
      ) : (
        <button className="show-sidebar-btn" onClick={() => setShowBar(true)}>
        {bar}
        </button>
      )}
    </>
  );
}

export default App;
