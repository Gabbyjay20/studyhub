console.log("resources.js loaded");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const resourceList = document.querySelector("#resourceList");
const savedResources = document.querySelector("#savedResources");

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

function saveBookmarks() {
  localStorage.setItem(
    "studyhubBookmarks",
    JSON.stringify(bookmarks)
  );
}

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

    const saveBtn = card.querySelector(".save-btn");

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
      <button>Remove</button>
    `;

    card.querySelector("button")
      .addEventListener("click", () => {

        bookmarks.splice(index, 1);

        saveBookmarks();

        displayBookmarks();
      });

    savedResources.appendChild(card);
  });
}

searchBtn.addEventListener("click", () => {

  const searchTerm =
    searchInput.value.toLowerCase();

  const filteredResources =
    resources.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.category.toLowerCase().includes(searchTerm)
    );

  displayResources(filteredResources);
});

displayResources(resources);
displayBookmarks();