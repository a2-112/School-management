import { useState } from "react";
import { grades } from "./studentData";
import "./StudentForm.css";

function StudentForm({ addStudent }) {
  const [formData, setFormData] = useState({
    surName: "",
    lastName: "",
    grade: "",
    score: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.surName.trim()) {
      newErrors.surName = "Surname is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Lastname is required";
    }
    if (!formData.grade.trim()) {
      newErrors.grade = "Please select a class";
    }
    if (!formData.score.trim()) {
      newErrors.score = "Score is required";
    } else if (Number(formData.score) < 0 || Number(formData.score) > 100) {
      newErrors.score = "Score must be between 0 and 100";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    addStudent(formData);
  };

  const handleValue = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

 
return (
  <div className="form-page">
    <div className="form-header">
      <h2>Add New Student</h2>
      <p>Enter the student's information below to add them to your records.</p>
    </div>

    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="surName">Surname</label>
          <input
            id="surName"
            type="text"
            name="surName"
            placeholder="Enter surname"
            value={formData.surName}
            onChange={handleValue}
          />
          {errors.surName && (
            <p className="form-error">{errors.surName}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Lastname</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Enter lastname"
            value={formData.lastName}
            onChange={handleValue}
          />
          {errors.lastName && (
            <p className="form-error">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="grade">Class</label>
        <select
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleValue}
        >
          <option value="">Select a class</option>
          {grades.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.grade && (
          <p className="form-error">{errors.grade}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="score">Score</label>
        <input
          id="score"
          type="number"
          name="score"
          placeholder="Enter score (0–100)"
          value={formData.score}
          onChange={handleValue}
        />
        {errors.score && (
          <p className="form-error">{errors.score}</p>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          Add Student
        </button>
      </div>
    </form>
  </div>
);
}
export default StudentForm;
