const signalhub = require('signalhub');
const createSwarm = require('webrtc-swarm');

const room = prompt("room name = ");

const hub = signalhub(room, ["https://rtc-saitejahub.herokuapp.com/"]);

const swarm = createSwarm(hub);

var p = document.createElement('p');
document.body.appendChild(p);

swarm.on('peer', (peer,id) => {
	p.innerHTML+= "new connection "+JSON.stringify(id) + "<br>";
	peer.on('data', (data) => {
		data = JSON.parse()
		p.innerHTML += "new data = " + data.toString() + "<br>"
	});
});


swarm.on('disconnect', (peer,id) => { p.innerHTML+= "disconnect connection "+JSON.stringify(id) + "<br>";
 } )

var inp = document.createElement("input");
document.body.appendChild(inp);


var btn = document.createElement('button');
btn.innerHTML = "send"
document.body.appendChild(btn);
btn.onclick = () => {
	swarm.peers.forEach((peer) => {
		data = {"type":"msg", "value":inp.value};
		peer.send(JSON.stringify(data));
	})
}
