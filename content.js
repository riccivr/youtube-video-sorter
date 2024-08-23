let categories = {};

console.log("YouTube Video Sorter: Script loaded");

// Load categories from storage
chrome.storage.sync.get("categories", (data) => {
  console.log("YouTube Video Sorter: Fetched categories from storage", data);
  if (data.categories) {
    categories = data.categories;
  }
});

function addCustomSortingOptions() {
  console.log("YouTube Video Sorter: Attempting to add custom sorting options");
  const sortContainer = document.querySelector("#sort-menu");
  if (!sortContainer) {
    console.log("YouTube Video Sorter: Sort container not found");
    return false;
  }

  console.log("YouTube Video Sorter: Sort container found", sortContainer);

  // Check if our options are already added
  if (sortContainer.querySelector(".custom-sort-option")) {
    console.log("YouTube Video Sorter: Custom options already present");
    return true;
  }

  // Add custom category options
  Object.keys(categories).forEach((category) => {
    console.log(`YouTube Video Sorter: Adding category option: ${category}`);
    const option = document.createElement("button");
    option.className =
      "yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--align-by-text custom-sort-option";
    option.textContent = category;
    option.addEventListener("click", () => sortVideos(category));
    sortContainer.appendChild(option);
  });

  // Add a "Manage Categories" option
  console.log("YouTube Video Sorter: Adding Manage Categories option");
  const manageOption = document.createElement("button");
  manageOption.className =
    "yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--align-by-text custom-sort-option";
  manageOption.textContent = "Manage Categories";
  manageOption.addEventListener("click", showCategoryManager);
  sortContainer.appendChild(manageOption);

  console.log(
    "YouTube Video Sorter: Custom sorting options added successfully"
  );
  return true;
}

function sortVideos(category) {
  console.log(`YouTube Video Sorter: Sorting videos by category: ${category}`);
  // Implementation remains the same
}

function showCategoryManager() {
  console.log("YouTube Video Sorter: Showing category manager");
  // Implementation remains the same
}

function saveCategories() {
  console.log("YouTube Video Sorter: Saving categories", categories);
  chrome.storage.sync.set({ categories: categories }, () => {
    console.log("YouTube Video Sorter: Categories saved successfully");
    // Attempt to add sorting options immediately after saving
    addCustomSortingOptions();
  });
}

// Function to repeatedly try adding custom sorting options
function attemptAddCustomSortingOptions() {
  console.log("YouTube Video Sorter: Attempting to add custom sorting options");
  if (!addCustomSortingOptions()) {
    console.log(
      "YouTube Video Sorter: Failed to add options, retrying in 1 second"
    );
    setTimeout(attemptAddCustomSortingOptions, 1000); // Try again after 1 second
  } else {
    console.log(
      "YouTube Video Sorter: Successfully added custom sorting options"
    );
  }
}

// Initial call
console.log(
  "YouTube Video Sorter: Initial attempt to add custom sorting options"
);
attemptAddCustomSortingOptions();

// Listen for URL changes (for single-page app navigation)
let lastUrl = location.href;
console.log(`YouTube Video Sorter: Initial URL: ${lastUrl}`);
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    console.log(`YouTube Video Sorter: URL changed from ${lastUrl} to ${url}`);
    lastUrl = url;
    attemptAddCustomSortingOptions();
  }
}).observe(document, { subtree: true, childList: true });

console.log("YouTube Video Sorter: MutationObserver set up");
