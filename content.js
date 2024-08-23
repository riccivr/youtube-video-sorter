let categories = {};

// Load categories from storage
chrome.storage.sync.get("categories", (data) => {
  if (data.categories) {
    categories = data.categories;
  }
});

function addCustomSortingOptions() {
  const sortContainer = document.querySelector("#sort-menu");
  if (!sortContainer) return false;

  // Check if our options are already added
  if (sortContainer.querySelector(".custom-sort-option")) return true;

  // Add custom category options
  Object.keys(categories).forEach((category) => {
    const option = document.createElement("button");
    option.className =
      "yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--align-by-text custom-sort-option";
    option.textContent = category;
    option.addEventListener("click", () => sortVideos(category));
    sortContainer.appendChild(option);
  });

  // Add a "Manage Categories" option
  const manageOption = document.createElement("button");
  manageOption.className =
    "yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--align-by-text custom-sort-option";
  manageOption.textContent = "Manage Categories";
  manageOption.addEventListener("click", showCategoryManager);
  sortContainer.appendChild(manageOption);

  return true;
}

function sortVideos(category) {
  // Implementation remains the same
}

function showCategoryManager() {
  // Implementation remains the same
}

function saveCategories() {
  chrome.storage.sync.set({ categories: categories }, () => {
    // Attempt to add sorting options immediately after saving
    addCustomSortingOptions();
  });
}

// Function to repeatedly try adding custom sorting options
function attemptAddCustomSortingOptions() {
  if (!addCustomSortingOptions()) {
    setTimeout(attemptAddCustomSortingOptions, 1000); // Try again after 1 second
  }
}

// Initial call
attemptAddCustomSortingOptions();

// Listen for URL changes (for single-page app navigation)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    attemptAddCustomSortingOptions();
  }
}).observe(document, { subtree: true, childList: true });
