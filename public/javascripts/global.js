//An array for ComicsCollection to populate the main view
var comicsCollectionData = [];

$(document).ready(function() {
  populateTable();
});

function populateTable() {

  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON( '/users/comicsCollection', function( data ) {

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