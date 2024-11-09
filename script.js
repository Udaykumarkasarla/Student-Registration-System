// Initialize the students array from localStorage, or an empty array if no data exists
let students = JSON.parse(localStorage.getItem('students')) || [];

// Display the stored students when the page loads
window.onload = displayStudents;

function displayStudents() {
    // Get the table body element where student data will be displayed
    const tableBody = document.getElementById('tableBody');
    
    // Clear the existing table content
    tableBody.innerHTML = '';

    // Loop through each student and create a table row for each
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        
        // Create the HTML for the table row, including the student details and Edit/Delete buttons
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentID}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        
        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

function addStudent() {
    // Get the form field values from the input fields
    const name = document.getElementById('name').value.trim();
    const studentID = document.getElementById('studentID').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    // Validate the input fields before proceeding
    if (!validateInputs(name, studentID, email, contact)) return;

    // Create a new student object with the input values
    const student = { name, studentID, email, contact };

    // Add the new student object to the students array
    students.push(student);
    
    // Save the updated students array to localStorage
    localStorage.setItem('students', JSON.stringify(students));
    
    // Refresh the student list on the page
    displayStudents();
    
    // Reset the form fields
    document.getElementById('studentForm').reset();
}

function editStudent(index) {
    // Get the student data for the selected student based on the index
    const student = students[index];

    // Fill the form fields with the existing student data for editing
    document.getElementById('name').value = student.name;
    document.getElementById('studentID').value = student.studentID;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

    // After editing, delete the old student record (will be added again with updated data)
    deleteStudent(index);
}

function deleteStudent(index) {
    // Remove the student from the students array based on the index
    students.splice(index, 1);
    
    // Update localStorage with the new students array after deletion
    localStorage.setItem('students', JSON.stringify(students));
    
    // Refresh the student list on the page
    displayStudents();
}

function validateInputs(name, studentID, email, contact) {
    // Regular expressions to validate inputs
    const nameRegex = /^[A-Za-z ]+$/; // Only letters and spaces allowed
    const idRegex = /^\d+$/; // Only numbers allowed for student ID
    const contactRegex = /^\d+$/; // Only numbers allowed for contact number
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Simple email format validation

    // Check if any input field is empty
    if (!name || !studentID || !email || !contact) {
        alert("Please fill in all fields.");
        return false;
    }

    // Validate the student's name to ensure it only contains letters and spaces
    if (!nameRegex.test(name)) {
        alert("Student name should contain only letters.");
        return false;
    }

    // Validate the student ID to ensure it only contains numbers
    if (!idRegex.test(studentID)) {
        alert("Student ID should contain only numbers.");
        return false;
    }

    // Validate the contact number to ensure it only contains numbers
    if (!contactRegex.test(contact)) {
        alert("Contact number should contain only numbers.");
        return false;
    }

    // Validate the email format to ensure it is in a correct format
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // If all validations pass, return true
    return true;
}
