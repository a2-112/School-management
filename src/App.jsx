
import Dashboard from "./dashboard.jsx";
import StudentsPage from "./StudentsPage.jsx";
import { initialStudents } from "./studentData";
import { useState } from "react";
import {
  X,
  BookOpen,
  School,
  UserPlus,
  GraduationCap
} from "lucide-react";
import StudentForm from "./StudentForm.jsx";

function App() {
  const [student, setStudent] = useState(initialStudents);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [showBar, setShowBar] = useState(false);
  const [edit,setEdit] = useState(null)

   const editStudent = (id) => {
     setEdit(student.find(item => item.id === id))
     setCurrentPage("AddStudent")
    }

  const addStudent = (newStudent) => {
    const wasEditing = edit !== null;
    setStudent((prev) => {
         if (edit !== null) {
          return prev.map((item) =>
        item.id === edit.id ? { ...item, ...newStudent } : item
      );
    }
      const newStudentWithId = {
        ...newStudent,
        id: Math.max(...prev.map((item) => item.id)) + 1
      };

      return [...prev, newStudentWithId];
    });
    
    if (wasEditing) {
  setCurrentPage("Students");
}
      setEdit(null);
  };

  const deleteStudent = (id) => {
    setStudent(prev => prev
      .filter(item => item.id !== id)
    )}

   
   console.log(edit);
   

  return (
    <div className={`app-layout ${showBar ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar
        current={currentPage}
        func={setCurrentPage}
        showBar={showBar}
        setShowBar={setShowBar}
      />

      <main className="main-content">

        {/* Mobile header */}
        <header className="mobile-header">
          <div className="mobile-brand">
            <GraduationCap size={25} />
            <span>CodewithJudy</span>
          </div>

          <button
            onClick={() => setShowBar(true)}
            aria-label="Open navigation"
          >
            <School size={23} />
          </button>
        </header>

        {currentPage === "Dashboard" ? (
          <Dashboard student={student} />
        ) : currentPage === "Students" ? (
          <StudentsPage student={student} 
          deleteStudent={deleteStudent}  editStudent = {editStudent}/>
        ) : currentPage === "AddStudent" ? (
          <StudentForm addStudent={addStudent} editStudent = {edit}/>
        ) : (
          <p>Page not found</p>
        )}
      </main>
    </div>
  );
}

export function Sidebar({ current, func, showBar, setShowBar }) {
  const cancel = <X size={20} />;
  const book = <BookOpen size={20} />;
  const school = <School size={20} />;
  const enroll = <UserPlus size={20} />;

  return (
    <>
      {showBar ? (
        <aside className="sidebar">
          <button
            onClick={() => setShowBar(false)}
            aria-label="Close navigation"
          >
            {cancel}
          </button>

          <div className="sidebar-brand">
            <div className="brand-logo">
              <GraduationCap size={27} />
            </div>

            <div className="brand-text">
              <h2>CodewithJudy</h2>
              <p>School Management</p>
            </div>
          </div>

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

            <button
              onClick={() => func("AddStudent")}
              className={current === "AddStudent" ? "active" : ""}
            >
              <span>{enroll}</span>
              Enroll
            </button>
          </div>
        </aside>
      ) : (
        <button
          className="show-sidebar-btn"
          onClick={() => setShowBar(true)}
          aria-label="Open sidebar"
        >
          {school}
        </button>
      )}
    </>
  );
}

export default App;
