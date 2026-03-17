const API_URL = "http://localhost:3000/api/users";

const form = document.getElementById("userForm");
const usersTable = document.getElementById("usersTable");

// Fetch Users
async function getUsers() {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: "Basic " + btoa("admin:1234")
    }
  });

  const users = await response.json();

  usersTable.innerHTML = "";

  users.forEach(user => {
    usersTable.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="deleteUser('${user._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Create User
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  });

  form.reset();
  getUsers();
});

// Delete User
async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Basic " + btoa("admin:1234")
    }
  });

  getUsers();
}

// Initial Load
getUsers();