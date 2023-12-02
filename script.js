//Hamburger menu logic
let editedNote;

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

// Login Logic

document.addEventListener("DOMContentLoaded", function () {
  // Wait for the document to be fully loaded before adding the event listener

  // Find the form by its ID
  const loginForm = document.getElementById("loginForm");

  // Add the event listener to the form
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission
    await login();
  });
  async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        // Handle successful login
        const responseloginData = await response.json();

        // Store the authentication token in local storage
        localStorage.setItem("authToken", responseloginData.authToken);

        // Redirect to userui.html
        window.location.href = "userui.html";
      } else {
        // Login failed, handle the error
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
});

// Logout logic
document.addEventListener("DOMContentLoaded", function () {
  // Add a click event listener to the logout button
  const logoutButton = document.getElementById("logoutBtn");
  logoutButton.addEventListener("click", function () {
    //clearing local storage
    localStorage.removeItem("authToken");

    // Redirect to the home page
    window.location.href = "/index.html";
  });
});

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

let noteId;

// Get user notes

document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch and display notes
  async function fetchAndDisplayNotes() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/notes/fetchallnotes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
          },
        }
      );

      if (response.ok) {
        const notes = await response.json();

        // Call a function to display the notes on the page
        displayNotes(notes);
      } else {
        console.error("Failed to fetch notes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  // Function to display notes on the page
  function displayNotes(notes) {
    const notesContainer = document.getElementById("notes-display");

    // Clear existing notes
    notesContainer.innerHTML = "";

    // Loop through the notes and create HTML elements to display them
    notes.forEach((note) => {
      const noteCard = document.createElement("div");
      noteCard.className = "card custom-card m-2";
      noteCard.style = "width: 12rem; height: 15rem;";
      noteCard.dataset.noteId = note._id; // Set the noteId as a data attribute

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      // Add Font Awesome icon
      const editicon = document.createElement("i");
      editicon.className = "fa-solid fa-pen edit-icon"; // Adjust the class based on the desired icon
      editicon.style = "font-size: 1rem; margin: 1rem; color: green";
      cardBody.appendChild(editicon);

      // Add an event listener for the edit icon
      editicon.addEventListener("click", function () {
        // Set the noteId globally
        noteId = newNote._id;

        // Fetch the complete note data from your array or API based on the noteId
        const clickedNote = notes.find((note) => note._id === noteId);

        // Log values for debugging
        console.log("Clicked noteId:", noteId);
        console.log("Clicked note:", clickedNote);

        // Check if the note is found
        if (clickedNote) {
          // Call the function to handle editing the note when the edit icon is clicked
          editNoteModal.show();
          fillEditNoteForm(clickedNote);
        } else {
          console.error("Note not found for ID:", noteId);

          // Handle the case where the note is not found (optional)
          // You can show an error message or handle it in a way that makes sense for your application.
        }
      });

      cardBody.appendChild(editicon);

      const deleteicon = document.createElement("i");
      deleteicon.className = "fa-solid fa-trash"; // Adjust the class based on the desired icon
      deleteicon.style = "font-size: 1rem; margin: 1rem; color: green";
      cardBody.appendChild(deleteicon);

      // Add an event listener for the delete icon
      deleteicon.addEventListener("click", function () {
        const confirmDelete = confirm(
          "Are you sure you want to delete this note?"
        );
        if (confirmDelete) {
          const noteIdToDelete = note._id; // Assuming you have access to the note ID
          deleteNote(noteIdToDelete);
        }
      });

      const shareicon = document.createElement("i");
      shareicon.className = "fa-solid fa-share"; // Adjust the class based on the desired icon
      shareicon.style = "font-size: 1rem; margin: 1rem; color: green";
      cardBody.appendChild(shareicon);

      const cardTitle = document.createElement("h4");
      cardTitle.className = "card-title mb-2";
      cardTitle.textContent = note.title;

      const cardText = document.createElement("p");
      cardText.className = "card-text mb-4";
      cardText.textContent = note.description;

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      noteCard.appendChild(cardBody);

      // Set an id for the note card based on the note's id
      noteCard.id = `note-${note._id}`;

      notesContainer.appendChild(noteCard);
    });

    // After adding new note cards, reattach event listeners
    attachNoteEventListeners();
  }

  // Function to attach event listeners for dynamically created note cards
  function attachNoteEventListeners() {
    // Add an event listener for the "Save Changes" button in the edit note modal
    const saveChangesButton = document.getElementById("saveEditNoteBtn");
    saveChangesButton.addEventListener("click", function () {
      // Check if noteId is defined before calling saveEditedNote
      if (noteId !== null) {
        saveEditedNote();
        updateNoteCard(noteId, editedNote);
        // You may also want to hide the modal here
        editNoteModal.hide();
      } else {
        // Handle the case for new notes
        saveNewNote();
        // You may also want to hide the modal here
        createNoteModal.hide();
      }
    });
  }

  // Add an event listener to the "Create New Note" button
  document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener to the "Create New Note" button
    const createNoteButton = document.querySelector(
      "#notes-container .btn-success"
    );
    if (createNoteButton) {
      createNoteButton.addEventListener("click", function () {
        // Show the create note modal
        const createNoteModal = new bootstrap.Modal(
          document.getElementById("createNoteModal")
        );
        createNoteModal.show();
      });
    }
  });

  // Call the function to fetch and display notes when the page loads
  fetchAndDisplayNotes();
});

