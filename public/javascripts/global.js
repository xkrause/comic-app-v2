//An array for ComicsCollection to populate the main view
var comicsCollectionData = [];

$(document).ready(function() {
  populateTable();
});

//Link for the Book Title in the table
$('#comicList table tbody').on('click', 'td a.linkshowuser', showComicInfo);

//Add comic book button
$("#btnAddComic").on("click", addComic);

//Delete comic book when the link is clicked in the table
$('#comicList table tbody').on('click', 'td a.linkDeleteComic', deleteComic);

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
      tableContent += '<td><a href="#" class="linkDeleteComic" rel="' + this._id + '">delete</a></td>';
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

//Add Comic logic
function addComic(event) {
  event.preventDefault();

  //Form validation
  var errors = 0;
  $('#addComic input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });

  if(errors === 0) {

    // If it is, compile all user info into one object
    var newComic = {
      "bookNum": $("#addComic fieldset input#inputBookNum").val(),
      "bookTitle": $("#addComic fieldset input#inputBookTitle").val(),
      "seriesTitle": $("#addComic fieldset input#inputSeriesTitle").val(),
      "issueNum": $("#addComic fieldset input#inputIssueNum").val(),
      "releaseDate": $("#addComic fieldset input#inputReleaseDate").val(),
      "format": $("#addComic fieldset input#inputFormat").val(),
      "signed": $("#addComic fieldset input#inputSigned").val(),
      "graded": $("#addComic fieldset input#inputGraded").val(),
      "authors": $("#addComic fieldset input#inputAuthors").val(),
      "penciler": $("#addComic fieldset input#inputPenciler").val(),
      "inker": $("#addComic fieldset input#inputInker").val(),
      "coverArtist": $("#addComic fieldset input#inputCoverArtist").val(),
      "publisher": $("#addComic fieldset input#inputPublisher").val(),
      "notes": $("#addComic fieldset input#inputNotes").val()
    }

    //Using AJAX to POST to the database
    $.ajax({
      type: "POST",
      data: newComic,
      url: "/users/addComic",
      dataType: "JSON"
    }).done(function( response ) {

      //If successful, then no response
      if (response.msg === "") {

        //Reset the form
        $("#addComic fieldset input").val("");

        //Have the table display the updated database info
        populateTable();

      } else {

        //If it didn't go through, then send the error message
        alert("Error: " + response.msg);
      }
    });
  }
  else {
    //If the form fields aren't all filled out, then let the user know
    alert("All form fields must be filled in");
    return false;
  }
};

//Delete comic book
function deleteComic(event) {

  event.preventDefault();

  //Confirm with the user before delete
  var confirmation = confirm("Are you sure you want to delete this comic book?");
    
  if (confirmation === true) {

    $.ajax({
      type: 'DELETE',
      url: '/users/deleteComic/' + $(this).attr('rel')
    }).done(function( response ) {

      if (response.msg === '') {
        //Delete successful
      } else {
        alert('Error: ' + response.msg);
      }

      //Make sure the table is updated after the book is deleted
      populateTable();
    });
  } else {
    //Don't delete if the user changed their mind
    return false;
  }
};