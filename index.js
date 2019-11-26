navigator.mediaDevices.getUserMedia({ video: true, audio : false }).then((stream) => {
	const signalhub = require('signalhub');
	const createSwarm = require('webrtc-swarm');

	const room = prompt("room name = ");

	const hub = signalhub(room, ["https://rtc-saitejahub.herokuapp.com/"]);

	const swarm = createSwarm(hub, { stream:stream });

	var names = {};

	var p = document.createElement('p');
	document.body.appendChild(p);

	swarm.on('peer', (peer,id) => {
		p.innerHTML+= "new connection "+JSON.stringify(id) + "<br>";

		var vid = document.createElement('video');
		document.body.appendChild(vid);
		if ('srcObject' in vid) {
			vid.srcObject = peer.stream;
		  } else {
			// Avoid using this in new browsers, as it is going away.
			vid.src = URL.createObjectURL(peer.stream);
		  }
		vid.play();
		console.log(peer.stream)
		var h1 = document.createElement('h1');
		h1.innerHTML = JSON.stringify(id);
		document.body.appendChild(h1);

		peer.on('data', (data) => {
			data = JSON.parse(data)
			if(data["type"]==="name"){
				names[id] = data["value"]
			} 
			p.innerHTML += names[id] + " : " + data["value"].toString() + "<br>"
		});
	});


	swarm.on('disconnect', (peer,id) => { p.innerHTML+= "disconnect connection "+JSON.stringify(id) + "<br>"; } )

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

	var vidbtn = document.createElement('button');
	vidbtn.innerHTML = 'video';
	document.body.appendChild(vidbtn);
	vidbtn.onclick = () => {
		
	}

});
