
var util = require('util');
var fs = require('fs');

all.sync=all.snc=function allSync(ent,fnc,mod,cfg){return all(ent,fnc,'snc',mod,cfg);};

var top = global,
	logFiles = {},
	echo = "./log.txt",
	now = top.now = buildTimeNow(),
	is = top.is = _is(),
	tic = top.tic = _tic(),
	rnd = top.rnd = _rnd();

var utl = {
	aci: top.aci = ACI,
	now: now,
	is: is,
	log: top.log = log,
	all: top.all = all,
	tic: tic,
	rnd: rnd,
	err: top.err = ERR,
};


return top.utl = module.exports = utl;  // Fix?  Allow this from here?




// Extremely limited ACI functionality, temporary stand-in until new build fully implemented.
function ACI(aci,tgt){
	tgt = tgt || function(){};
	all.snc('get,set,add,rem,ini,del,exe'.split(','),function(o){
		var cmd = o.v;
		tgt[cmd] = iniCall(cmd) || function badCmd(v,k,b){log('Unregistered command ("'+cmd+'") called: ',{k:k,v:v,b:b});};
	});
	return tgt;
	
	function iniCall(cmd){
		var fncs = aci[cmd];
		all.snc(fncs,function(o){
			var asp = o.k,
				fnc = o.v;
			fnc && (cmdCall[asp] = function AspCall(v,b){
				var cbk = is.fnc(b||v);
				return fnc(v,asp,function(r){ cbk && cbk(r); });
			});
		});
		return cmdCall;
		
		function cmdCall(k,v,b){
			var cbk = is.fnc(b||v||k),
				flp = is.str(v,1),
				key = is.str(k,1) || flp,
				val = v,
				fnc = is.fnc(key && fncs[key] || is.str(v) && fncs[v] || fncs._),  // Fix?
				res = function(v,r){
					return is.fnc(cbk) && cbk(v);
				},
				ok = mod();
			return ok ? fnc(val,res) : res(ERR('No hook defined for this aspect, and no default handler set for the cmd',{k:key,v:val}));
			
			function mod(){
				res.k = key;
				res.v = val;
				return !!is.fnc(fnc);
			}//mod()
			
		}//cmdCall()
		
	}//iniCall()
}//ACI()



// // Shorthand for logging messages.
// function log(msg, obj, tgt) {
// 	tgt = tgt || 'log';
// 	var id = +now(),
// 		time = new Date(id-3600000*4).toISOString().replace('T',' ').replace('Z',' EST');
// 	// v.logs[id] = {msg:msg,obj:obj};
// 	// v.logs._.push(id);
// 	msg = msg || log.caller.name+'()';
// 	if (obj) { obj = util.inspect(obj) || ''; }  // util.inspect(obj)   //  JSON.stringify(obj, null, "\t")   // && is(obj,'obj')
// 	if (tgt=='log') {
// 		console.log("\n["+time+']: "'+msg+'"'+(obj&&', '||''), obj||'');
// 	} else if (chkTgt()) {
// 		tgt
// 	} else {
// 		msgToFile();
// 	}
	
// 	// Writes a simple string to file.
// 	function msgToFile(){
		
// 	}//msgToFile()
	
// 	// Splits a string into a path structure and checks for the directory and file existence.  Returns 0 if the path doesn't exist, 1 if the file exists, or -1 if only the path exists.
// 	function chkTgt(str, ref){
// 		if (!str) { return; }
// 		var arr = str.split('/'),
// 			cnt = arr.length,
// 			chr = str[0],
// 			tgt = ref && fs.existsSync(ref) && ref || chr!='/' && chr!='.' && './' || '';  // Fix?
		
// 	}//chkTgt()
	
// }//log()



// Shorthand for logging messages.
function log(msg, obj, tgt) {
	msg = msg || log.caller.name+'()';
	// obj = obj && !tgt && ('string'==typeof obj) && (obj.indexOf(' ')<0) && (tgt=obj) && (obj='') || obj;  // Fix?
	obj = obj && util.inspect(obj) || ('undefined'!=typeof obj) && ''+obj || '';  //  JSON.stringify(obj, null, "\t")
	tgt = tgt || ('string'==typeof echo) && echo || 'log';
	var id = +now(),
		zone = 'America/New_York',  // 'Eastern Time',  // 'EST' // ''
		local = ''+id+' '+zone,
		calc = id-3600000*5,
		time = new Date(calc).toISOString().replace('T',' ').replace('Z',' EST'),
		str = "\n["+time+']: "'+msg+'"'+(obj&&": \n"+obj||'')+"\n";
	
	if (tgt=='log') {
		console.log(str);
	} else {
		msgToFile();
	}
	
	// Writes a simple string to file.
	function msgToFile(){  // Fix!!! Box this in.  Needs safety checks!
		fs.realpath(tgt, function(err, path){
			if (err) {
				path = err.path;
				var arr = path && path.split('/'),
					dir = arr && arr.length>1 && arr.pop() && arr.join('/');
				// log('File nonexistant, checking for dir...', {path:path,arr:arr,dir:dir,err:err});
				fs.readdir(dir && ('/'+dir) || '', function(err,arr){
					if (err) { return log('ERROR converting tgt path in log() to file: ', {src:tgt,tgt:path,dir:dir,err:err});  }
					getStream();
				});
			} else {
				getStream();
			}
			
			function getStream(){
				// log('getStream('+path+')', logFiles);
				var stream = logFiles[path];
				if (stream) { return appendFile(stream); }
				openFile();
			}//getStream()
			
			function openFile(){
				// log('log() opening file '+path);
				fs.open(path, 'a', 0644, function(err, inst){
					if (err) { return log('ERROR opening tgt file in log(): ', {src:tgt,tgt:path,err:err}); }
					appendFile(logFiles[path]=inst);
				});
			}//openFile()
			
			function appendFile(stream){
				console.log('log() appending stream: ', stream);
				fs.write(stream, str, function(err, bts, buff) {
				    console.log("append file written");
				});
			}//appendFile()
		});
	}//msgToFile()
	
	// Splits a string into a path structure and checks for the directory and file existence.  Returns 0 if the path doesn't exist, 1 if the file exists, or -1 if only the path exists.
	function chkTgt(str, ref){
		if (!str) { return; }
		var arr = str.split('/'),
			cnt = arr.length,
			chr = str[0],
			tgt = ref && fs.existsSync(ref) && ref || chr!='/' && chr!='.' && './' || '';  // Fix?
		
	}//chkTgt()
	
}//log()


