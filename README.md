# 🎓 CodewithJudy – School Management System

A modern, responsive school management application built with React. Designed to simplify student record management, enrollment, and academic performance monitoring through a clean and intuitive dashboard.

## 🚀 Project Overview

CodewithJudy School Management System is a React-based application that provides a centralized interface for viewing student records, monitoring academic statistics, searching and filtering students, and registering new students.

The project is being developed incrementally, with a focus on React fundamentals, component architecture, state management, and clean UI design.

## ✨ Features

### 1. Dashboard
- Overview of student statistics.
- Display of total students and academic performance.
- Recent student records.
- Dynamically derived statistics from student data.

### 2. Student Management
- Display student records in a structured table.
- Search students by name.
- Filter students by class.
- Load more students incrementally.
- Individual student rows rendered through reusable components.

### 3. Student Enrollment
- Dedicated student enrollment page.
- Separate and reusable `StudentForm` component.
- Controlled form inputs using React state.
- Form validation for required fields.
- Score validation between 0 and 100.
- Validation messages that clear when users correct their inputs.
- Newly enrolled students appear immediately in the Dashboard and Students page.

### 4. Navigation and Layout
- Sidebar navigation between Dashboard, Students, and Enroll pages.
- Fixed sidebar layout.
- Sidebar open and close functionality.
- Responsive sidebar styling.
- CodewithJudy branding.
- Consistent design using deep teal, ivory, sage, and copper colours.

## 🛠️ Technologies Used

- **React** – Component-based user interface.
- **JavaScript (ES6+)** – Application logic and data handling.
- **CSS3** – Styling and responsive layouts.
- **Lucide React** – Interface icons.

## 📁 Project Structure

```text
src/
│
├── App.jsx
├── dashboard.jsx
├── StudentsPage.jsx
├── StudentForm.jsx
│
├── studentData.js
│
├── sidebar.css
├── StudentForm.css
└── dashboard.css
```

*The structure may evolve as the application grows.*

## ⚙️ Getting Started

### Prerequisites
- Node.js
- npm
- A code editor such as Visual Studio Code

### Installation

1. Clone the repository:

```bash
git clone https://github.com/a2-112/School-management
```

2. Navigate into the project directory:

```bash
cd School Management
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in your terminal.

## 🎨 Design System

The application uses a consistent colour palette:

| Colour | Hex Code |
|---|---|
| Deep Teal | `#142B3B` |
| Light Teal | `#294B5C` |
| Ivory | `#F5F0E6` |
| Sage | `#A7B99E` |
| Copper | `#C58B55` |

## 🗺️ Development Roadmap

The following features are planned for future development:

- [ ] Delete student records.
- [ ] Edit existing student records.
- [ ] View individual student profiles.
- [ ] Persist student records using Local Storage.
- [ ] Performance optimization with `React.memo`, `useCallback`, and `useMemo`.

## 👩‍💻 Developer

**CodewithJudy**

Building, learning, experimenting, and growing through code.

---

*This project is a continuous learning and development project focused on building practical React applications using real-world development practices.*