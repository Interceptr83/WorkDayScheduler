// Create an array of time blocks
const timeblocks = [ 9, 10, 11, 12, 1, 2, 3, 4, 5];

// wait for page to load and be accessible for jquery
$(document).ready(function () {

  // collects current time from moment.js to place in the page header
    $('#currentDay').text(moment().format("MMM Do YY"));

  //Using moment js decide weather or not the time in the array is the past, present or future
    function pastPresentFuture(hour) {
        return moment().hour() < hour ? "future" : moment().hour() === hour ? "present" : "past"
    };

  // Assign styling to timeblocks based on if block is in the past, present or future
    function colorize() {
        timeblocks.forEach(function(timeBlock) {
            if (pastPresentFuture(timeBlock) === "past"){
              let block = document.getElementById(`${timeBlock}`);
              block.setAttribute("class", "past");
            } else if (pastPresentFuture(timeBlock) === "present"){
              let block = document.getElementById(`${timeBlock}`);
              block.setAttribute("class", "present");
            }  else {
              let block = document.getElementById(`${timeBlock}`);
              block.setAttribute("class", "future");
            };
        });

        pastPresentFuture()
    };

  // check for click of the submit button
    $('#submit').on('click', function () {

      // get values from user input and time block drop down
        const entryEl = document.querySelector("#entry");
        const timeBlockEl = document.querySelector("#timeBlock");
        let entry = entryEl.value;
        let timeBl = timeBlockEl.value;

        // console.log(entry);
        //console.log(timeBl);

      // Print the new note to the page
        const block = document.getElementById(`${timeBl}`);
        const newItem = document.createElement("li");
        newItem.textContent = entry;
        block.appendChild(newItem);

      // Save note and assigned time block to the local storage object
        let planner = JSON.parse(window.localStorage.getItem("planner")) || [];
        let storeEnt = {
          tBlock: timeBl,
          note: entry
        };
        //console.log(storeEnt.tBlock);
        //console.log(storeEnt.note);
        planner.push(storeEnt);
        window.localStorage.setItem("planner", JSON.stringify(planner));
    });

  // On load populates page with saved notes from local storage
    function populatePlanner() {
      
      let planner = JSON.parse(window.localStorage.getItem("planner")) || [];
      
      planner.forEach(function(savedNote) {
        let block = document.getElementById(`${savedNote.tBlock}`);
        let newItem = document.createElement("li");
        newItem.textContent = savedNote.note;
        block.appendChild(newItem);  
      });
  };
  
  // calling functions to be run on page load
    colorize();
    populatePlanner();

});