// Temporary stand-in for full functionality.
function ERR(msg,dat,cbk){
	cbk = is.fnc(cbk) || '';
	var src = ERR.caller,
		nam = src.name,
		tgt = cbk.name,
		err = {typ:'err',msg:msg,dat:dat,src:src,cbk:cbk};
	log('ERROR: '+msg, {dat:dat,src:src,cbk:cbk});
	log(msg,{msg:msg,dat:dat,src:nam,cbk:tgt},'./err.log');  // Fix.  Use cfg for file location.
	cbk && cbk(err);
	return err;
}//ERR()


// Shorthand for enhanced type comparisons. If typ is set, will perform a check against that type returning TRUE or FALSE for falsey-possible types or the passed value for positive checks of truthy-only types.  If typ is not passed, will check against undefined, or if set will ignore falsey vals unless explicitly called for them. is.typ(val) return its typ, but defaults to the first applicable val in the ref function sequence.
function _is() {
	var aci = {
			add: function(v,k){
				// Fix. Complete.
			}
		},
		f = {
			l: function(v,k){  // Is null?
				return v === null;
			},
			u: function(v,k){  // Is undefined?
				return typeof v == 'undefined';
			},
			s: function(v,k){  // Is string?
				if (typeof v == 'string') {
					var len = v.length;
					if (k) {
						if (!len) { return false; }  // Fix?  If passing k, we assume an empty string should return false.  May want different behavior? Any fringe cases? Check following return vals to ensure no need to return true vs the actual string.
						if (k===!0) {
							return v;  // Fix?
						} else if (f.n(k)) {
							if (k<0) { return len; }  // if k<0, will return v.length;
							return (len >= k) && v;
						} else if (k=='j' || k=='jsn' || k=='json') {  // Only useful as preliminary filter to rule out strings NOT json to avoid exceptions via formal check.
							if (v.charAt(0)!='{'||v.charAt(len-1)!='}') { return false; }  // Fix. Remove whitespace, other chars valid in json?
							return v;  // Fix. Further checks.  Maybe run JSON.parse() within try/catch block?
						} else {
							var a,  // If set, a string of additional chars to allow in the check.
								d,  // If set, a string of specific chars to deny in check.
								n,  // Modifier to allow numbers.
								u,  // Modifier to allow uppercase chars.
								l;  // Modifier to allow lowercase chars.
							if (f.o(k)) {  // If passing a configuration object.
								var min = k.min,
									max = k.max;
								if (min && len<min) { return false; }
								if (max && len>max) { return false; }
								a = k.a || k.allow;  // Fix. Check and convert to best format.
								d = k.d || k.deny;  // Fix. Check and convert to best format.
								k = k.t || k.typ || k.type;  // Fix? Other options?
								// Fix. Other settings.
							}
							if (k=='a'||k=='i') {  // Restrict to alphaNumeric chars.
								l=u=n=1;
							} else if (k=='c') {  // Restrict to alphabet chars.
								l=u=1;
							} else if (k=='u') {  // Restrict to uppercase chars.
								u=1;
							} else if (k=='l') {  // Restrict to lowercase chars.
								l=1;
							} else if (k=='n') {  // Restrict to numeric chars.
								n=1;
							} else if (is.str(k)) {  // If passing a string of restricted characters directly.  // Fix? Best default?
								a = k;
							} else {
								return v;  // Fix! Handling, notification.
							}
							if (l||u||n||d){
								for (var i=len;i--;i) {
									if (checkFilters(v.charCodeAt(i))) { return false; }  // Fix? Keep order? (len-i);
								}
							}
							return v;  // Fix?
						}
					} else {
						return true;  // Fix?  f.n(k) ? !len : true;  // In case we're checking for a string of 0 length.
					}
				}
				return false;
				
				// Checks charCode c against applicable filters.  Returns true if an issue is flagged, false otherwise.
				function checkFilters(c){
					return !(letChk() || numChk() || lowChk() || upChk()) || blkChk();
					function numChk() { return n && (c>47&&c<58); }  // Checks if numeric filter is set and whether c is within correct range if so.
					function lowChk() { return l && (c>96&&c<123); }  // Checks if lowercase filter is set and whether c is within correct range if so.
					function upChk() { return u && (c>64&&c<91); }  // Checks if uppercase filter is set and whether c is within correct range if so.
					function blkChk() { return d && inStr(c,d); }  // Checks if the blocking filter is set and whether c is within that string if so.
					function letChk() { return a && inStr(c,a); }  // Checks if the allow filter is set and whether c is within that string if so.
				}//checkFilters()
				
				// Returns true if charCode chr is contained within str, false otherwise.
				function inStr(chr, str){
					if (!is.str(str)) { return; }  // Fix. Convert to correct format during setup to allow passing d or a as either str or arr vals.
					// Fix? Is more effective to pull from array of charCodes?  str = strToCodes(k);
					chr = String.fromCharCode(chr);  // Fix? Any environment not supporting this?
					return str.indexOf(chr)!=-1;
				}//inStr()
				
			},
			n: function(v,k){  // Is number?
				if (typeof v == 'number') {
					if (k) {
						if (f.n(k)) {
							return (v >= k);  // Fix?
						} else if (f.s(k) && k.indexOf(',')!=-1) {
							return all(k.split(','), function(o){return f.n(v,o.v);}, 'snc', 'all');
						} else if (k=='i' || k=='int') {  // Is integer?
							return !(v%1) && v;  // Fix? Returns 0 for 0.
						} else if (k=='r' || k=='ratio' || k=='f' || k=='float') {  // Is float?
							return !!(v%1) && v;
						} else if (k=='+' || k=='p' || k=='pos') {  // Is positive?
							return v>0 && v;
						} else if (k=='-' || k=='n' || k=='neg') {  // Is negative?
							return v<0 && v;
						} else if (k=='0' || k=='z' || k=='zero') {  // Is zero?  Fix? Is this useful at all?
							return v===0;
						} else {
							// Fix? Other options?
						}
					} else if (!v && k===0) {  // Is zero?  // Fix? Does this really add value?  is.0(v) is longer than v===0...
						return v===0;
					} else {
						return true;
					}
				}
				return false;
			},
			x: function(v,k){  // Is nxt? (promise/deferred/future combination)
				return (v && v.typ=='nxt' && f.f(v.nxt)) && v;  // Fix? Additional checks?  && f.f(v.and)
			},
			k: function(v,k){  // Is ctl? (callback arg/nxt.ctl mechanism)
				return (f.f(v) && f.f(v.nxt) && f.f(v.fin) && f.f(v.err) && f.f(v.msg)) && v;
			},
			b: function(v,k){  // Is boolean?
				if (typeof v == 'boolean') {
					if (k) {
						if (v) {
							return (k=='t' || k=='tru'|| k=='true');
						} else {
							return (k=='f' || k=='fls'|| k=='false');
						}
					} else {
						return true;
					}
				}
				return false;
			},
			f: function(v,k){  // Is function?
				if (k===null) {
					console.log('HEY!');
				}
				return (typeof v == 'function') && ((arguments.length>1) ? v(k) : v);  // If k is set to anything, v will be executed with k as an arg.
			},
			o: function(v,k){  // Is simple object?
				var obj = v && !f.f(v) && !f.a(v) && !f.d(v) && !f.w(v) && (v===Object(v)) && v,  // Fix. Test speed of each step to optimize sequence. Fix? May not catch all cases? Object.getPrototypeOf
					len = 0, i;
				if (!obj || !k) { return obj; }
				for (i in v) { len++; }
				if (k=='l'){  // Fix! Conflicts with keys option.
					debugger;
					log('ALERT! is.obj(v,"l") used!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');  // Fix!
				} else if (f.n(k,'i')){  // If positive int passed as k, will determine if obj.len>=k.
					if (k<0) { return len; }  // If k is neg int, will return obj.len.  // Fix? Useful?
					return len>=k && v || false;
				} else if (f.s(k)){  // If is.str(k), will return the value of v[k];
					return len && v[k];  // Fix? Useful?
				} else {
					return v;  // Fix? If passed bad arg, return false?
				}
			},
			a: function(v,k){  // Is array?
				if (!v) { return !1; }
				var arr, len;
				if (Array.isArray) { 
					arr = Array.isArray(v) && v; 
				} else {
					arr = (Object.prototype.toString.call(v) == '[object Array]') && v;
				}
				if (!arr || (!k && k!==0)) { return arr; }
				len = arr.length;
				if (k=='l') {  // If k=='l', will return false if !v.length.
					return len && v || false;  // Fix. Not ideal.
				} else if (f.n(k,'i')) {  // If is.int(k), will return v if k>0 && v.length>=k.  If k<0, v.length is returned.
					if (k<0) { return len; }  // If k is neg int, will return obj.len.  // Fix? Useful?
					return len>=k && v;
				} else if (f.s(k,'n') && f.n(+k,'i')) {  // If passed an integer as a string, will return the value of that item if it exists in the array.
					return v[k];
				} else if (f.s(k) && k in c) {  // If passing a 3-char typ code, will verify that every element in the array is of that type.
					// Fix. Handle static typed arrays more efficiently.
					var fnc = c[k];
					return all.snc(v, function(o){return fnc(o.v);}, 'all') && v;
				} else {
					return v;  // Fix? If passed bad arg, return false?
				}
			},
			A: function(v,k){  // Is ACE ARR?
				if (!v||!v.get||v.typ!='ARR') { return false; }  // Fix? Further checks?
				len = v.get('len');
				if (k=='l') {  // If k=='l', will return false if !v.length.
					return len && v || false;  // Fix. Not ideal.
				} else if (f.n(k,'i')) {  // If is.int(k), will return v if k>0 && v.length>=k.  If k<0, v.length is returned.
					if (k<0) { return len; }  // If k is neg int, will return obj.len.  // Fix? Useful?
					return len>=k && v;
				} else if (f.s(k,'n') && (k=f.n(+k,'i'))) {  // If passed an integer as a string, will return the value of that item if it exists in the array.
					return v.get(k);
				} else {
					return v;  // Fix? If passed bad arg, return false?
				}
			},
			N: function(v,k){  // Is NDX?
				if (!v||!v.get||v.typ!='ndx') { return false; }  // Fix? Further checks?
				return v;
			},
			d: function(v,k){  // Is DOM element?
				if (!v||!v.nodeType) { return false; }
				return v;  // Fix. Further checks.
			},
			e: function(v,k){  // Is ACE entity?
				if (!v||v.typ!='ent'||!v.is||!v.is('ent')) { return false; }  // Fix? Further checks?
				if (k) { return v.is(k); }
				return v;
			},
			i: function(v,k){  // Is aceID?
				if (!v||!v.indexOf||!v.indexOf('ace')) { return false; }  // Fix. Include alternative formats?
				if (!is.str(v,{t:'a',a:'-_.'})||v.charAt(3)!='_'||v.charAt(3)!='-') { return false; }
				return v;  // Fix. Further checks.
			},
			p: function(v,k){  // Is aceaci?
				if (!f.f(v)||!(v.get||v.set||v.add||v.rem||v.del||v.exe)) { return false; }  // Fix?  v.ini||v['new']||(v.typ!='aci')
				return v;  // Fix? Further checks?
			},
			c: function(v,k){  // Is callObj?
				if (!f.o(v)||v.fnc||!(v.key||v.val||v.cmd||v.tgt||v.src||v.cbk||v.loc)) { return false; }
				return v;  // Fix. Further checks.
			},
			q: function(v,k){  // Is que?
				return v && f.f(v) && (v.typ=='que') && v;  // Fix. Further checks.
			},
			r: function(v,k){  // Is err?
				return v && f.f(v) && (v.typ=='err') && v;  // Fix. Further checks. Include secondary check for native error event?
			},
			w: function(v,k){  // Is window?
				return v && (typeof window!='undefined') && (v==window) && v;
			},
			v: function(v,k){  // Is val?  Used to check for returned value when potential for async response.
				var val;
				return v && f.x(v) && (v.v && is(val=v.v(f.f(k))) && val || is(k,1)) || v;  // Fix? Doesn't really function as other is() items: designed to allow safe handling of ambiguous sync/ansync responses.
			},
			T: function(v,k){  // Is tic() tracker instance?  Fix?
				return v && f.f(v.is,'tic') && v; 
			},
			'$': function(v,k){  // Is jQuery instance?
				return v && (v.typ=='$' || v.jquery) && v;  // Fix? Cover all cases.
			},
			t: function(v,k){  // Explicitly return the 3-char code that represents the typ for v.
				// if (v && v.typ && v.typ.length && v.typ.length==3) { return v.typ; }  // Fix?  Unreliable, potentially unsafe, etc.
				return all(c,function(o){
					if (o.k!='typ' && o.v(v)) { return o.k; }
				}, 'sync', 'first');
			},
			is: function(v,k){
				var val = v && v.is;
				return v && k && f.f(val,k) || v;
			},
			all: function(v,k){
				return v && f.is(v,'all');
			}
		},
		c = {
			nul: f.l,
			not: f.u,
			num: f.n,
			bin: f.b,
			arr: f.a,
			fnc: f.f,
			str: f.s,
			api: f.p,  // Fix? Primitives placed ahead, to trigger first when running typ()
			aci: f.p,
			nxt: f.x,
			ctl: f.k,
			dom: f.d,
			ent: f.e,
			obj: f.o,
			ARR: f.A,
			ndx: f.N,
			aid: f.i,
			cal: f.c,
			win: f.w,
			que: f.q,
			err: f.r,
			val: f.v,
			tic: f.T,
			typ: f.t,
			jsn: function(v){ return f.s(v,'j'); },
			anm: function(v){ return f.s(v,'a'); },
			chr: function(v){ return f.s(v,'c'); },
			tru: function(v){ return f.b(v,'t'); },
			fls: function(v){ return f.b(v,'f'); },
			rat: function(v){ return f.n(v,'r'); },
			'int': function(v){ return f.n(v,'i'); },  // For non-compliant parsers
			pos: function(v){ return f.n(v,'+'); },
			neg: function(v){ return f.n(v,'-'); },
			0: function(v){ return f.n(v,0); }  // Fix? Does this really add value?  is.0(v) is longer than v===0...
		},
		r = {  // Fix. Should remove this, and if really necessary use cfg to obtain.
			'null': f.l,
			'undefined': f.u,
			'function': f.f,
			'string': f.s,
			'number': f.n,
			'boolean': f.b,
			'object': f.o,
			'array': f.a,
			'element': f.d,
			'entity': f.e,
			'aceID': f.i,
			'aceAPI': f.p,
			'callObj': f.c,
			'window': f.w,
			'json': c.jsn,
			'integer': c['int'],
			'rational': c.rat, 'ratio': c.rat,
			'alphaNum': c.anm, 'ascii': c.anm,
			'true': c.tru,
			'false': c.fls,
			'chars': c.chr,
			'jquery': f.$,
			'type': f.t
		};
		
	for (var n in f) { is[n]=f[n]; }  // Allow direct calls, like is.f(v);  // Fix? Could lead to more obscure code?
	for (n in c) { is[n]=c[n]; } // Allow referenced calls, like is.fnc(v);
		// is[n] = function(v,k){  // Fix?  Allows simple object check for typ==n.  Unsafe, and unnecessary overhead?
			// var chk = 
			// c[n]
		// }; 
	// }
	// for (n in r) { is[n]=r[n]; }  // Allow referenced calls, like is.function(v)  // Fix? Clutters object space, loosens standardized calls, and slows performance slightly.
	return is;
	
	// The actual function returned to the module.
	function is(val,typ) {
		if (!typ || typ===1) { return !f.u(val) && (typ===1 && val || !0); }  // || f.t(val); }  // Fix? If val defined, then return its typ. This slows performance, is it really useful? Can call is.typ() directly.
		var s = c[typ] || f[typ] || r[typ];  // Optimize for core functions, then check for refs.
		if (!s) { return log('Bad is[type]() call. typ: "'+typ+'"', val); }  // Fix. Error handling, notification.
		return s(val,typ);  // && (s==f.b&&!0 || val);
	}//is()
	
}//_is()




