//Hamburger menu logic
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const menuIcon = document.getElementById("menuIcon");
  const navLinks = document.getElementById("navLinks");
  const closeIcon = document.getElementById("closeIcon");

  if (menuIcon && closeIcon) {
    menuIcon.addEventListener("click", toggleMenu);
    closeIcon.addEventListener("click", toggleMenu);
  }

  function toggleMenu() {
    if (navLinks) {
      navLinks.classList.toggle("open");
    }
  }
});

// sign up logic
async function signup() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Password and Confirm Password do not match");
    return;
  }

  const formData = {
    username,
    email,
    password,
  };

  try {
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Handle successful signup
      const responseData = await response.json();

      // Store the authentication token in local storage
      localStorage.setItem("authToken", responseData.authToken);

      // Redirect to userui.html
      window.location.href = "userui.html";
    } else {
      // Handle errors from the server
      console.error("Signup failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error during signup:", error);
  }
}

//add note modal
document.addEventListener("DOMContentLoaded", function () {
  const createNoteModal = new bootstrap.Modal(
    document.getElementById("createNoteModal")
  );

  if (createNoteModal) {
    // Get the "Create New Note" card
    const createNoteCard = document.querySelector(".custom-card");

    // Add a click event listener to the card
    createNoteCard.addEventListener("click", function () {
      // Show the modal when the card is clicked
      createNoteModal.show();
    });
  }
});

//add note
const noteTitleInput = document.getElementById("noteTitle");
const noteContentInput = document.getElementById("noteContent");
const notesContainer = document.getElementById("notes-container");

// Function to add a new note to the page and send data to the backend
async function addNote() {
  const noteTitle = noteTitleInput.value;
  const noteContent = noteContentInput.value;

  if (noteTitle && noteContent) {
    const newNoteData = {
      title: noteTitle,
      description: noteContent,
    };

    try {
      const response = await fetch("http://localhost:5000/api/notes/addnote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify(newNoteData),
      });

      if (response.ok) {
        const newNote = await response.json();

        // Create a new note card
        const newNoteCard = document.createElement("div");
        newNoteCard.className = "card m-2";
        newNoteCard.style = "width: 12rem; height: 15rem;";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

         // Add Font Awesome icon
         const editicon = document.createElement("i");
         editicon.className = "fa-solid fa-pen"; // Adjust the class based on the desired icon
         editicon.style = "font-size: 1rem; margin: 1rem; color: green";
         cardBody.appendChild(editicon);

         const deleteicon = document.createElement("i");
         deleteicon.className = "fa-solid fa-trash"; // Adjust the class based on the desired icon
         deleteicon.style = "font-size: 1rem; margin: 1rem; color: green";
         cardBody.appendChild(deleteicon);

         const shareicon = document.createElement("i");
         shareicon.className = "fa-solid fa-share"; // Adjust the class based on the desired icon
         shareicon.style = "font-size: 1rem; margin: 1rem; color: green";
         cardBody.appendChild(shareicon);
 

        const cardTitle = document.createElement("h4");
        cardTitle.className = "card-title mb-4";
        cardTitle.textContent = newNote.title;

        const cardText = document.createElement("p");
        cardText.className = "card-text mb-4";
        cardText.textContent = newNote.description;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        newNoteCard.appendChild(cardBody);

        // Add the new note card to the notes container
        notesContainer.appendChild(newNoteCard);

        // Clear input fields
        noteTitleInput.value = "";
        noteContentInput.value = "";

        // Hide the modal
        createNoteModal.hide();
      } else {
        console.error("Failed to add note:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }
}

// Add a click event listener to the "Add note" button
const addNoteButton = document.querySelector(
  "#createNoteModal button.btn-success"
);
addNoteButton.addEventListener("click", addNote);
