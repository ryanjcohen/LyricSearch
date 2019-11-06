
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("searchbtn").addEventListener("click", search_url);
});

var text;
var site;

function search_url(){
	text = document.getElementById("searchbar").value;
	document.getElementById("searchbar").value = "";
	document.getElementById("p1").innerHTML= "Results for: \"" + text + "\"";

	var words = text.trim().split(" ");
	var site = 'lyrics.com/lyrics/';

	var i;
	site = site+words[0];
	for(i = 1; i<words.length; i++){
		site = site + '%20' + words[i];
	}

	document.getElementById("p2").innerHTML = site;

	const proxyurl = "https://cors-anywhere.herokuapp.com/" + site;
	$.ajax({
		url: proxyurl,
		success: function(data){
			var test = $(data).getElementsByClassName("sec-lyric clearfix");
			console.log(test[0]);
			//result = $(data).find("#")
		},
		error: function(e){
			console.log("Error " + e);
		}
	});

}

