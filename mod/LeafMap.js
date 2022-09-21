ACE.mod('LeafMap', function(ace,dft){
	
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
	
	if (!window.L) { return ERR('Leaflet Library not loaded...'); }


	var offline = false;
	
	
	
	return LeafMap;
	
	
	
	function LeafMap(cfg){
		cfg = cfg || '';
		var id = cfg.id || '',
			par = cfg.par || '',
			osm = getTileLayer(),
			modes = cfg.modes || '',
			scaleLoc = cfg.scaleLoc || !0,  // Fix?
			zoomLoc = cfg.zoomLoc || !1,  // Fix?
			zoom = cfg.zoom || 12,
			layers = {},  // All referenced layers currently loaded to the map.
			loc = cfg.loc || [],
			lat = cfg.lat || loc[0] || loc.lat || 0,  // Current central latitude point for displayed map.
			lon = cfg.lon || loc[1] || loc.lon || 0,  // Current central longitude point for displayed map.
			box,  // The cardinal coordinates for the currently displayed bounding box as {n:n,s:s,e:e,w:w}.
			locCirc,  // Used to track current location radius if set.
			locDot,    // Used to display current location if set.
			ini = cfg.ini,
			me = ACI({
				get: {
					clk: getClk,
					map: getMap,  // Returns the raw Leaflet map object
				},
				set: {
					clk: setClk,
					layer: setLayer,
					zoom: setZoom,
					loc: setLoc,
					pop: setPop,
					ctl: setCtl,
				},
				add: {
					clk: addClk,
					layer: addLayer,
					scale: addScale,
					box: addBox,
					circ: addCirc,
				},
				rem: {
					layer: remLayer,
				},
				exe: {
					pop: exePop,
				},
				
			}),
			map = iniMap(id),
			scale = scaleLoc && addScale(scaleLoc),
			popup,  // Reference to a single Leaflet popUp instance used as the primary popup element.
			popDom,  // The dom ACI for the popup content container.
			popMod,  // If a module has been loaded into the popup, this is its ACI. Also the ACI for whatever top-level ele exists.
			popLoc,  // [lat,lon] location of the popup.
			clickMode = cfg.mode || 'dft';  // Dictates map click behavior.
		zoomLoc && setCtl({zoom:{position:zoomLoc}});
		is.fnc(ini, me);
		return me;
		
		
		
		function iniMap(v){
			var tgt = par && (is.dom(par) || is.aci(par) && par.get.v('ele')) || is.str(v,1) || v.tgt || v.id || 'map',  // Fix!  Pull the element and pass directly.
				cfg = {
					zoomControl: !!zoomLoc,  // false,  // Fix?
					attributionControl: false,
					worldCopyJump: true
				},
				// fnc = is.fnc(ini),
				exe;
			loc = lat && lon && [lat,lon] || '';
			map = L.map(tgt, cfg)
				// .on('load',onLoad)
				.fitWorld()
				.addLayer(osm);
			loc && map.setView(loc, zoom);
			map.on('click', onMapClick);
			return map;
			
			function onLoad(){
				
			}//onLoad()
		}//iniMap()
		
		
		function getMap(v){
			return map;
		}//getMap()
		
		
		
	// General related map functionality
		
		
		function getClk(v){
			return is.str(clickMode,1) && clickMode;
		}//getClk()
		
		
		function setClk(v){
			return is.str(v,1) && modes[v] && (clickMode=v);
		}//setClk()
		
		
		function addClk(v){
			var obj = is.obj(v);
			all.snc(obj,function(o){
				
			});
		}//addClk()
		
		
		// Adjust map controls settings
		function setCtl(v){
			if (!is.obj(v)) { return; }
			all.snc(v,function(o){
				var key = o.k,
					val = o.v;
				exeCtl(key,val);
			});
			
			function exeCtl(key,val){
				var fncs = {
					zoom: cfgZoom,
					attr: cfgAttr,
					scale: cfgScale,
				},
				fnc = fncs[key];
				return fnc ? fnc(val) : ERR('Bad cfg key for setCtl('+key+')',v);
				
				function cfgZoom(v){
					// L.control.zoom.setPosition(v);  // Fix? Predefine options?
				}//cfgZoom()
				
				function cfgAttr(v){
					// Fix. Continue.
				}//cfgAttr()
				
				function cfgScale(v){
					addScale(v);
				}//cfgScale()
				
			}//exeCtl()
		}//setCtl()
		
		
		// Handles map click events.
		function onMapClick(e){
			var loc = e.latlng,
				fncs = {
					dft: function(){
						exePop({dat:{loc:loc},loc:loc});  // locMsg(loc);
					},
					
				},
				fnc = modes[clickMode] || fncs[clickMode];
			fnc && fnc(e);
		}//onMapClick()
		
		
		
		
	// Layer related functionality:
		
		
		function addLayer(v){
			var nam = is.str(v,1) || v && v.nam,
				lay = nam && L.featureGroup([]);
			if (!lay) { return ERR('Failed to add layer',v); }
			layers[nam] = lay;  // Fix. Handle duplicate layer names.
			lay.addTo(map);
			lay.bringToFront();  // Fix?
		}//addLayer()
		
		
		function setLayer(v){
			
		}//setLayer()
		
		
		function remLayer(v){
			
		}//remLayer()
		
		
		
	// Scale and zoom functionality
	
		
		// Add mile/km rulers.
		function addScale(v){
			var loc = is.str(v,1) || 'bottomleft',
				res = L.control.scale({
					position: loc
				}).addTo(map);
			return res;
		}//addScale()
		
		
		function setZoom(v,r){
			
		}//setZoom()
		
		
		function setLoc(v,r){
			var lat = v.lat,
				lon = v.lon,
				zoom = v.zoom || 18;
			locCirc && map.removeLayer(locCirc);
			locDot && map.removeLayer(locDot);
			if (!v || !lat || !lon) { return is.fnc(r,''); }
			map.setView([lat, lon], zoom);
			locCirc = addCirc({lat,lon,rad:100,col:'green'});
			locDot = addCirc({lat,lon,rad:2,col:'blue'});
		}//setLoc()
		
	
	// PopUp Functionality
		
		
		
		// Initializes a new pop-up
		function iniPop(v){
			if (popup) { return popup; }
			popup = L.popup();
			popup.setContent('<div id="popup-div"></div>');
			popup.setLatLng(loc);
			popup.openOn(map);
			popDom = DOM('popup-div');
			return popup;
		}//iniPop()
		
		
		// Sets the pop-up functionality to use for the module.
		function setPop(v){
			if (!v) { return exePop(); }
			popup || iniPop();
			var msg = is.str(v,1) || v && v.msg,
				mod = is.obj(v) && is.str(v.mod,1),
				dom = mod && v || is.obj(v.dom) || is.arr(v.dom),
				lat = v.lat,
				lon = v.lon || v.lng,
				loc = is.arr(v) && v.length==2 && v || lat && lon && [lat,lon] || v.loc,
				vis = v.vis,
				hide = is(vis) && !vis || vis=='no' || vis=='hide',
				dat = v.dat || '';
			loc && popup.setLatLng(loc);
			(dom || msg) && setDom();
		    !hide ? popup.openOn(map) : remPop();
			
		    function setDom(){
		    	msg && dom && (dom.lbl = msg);  // Fix.
		    	dom = dom || {lbl:msg};
		    	delete dom.vis;  // Fix?
		    	!is.arr(dom) && (dom.ini = iniDom) || (popMod='');
		    	popDom && popDom.set('dom',dom);
		    }//setDom()
		    
		    function iniDom(m){
		    	popMod && is.fnc(popMod.del,!1);
		    	popMod = m;
		    	// dat && tic(function(){ popMod.set('dat',dat); });  // Fix. Tie to fin()
		    }//iniDom()
		    
		}//setPop()
		
		
		// Launches an existing pop-up, or generates one if needed.
		function exePop(v){
			if (!v) { return map.openPopup(iniPop()); }
			var msg = is.str(v.msg || v, 1),
				dat = v.dat || v.data,
				lat = v.lat,
				lon = v.lon || v.lng,
				pos = v.loc || lat && lon && [lat,lon] || loc;
			if (popMod){
				dat && popMod.set('dat',dat);
				msg && popMod.set('msg',msg);
			}
			popup.setLatLng(pos);
			popup.openOn(map);  // bringToFront();
			popMod.set('par', DOM('popup-div'));  // Refresh in the Leaflet popup forces this.
		}//exePop()
		
		
		// Removes a pop-up if one is currently shown.
		function remPop(v){
			popup.closePopup();
		}//remPop()
		
		
	// General Drawing Utilities
	
	
		function addBox(v){
			v = v || '';
			var arr = is.arr(v) || v.pts,
				col = v.col || v.color || 'blue';
			drawBound(arr,col);
		}//addBox()
		
		
		// Removes every single leaflet-based visual item tracked in UIrefs.lea
		function clearLeaAll(){
			var arr = UIrefs.lea,
				itm = arr.pop();
			clearLea(itm);
		}//clearLeaAll()
		
		
		// Removes any leaflet object from the map.
		function clearLea(itm){
			if (!itm || !itm.lea) { return !1; }
			map.removeLayer(itm.lea);
			delete itm.lea;
		}//clearLea()
		
		
		function drawPoint(point, opt){
			if (!point) { return !1; }
			if (point.lea) {  // Fix?  return point.lea; }  // Don't re-draw if it already has been.
				clearLea(point);
			}
			var loc = point.loc || point,
				lat = loc.lat || loc[0],
				lon = loc.lon || loc.lng || loc[1],
				id = point.id,
				typ = opt && opt.typ || 'loc',
				radius = opt && (opt.rad || opt.radius || opt.dia && opt.dia/2) || 3,
				color = opt && (opt.col || opt.color || 'string'==typeof opt && opt) || 'magenta',
				msg = opt && opt.msg || ('Clicked '+typ+' '+id+', lat '+lat+', lon: '+lon),
				note = opt && opt.note && ('<br>'+opt.note) || '';
			point.lea = L.circleMarker(loc, {
				color: color,
				radius: radius,
			}).addTo(map).on('click', function(){
				window.msg(msg+note);
			});
		}//drawPoint()
		
		
		function drawPath(path, opt){
			if (!path) { return !1; }
			if (path.lea) {  // Fix?  return path.lea; }  // Don't re-draw if it already has been.
				clearLea(path);
			}
			var id = path.id,
				tag = path.tag,
				pts = path.pts,
				nam = path.nam,
				typ = path.typ,
				color = opt && (opt.col || opt.color || 'string'==typeof opt && opt) || 'cyan',
				msg = opt && opt.msg || ('Clicked path '+id+', type '+typ+', Name: '+nam),
				note = opt && opt.note && ('<br>'+opt.note) || '';
			return path.lea = L.polyline(pts, {color:color}).addTo(map).on('click', function(e){
				window.msg(msg+note);
			});
		}//drawPath()
		
		
		function drawBound(pos,pos2, color){
			if ('string'==typeof pos2) { color = color || pos2; pos2 = null; }
			color = color || 'black';
			var bound = !pos2 && pos && pos[0] && pos[1] && pos[0][0] && pos[0][1] && pos[1][0] && pos[1][1] && pos  // Is standard [[n,w],[s,e]] format
				|| pos2 && pos2[0] && pos2[1] && pos && pos[0] && pos[1] && [pos,pos2]  // Is 2 [n,w],[s,e] coords?
				|| pos && pos.n && pos.n && pos.n && pos.n && [[pos.n,pos.w],[pos.s,pos.e]]  // Is {n:n,w:w,s:s,e:e}
				|| pos && pos2 && pos.lat && (pos.lon||pos.lng) && pos2.lat && (pos2.lon||pos2.lng) && [[pos.lat,(pos.lon||pos.lng)],[pos2.lat,(pos2.lon||pos2.lng)]];  // Is {lat:n,lon:w}, {lat:s,lon:e} pair? (also accepts 'lng' reference)
			return L.rectangle(bound, {color: color, weight: 1}).addTo(map);  // .on('click', function(e){
				// console.log(bound);
			// });
		}//drawBound()
		
		
		// Use this to draw a circle on the map.
		function addCirc(v,r){
			if (!v) { return !1; }
			// if (point.lea) {  // Fix?  return point.lea; }  // Don't re-draw if it already has been.
				// clearLea(point);
			// }
			var loc = v.loc || v,
				lat = v.lat || loc.lat || loc[0],
				lon = v.lon || loc.lon || loc.lng || loc[1],
				id = v.id,
				typ = v.typ || 'rad',
				rad = v.rad || 50,  // opt && (opt.rad || opt.radius || opt.dia && opt.dia/2 || 'number'==typeof opt && opt) || 100,  // Fix?
				col = v.col || 'blue',  // opt && (opt.col || opt.color || 'string'==typeof opt && opt) || 'green',
				msg = v.msg || '',  // ('Clicked '+typ+' '+id+', lat '+lat+', lon: '+lon),
				clk = v.clk,
				latLng = lat && lon && [lat,lon],
				opts = {
					color: col,
					weight: 1
				},
				circ = latLng && L.circle(latLng, rad, opts).addTo(map);
			circ && clk && is.fnc(clk) && circ.on('click', clk);
			//msg && circ.on('click', function(){
			//	window.msg(msg);
			//});
			return circ;
		}//addCirc()
		
		
		// Depricated. This is the old function, use addCirc().
		function drawCircle(point, opt){
			if (!point) { return !1; }
			// if (point.lea) {  // Fix?  return point.lea; }  // Don't re-draw if it already has been.
				// clearLea(point);
			// }
			var loc = point.loc || point,
				lat = loc.lat || loc[0],
				lon = loc.lon || loc.lng || loc[1],
				id = point.id,
				typ = opt && opt.typ || 'rad',
				radius = opt && (opt.rad || opt.radius || opt.dia && opt.dia/2 || 'number'==typeof opt && opt) || 100,  // Fix?
				color = opt && (opt.col || opt.color || 'string'==typeof opt && opt) || 'green',
				msg = opt && opt.msg || '',  // ('Clicked '+typ+' '+id+', lat '+lat+', lon: '+lon),
				note = opt && opt.note && ('<br>'+opt.note) || '',
				clk = opt && is.fnc(opt.clk),
				circ = L.circle([lat,lon], radius, {
					color: color,
					weight: 1
				}).addTo(map);
			clk && circ.on('click', clk);
			//msg && circ.on('click', function(){
			//	window.msg(msg+note);
			//});
			return circ;
		}//drawCircle()
		
		
	// Various random utilities:
		
		
		// Opens pop-up message displaying the passed location.
		function locMsg(v){
			var loc = v && v.distanceTo && v || (is.arr(v) && v.length==2 || v.lat && v.lon) && L.latLng(v),
				str = loc && loc.toString && loc.toString(),
				msg = 'This location is at '+str;
			exePop({loc:loc,msg:msg});
		}//locMsg()
	
	
	}//LeafMap()
	
	
	
	function getTileLayer(){
		var dft = '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			local = '/map/tiles/{z}/{x}/{y}.png',
			src = offline && local || dft,
			cfg = {
				maxZoom: offline && 16 || 22,
				maxNativeZoom: offline && 16 || 18,
			},
			res = L.tileLayer(src,cfg);
		return res;
	}//getTileLayer()
	
	
	
	
	
	
	
	
	
	
});