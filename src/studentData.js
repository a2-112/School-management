const surNames = ["Okafor", "James", "Musa", "Peter", "Derrick", "Felix", "Brown"];
const lastNames = ["Amara", "Daniel", "Sarah", "David", "Judith", "Elvis", "Miebaka"];
export const grades = ["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"];

function generateStudent(id) {
  const randomFirst = surNames[Math.floor(Math.random() * surNames.length)];
  const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];
  const randomGrade = grades[Math.floor(Math.random() * grades.length)];
  const randomScore = Math.floor(Math.random() * 51) + 50;

  return {
    id: id,
    surName: randomFirst,
    lastName: randomLast,
    grade: randomGrade,
    score: randomScore,
  };
}

export const initialStudents = Array.from({ length:250 }, (_, i) => generateStudent(i + 1));