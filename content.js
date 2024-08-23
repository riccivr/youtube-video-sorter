let categories = {};

console.log("YouTube Video Sorter: Script loaded");

// Load categories from storage
chrome.storage.sync.get("categories", (data) => {
  console.log("YouTube Video Sorter: Fetched categories from storage", data);
  if (data.categories) {
    categories = data.categories;
    attemptAddCustomSortingOptions();
  } else {
    console.log("YouTube Video Sorter: No categories found in storage");
    // Add some default categories for testing
    categories = {
      Interviews: ["interview", "guest"],
      Sketches: ["sketch", "comedy"],
      Monologues: ["monologue", "opening"],
    };
    saveCategories();
  }
});

function createChipElement(text, onClick) {
  const chip = document.createElement("yt-chip-cloud-chip-renderer");
  chip.className =
    "style-scope ytd-feed-filter-chip-bar-renderer custom-sort-option";
  chip.setAttribute("modern", "");
  chip.setAttribute("role", "tab");
  chip.setAttribute("tabindex", "0");
  chip.setAttribute("chip-style", "STYLE_DEFAULT");

  const formattedString = document.createElement("yt-formatted-string");
  formattedString.id = "text";
  formattedString.className = "style-scope yt-chip-cloud-chip-renderer";
  formattedString.setAttribute("ellipsis-truncate", "");
  formattedString.setAttribute("ellipsis-truncate-styling", "");
  formattedString.setAttribute("title", text);
  formattedString.textContent = text;

  chip.appendChild(formattedString);
  chip.addEventListener("click", (e) => {
    e.preventDefault();
    onClick();
  });

  return chip;
}

function addCustomSortingOptions() {
  console.log("YouTube Video Sorter: Attempting to add custom sorting options");
  const sortContainer = document.querySelector(
    "ytd-feed-filter-chip-bar-renderer #chips"
  );
  if (!sortContainer) {
    console.log("YouTube Video Sorter: Sort container not found");
    return false;
  }

  // Check if our options are already added
  if (sortContainer.querySelector(".custom-sort-option")) {
    console.log("YouTube Video Sorter: Custom options already present");
    return true;
  }

  // Add custom category options
  Object.keys(categories).forEach((category) => {
    console.log(`YouTube Video Sorter: Adding category option: ${category}`);
    const option = createChipElement(category, () => sortVideos(category));
    sortContainer.appendChild(option);
  });

  // Add a "Manage Categories" option
  console.log("YouTube Video Sorter: Adding Manage Categories option");
  const manageOption = createChipElement(
    "Manage Categories",
    showCategoryManager
  );
  sortContainer.appendChild(manageOption);

  console.log(
    "YouTube Video Sorter: Custom sorting options added successfully"
  );
  return true;
}

function sortVideos(category) {
  console.log(`YouTube Video Sorter: Sorting videos by category: ${category}`);
  // Implement sorting logic here
  // For now, let's just log the action
  alert(`Sorting by ${category}. This feature is not yet implemented.`);
}

function showCategoryManager() {
  console.log("YouTube Video Sorter: Showing category manager");
  // Implement category management UI here
  // For now, let's just log the action
  alert("Category management feature is not yet implemented.");
}

function saveCategories() {
  console.log("YouTube Video Sorter: Saving categories", categories);
  chrome.storage.sync.set({ categories: categories }, () => {
    if (chrome.runtime.lastError) {
      console.error(
        "YouTube Video Sorter: Error saving categories",
        chrome.runtime.lastError
      );
    } else {
      console.log("YouTube Video Sorter: Categories saved successfully");
      attemptAddCustomSortingOptions();
    }
  });
}

function attemptAddCustomSortingOptions() {
  console.log("YouTube Video Sorter: Attempting to add custom sorting options");
  if (!addCustomSortingOptions()) {
    console.log(
      "YouTube Video Sorter: Failed to add options, retrying in 1 second"
    );
    setTimeout(attemptAddCustomSortingOptions, 1000);
  } else {
    console.log(
      "YouTube Video Sorter: Successfully added custom sorting options"
    );
  }
}

// Listen for URL changes and significant DOM changes
let lastUrl = location.href;
console.log(`YouTube Video Sorter: Initial URL: ${lastUrl}`);
new MutationObserver((mutations) => {
  const url = location.href;
  if (url !== lastUrl) {
    console.log(`YouTube Video Sorter: URL changed from ${lastUrl} to ${url}`);
    lastUrl = url;
    attemptAddCustomSortingOptions();
  } else {
    for (const mutation of mutations) {
      if (
        mutation.target.id === "chips" ||
        mutation.target.id === "scroll-container"
      ) {
        console.log(
          "YouTube Video Sorter: Relevant DOM change detected, attempting to add options"
        );
        attemptAddCustomSortingOptions();
        break;
      }
    }
  }
}).observe(document.body, { childList: true, subtree: true });

console.log("YouTube Video Sorter: MutationObserver set up");