// Cycles through any iterable object, array, string, ACE entity, dom collection, or number (to emulate basic for loop), executing fnc({k:key,v:val,r:res,c:cur}) on each item. If (cbk||mod||cfg||cfg.cbk)=='sync' it will be iterated synchronously, otherwise the iteration will be sequential but will pass control flow and cycle using the highest precision form of nextTick() available to the environment. Returning false from fnc or setting o.e will break out of the iteration, and returning any other value will pass it into the cbk for the entity if one exists. Modification filters can be passed as mod, accepting a single argument as {k:key,v:val,r:res,p:pre,c:cur,e:end} to track the iteration's key, val, previous, result, and a flexible current val that can be set to anything. The iteration can be forced to stop and return a value by setting o.e. Commonly used filters are available by passing a string specifying predefined behavior like 'first', 'all', 'none', etc.  Scope does NOT change, allowing multiple-nested closures to be utilized and to keep behavior consistent.  If you have a true need to use 'this' in fnc, pass cfg.bind to force the behavior.
function all(ent, fnc, cbk, mod, cfg) {
	cfg = cfgOpts(is.obj(cfg) || is.obj(fnc)&&is.fnc(fnc.fnc)&&fnc || cfg || {});
	fnc = is.fnc(fnc) || is.fnc(cfg.fnc);
	if (!ent || !fnc) { return; }
	mod = mod || cfg.mod || is.str(cbk,1);
	cbk = is.fnc(cbk) || cfg.cbk || cbk;
	var start = now(),
		id = ''+start,  // Fix.  Should be aid.
		str = is.str(cfg),
		cal = all.caller.name && all.caller.name!='allSync' && all.caller.name || all.caller.caller.name,
		nam = (cfg.nam || fnc.name || ent.nam || fnc.name || cal || '_')+'.all',  // Fix?
		sync = (cbk=='snc'||cbk=='sync' || mod=='snc'||mod=='sync' || cfg=='snc'||cfg=='sync' || cfg.snc || cfg.sync),
		async = !sync && endAsync,
		steps = cfg && cfg.stp || 100,  // Initial # steps to try in a batch,
		tics = cfg && cfg.tic || 100,  // Max # of ms between async tics.
		arr = [],  // Fix? May want to implement as que.
		ctl = {},  // The cbk nxt.ctl to be used for process control and error handling.
		num = 0,
		tracker,
		inst,
		len,
		typ,  // = is.obj(ent)&&'obj' || is.arr(ent)&&'arr',  // Fix? inf recursion: is.typ(ent), 
		key, val, res, pre, cur, end, ini;
	checkMod();
	if (is.ndx(ent)&&(typ='ndx')){  // Fix!!! Temporary hack.
		ent = ent.get('ndx');  // Fix.  Other options.
	}
	if ((is.obj(ent)||is.fnc(ent))&&(typ='obj')){  // (typ=='obj') {  // Fix? Any cases where we want to restrict this?
		if (0){  // Object.keys) {  // Fix.  Bypassing to preserve sequence. 
			arr = Object.keys(ent);  // Fix? Impacts iteration order if env implementation sorts the object keys.
		} else {
			for (var p in ent) { arr.push(''+p); }  // Fix. Fine-tune, optimize, add check for non-iterable items?
		}
	} else if ((is.arr(ent)||is.ARR(ent))&&(typ='arr')){  // (typ=='arr') {
		arr = is.arr(ent) && ent || ent.set('mod','all').get('arr');  // Fix?
	} else if (is.str(ent)&&(typ='str')){  // (typ=='ent'){
		arr = ent.split('');
	} else if (is.ent(ent)&&(typ='ent')){  // (typ=='ent'){
		// Fix. Implement this functionality.
	} else if (is.num(ent)&&(typ='num')){  // (typ=='ent'){
		arr = new Array(ent-ent%1);
	} else if (is.que(ent)&&(typ='que')){  // (typ=='ent'){
		arr = ent.get('arr');  // Fix? May want to implement entire sequence via que instead.
	} else if (is.ARR(ent)&&(typ='ARR')){  // (typ=='ent'){
		arr = ent.get('arr');  // Fix? May want to implement entire sequence via ARR instead.
	} else {
		log('all() ERROR: Unrecognized type: ', ent);  // Fix. Handle error, notification, etc.
	}//if
	
	len = arr.length || (end=1) && 0;
	if (sync) {
		while(!end){ nextStep(); }
		return done();
	} else {
		cbk = nxt({fnc:cbk,ctl:ctl,key:'all',nam:nam+'.cbk'});  // Fix. Pass arr and use directly, adding cbk at the end.
		tracker = {  // Fix.  Use nxt() directly.
			stat: function(){ return num/len; },
			time: timeCheck,
			stop: function(){ endAsync(); },
			val: function(){},
			then: then,  // cbk.thn,  // then,
			nxt: cbk.fin,
			is: function(key){return key=='all' && tracker;}
		};
		batchSteps();
		return tracker;
	}//if
	
	// Carries out the next iteration, and updates relevant vars.
	function nextStep(){  // Fix.  Use nxt() directly.
		key = (typ=='obj') && arr[num] || num;
		val = ent[key];
		var obj = {
				k: key,  // Current key.
				v: val,  // Current val.
				r: res,  // Current result if in mod, null if pre-retuned.
				p: pre,  // Previously returned result.
				c: cur,  // Running value.
				o: ent,  // Original target passed to all().
				n: num,  // Number of operations completed. 
				l: len,  // The total number of items in set.
				e: endAll,  // Function that will force quit.
				t: timeCheck  // Function returns ms passed since start.
			};
		obj.r = res = fnc(obj);
		mod(obj);
		ini = !0;
		end || (cur = obj.c);
		pre = cur;
		if (++num>=len && obj.e(cur) || end || res===false) { 
			return async && endAsync() || cur;
		}
	}//nextStep()
	
	// Executes as many steps as will fit within tics, and then cues the next batch.
	function batchSteps(){
		if (end) { return endAsync(); }
		var itr = now(),  // The time that the current iteration was started for async operations.
			lapse;
		do {
			nextStep();
			lapse = now() - itr;
		} while (lapse<tics);  // Fix. Implement steps to avoid over-use of now(), adjust steps based on single time comparison per batch.
		tics && (inst=tic(batchSteps));
	}
	
	// Returns the number of milliseconds passed since initial execution of this all() set.
	function timeCheck(){ return now() - start; }
	
	// Closes out the async iteration loop and updates the tracking object.
	function endAsync(){
		tics = 0;
		var time = timeCheck();
		tracker.time = function(){ return time; }
		tracker.val = function(){ return cur; }
		inst = inst && inst.stop && inst.stop();
		ctl.fin(done()||'done','all');  // cbk && cbk.ctl.nxt(cur, 'all');  // {val:cur,key:'all',nam:nam});  // Fix?
	}//endAsync()
	
	// performs any final cleanup necessary and returns cur.
	function done(){
		var len = cbk && cbk.get && cbk.get('len');
		if (echo && cbk.get && typ=='arr') {  // Fix!
			if (is.ARR(ent)) { ent.set('mod',!1); }  // Fix? ARR protected from modification until done() called.
		}
		len && log(nam+'.done() cur:', cur);
		return cur;
	}
	
	// If called, will exit the iteration with the value passed into it.
	function endAll(endVal){
		end = 1;
		return cur = arguments.length ? endVal : cur;  // Fix?
	}//endAll()
	
	// Allows inclusion in promise chains.
	function then(fnc, err){  // Fix. Using nxt(), should no longer be necessary.
		return cbk && cbk.thn(fnc,err,cur);
		// if (fnc && is.fnc(fnc.then) || is.fnc(fnc)) {
			// log('Calling all().then()', fnc);
			// var cfg = {typ:'thn'},
				// obj = {fnc:fnc,val:cur,err:err,key:'thn',nam:'all',cfg:cfg,mod:man},
				// nxt = cbk && cbk.nxt(obj) || (cbk=nxt(obj));
			// if (end || num>=len) { ctl.fin(); }
			// return nxt;
		// } else {
			// log('Bad function passed into all().then()', fnc);
		// }
	}//then()
	
	// Applies any additional cfg options that are available.
	function cfgOpts(cfg){
		return cfg;  // Fix. Handle other options.
	}//cfgOpts()
	
	// Modifies iteration behavior and allows adjustment of final return value via o.e().
	function checkMod() {
		var v,  // Just a placeholder var to allow running vals.
			mods = {
			first: function(o){
				o.r && o.e(o.r);
			},
			last: function(o){
				o.r && (o.c=o.r);  // Fix? Flip array and return first would be more efficient.
			},
			none: function(o){
				o.r && o.e(!1);
			},
			all: function(o){
				o.r || o.e(!1);
			},
			any: function(o){
				o.r && o.e(!0);
			},
			arr: function(o){  // Stores the results of fnc to a flat array.
				o.c = o.c || [];
				o.r===!1 || o.c.push(o.r);
			},
			map: function(o){  // Maps the keys of the originally passed obj to the result of fnc for each.
				o.c = o.c || {};
				o.c[o.k] = o.r;
			},
			filter: function(o){  // Filters any values !== false and translates them into a copy of the original obj or arr
				o.n || (v = is.arr(o.o) && (o.c=[]) && 'arr' || (o.c={}) && 0);
				o.r===!1 || (v && o.c.push(o.v) || (o.c[o.k]=o.v));
			},
			cpy: function(o){  // Maps the keys of the originally passed obj to the result of fnc for each.
				o.c = o.c || is.arr(o.e) && (v='arr') && [] || {};
				o.c[o.k] = ext(o.v,'cpy');
			},
			val: function(o){  // Returns the val for the first item that fnc returns false for, or false if none do.
				o.c = !1;  // o.v;
				(o.r === false) && o.e(o.v);
			},
			key: function(o){  // Returns the key for the first item that fnc returns false for, or false if none do.
				o.c = !1;  // o.k;
				(o.r === false) && o.e(o.k);
			},
			cnt: function(o){ o.e(o.l); },  // o.c = (o.n||is.arr(o.o)&&o.e(o.o.length))+1; },  // Returns the # of items.
			cur: function(){}  // Simply returns o.c on completion of all items in set.
		};
		mod = is.fnc(mod) || is.str(mod) && mods[mod] || mods.cur;  // Fix? Establish best return val protocol.
		// cfg.bind && (mod = function(obj){
			// var o = {k:key,v:val,r:res,c:cur};  // Allows external secondary updating of scope vars.
			// o.key=o.k; o.val=o.v; o.res=o.r; o.cur=o.c; // Fix? May not want this flexibility of references?
			// return modFnc(o);  // modFnc.call(o)  // Fix. Could also execute in the scope of o.v, or even obj to make vars accessible as this.v, etc.
		// });
	}//checkMod()
}//all()




