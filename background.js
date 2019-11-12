document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("searchbtn").addEventListener("click", search_url);
});

var text;
var site;
var user_link;

function search_url(){

	//clear previous results
	document.getElementById("results").innerHTML = "";

	text = document.getElementById("searchbar").value;
	document.getElementById("searchbar").value = "";
	document.getElementById("searchwords").innerHTML= "Results for: \"" + text + "\"";

	var words = text.trim().split(" ");
	var site = 'https://api.genius.com/search?access_token=DE9whgKL-wZb9OiqJEPh3IJbdMKdrCVbekuDZiOx_6zvkOra2Ti-N0CVemvRholu&q=';
	var user_link = 'https://genius.com/search?q='

	var i;
	site = site+words[0];
	user_link = user_link+words[0];
	for(i = 1; i<words.length; i++){
		site = site + '%20' + words[i];
		user_link = user_link + '%20' + words[i];
	}

	const proxyurl = "https://cors-anywhere.herokuapp.com/" + site;
	$.ajax({
		method: 'GET',
		url: proxyurl,
  		dataType: "json",
  		headers: {"x-requested-with": "XMLHttpRequest"},
		success: function(data){
			console.log(data);
			//console.log(data.response.hits[0].result.title);
			//console.log(data.response.hits[0].result.header_image_thumbnail_url);
			//console.log(data.response.hits[0].result.primary_artist.name);
			//console.log(data.response.hits.length);

			var i = 0;

			while(i < data.response.hits.length){
				var node = document.createElement("li");
				node.id = "" + i;
				document.getElementById("results").appendChild(node);

				var song = document.createElement('div');
				song.className = "song";
				song.innerHTML ='"' + data.response.hits[i].result.title + '"';
				document.getElementById("" + i).appendChild(song);

				var artist = document.createElement('div');
				artist.className = "artist";
				artist.id = "" + i;
				artist.innerHTML = 'By ' + data.response.hits[i].result.primary_artist.name;
				document.getElementById("" + i).appendChild(artist);

				var cover = document.createElement("img");
				cover.setAttribute('src', data.response.hits[i].result.header_image_thumbnail_url);
				cover.setAttribute('width', 100);
				cover.setAttribute('class', 'center');
				document.getElementById("" + i).appendChild(cover);

				document.getElementById(""+i).style.color = 'white';	

				if(i == 2){
					break;
				}
				i++;
			}

			if(data.response.hits.length === 0){
				var node = document.createElement("li");
				node.id = "empty";
				node.innerHTML = "No results."
				document.getElementById("results").appendChild(node);
			}

		},
		error: function(e){
			console.log("Error " + JSON.stringify(e));
		}
	});

	document.getElementById("userlink").href = user_link;
	document.getElementById("userlink").innerHTML = "Full search";

}

