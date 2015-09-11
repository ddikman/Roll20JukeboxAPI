
if (typeof String.prototype.contains != 'function') {
  // see below for better implementation!
  String.prototype.contains = function (str){
    return this.toLowerCase().indexOf(str.toLowerCase()) > -1;
  };
}

var lastNoOfMatches = 0;

getMatches = function(){
	return $('div.message.error').filter(function() { return $(this).text().contains("/play") });
}

playSong = function(songName){

	console.log("Recieved request to play: " + songName);
	var jukebox = $("#jukebox");
	var possibleSongs = [];
	var songItem = jukebox.find("div.title").filter(function(){ possibleSongs.push($(this).text()); return $(this).text().contains(songName)});
	if(songItem.length > 1)
	{
		alert("Too many matches for: " + songName + "\n" + possibleSongs.join("\n"))
	}
	else if(songItem.length == 0)
	{
		alert("No song containing '" + songName + "' could be found!\n" + possibleSongs.join("\n"));
	}
	else
	{
		var parent = $(songItem[0]).closest("tr");
		var button = $($(parent).find("button")[0]);
		if(button.hasClass("pause")) // press another time to reset
		{
			console.log("'" + songName + "' is already playing, will pause and play again.");
			button.click();

			// We need to find the button again once it's been pressed
			setTimeout(function(){ 
				var button = $($(parent).find("button")[0]);
				button.click(); 
			}, 500);
		}
		else
		{
			button.click();
		}
	}
}

checkCommand = function(){

	
	var possibleMatches = getMatches();
	if(lastNoOfMatches != possibleMatches.length)
	{
		var lastItem = $(possibleMatches[possibleMatches.length - 1]);
		var cmd = lastItem.text().trim();
		lastItem.remove();
		var commandStart = cmd.indexOf("/play");
		var song = cmd.substr(commandStart + 6);
		playSong(song);
		lastNoOfMatches = possibleMatches.length - 1;
	}
	setTimeout(checkCommand, 500);

}

// Save current matches count so we don't react to previous commands
lastNoOfMatches = getMatches().length
setTimeout(checkCommand, 1500);