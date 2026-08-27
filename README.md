# twitter user manager

drag a user off a tweet or reply, drop them onto a folder, folder runs its action (follow / mute / block).

## structure
- `manifest.json` - MV3, one content script bundle on x.com/twitter.com
- `src/storage.js` - folder persistence, chrome.storage.local (falls back to localStorage outside an extension context)
- `src/folders.js` - folder CRUD + in-memory list, notifies subscribers
- `src/actions.js` - runs follow/mute/block by opening the tweet's caret menu and clicking the matching item (TODO: verify testids/menu text against a live x.com session, twitter reshuffles these)
- `src/dragdetect.js` - pointer-based drag detection on `User-Name`/avatar elements inside a tweet article, no native HTML5 drag (twitter's own handlers get in the way of that)
- `src/overlay.js` - the black overlay + folder canvas, mounted in a shadow root so twitter's css can't touch it
- `src/main.js` - wires it all up on load
- `fake/` - a static fake timeline (same data-testid attributes as real tweets, including a working caret/menu/block-confirm flow) so `preview.html` exercises the exact same code path as the real site
- `preview.html` - open this (as the loaded extension's page, or just double-click the file) to see the overlay live without touching real twitter, drag/drop and folder management both work here

## try it
load unpacked in chrome (chrome://extensions -> developer mode -> load unpacked), or just open `preview.html` directly to tweak design without the extension installed.

## TODO
- icons/metadata are placeholders (`images/icon*.png`, `manifest.json` name/description/author/homepage_url)
- verify `src/actions.js` menu selectors against live x.com (caret testid, menuitem text, confirm sheet testid)
- no undo/history for drop actions yet
