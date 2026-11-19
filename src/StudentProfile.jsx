import { UserRound } from "lucide-react";
import {useParams } from "react-router-dom";
import { useContext } from "react";
import { StudentsContext } from "./StudentsContext";


function StudentProfile({func }) {
  const params = useParams();
  const studentId = Number(params.id)

  const {student} = useContext(StudentsContext);
  
  const selectedStudent = student.find(
  (item) => item.id === studentId
); 



  return (
    <>
    {selectedStudent ? (
    <div className="profile-page">
      <div className="profile-header">
         <div className="profile-avatar">
    <UserRound size={38} strokeWidth={1.5} />
  </div>
          <div className="profile-heading">
          <p className="profile-subtitle">STUDENT PROFILE</p>
          <h2>{selectedStudent.surName} {selectedStudent.lastName}</h2>
          <p className="student-id">
            Student ID: {String(selectedStudent.id).padStart(5, "0")}
          </p>
        </div>

        <span className="active-status">Active</span>
      </div>

      <div className="profile-section">
        <h3>Academic Information</h3>

        <div className="profile-grid">
          <div className="profile-item">
            <p>Class</p>
            <h3>{selectedStudent.grade}</h3>
          </div>

          <div className="profile-item">
            <p>Academic Score</p>
            <h3>{selectedStudent.score}%</h3>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h3>Personal Information</h3>

        <div className="profile-grid">
          <div className="profile-item">
            <p>First Name</p>
            <h3>{selectedStudent.surName}</h3>
          </div>

          <div className="profile-item">
            <p>Last Name</p>
            <h3>{selectedStudent.lastName}</h3>
          </div>
        </div>
      </div>

      <button className="profile-back-btn" onClick={func}>
        Back to Students
      </button>
    </div>
    ) : (<h2>Student not found</h2>)}
    </>
  );
}

export default StudentProfile;