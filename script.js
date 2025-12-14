// ----- CUSTOM GRADING SYSTEMS -----
const schoolGrading = [
  { min: 80, grade: "A+", point: 5.0 },
  { min: 70, grade: "A", point: 4.0 },
  { min: 60, grade: "A-", point: 3.5 },
  { min: 50, grade: "B", point: 3.0 },
  { min: 40, grade: "C", point: 2.0 },
  { min: 33, grade: "D", point: 1.0 },
  { min: 0, grade: "F", point: 0.0 }
];

const uniGrading = [
  { min: 80, grade: "A+", point: 4.0 },
  { min: 75, grade: "A", point: 3.75 },
  { min: 70, grade: "A-", point: 3.5 },
  { min: 65, grade: "B+", point: 3.25 },
  { min: 60, grade: "B", point: 3.0 },
  { min: 55, grade: "B-", point: 2.75 },
  { min: 50, grade: "C+", point: 2.5 },
  { min: 45, grade: "C", point: 2.25 },
  { min: 40, grade: "D", point: 2.0 },
  { min: 0, grade: "F", point: 0.0 }
];

// ----- INIT -----
function createInputs() {
  let schoolHTML = "";
  for (let i = 1; i <= 12; i++) {
    schoolHTML += `<input type="number" placeholder="Subject ${i} Score">`;
  }
  document.getElementById("schoolSection").innerHTML = schoolHTML;

  let uniHTML = "";
  for (let i = 1; i <= 6; i++) {
    uniHTML += `
      <input type="number" placeholder="Subject ${i} Score">
      <select>
        <option value="3">3 Credit</option>
        <option value="1.5">1.5 Credit</option>
      </select>
    `;
  }
  document.getElementById("uniSection").innerHTML = uniHTML;
}
createInputs();

// ----- HELPERS -----
function getGrade(score, system) {
  return system.find(r => score >= r.min);
}

// ----- UI -----
function switchLevel() {
  const level = document.getElementById("level").value;
  document.getElementById("schoolSection").style.display =
    level === "school" ? "block" : "none";
  document.getElementById("uniSection").style.display =
    level === "university" ? "block" : "none";
}

// ----- CALCULATION -----
function calculate() {
  const level = document.getElementById("level").value;
  let totalPoints = 0, totalCredits = 0, output = "";

  if (level === "school") {
    const inputs = document.querySelectorAll("#schoolSection input");
    inputs.forEach((inp, i) => {
      if (!inp.value) return;
      const score = Number(inp.value);
      const g = getGrade(score, schoolGrading);
      totalPoints += g.point;
      totalCredits += 1;
      output += `Subject ${i+1}: ${g.grade}\n`;
    });
  } else {
    const inputs = document.querySelectorAll("#uniSection input");
    const selects = document.querySelectorAll("#uniSection select");
    inputs.forEach((inp, i) => {
      if (!inp.value) return;
      const score = Number(inp.value);
      const credit = Number(selects[i].value);
      const g = getGrade(score, uniGrading);
      totalPoints += g.point * credit;
      totalCredits += credit;
      output += `Subject ${i+1}: ${g.grade} (${credit} credit)\n`;
    });
  }

  if (totalCredits === 0) {
    alert("Enter at least one score!");
    return;
  }

  const gpa = (totalPoints / totalCredits).toFixed(2);
  document.getElementById("result").textContent =
    output + `\nOverall GPA: ${gpa}`;
}

// ----- CLEAR -----
function clearAll() {
  document.querySelectorAll("input").forEach(i => i.value = "");
  document.getElementById("result").textContent = "";
}
