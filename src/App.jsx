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
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";

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
  const [showBar, setShowBar] = useState(false);
  const [edit, setEdit] = useState(null);

  const navigate = useNavigate();

  const editStudent = useCallback(
    (id) => {
      setEdit(student.find((item) => item.id === id));
      navigate("/form");
    },
    [student, navigate],
  );

  const addStudent = (newStudent) => {
    const wasEditing = edit !== null;
    if (edit !== null) {
      dispatch({ type: "EDIT", id: edit.id, student: newStudent });
    } else {
      dispatch({ type: "ADD", student: newStudent });
    }

    if (wasEditing) {
      navigate("/students")
    }
    setEdit(null);
  };

  const deleteStudent = useCallback((id) => {
    dispatch({ type: "DELETE", id: id });
  }, []);

  const openProfile = useCallback(
    (id) => {
      navigate(`/students/${id}`);
    },
    [navigate],
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
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard student={student} setViewStudent={openProfile} />
              }
            />
            <Route
              path="/students"
              element={
                <StudentsPage
                  student={student}
                  deleteStudent={deleteStudent}
                  editStudent={editStudent}
                  setViewStudent={openProfile}
                />
              }
            />
            <Route
              path="/form"
              element={
                <StudentForm addStudent={addStudent} editStudent={edit} />
              }
            />
            <Route
              path="/students/:id"
              element={
                <StudentProfile
                  func={() => {
                    navigate("/students")
                  }}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </StudentsContext.Provider>
  );
}

export function Sidebar({showBar, setShowBar, setEdit }) {
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
              <NavLink
                to="/"
                end
                onClick={() => {
                setEdit(null);
              }}
                className={({ isActive }) => `nav-link  ${(isActive ? "active" : "")}`}
              >
                <span>{book}</span>
                Dashboard
              </NavLink>

              <NavLink
                to="/students"
                onClick={() => {
                setEdit(null);
              }}
                  className={({ isActive }) => `nav-link  ${(isActive ? "active" : "")}`}
              >
                <span>{school}</span>
                Students
              </NavLink>

              <NavLink
                to="/form"
                onClick={() => {
                setEdit(null);
              }}
                  className={({ isActive }) => `nav-link  ${(isActive ? "active" : "")}`}
              >
                <span>{enroll}</span>
                Enroll
              </NavLink>

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
