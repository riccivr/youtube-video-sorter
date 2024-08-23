# YouTube Video Sorter Chrome Extension

## Overview

YouTube Video Sorter is a Chrome extension designed to help users categorize and filter videos on YouTube pages. It's particularly useful for channels with diverse content, allowing users to easily sort videos into custom categories based on keywords.

## Features

- Create custom categories with associated keywords
- Automatically categorize videos on YouTube pages
- Filter videos by category with on-page buttons
- Persistent storage of categories across browser sessions

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Navigate to a YouTube channel or search results page.
2. Click the YouTube Video Sorter icon in your Chrome toolbar to open the popup.
3. Add categories and associated keywords:
   - Enter a category name (e.g., "Conan's Late Show")
   - Enter keywords separated by commas (e.g., "late show, monologue, guest interview")
   - Click "Add Category"
4. Click "Apply Sorting" to categorize the videos on the current page.
5. Use the filter buttons that appear on the YouTube page to show/hide videos by category.

## File Structure

- `manifest.json`: Chrome extension manifest file
- `popup.html`: HTML for the extension popup
- `popup.js`: JavaScript for popup functionality
- `content.js`: Content script that runs on YouTube pages
- `background.js`: Background script for the extension

## Development

To modify or extend the extension:

1. Edit the relevant files (`popup.html`, `popup.js`, `content.js`, etc.).
2. Save your changes.
3. Go to `chrome://extensions/` in Chrome.
4. Find the YouTube Video Sorter extension and click the refresh icon.

## Future Improvements

- Implement regex-based rules for more precise video matching
- Add sorting options within categories (by date, views, etc.)
- Create a more advanced user interface for managing categories and rules
- Support auto-categorization for dynamically loaded videos (infinite scroll)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
