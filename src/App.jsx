import Dashboard from "./dashboard.jsx";
import StudentsPage from "./StudentsPage.jsx";
import { initialStudents } from "./studentData";
import {
  useState,
  useEffect,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { X, BookOpen, School, UserPlus, GraduationCap } from "lucide-react";
import StudentForm from "./StudentForm.jsx";
import StudentProfile from "./StudentProfile";
import { StudentsContext } from "./StudentsContext";

function studentsReducer(state, action) {
  switch (action.type) {
    case "DELETE":
      return state.filter((item) => item.id !== action.id);

    case "ADD": {
      const newStudent = {
        ...action.student,
        score: Number(action.student.score),
        id: Math.max(0, ...state.map((item) => item.id)) + 1,
      };
      return [...state, newStudent];
    }

    case "EDIT":
      return state.map((item) =>
        item.id === action.id
          ? { ...item, ...action.student, score: Number(action.student.score) }
          : item,
      );

    default:
      return state;
  }
}
const loadStudent = () => {
  return JSON.parse(localStorage.getItem("record")) || initialStudents;
};
function App() {
  const [student, dispatch] = useReducer(studentsReducer, null, loadStudent);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [showBar, setShowBar] = useState(false);
  const [edit, setEdit] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);

  const editStudent = useCallback(
    (id) => {
      setEdit(student.find((item) => item.id === id));
      setCurrentPage("AddStudent");
    },
    [student],
  );

  const addStudent = (newStudent) => {
    const wasEditing = edit !== null;
    if (edit !== null) {
      dispatch({ type: "EDIT", id:edit.id, student: newStudent });
    } else {
      dispatch({ type: "ADD", student: newStudent });
    }

    if (wasEditing) {
      setCurrentPage("Students");
    }
    setEdit(null);
  };

  const deleteStudent = useCallback((id) => {
    dispatch({ type: "DELETE", id: id });
  }, []);

  const selectedStudent = student.find((item) => item.id === viewStudent);

  const openProfile = useCallback(
    (id) => {
      setViewStudent(id);
      setCurrentPage("Profile");
    },
    [setViewStudent, setCurrentPage],
  );

  useEffect(() => {
    localStorage.setItem("record", JSON.stringify(student));
  }, [student]);

  return (
    <StudentsContext.Provider value={{ student, name: "CodewithJudy" }}>
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

            <button
              onClick={() => setShowBar(true)}
              aria-label="Open navigation"
            >
              <School size={22} />
            </button>
          </header>

          {currentPage === "Dashboard" ? (
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
            <StudentProfile
              student={selectedStudent}
              func={() => {
                setViewStudent(null);
                setCurrentPage("Students");
              }}
            />
          ) : (
            <p>Page not found</p>
          )}
        </main>
      </div>
    </StudentsContext.Provider>
  );
}

export function Sidebar({ current, func, showBar, setShowBar, setEdit }) {
  const cancel = <X size={20} />;
  const book = <BookOpen size={20} />;
  const school = <School size={20} />;
  const enroll = <UserPlus size={20} />;
  const { name } = useContext(StudentsContext);

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
              <h2>{name}</h2>
              <p>School Management</p>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                setEdit(null);
                func("Dashboard");
              }}
              className={current === "Dashboard" ? "active" : ""}
            >
              <span>{book}</span>
              Dashboard
            </button>

            <button
              onClick={() => {
                setEdit(null);
                func("Students");
              }}
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