// Used as a universal alternative to setImmediate(), returns control flow to the main event loop, allowing processing to be carried out across extended periods without blocking other processes or locking up screen updates, I/O, etc.
function _tic(cfg) {
	var pref = top.setImmediate && 'imm'
			|| checkPostMsg() && 'msg'
			|| top.requestAnimationFrame && 'ani'
			|| checkMsgChan() && 'chn'
			|| checkScript() && 'scr'
			|| top.setTimeout && 'out',
		fncs = {
			imm: function(cbk){ return top.setImmediate(cbk); },
			ani: top.requestAnimationFrame,  // aniFrame,
			msg: postMsg,  // function(cbk){ return postMsg(cbk); },
			chn: msgChan,
			scr: scriptState,
			out: function(cbk){ return top.setTimeout(cbk, 0); }
		},
		fixed = 0,
		ids = {},  // If multimple calls should be sequenced. Fix. Include checks for stale ids.
		exe = fncs[pref],
		tic = function tick(fnc, opt) {
			if (!is.fnc(fnc)) { return; }
			var args = opt && opt.arg,
				cbk = function(){
					tracker.stat = function(){ return 'completed'; };
					inst = null;  // inst.stop && inst.stop();
					fnc(args);
				},
				inst = exe(cbk),
				tracker = {
					stop: function(){
						var fncs = {
							imm: function(){ clearImmediate(inst); },
							ani: function(){ cancelAnimationFrame(inst); },
							out: function(){ clearTimeout(inst); },
							oth: function(){ inst&&inst.stop(); }
						},
						cancel = fncs[pref] || fncs.oth;
						if (is.fnc(cancel)) {
							inst = cancel();
							tracker.stat = function(){ return 'cancelled'; }
						}//if
					},
					typ: function(){
						return ''+pref;
					},
					stat: function(){
						return 'pending';
					},
					is: function(v){
						return (v=='tic') && tracker;
					}
				};
			return tracker;  // Fix! Return nxt() object;
		};
	// log('tic() using '+pref);
	return tic;
	
	function postMsg(cbk){
		if (!is.fnc(cbk)) { return; }
		var str = 'tic_'+now();  // Fix. Use numeric key for simple comparison, and include check to remove stale ids from que.
		ids[str] = cbk;
		fixed++ || (top.addEventListener ? top.addEventListener("message", getMsg, !1) : top.attachEvent("onmessage", getMsg));  // Attach the correct event listener 
		top.postMessage(str, "*");
		return { stop:delMsg };
		
		function getMsg(e){
			var dat = e.data,
				fnc = dat && (e.source===top) && delMsg(dat);
			return fnc && fnc();
		}//getMsg()
		
	}//postMsg()
	
	function delMsg(id){
		var fnc = ids[id];
		delete ids[id];
		return fnc;
	}//delMsg()
	
	// Checks for async behavior in window.postMessage()
	function checkPostMsg(){
		var postTest = 1,
			onMsg = top.onmessage;
		if (top.postMessage && !top.importScripts) {
			top.onmessage = function() { postTest = 0; };
			top.postMessage("", "*");
			top.onmessage = onMsg;
			return postTest;
		}
	}//checkPostMsg()
	
	function scriptState(){
		
	}//scriptState()
	
	function checkScript(){
		
	}//checkScript()
	
	function msgChan(){
		
	}//msgChan()
	
	function checkMsgChan(){
		
	}//checkMsgChan()
	
}//_tic()



