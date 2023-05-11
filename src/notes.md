Next Steps



Notes feature

When a user navigates to a user’s repo page ‘/dearshrewdwit/bowling-challenge’, then a user should see, in addition to the information about a repo, a notes section. This includes:
- A clickable element to add a note
- All current notes listed down the page in reverse chronological order (most recent at the top) for the repository
- Notes should be persisted to a data store

When a user clicks to add a note, then the url should change to ‘/dearshrewdwit/bowling-challenge/notes/add’ and show a text input field and a button to add the note. When the note is added, the app should navigate back to the repo page and the user should see all the notes including the newly created one.
Extensions:
Set 1
1. When a user navigates to the index ('/') they should only see the input field and button. 
2. When a user types in a github username, they should see a list of repositories and also some other information about the user's github profile - their avatar image at minimum. The URL should also show as '/:username'
3. A user should be able to navigate back to the user's profile page '/:username' from the repo page 
4. A user should be able to navigate back to the home page from anywhere.

Set 2
1. When a user navigates to a user’s repo page ‘/dearshrewdwit/bowling-challenge’, then a user should see, in addition to the standard criteria, notes with clickable elements to edit and delete each note
2. When a user clicks to edit a note, then the url should change to ‘/dearshrewdwit/notes/12/edit’ and show a text input field populated with the current note text and a button to update the note. When the note is updated, the app should navigate back to the repo page and the user should see all the notes including the newly updated one.
3. When a user navigates to ‘/notes’, they should see all the notes added to any user’s repository. Notes should be displayed with the note contents and the associated username and repo name
4. When a user navigates to ‘/notes’ they should see a search input field which filters the notes to only those notes whose contents includes the characters searched for. The filtering should happen automatically on change to the input field and the page should always show the current filtered list of notes.