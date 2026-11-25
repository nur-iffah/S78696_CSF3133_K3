// ===== PART 1: ERRORS FOUND AND FIXED (line numbers refer to the ORIGINAL given code) =====
// Error 1  (grade.html, Line 9):  onsubmit="checkMark()" does not use the return value, so return false never stops the form. Fixed to onsubmit="return checkMark()".
// Error 2  (grade.html, Line 17): onclick="showtable()" - function name is case-sensitive. Fixed to showTable().
// Error 3  (grade.html, Line 19): script src="grades.js" - the file is called grade.js. Fixed to grade.js.
// Error 4  (grade.js, Line 5):    if (name = "") uses = (assignment). Fixed to name === "".
// Error 5  (grade.js, Line 9):    isNan is not a function. Fixed to isNaN.
// Error 6  (grade.js, Line 14):   mark < 0 && mark > 100 can never be true. Fixed to mark < 0 || mark > 100.
// Error 7  (grade.js, Line 28):   getElementByID is wrong. Fixed to getElementById.
// Error 8  (grade.js, Line 30):   style.colour does not exist. Fixed to style.color.
// Error 9  (grade.js, Line 31):   return true lets the form submit and reload the page, so the result disappears. Fixed to return false.
// Error 10 (grade.js, Line 38):   loop started at i = 1, so grade A was skipped. Fixed to i = 0.
// Error 11 (grade.js, Line 42):   innerHtml is wrong. Fixed to innerHTML.

// ===== checkMark(): validate input, work out the grade and show it =====
function checkMark() {
    let name = document.forms["gradeForm"]["name"].value;
    let mark = document.forms["gradeForm"]["mark"].value;

    // Empty name check
    if (name.trim() === "") {
        alert("Name must be filled out.");
        return false;
    }
    // PART 2: empty mark check
    if (mark.trim() === "") {
        alert("Mark field cannot be empty.");
        return false;
    }
    // Non-numeric check
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }
    mark = parseInt(mark);
    // Out-of-range check
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Work out the grade
    let grade;
    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    // Show the result
    let resultEl = document.getElementById("result");
    resultEl.innerHTML = name + " got grade " + grade;

    // PART 2: colour by grade (green for A and B, orange for C, red for F)
    if (grade === "A" || grade === "B") {
        resultEl.style.color = "green";
    } else if (grade === "C") {
        resultEl.style.color = "orange";
    } else {
        resultEl.style.color = "red";
    }

    // PART 2: show the date and time of checking
    document.getElementById("checkedOn").innerHTML = "Checked on: " + Date();

    // Return false so the page does not reload and the result stays on screen
    return false;
}

// ===== PART 2: randomMark(): put a random whole number 0-100 in the mark field =====
function randomMark() {
    document.getElementById("mark").value = Math.floor(Math.random() * 101);
}

// ===== showTable(): build the grade table with a for loop =====
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }
    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}
