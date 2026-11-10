import Dashboard from "./dashboard.jsx";
import StudentsPage from "./StudentsPage.jsx";
import { initialStudents } from "./studentData";
import { useState, useEffect, useCallback } from "react";
import { X, BookOpen, School, UserPlus, GraduationCap,UserRound } from "lucide-react";
import StudentForm from "./StudentForm.jsx";
import StudentProfile from "./StudentProfile";

function App() {
  const [student, setStudent] = useState(() => {
    return JSON.parse(localStorage.getItem("record")) || initialStudents;
  });
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [showBar, setShowBar] = useState(false);
  const [edit, setEdit] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);

  const editStudent = useCallback((id) => {
    setEdit(student.find((item) => item.id === id));
    setCurrentPage("AddStudent");
  },[student]);

  const addStudent = (newStudent) => {
    const wasEditing = edit !== null;

    const cleanedStudent = {
  ...newStudent,
  score: Number(newStudent.score)
};
    setStudent((prev) => {
      if (edit !== null) {
        return prev.map((item) =>
          item.id === edit.id ? { ...item, ...cleanedStudent} : item,
        );
      }
      const newStudentWithId = {
        ...cleanedStudent,
        id: Math.max(0, ...prev.map((item) => item.id)) + 1,
      };

      return [...prev, newStudentWithId];
    });

    if (wasEditing) {
      setCurrentPage("Students");
    }
    setEdit(null);
  };
  const deleteStudent = useCallback((id) => {
    setStudent((prev) => prev.filter((item) => item.id !== id));
  },[]) 

  const selectedStudent = student.find((item) => item.id === viewStudent);

  const openProfile = useCallback((id) => {
setViewStudent(id)
setCurrentPage("Profile")
  },[setViewStudent, setCurrentPage])

  useEffect(() => {
    localStorage.setItem("record", JSON.stringify(student));
  }, [student]);

  return (
    <div
      className={`app-layout ${showBar ? "sidebar-open" : "sidebar-closed"}`}
    >
      <Sidebar
        current={currentPage}
        func={setCurrentPage}
        showBar={showBar}
        setShowBar={setShowBar}
        setEdit={setEdit}
      />

      <main className="main-content">
        <header className="mobile-header">
          <div className="mobile-brand">
            <GraduationCap size={25} />
            <span>CodewithJudy</span>
          </div>

          <button onClick={() => setShowBar(true)} aria-label="Open navigation">
            <School size={22} />
          </button>
        </header>

    { currentPage === "Dashboard" ? (
          <Dashboard student={student} setViewStudent={openProfile} />
        ) : currentPage === "Students" ? (
          <StudentsPage
            student={student}
            deleteStudent={deleteStudent}
            editStudent={editStudent}
            setViewStudent={openProfile}
          />
        ) : currentPage === "AddStudent" ? (
          <StudentForm addStudent={addStudent} editStudent={edit} />
        ) : currentPage === "Profile" ? (
          <StudentProfile student={selectedStudent}
            func={() => {
              setViewStudent(null);
              setCurrentPage("Students")}}/>
        ) : (
          <p>Page not found</p>
        )}
      </main>
    </div>
  );
}

export function Sidebar({ current, func, showBar, setShowBar,setEdit }) {
  const cancel = <X size={20} />;
  const book = <BookOpen size={20} />;
  const school = <School size={20} />;
  const enroll = <UserPlus size={20} />;
  const pupil = <UserRound size={20}/>

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
              onClick={() => {
                setEdit(null)
                func("Dashboard")
              }}
              className={current === "Dashboard" ? "active" : ""}
            >
              <span>{book}</span>
              Dashboard
            </button>

            <button
              onClick={() => 
                 { setEdit(null)
                  func("Students")}}
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
