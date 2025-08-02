function openNav() {
  if (window.innerWidth < 768) {
    const panel = document.getElementById("mySidepanel");
    panel.style.right = "0";
  }
}

function closeNav() {
  const panel = document.getElementById("mySidepanel");
  panel.style.right = "-250px";
}

function openForm() {
  const form = document.querySelector("#signupPopup form");
  form.reset();
  clearErrors();
  document.getElementById("signupPopup").style.display = "block";
}

function closeForm() {
  document.getElementById("signupPopup").style.display = "none";
  clearErrors();
}

function showError(inputId, message) {
  const input = document.getElementById(inputId);
  input.classList.add("error");

  let existing = input.parentNode.querySelector(".error-message");
  if (!existing) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.innerText = message;
    input.parentNode.appendChild(errorDiv);
  } else {
    existing.innerText = message;
  }
}

function clearError(inputId) {
  const input = document.getElementById(inputId);
  input.classList.remove("error");
  let existing = input.parentNode.querySelector(".error-message");
  if (existing) existing.remove();
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
  document.querySelectorAll(".error-message").forEach(el => el.remove());
}

function validateInput(id, value) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  if (id === "name") {
    return value.trim() === "" ? "Please enter your name" : "";
  }
  if (id === "email") {
    return !emailPattern.test(value.trim()) ? "Invalid email format" : "";
  }
  if (id === "password") {
    return !passwordPattern.test(value) ? "Password must have uppercase, lowercase, number, 6+ chars" : "";
  }
  if (id === "confirmPassword") {
    const password = document.getElementById("password").value;
    return value !== password ? "Passwords do not match" : "";
  }
  return "";
}

["name", "email", "password", "confirmPassword"].forEach(id => {
  document.getElementById(id).addEventListener("input", function () {
    const error = validateInput(id, this.value);
    if (error) {
      showError(id, error);
    } else {
      clearError(id);
    }
  });
});


function getStoredUsers() {
  const stored = localStorage.getItem("userData");
  return stored ? JSON.parse(stored) : [];
}
 
function storeUser(user) {
 const users = getStoredUsers();
  users.push(user);
 
  localStorage.setItem("userData", JSON.stringify(users));
}
function renderTableData(dataArray) {
  const table = document.getElementById("userTable");
   if (!table) return; 
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  dataArray.forEach(user => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.password}</td>
    `;

    tbody.appendChild(row);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  renderTableData(getStoredUsers());
  const form = document.querySelector("#signupPopup form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      if (!name || !email || !password || password !== confirmPassword) {
        alert("Please fill all fields correctly.");
        return;
      }

      const newUser = {
        username: name,
        email: email,
        password: password,
      };

      storeUser(newUser);
      alert("Form submitted successfully!");
      form.reset();
    });
  }
});
function storeUser(user) {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem("userData", JSON.stringify(users));
  console.log("All users:", users);
}
function displayUsersInTable() {
  const users = getStoredUsers();
  const tableBody = document.querySelector("#userTable tbody");
  if (!tableBody) return;
  tableBody.innerHTML = "";
  users.forEach(user => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.textContent = user.name;
    const emailCell = document.createElement("td");
    emailCell.textContent = user.email;
    const passwordCell = document.createElement("td");
    passwordCell.textContent = user.password;
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(passwordCell);
    tableBody.appendChild(row);
  });
}