//add note
const createNoteModal = new bootstrap.Modal(
  document.getElementById("createNoteModal")
);
const addNoteButton = document.getElementById("addNoteBtn");

addNoteButton.addEventListener("click", addNote);

async function addNote() {
  const noteTitleInput = document.getElementById("noteTitle");
  const noteContentInput = document.getElementById("noteContent");
  const notesContainer = document.getElementById("notes-container");

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

        // Reset noteId for new notes
        noteId = null;

        // Create a new note card
        const newNoteCard = document.createElement("div");
        newNoteCard.className = "card custom-card m-2";
        newNoteCard.style = "width: 12rem; height: 15rem;";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        // Add Font Awesome icon
        const editicon = document.createElement("i");
        editicon.className = "fa-solid fa-pen edit-icon";
        editicon.style = "font-size: 1rem; margin: 1rem; color: green";
        cardBody.appendChild(editicon);

        editicon.addEventListener("click", function () {
          noteId = newNoteCard.dataset.noteId;
          const noteTitle = newNoteCard.dataset.noteTitle;
          const noteDescription = newNoteCard.dataset.noteDescription;

          // Call the function to handle editing the note when the edit icon is clicked
          editNoteModal.show();
          fillEditNoteForm({
            _id: noteId,
            title: noteTitle,
            description: noteDescription,
          });

          // Add an event listener for the "Save Changes" button in the edit note modal
          const saveChangesButton = document.getElementById("saveEditNoteBtn");
          saveChangesButton.addEventListener("click", function () {
            // Check if noteId is defined before calling saveEditedNote
            if (noteId !== null) {
              saveEditedNote();
              updateNoteCard(noteId, editedNote);
              // You may also want to hide the modal here
              editNoteModal.hide();
            } else {
              console.error("NoteId is undefined. Cannot save edited note.");
            }
          });
        });

        const deleteicon = document.createElement("i");
        deleteicon.className = "fa-solid fa-trash";
        deleteicon.style = "font-size: 1rem; margin: 1rem; color: green";
        cardBody.appendChild(deleteicon);

        // Add an event listener for the delete icon
        deleteicon.addEventListener("click", function () {
          const confirmDelete = confirm(
            "Are you sure you want to delete this note?"
          );
          if (confirmDelete) {
            const noteIdToDelete = note._id; // Assuming you have access to the note ID
            deleteNote(noteIdToDelete);
          }
        });

        const shareicon = document.createElement("i");
        shareicon.className = "fa-solid fa-share";
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

// Edit note

// edit note modal
const editNoteModal = new bootstrap.Modal(
  document.getElementById("editNoteModal")
);

function fillEditNoteForm(note) {
  const editNoteTitleInput = document.getElementById("editNoteTitle");
  const editNoteContentInput = document.getElementById("editNoteContent");

  // Check if the note object is valid
  if (
    note &&
    note._id !== undefined &&
    note.title !== undefined &&
    note.description !== undefined
  ) {
    // Fill the form with existing note data
    editNoteTitleInput.value = note.title;
    editNoteContentInput.value = note.description;
  } else {
    console.error("Invalid note object in fillEditNoteForm");
  }
}

async function saveEditedNote() {
  const editedNoteTitle = document.getElementById("editNoteTitle").value;
  const editedNoteContent = document.getElementById("editNoteContent").value;

  const editedNoteData = {
    title: editedNoteTitle,
    description: editedNoteContent,
  };

  try {
    // Ensure noteId is defined
    if (noteId) {
      const response = await fetch(
        `http://localhost:5000/api/notes/updatenote/${noteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
          },
          body: JSON.stringify(editedNoteData),
        }
      );

      if (response.ok) {
        // Update the global variable editedNote with the edited note data
        editedNote = await response.json();

        // Handle success, maybe update the note card with the edited details
        updateNoteCard(noteId, editedNote);

        // Hide the edit note modal
        editNoteModal.hide();
      } else {
        console.error("Failed to edit note:", response.statusText);
      }
    } else {
      console.error("NoteId is undefined. Cannot save edited note.");
    }
  } catch (error) {
    console.error("Error editing note:", error);
  }
}

// Function to update the note card with edited details
function updateNoteCard(noteId, editedNote) {
  const noteCard = document.getElementById(`note-${noteId}`);
  if (noteCard) {
    // Update the card details with the edited note details
    const cardTitle = noteCard.querySelector(".card-title");
    const cardText = noteCard.querySelector(".card-text");

    if (editedNote && cardTitle && cardText) {
      // Check if title and description properties are defined in editedNote
      if (
        editedNote.note &&
        editedNote.note.title !== undefined &&
        editedNote.note.description !== undefined
      ) {
        cardTitle.textContent = editedNote.note.title;
        cardText.textContent = editedNote.note.description;
      }
    }
  }
}

// Delete note

async function deleteNote(noteId) {
  try {
    const response = await fetch(`http://localhost:5000/api/notes/deletenote/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    });

    if (response.ok) {
      // Note deleted successfully, remove the corresponding card from the UI
      const noteCardToDelete = document.getElementById(`note-${noteId}`);
      if (noteCardToDelete) {
        noteCardToDelete.remove();
      }
    } else if (response.status === 404) {
      console.error('Note not found:', response.statusText);
    } else {
      console.error('Failed to delete note:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting note:', error);
  }
}