// Generates a more accurate shorthand for Date.now() as now(typ), with additional features specified using typ;
function buildTimeNow(defaultTyp) {
	return newBaseTime;  // Fix.
	defaultTyp = defaultTyp || 'era';
	var baseTime = serverStartTime || newBaseTime(),
		getTime = getTimeFunc(),
		offset = getOffset(),
		types = {
			per: function(m,v){ return m; },  // No mod, return performance.now()
			now: function(m,v){ return baseTime+m-m%1; },  // Emulate Date.now()
			era: function(m,v){ return m-1356048000000; },  // For Mayan cycle ref.
			str: function(m,v){ return ''+(m+baseTime); },  // Human-readable string.  Fix! Allow output customization.
		};
	
	return function now(prec, typ) {
		var micro = getTime();
		micro = typ && (typ in types) && types[typ](micro) || micro;
		prec = prec && (prec>1) && (prec<=5) && prec%1 || 1;
		return prec;
	}//now()
	
	function getTimeFunc() {
		return process && process.hrtime && procFunc
			|| performance && ( performance.now
				|| performance.webkitNow
				|| performance.msNow
				|| performance.oNow
				|| performance.mozNow
			) || dateFunc;
		
		function procFunc() {
			var time = process.hrtime();
			return (offset||0) + proc[0]*1e3 + proc[1]/1e3;
		}//procFunc()
		
		function dateFunc(){ return newBaseTime()-baseTime; }//dateFunc()
	}//getTime()
	
	function getOffset() { return baseTime-getTime(); }//getOffset()
	function newBaseTime() { return+new Date(); }//newBaseTime()
}//buildTimeNow()



