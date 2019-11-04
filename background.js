//look this step up

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
  });


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("searchbtn").addEventListener("click", search);
});

var text;

function search(){
	text = document.getElementById("searchbar").value;
	document.getElementById("p1").innerHTML= "Results for: " + text;
}