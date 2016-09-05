//Problem: Too many people list items on the page and no search feature
//Solution: Add pagination and a search feature


//VARIABLES AND INITIAL SETUP
//Calculate the number of list items --- class="student-item cf"
var ListItems=$('ul.student-list').children().length; 
//assign the list an id of show at the start of the program
$('ul.student-list').children().attr("id","show");
//Number of list items per page CHANGE THIS VALUE IF YOU WANNA CHANGE THE NUMBER OF ITEMS ON ONE PAGE
var itemsPerPage=10;
//Total page numbers required
var pageNum;
//Define the html when there are no matched results
var $noResult=$('<div></div>'); 
    $noResult.text("Sorry, No results found!");
    $('div.page').append($noResult);
    $noResult.hide();
//Create the Pagination buttons through jquery
var $paginationDiv=$('<div></div>');
var $paginationList=$('<ul></ul>');
    $paginationDiv.addClass("pagination").append($paginationList);//adds pagination class to the pagination button div
    $(".page").append($paginationDiv);//adds the pagination div to the end of the div having the .page class
//Create the search feature using jquery
var $studentSearch=$('<div></div>');
var $studentSearchInput=$('<input placeholder="Search for students..." type="text" id="input">');
var $studentSearchButton=$('<button></button>');
    $studentSearchButton.text("Search");
    $studentSearch.addClass("student-search").append($studentSearchInput).append($studentSearchButton);
    $('.page-header').append($studentSearch);


//Creating a selector expression that works like the :contain selector but its case-insensitive
jQuery.expr[':'].Contains = function(a,i,match){
    return a.textContent.toUpperCase().indexOf(match[3].toUpperCase())>=0;
};

//EVENT HANDLERS
//check any key changes in the student search input box
$studentSearchInput.keyup(keyUpFunction);
//This searchbutton event handler is redundant. When the user will write something in the search input box, the pagination and displayed list will be automatically updated. So the user will never have to use the button. Just to pass the project, i put it in the project.
$studentSearchButton.on("click",keyUpFunction);





//FUNCTIONS
//function runs when the user presses the search button or writes something in the input search box.
function keyUpFunction(){
    //Store the keyUps in the variable filter
    var filter=$studentSearchInput.val();
    //hide the noResult html 
    $noResult.hide();
    //If there is something in the input box
    if(filter){
        //the students that are not matching the input box text are given the id of hide
        $('ul.student-list').find("h3:not(:Contains("+filter+"))").parent().parent().attr("id","hide");
        //the students that are matching the input box text are given the id of show
        $('ul.student-list').find("h3:Contains("+filter+")").parent().parent().attr("id","show");
        //the emails that are matching the input box text are given the id of show
        $('ul.student-list').find("span[class*='email']:Contains("+filter+")").parent().parent().attr("id","show");
        //number of students with the id of show
        var studentLength=$('ul.student-list #show').length;
        //the pagination buttons are removed
        $('.pagination ul').children().remove();
        //run the function of createPagination. Pass the number of students with the id of show as an argument
        createPagination(studentLength,itemsPerPage);
        
    }
    //if the input box is empty
    else{
        //remove pagination buttons
         $('.pagination ul').children().remove();
        //give all the students and id of show
         $('ul.student-list').children().attr("id","show");
        //create pagination. Pass the total number of students as an argument
         createPagination(ListItems,itemsPerPage);
        
    }
    //if there are no search results matching the input
    if($('li.student-item[id="show"]').length === 0){
        //show the noResult html
        $noResult.show();
    }
    
}


//Assigns on click handlers to appropriate pagination buttons
function clickAssignment(itemsPerPage,pageNum){
    var j=0; //loop variable
    //loop through all the pages
    for(var p=0;p<pageNum;p++){
        //assign the current pagination list button (p)to the variable $selectedListItem
        var $selectedListItem=$('.pagination ul').children().eq(p);
        //put an onclick listener on it. Pass j as the eventhandler argument. 
        $selectedListItem.on("click",showHide(j,itemsPerPage));
        //increment j by the required number of items per page
        j+=itemsPerPage;
    }
}


//Hides the unnecessary list items and shows the necessary ones, i=index from where to start the slicing
function showHide(i,itemsPerPage){
    return function(event){
        //hide all the students in the student-list class
        $('.student-list').children().hide();  
        //show the students from i to i+itemsPerPage. So for the first page, you will see students from 0 to 10 (if itemsPerPage is equal to 10)
        $(".student-list #show").slice(i, i+itemsPerPage).slideDown(100);
        
        
    };
}
//Create Pagination
function createPagination(ListItems,itemsPerPage){
    //Total page numbers required
    pageNum=Math.ceil(ListItems/itemsPerPage);
    //When the page is loaded or when the first page is loaded after a KEYUP event,  show the list items with slide=false
    showHide(0,itemsPerPage)();
    
    //if there are more items to show than the itemsPerPage then create pagination
    if(ListItems>itemsPerPage){
        //Show the number of pagination labels according to the pages required
        for(var k=1; k<=pageNum; k++){
        //create jquery detached objects
        var $paginationLables=$('<li></li>');
        var $paginationLink=$('<a href="#"></a>');
        //assign the anchor tag text as the current pagenumber
        $paginationLink.text(k);
        //appends
        $paginationLables.append($paginationLink);
        $paginationList.append($paginationLables);
    }
    //after this, run the clickAssignment function with arguments of itemsPerPage and pageNum
    clickAssignment(itemsPerPage,pageNum);    
    }
    
}
    


//EXECUTION
/*create pagination
  You can change the itemsPerPage in the GLOBAL SCOPE(not the function's argument)to fit your needs. Also, you can change total ListItems (number of students in the index.html) and everything will work accordingly.
*/

createPagination(ListItems,itemsPerPage);

