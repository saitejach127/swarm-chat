// navigator.mediaDevices.getUserMedia({ video: true, audio : false }).then((stream) => {
const signalhub = require('signalhub');
const createSwarm = require('webrtc-swarm');

const room = prompt("room name = ");
const name = prompt("Name = ")

const hub = signalhub(room, ["https://rtc-saitejahub.herokuapp.com/"]);

const swarm = createSwarm(hub);

var p = document.createElement('p');
document.body.appendChild(p);

swarm.on('peer', (peer,id) => {
	p.innerHTML+= "new connection "+JSON.stringify(id) + "<br>";

	peer.on('data', (data) => {
		data = JSON.parse(data.toString())
		p.innerHTML += data["name"]+ " : " + data["value"].toString() + "<br>"
	});
});


swarm.on('disconnect', (peer,id) => { p.innerHTML+= "disconnect "+JSON.stringify(id) + "<br>"; } )

var inp = document.createElement("input");
document.body.appendChild(inp);


var btn = document.createElement('button');
btn.innerHTML = "send"
document.body.appendChild(btn);
btn.onclick = () => {
	swarm.peers.forEach((peer) => {
		data = {"type":"msg", "value":inp.value,"name":name};
		p.innerHTML += data["name"]+ " : " + data["value"].toString() + "<br>"
		peer.send(JSON.stringify(data));
	})
}



// });
