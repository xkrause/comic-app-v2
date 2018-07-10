# comic-app-v2
A newer version of my comic book application from previous repositories

Note: This project is a work in progress. It is not finished/styled yet, and all features have not been developed.

In order to get this up ad running, you'll need to have Node.js installed on your machine,
and have mongod and mongo both set up as environment variables.
If you don't know how that works, here's a great tutorial on how to get it all set up: https://www.youtube.com/watch?v=1uFY60CESlM&t=714s
After you've cloned the repo, make sure that express and express-generator are updated.
```
npm update -g express
npm update -g express-generator
```
Next, install the dependencies.
```
npm install
```
Then, From the mongo shell, you'll need to use the comicsCollection collection. You can do this by typing 
```
use comicsCollection
```
into the mongo shell. This will set up the collection and switch to it.

Then, you'll need to put at least 1 entry in the database.
Example:
```
db.comicsCollection.insert({bookNum:"Add Book Number (Count of total books, not the same as issue number)", 
bookTitle:"Add Book Title", 
seriesTitle:"Add Series Title", 
issueNum:"Add Issue Number", 
releaseDate:"Add Release Date", 
format:"Add Format (TPB or Single Issue)", 
signed:"Add Signed Info", 
penciler:"Add Penciler", 
inker:"Add Inker", 
coverArtist:"Add Cover Artist", 
publisher:"Add Publisher", 
notes:"Add Notes"})
```
Once that's done, in your terminal window, navigate to the project directory and start the server.
```
npm start
```
Then, go to your browser, and navigate to localhost:3000. The app should be running.