// Returns various kinds of random values
function _rnd(cfg) {
	cfg = cfg || '';
	var types = {
			str: randStr,
			num: randNum
		},
		_alpha = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
		_num = "0123456789",
		_exp = "!@#\$%^&*()-+_={}|[]",
		_oth = "~:;<,>.",  // Fix. Include all printable utf16 chars.
		_bad = "`'\"\\",  // Potentially problematic chars.
		_opt = {
			all: [_alpha,_num,_exp,_oth],
			every: [_alpha,_num,_exp,_oth,_bad],
			alpha: [_alpha],
			num: [_num],
			anum: [_alpha,_num],
		},
		_ch = cfg.chars || cfg.ch || 'alpha',  // 'all',  // Fix? Best default?
		_arr = _ch && _opt[_ch],
		_chars = _arr && _arr.shift(' ') && _arr.join('') || _alpha,  // Fix? Inserting space as loc 0 as offset.
		_typ = is.str(cfg) && cfg || cfg && cfg.typ || 'str',
		_len = cfg && cfg.len || 10,
		_max = cfg && cfg.max || 1,
		_min = cfg && cfg.min || 0;
		
	rnd.num = randNum;
	rnd.str = randStr;
	return rnd;
	
	// The actual function returned for the tool.
	function rnd(typ, cfg) {
		var str = is.str(typ,1),
			obj = is.obj(typ),
			fnc = types[str||obj&&obj.typ||_typ];
		return is.fnc(fnc) && fnc(cfg||typ);
	}
	
	// Generate random number.
	function randNum(cfg) {
		cfg = cfg || {};
		var num = is.num(cfg) && cfg,
			max = num || cfg.max || _max,
			min = num ? 0 : (cfg.min || _min);
		return min+Math.floor(Math.random()*(1+max-min));  // Fix? Never hits 0
	}//randNum()
	
	// Generate random string.
	function randStr(cfg) {
		var ini = now(),
			len = cfg && (is.num(cfg,1) && cfg || cfg.len) || _len,
			ch = cfg && (cfg.chars || cfg.ch),
			chars = ch && _opt[ch] || _chars,
			max = is.str(chars) && chars.length-1,
			arr = [];
		// var nums = [], num;
		if (max && len>0){ for (var i=len; i; i--) { arr.push(chars[num=randNum(max)]); } }  // nums.push(num);  } }
		// all.snc(arr,function(o){
		// 	var k = o.k,
		// 		v = nums[k],
		// 		c = chars[v];
		// 	!o.v && (arr[k]=' ') && log('Bad char at loc '+k+', char '+v+' ("'+c+'")');
		// });
		// var str = arr.join(''),
		// 	fin = now(),
		// 	lag = fin-ini;
		// log('randStr('+len+') took '+lag+' ms. ('+fin+'-'+ini+')',{nums:nums.join(','),str:str,chars:chars});
		return arr.join('');  // str;
	}//randStr()
}//_rnd()







