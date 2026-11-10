import { UserRound } from "lucide-react";

function StudentProfile({ student, func }) {
  return (
    <div className="profile-page">
      <div className="profile-header">
         <div className="profile-avatar">
    <UserRound size={38} strokeWidth={1.5} />
  </div>
          <div className="profile-heading">
          <p className="profile-subtitle">STUDENT PROFILE</p>
          <h2>{student.surName} {student.lastName}</h2>
          <p className="student-id">
            Student ID: {String(student.id).padStart(5, "0")}
          </p>
        </div>

        <span className="active-status">Active</span>
      </div>

      <div className="profile-section">
        <h3>Academic Information</h3>

        <div className="profile-grid">
          <div className="profile-item">
            <p>Class</p>
            <h3>{student.grade}</h3>
          </div>

          <div className="profile-item">
            <p>Academic Score</p>
            <h3>{student.score}%</h3>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h3>Personal Information</h3>

        <div className="profile-grid">
          <div className="profile-item">
            <p>First Name</p>
            <h3>{student.surName}</h3>
          </div>

          <div className="profile-item">
            <p>Last Name</p>
            <h3>{student.lastName}</h3>
          </div>
        </div>
      </div>

      <button className="profile-back-btn" onClick={func}>
        Back to Students
      </button>
    </div>
  );
}

export default StudentProfile;