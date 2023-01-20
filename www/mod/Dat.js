// Client-side module for interacting with data for the app.
ACE.mod('Dat', function(ace){

	var is = window.is = ace.is,
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
		cfg = ace.get.v('cfg');


	var cmds = 'get,set,add,rem,ini,del,exe'.split(','),
		cfgVars = window.aceAppVars || window.svVarsObj || '',  // Fix! Use cfg. {},  // The globally accessible environment vars for the app.
		data = {},  // localStore({cmd:'all'});
		store = iniClient(),
		maxCall = 0,
		aci = ACI({
			get: {
				dat: getData,
				itm: getItm,
				var: getVar,
			},
			set: {
				itm: setItm,
			},
			ini: {
				itm: iniItm,
				maker: iniMaker,
			},
			del: {
				itm: delItm,
			},
		},Dat),
		me;

	var tst = cfg.get('dom',function(v){
		log('tst: ',v);
	});
	
	
	ace.dat = localStore; // this will save data to localstorage
	//console.log('dat',ace)
	ace.get.dat = getData; //// this will get data from server
	ace.get.var = getVar;
	ace.set.var = setVar;
	ace.get.itm = getItm;
	ace.set.itm = setItm;
	ace.ini.itm = iniItm;
	ace.del.itm = delItm;
	
	ace.ini.maker = iniMaker;
	ace.set.maker = setMaker;
	ace.get.widgets = getWidgets;
	ace.set.widget = setWidget;
	ace.ini.widget = iniWidget;
	ace.get.templates = getTemplates;
	ace.set.template = setTemplate;
	ace.ini.template = iniTemplate;
	ace.get.broken = getBroken;
	ace.get.hits = getHits;
	ace.set.email = setEmail;
	ace.set.pass = setPass;
	

	return aci;


	function Dat(v,r){
		log('Called Dat');
	}//Dat()
	
	
	// Initializes a new maker account.
	function iniMaker(v,r){
		v = makerDat();  // v || '';
		log('Initializing Maker.',v);
		ace.exe.call({
			tgt: 'dat',
			cmd: 'ini',
			typ: 'maker',
			dat: v,
		},function(dat){
			log('iniMaker() completed: ',dat);
			is.fnc(r,dat);
		});
		
		function makerDat(){
			var dat = {
				id: '',
				name: '',
				defaults: {
					brandImage: '',
					position: 'center',
					colors: {
						bgc: '',
						itm: '',
						pri: '',
						txt: '',
						top: '',
					},
					affiliteInfo: {
						amazon: '',
						walmart: '',
					},
				},
				info: {
					name: '',
					profileImage: '',
					phone: '',
					company: '',
					instaLink: '',
					youtubeLink: '',
					email: '',
					plan: 'free',
				},
			};
			return dat;
		}//makerDat()
		
	}//iniMaker()
	
	
	// Saves a maker account.
	function setMaker(v,r){
		v = v || '';
		log('setMaker() called.',v);
		ace.exe.call({
			cmd: 'set',
			typ: 'maker',
			dat: v,
		},function(dat){
			log('setMaker() completed: ',dat);
		});
	}//setMaker()
	
	
	// Returns all widgets registered for the logged in user/creator.
	function getWidgets(v,r){
		v = v || '';
		log('getWidgets() called.',v);
		ace.exe.call({
			cmd: 'get',
			typ: 'widgets',
			dat: v,
		},function(dat){
			log('getWidgets() completed: ',dat);
		});
	}//getWidgets()
	
	
	// Saves data to a widget record.
	function setWidget(v,r){
		v = v || '';
		log('setWidget() called.',v);
		ace.exe.call({
			cmd: 'set',
			typ: 'widget',
			dat: v,
		},function(dat){
			log('setWidget() completed: ',dat);
		});
	}//setWidget()
	
	
	// Initializes a new widget record, and returns its object structure with a unique id.
	function iniWidget(v,r){
		v = v || '';
		log('iniWidget() called.',v);
		ace.exe.call({
			cmd: 'ini',
			typ: 'widget',
			dat: v,
		},function(dat){
			log('iniWidget() completed: ',dat);
		});
	}//iniWidget()
	
	
	// Returns all templates registered for the logged in user/creator.
	function getTemplates(v,r){
		v = v || '';
		log('getTemplates() called.',v);
		ace.exe.call({
			cmd: 'get',
			typ: 'templates',
			dat: v,
		},function(dat){
			log('getTemplates() completed: ',dat);
		});
	}//getTemplates()
	
	
	// Saves data to a widget template.
	function setTemplate(v,r){
		v = v || '';
		log('setTemplate() called.',v);
		ace.exe.call({
			cmd: 'set',
			typ: 'template',
			dat: v,
		},function(dat){
			log('setTemplate() completed: ',dat);
		});
	}//setTemplate()
	
	
	// Initializes a new widget template, and returns its object structure with a unique id.
	function iniTemplate(v,r){
		v = v || '';
		log('iniTemplate() called.',v);
		ace.exe.call({
			cmd: 'ini',
			typ: 'template',
			dat: v,
		},function(dat){
			log('iniTemplate() completed: ',dat);
		});
	}//iniTemplate()
	
	
	// Returns all broken links for this maker
	function getBroken(v,r){
		v = v || '';
		log('getBroken() called.',v);
		ace.exe.call({
			cmd: 'get',
			typ: 'broken',
			dat: v,
		},function(dat){
			log('getBroken() completed: ',dat);
		});
	}//getBroken()
	
	
	// Returns all hit data for widgets from this maker
	function getHits(v,r){
		v = v || '';
		log('getHits() called.',v);
		ace.exe.call({
			cmd: 'get',
			typ: 'hits',
			dat: v,
		},function(dat){
			log('getHits() completed: ',dat);
		});
	}//getHits()
	
	
	// Passes new email and authentication data into Auth.
	function setEmail(v,r){
		v = v || '';
		log('setEmail() called.',v);
		ace.exe.call({
			tgt: 'auth',
			cmd: 'set',
			typ: 'email',
			dat: v,
		},function(dat){
			log('setEmail() completed: ',dat);
		});
	}//setEmail()
	
	
	// Passes new password and authentication data into Auth.
	function setPass(v,r){
		v = v || '';
		log('setPass() called.',v);
		ace.exe.call({
			tgt: 'auth',
			cmd: 'set',
			typ: 'pass',
			dat: v,
		},function(dat){
			log('setPass() completed: ',dat);
		});
	}//setPass()
	
	
	// Loads an item from local memory based on its id, or obtains it from the server.
	function getItm(v,r){
		if (!v || !is.str(v)) {
			return log('DAT.getItm() passed no val: ',v);  // Fix. Handle error.
		}
		if (v==='all') { return getAll(); }  // Fix. Conflict with local data referenced as 'all'.
		var aid = v,
			loc = data[aid],
			sto = !is(loc) && store({cmd:'get',key:aid}),
			typ = getTyp(aid),  // !sto && !loc &&  // Fix! Temporary. Should sync from validated src.
			val = typ || loc || sto;  // Fix. typ currently overrides everything.
		log('Called getItm('+v+'):', val);
		is(val) ? complete(val) : getData(aid,complete);

		return val;  // Fix. Return promise.

		function complete(dat){
			data[aid] = dat;
			!is(sto) && store({cmd:'set',key:aid,val:dat});
			is.fnc(r,dat);
			return dat;
		}//complete()

		function getAll(){
			var dat = store({cmd:'get',val:'all'});
			is.fnc(r,dat);
			// Fix. Return promise.
		}//getAll()

	}//getItm()


	function setItm(v,r){
		var dat = is.obj(v),
			aid = dat && dat.aid || '';
		log('Called setItm('+aid+'):', dat);
		if (!dat || !aid) { return; } // Fix. Handle error.
		data[aid] = dat;
		store({cmd:'set',key:aid,val:dat});
		is.fnc(r,dat);  // Fix.
		return dat;
	}//setItm()


	// Grabs the input field value and initializes a new item with its data reflected, clearing the input field and setting focus to it again for a new entry.
	function iniItm(v,r){
		if (!v || !is.obj(v)){
			return; // Fix. Handle.
		}
		var aid = iniAID(),  // Fix? Ever allow to specify aid?
			dat = v;
		dat.aid = aid;
		// log('Called iniItm('+aid+'):', dat);
		data[aid] = dat;
		store({
			cmd: 'ini',
			key: aid,
			val: dat,
		});
		is.fnc(r,aid);
		return aid;  // Fix?
	}//iniItm()


	function delItm(v,r){
		log('Called delItm');
		r(localStore({
			cmd: 'del',
			key: v,
		}));

	}//delItm()


	// Use directly as low-level method to send data to the server.
	function getData(v,r){
		var callId = ''+(++maxCall),
			ini = now(),
			cal = is.obj(v) || {
				val: v,
			};
		cal.hit = ini;  // Fix. getHit();
		// log('getData('+callId+') obtaining data from server...', cal);
		COM.get('dat', cal, function(data){
			if (!is(data) || data==cal || is.fnc(data)) { return }
			var lag = now()-ini,
				bad = data===!1,
				arr = !bad && is.arr(data),
				dat = arr || !bad && data.dat,  // Fix? Enforce protocol. May be better in COM itself.
				ref = !bad && data.ref,
				len = !bad && (arr && arr.length || is.arr(dat) && dat.length || is.obj(dat) && 1) || 0;
			// log('getData('+callId+') Server response ('+lag+' ms)', dat);
			// ref && addRefs(ref);
			is.fnc(r) && r(data);  // Fix. Was dat.  Fully integrate into larger process.
		});
	}//getData()



	// Initializes and returns an instance of this module.
	function iniClient(cfg){
		cfg = cfg || {};
		var src = cfg.src || 'all',
			ref = data[ref] || (data[ref]={}),
			top = ref.top || 1,
			on = cfg.on,
			onDat = on && (is.fnc(on) || is.fnc(on.data || on.dat)),
			ini = is.fnc(cfg.ini || cfg);

		on && onDat && window.addEventListener('storage', function(e){
			var url = e.url,
				arr = url && url.split('://').pop().split('/'),
				len = arr && arr.length,
				src = len>1 && arr[1] || '',
				obj = {
					key: e.key,
					val: e.newValue,
					old: e.oldValue,
					tgt: e.storageArea,
					url: url,
					src: src,
					e: e,
				};
			// log('onStorage onDat() event triggered'+(src?' from '+src:'')+': ', obj);
			onDat(obj,e);  // Fix? Special handlers for various circumstances?
		});

		is.fnc(ini,me || iniCmds() && (me=exe));
		return exe;  // {};  // return me;  // Fix. Currently triggers directly chained callback.

		// The actual executable returned as the module instance.
		function exe(v){
			return v && localStore({
				cmd: v.cmd,
				key: v.key,
				val: v.val,
			});
		}//exe()

		function iniCmds(){
			var len = cmds.length;
			for (var i=0; i<len; i++) {
				iniCmd(cmds[i]);
			}
			return len || !0;

			function iniCmd(cmd){
				exe[cmd] = function(key,val){
					return localStore({
						cmd: cmd,
						key: key,
						val: val,
					});
				};
			}//iniCmd()
		}//iniCmds()
	}//iniClient()


	// Abstraction for the standard localStorage object. Executable function that receives an object with {cmd,key,val} attributes. This should be reliable for non-extension use.
	function localStore(callObj) {
		if (!callObj) { return ''; }  // Fix.  Error handling.
		var cmd = callObj.cmd,
			key = callObj.key,
			val = callObj.val,
			res;
		is.str(callObj) && (cmd='get') && (key=callObj);
		if (cmd=="get") {
			if (val=='all') { return getAll(); }  // Fix? Conflict with data referenced by 'all'. Should prob rely on exe instead.
			res = localStorage.getItem(key);
			if (is.jsn(res)) {
				res = JSON.parse(res);
			}
			return res;
		}
		if (cmd=="set" || cmd=="ini" || cmd=="add") {
			if (is.obj(val)) { val = JSON.stringify(val); }
			localStorage.setItem(key, val);
		}
		if (cmd=="del" || cmd=="rem") {	return localStorage.removeItem(key); }
		if (cmd=="exe" && key=="clr") { return localStorage.clear(); }  // Erases the entire db. Fix. Safety mechanisms?


		// Returns a key-referenced object for all data in local storage.  If key=='arr|key|keys', it will return as an array of all keys stored locally.
		function getAll(){
			var all = localStorage.getItem('all'),
				tblObj = {},
				tblArr = [],
				arr = (key=='arr' || key=='key' || key=='keys'),
				obj = !arr;  // Fix?  val=='obj' || val=='val' || val=='vals';
			if (all && !val) { return all; }  // Fix? Alternate handling?
			for (var ref in localStorage) {
				var str = is.str(localStorage[ref]);
				// log('getAll() ref: '+ref+', typ: '+typ);
				if (str) {
					obj && (tblObj[ref] = getDat(ref));
					arr && tblArr.push(ref);
				}
			}
			return obj && tblObj || arr && tblArr;

			function getDat(ref){
				var res = localStorage.getItem(ref),
					dat = is.jsn(res) && JSON.parse(res);
				return dat || res;
			}//getDat()

		}//getAll()

	}//localStore()

	function getVar(v,r){
		var key = v && is.str(v),
			fnc = is.fnc(r||v),
			val = key && cfgVars[key],
			snc = !fnc || !!val;  // Fix. Check for external load, etc.
		return snc ? res(val) : get();

		function res(v){
			if (!key) { return cfgVars; }   // Fix. Handle securely.
			fnc && fnc(v);
			return v;
		}//res()

		function get(){
			var v = val;  // Fix. Retrieve and handle async cfg items.
			res(v);
			// return nxt;  // Fix. Return promise.
		}//get()

	}//getVar()


	function setVar(v,r){
		if (!k) { return; }
		var obj = is.obj(v),
			key = !obj && is.str(v),
			val;
		obj && (cfgVars=obj);  // Fix!
		return v;
	}//setVar()


	// Checks if the aid represents a registered typ ref, and if so returns its respective data structure.
	function getTyp(v,r){
		var id = v && is.str(v,1),
			types = {  // Fix! Temporary hack.
				
			},  // types
			obj = id && types[id];
		is.fnc(r,obj);
		return obj;
	}//getTyp()


	// Returns AIDs pulled from a queue to be used for new items.
	function iniAID(){
		var aci = ace.get.aid,
			// val = aci(function(v){
			// 	log('ace.get.aid()',v);
			// }),
			aid = randStr();  // Fix. Check for existing AID.
		return aid;
	}//iniAID()


	// Fix. Standardize these:



		function randNum(cfg) {
			cfg = cfg || {};
			var num = is.num(cfg) && cfg,
				max = num || cfg.max || _max,
				min = num ? 0 : (cfg.min || _min);
			return min+Math.floor(Math.random()*(1+max-min));
		}//randNum()


		// Generate random string.
		function randStr(len) {
		  len = len || 30;
		  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",  // Fix?  "0123456789" "!@#$%^&*()-+_={}|[]"
		    max = chars.length,
		    arr = [];
		  if (max && len>0){
		    for (var i=len; i; i--) {
		      arr.push(chars[randNum(max)]);
		    }
		  }
		  return arr.join('');
		}//randStr()




});
