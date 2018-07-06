//An array for ComicsCollection to populate the main view
var comicsCollectionData = [];

$(document).ready(function() {
  populateTable();
});

//Link for the Book Title in the table
$('#comicList table tbody').on('click', 'td a.linkshowuser', showComicInfo);

function populateTable() {

  var tableContent = '';

  //The AJAX call for JSON
  $.getJSON( '/users/comicsCollection', function( data ) {
      
    //Adding the data to the array defined above
    comicsCollectionData = data;

    //Every element in JSON gets added to the empty string declared above
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td>' + this.bookNum + '</td>';
      tableContent += '<td><a href = "#" class = "linkshowuser" rel = "' + this.bookTitle + '">' + this.bookTitle + '</a></td>';
      tableContent += '<td>' + this.seriesTitle + '</td>';
      tableContent += '<td>' + this.issueNum + '</td>';
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });

    //Putting the tableContent string into the main view
    $('#comicList table tbody').html(tableContent);
  });
};

//Function for displaying the comic book information
function showComicInfo(event) {

  //Keeping the links from going through until clicked
  event.preventDefault();

  //Getting the book that was clicked on
  var currentComicBook = $(this).attr('rel');

  //Finding the index of the book object from the collection
  var bookPosition = comicsCollectionData.map(function(currentBook) { return currentBook.bookTitle; }).indexOf(currentComicBook);

  //Getting the book
  var thisBookObject = comicsCollectionData[bookPosition];

  //Populating the information box
  $('#bookNumber').text(thisBookObject.bookNum);
  $('#bookTitle').text(thisBookObject.bookTitle);
  $('#bookSeriesTitle').text(thisBookObject.seriesTitle);
  $('#bookIssueNumber').text(thisBookObject.issueNum);
  $('#bookReleaseDate').text(thisBookObject.releaseDate);
  $('#bookFormat').text(thisBookObject.format);
  $('#bookSigned').text(thisBookObject.signed);
  $('#bookGraded').text(thisBookObject.graded);
  $('#bookAuthors').text(thisBookObject.authors);
  $('#bookPenciler').text(thisBookObject.penciler);
  $('#bookInker').text(thisBookObject.inker);
  $('#bookCoverArtist').text(thisBookObject.coverArtist);
  $('#bookPublisher').text(thisBookObject.publisher);
  $('#bookNotes').text(thisBookObject.notes);
};