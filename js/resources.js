console.log("resources.js loaded");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resourceList = document.getElementById("resourceList");
const savedResources = document.getElementById("savedResources");

const resources = [
  {
    title: "JavaScript.info",
    category: "JavaScript",
    url: "https://javascript.info"
  },
  {
    title: "MDN Web Docs",
    category: "Web Development",
    url: "https://developer.mozilla.org"
  },
  {
    title: "freeCodeCamp",
    category: "Programming",
    url: "https://www.freecodecamp.org"
  },
  {
    title: "W3Schools",
    category: "HTML/CSS/JavaScript",
    url: "https://www.w3schools.com"
  },
  {
    title: "Python Documentation",
    category: "Python",
    url: "https://docs.python.org/3/"
  }
];

let bookmarks =
  JSON.parse(localStorage.getItem("studyhubBookmarks")) || [];

/* Save bookmarks */

function saveBookmarks() {
  localStorage.setItem(
    "studyhubBookmarks",
    JSON.stringify(bookmarks)
  );
}

/* Display resources */

function displayResources(resourceArray) {

  resourceList.innerHTML = "";

  resourceArray.forEach(resource => {

    const card = document.createElement("div");

    card.className = "item-row";

    card.innerHTML = `
      <span>
        <strong>${resource.title}</strong><br>
        ${resource.category}
      </span>

      <button class="save-btn">
        Save
      </button>
    `;

    const saveBtn =
      card.querySelector(".save-btn");

    saveBtn.addEventListener("click", () => {

      const exists = bookmarks.find(
        item => item.title === resource.title
      );

      if (!exists) {

        bookmarks.push(resource);

        saveBookmarks();

        displayBookmarks();
      }
    });

    resourceList.appendChild(card);
  });
}

/* Display bookmarks */

function displayBookmarks() {

  savedResources.innerHTML = "";

  bookmarks.forEach((resource, index) => {

    const card = document.createElement("div");

    card.className = "item-row";

    card.innerHTML = `
      <span>
        <a href="${resource.url}" target="_blank">
          ${resource.title}
        </a>
      </span>

      <button class="remove-btn">
        Remove
      </button>
    `;

    const removeBtn =
      card.querySelector(".remove-btn");

    removeBtn.addEventListener("click", () => {

      bookmarks.splice(index, 1);

      saveBookmarks();

      displayBookmarks();
    });

    savedResources.appendChild(card);
  });
}

/* Search resources */

if (searchBtn) {

  searchBtn.addEventListener("click", () => {

    const searchTerm =
      searchInput.value.toLowerCase();

    const filteredResources =
      resources.filter(resource =>

        resource.title
          .toLowerCase()
          .includes(searchTerm)

        ||

        resource.category
          .toLowerCase()
          .includes(searchTerm)

      );

    displayResources(filteredResources);

  });

}

/* Initial load */

displayResources(resources);

displayBookmarks();

