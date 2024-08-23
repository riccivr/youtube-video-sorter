let categories = {};

chrome.storage.sync.get("categories", (data) => {
  if (data.categories) {
    categories = data.categories;
    addCustomSortingOptions();
  }
});

function addCustomSortingOptions() {
  const sortMenu = document.querySelector("#sort-menu");
  if (!sortMenu) return;

  // Remove any existing custom options
  const existingOptions = sortMenu.querySelectorAll(".custom-sort-option");
  existingOptions.forEach((option) => option.remove());

  // Add custom category options
  Object.keys(categories).forEach((category) => {
    const option = document.createElement("a");
    option.className =
      "yt-simple-endpoint style-scope ytd-toggle-button-renderer custom-sort-option";
    option.textContent = category;
    option.addEventListener("click", () => sortVideos(category));
    sortMenu.appendChild(option);
  });

  // Add a "Reset" option
  const resetOption = document.createElement("a");
  resetOption.className =
    "yt-simple-endpoint style-scope ytd-toggle-button-renderer custom-sort-option";
  resetOption.textContent = "Reset Custom Sort";
  resetOption.addEventListener("click", resetSort);
  sortMenu.appendChild(resetOption);

  // Add a "Manage Categories" option
  const manageOption = document.createElement("a");
  manageOption.className =
    "yt-simple-endpoint style-scope ytd-toggle-button-renderer custom-sort-option";
  manageOption.textContent = "Manage Categories";
  manageOption.addEventListener("click", showCategoryManager);
  sortMenu.appendChild(manageOption);
}

function sortVideos(category) {
  // ... (same as before)
}

function resetSort() {
  // ... (same as before)
}

function updateSortButtonText(category) {
  // ... (same as before)
}

function showCategoryManager() {
  // Remove existing manager if it's already open
  const existingManager = document.getElementById("category-manager");
  if (existingManager) {
    existingManager.remove();
    return;
  }

  // Create and add the category manager
  const manager = document.createElement("div");
  manager.id = "category-manager";
  manager.style.cssText = `
    position: fixed;
    top: 60px;
    right: 20px;
    background: white;
    border: 1px solid #ccc;
    padding: 20px;
    z-index: 9999;
    max-height: 80vh;
    overflow-y: auto;
  `;

  // Add existing categories
  for (const [category, keywords] of Object.entries(categories)) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <h3>${category}</h3>
      <p>Keywords: ${keywords.join(", ")}</p>
      <button class="delete-category" data-category="${category}">Delete</button>
    `;
    manager.appendChild(categoryDiv);
  }

  // Add new category form
  const form = document.createElement("form");
  form.innerHTML = `
    <input type="text" id="new-category" placeholder="New category name">
    <input type="text" id="new-keywords" placeholder="Keywords (comma-separated)">
    <button type="submit">Add Category</button>
  `;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newCategory = document.getElementById("new-category").value;
    const newKeywords = document
      .getElementById("new-keywords")
      .value.split(",")
      .map((k) => k.trim());
    if (newCategory && newKeywords.length > 0) {
      categories[newCategory] = newKeywords;
      saveCategories();
      showCategoryManager(); // Refresh the manager
    }
  });
  manager.appendChild(form);

  // Add event listener for delete buttons
  manager.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-category")) {
      const categoryToDelete = e.target.getAttribute("data-category");
      delete categories[categoryToDelete];
      saveCategories();
      showCategoryManager(); // Refresh the manager
    }
  });

  document.body.appendChild(manager);
}

function saveCategories() {
  chrome.storage.sync.set({ categories: categories }, () => {
    addCustomSortingOptions();
  });
}

// Initial call
addCustomSortingOptions();

// Listen for URL changes (for single-page app navigation)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    addCustomSortingOptions();
  }
}).observe(document, { subtree: true, childList: true });
