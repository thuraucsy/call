function getUniqueStr(){
	return new Date().getTime().toString(16)  + Math.floor(1000*Math.random()).toString(16);
}

function splitTheUrl() {
	let url = document.location.href;
	return url.split('#');
}

/*
	return room if room is created and null if no room is created
*/
function getRoom() {
	let room = null;
	let args = splitTheUrl();
	if (args.length <= 1) {
		console.log('new room');
		room = getUniqueStr();
		window.history.pushState('room', null, '#' + room);
		localStorage.setItem("ownerId", room);
	} else if (args.length == 2 && args[1] == localStorage.getItem("ownerId")) {
		console.log('room refreshing');
		room = args[1];
	}

	return room;
}

function getRoomName() {
	let args = splitTheUrl();
	return args.length == 2 ? args[1] : null;
}