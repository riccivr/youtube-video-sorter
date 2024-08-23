# YouTube Video Sorter Chrome Extension

## Overview

YouTube Video Sorter is a Chrome extension designed to help users categorize and filter videos on YouTube channel pages. It integrates seamlessly with YouTube's existing UI, adding custom sorting options based on user-defined categories and keywords.

## Features

- Create and manage custom categories with associated keywords directly on YouTube pages
- Add custom sorting options to YouTube's existing sort menu
- Filter videos by category directly from the YouTube interface
- Persistent storage of categories across browser sessions

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Navigate to a YouTube channel page.
2. Click the "Sort by" button to open the sort menu.
3. Select "Manage Categories" from the menu options.
4. In the category manager overlay:
   - Add new categories by entering a name and comma-separated keywords
   - View existing categories and their keywords
   - Delete categories you no longer need
5. Close the category manager by clicking "Manage Categories" again.
6. Use your custom categories from the "Sort by" menu to filter videos.
7. Select a category to sort the videos. Videos matching the category will be shown first, while others will be hidden.
8. Use the "Reset Custom Sort" option to return to the original video order.

## File Structure

- `manifest.json`: Chrome extension manifest file
- `content.js`: Content script that integrates with YouTube's UI and manages categories
- `background.js`: Background script for the extension

## Development

To modify or extend the extension:

1. Edit the relevant files (`content.js`, `manifest.json`, etc.).
2. Save your changes.
3. Go to `chrome://extensions/` in Chrome.
4. Find the YouTube Video Sorter extension and click the refresh icon.

## Future Improvements

- Implement regex-based rules for more precise video matching
- Add options to customize the sorting behavior (e.g., hide non-matching videos vs. show them last)
- Support for sorting on search results pages
- Add ability to edit existing categories
- Improve the UI of the category manager

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
