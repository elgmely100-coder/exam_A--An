
const startForm = document.getElementById("startForm");

const studentNameInput =
    document.getElementById("studentName");

const errorMessage =
    document.getElementById("errorMessage");


startForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const studentName =
        studentNameInput.value.trim().replace(/\s+/g, " ");

    // Check empty name
    if (!studentName) {

        errorMessage.textContent =
            "Please enter your full name first.";

        studentNameInput.focus();

        return;
    }

    // Check name length
    if (studentName.length < 3) {

        errorMessage.textContent =
            "Please enter your full name.";

        studentNameInput.focus();

        return;
    }

    // Save student name
    sessionStorage.setItem(
        "studentName",
        studentName
    );

    // Go to exam page
    window.location.href = "exam.html";

});


// Remove error while typing
studentNameInput.addEventListener("input", function() {

    errorMessage.textContent = "";

});
