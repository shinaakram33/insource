ACE.mod('Gps', function(ace){
	
	var is = ace.is,
		log = ace.log,
		now = ace.now,
		all = ace.all,
		que = ace.que,
		ext = ace.ext,
		tic = ace.tic,
		utl = ace.get.v('utl'),
		env = ace.get.v('env'),
		DOM = ace.get.v('dom'),
		ACI = ace.get.v('aci'),
		COM = ace.get.v('com'),
		CFG = ace.get.v('cfg');
	
	var geo = navigator.geolocation,
		handlers = [],
		last = '',
		intervalID = null,
		me = ACI({
			get: {
				loc: getPos,
				pos: getPos,
			},
			add: {
				move: addMove,
			},
			exe: {
				follow: trackPos,
				unfollow: stopTracking,
			},
		},Gps);
	
	getPos();
	// setInterval(getPos,700);
	ace.get.gps = getGps;  // Fix.
	
	
	return Gps;
	
	function Gps(cfg){
		cfg = cfg || {};
	}//Gps()
	
	
	function getGps(v,r){
		is.fnc(r||v,me);
		return me;
	}//getGps()
	
	
	function getPos(v,r){
		if (!geo) { return is.fnc(r,''); }
		geo.getCurrentPosition(function(pos){
			var chk = chkPos(pos);
			chk && handlePos(pos,r);
		});
	}//getPos()

	function trackPos(v) {
		stopTracking(); //stop previos trackker first
		intervalID = setInterval(getPos,v);
	}

	function stopTracking() {
		if (intervalID) {
			clearInterval(intervalID);
			intervalID = null;
		}
	}
	
	
	function chkPos(pos){
		// Fix.
		return last = pos;
	}//chkPos()
	
	
	// Adds an event handler for each time handlePos is called.
	function addMove(v){
		is.fnc(v) && handlers.push(v);
	}//addMove()
	
	
	function handlePos(pos,r){
		// log('getPos() ',pos);
		var cor = pos.coords,
			dir = cor.heading,
			spd = cor.speed,
			acc = cor.accuracy,
			lat = cor.latitude,
			lon = cor.longitude,
			altAcc = cor.altitudeAccuracy,
			alt = cor.altitude,
			time = pos.altitude,
			obj = {lat,lon,acc,dir,spd,alt,time,altAcc};
		// log('getPos() ',obj);
		// app && app.set('loc',obj);  // Fix.
		all(handlers,function(o){
			var fnc = is.fnc(o.v);
			fnc && fnc(obj);
		});
		is.fnc(r, obj);
	}//handlePos()
	
});