/*

var util = require('util');


exports.log = log;
exports.is = _is();
var now = exports.now = buildTimeNow();
global.utl = exports;



// Quick hack until transitioned.
function _is(){
	var fncs = 'fnc,str,obj,arr'.split(','),
		len = fncs.length;
	for (var i=0; i<len; i++){ addFnc(fncs[i]); }
	return is;
	
	function addFnc(nam){
		is[nam] = function(v){ 
			return is(v,nam); 
		};
	}//addFnc()
}//_is()


// Shorthand for type comparisons. If typ is set, will return TRUE or FALSE against that type, or will check against undefined if typ is not passed.
function is(val,typ) {
	if (!typ) { return (typeof val != 'undefined'); }
	if (typ=='fnc'||typ=='function') { return (typeof val == 'function'); }
	if (typ=='str'||typ=='string') { return (typeof val == 'string'); }
	if (typ=='obj'||typ=='object') { return (val === Object(val)); }
	if (typ=='arr'||typ=='array') { 
		if (Array.isArray) { return Array.isArray(val); }
		return Object.prototype.toString.call(val) == '[object Array]';
	}
}//is()


// Generates a more accurate shorthand for Date.now() as now(typ), with additional features specified using typ;
function buildTimeNow(defaultTyp) {
	return newBaseTime;  // Fix.
	defaultTyp = defaultTyp || 'era';
	var baseTime = serverStartTime || newBaseTime(),
		getTime = getTimeFunc(),
		offset = getOffset(),
		types = {
			era: function(m){ return m-1356048000000 }  // For Mayan cycle ref.
		};
	
	return function now(prec, typ) {
		var micro = getTime();
		micro = typ && (typ in types) && types[typ](micro) || micro;
		prec = prec && (prec>1) && (prec<=5) && prec%1 || 1;
		return prec;
	}//now()
	
	function getTimeFunc() {
		return process && process.hrtime && procFunc
			|| performance && ( performance.now
				|| performance.webkitNow
				|| performance.msNow
				|| performance.oNow
				|| performance.mozNow
			) || dateFunc;
		
		function procFunc() {
			var time = process.hrtime();
			return (offset||0) + proc[0]*1e3 + proc[1]/1e3;
		}//procFunc()
		
		function dateFunc(){ return newBaseTime()-baseTime; }//dateFunc()
	}//getTime()
	
	function getOffset() { return baseTime-getTime(); }//getOffset()
	function newBaseTime() { return+new Date(); }//newBaseTime()
}//buildTimeNow()



// Shorthand for logging messages.
function log(msg, obj, tgt) {
	tgt = tgt || 'log';
	var id = +now(),
		time = new Date(id-3600000*4).toISOString().replace('T',' ').replace('Z',' EST');
	// v.logs[id] = {msg:msg,obj:obj};
	// v.logs._.push(id);
	msg = msg || log.caller.name+'()';
	if (obj && !is.str(obj) && is(obj,'obj')) { obj = util.inspect(obj) || ''; }  // util.inspect  //  JSON.stringify
	if (tgt=='log') {
		console.log("\n["+time+']: "'+msg+'"'+(obj&&', '||''), obj||'');
	} else if (chkTgt()) {
		tgt
	} else {
		msgToFile();
	}
	
	// Writes a simple string to file.
	function msgToFile(){
		
	}//msgToFile()
	
	// Splits a string into a path structure and checks for the directory and file existence.  Returns 0 if the path doesn't exist, 1 if the file exists, or -1 if only the path exists.
	function chkTgt(str, ref){
		if (!str) { return; }
		var arr = str.split('/'),
			cnt = arr.length,
			chr = str[0],
			tgt = ref && fs.existsSync(ref) && ref || chr!='/' && chr!='.' && './' || '';  // Fix?
		
	}//chkTgt()
	
}//log()


*/
