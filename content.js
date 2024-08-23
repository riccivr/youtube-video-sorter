chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "applySorting") {
    sortVideos(request.categories);
  }
});

function sortVideos(categories) {
  const videoElements = document.querySelectorAll('ytd-grid-video-renderer, ytd-video-renderer');
  
  videoElements.forEach((videoEl) => {
    const title = videoEl.querySelector('#video-title').textContent;
    const description = videoEl.querySelector('#description-text')?.textContent || '';
    
    let matchedCategory = null;
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => title.toLowerCase().includes(keyword.toLowerCase()) || 
                         description.toLowerCase().includes(keyword.toLowerCase()))) {
        matchedCategory = category;
        break;
      }
    }
    
    if (matchedCategory) {
      videoEl.setAttribute('data-category', matchedCategory);
      videoEl.style.border = '2px solid green';
    } else {
      videoEl.removeAttribute('data-category');
      videoEl.style.border = '';
    }
  });
  
  // Add category filter buttons
  addCategoryFilters(categories);
}

function addCategoryFilters(categories) {
  const filterContainer = document.createElement('div');
  filterContainer.id = 'yt-sorter-filters';
  filterContainer.style.position = 'fixed';
  filterContainer.style.top = '100px';
  filterContainer.style.right = '20px';
  filterContainer.style.zIndex = '9999';
  
  for (const category of Object.keys(categories)) {
    const button = document.createElement('button');
    button.textContent = category;
    button.addEventListener('click', () => filterByCategory(category));
    filterContainer.appendChild(button);
  }
  
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Show All';
  resetButton.addEventListener('click', resetFilter);
  filterContainer.appendChild(resetButton);
  
  document.body.appendChild(filterContainer);
}

function filterByCategory(category) {
  const videoElements = document.querySelectorAll('ytd-grid-video-renderer, ytd-video-renderer');
  videoElements.forEach((videoEl) => {
    if (videoEl.getAttribute('data-category') === category) {
      videoEl.style.display = '';
    } else {
      videoEl.style.display = 'none';
    }
  });
}

function resetFilter() {
  const videoElements = document.querySelectorAll('ytd-grid-video-renderer, ytd-video-renderer');
  videoElements.forEach((videoEl) => {
    videoEl.style.display = '';
  });
}
