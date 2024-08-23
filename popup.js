let categories = {};

document.getElementById('addCategory').addEventListener('click', () => {
  const category = document.getElementById('newCategory').value;
  const keywords = document.getElementById('newKeywords').value.split(',').map(k => k.trim());
  
  if (category && keywords.length > 0) {
    categories[category] = keywords;
    updateCategoryList();
    saveCategories();
  }
});

document.getElementById('apply').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "applySorting", categories: categories});
  });
});

function updateCategoryList() {
  const categoriesDiv = document.getElementById('categories');
  categoriesDiv.innerHTML = '';
  for (const [category, keywords] of Object.entries(categories)) {
    categoriesDiv.innerHTML += `<p>${category}: ${keywords.join(', ')}</p>`;
  }
}

function saveCategories() {
  chrome.storage.sync.set({categories: categories});
}

// Load saved categories when popup opens
chrome.storage.sync.get('categories', (data) => {
  if (data.categories) {
    categories = data.categories;
    updateCategoryList();
  }
});
