
var fs = require('fs');


var top = global,
	dirs = top.dirs || '',
	topDir = dirs.top,
	aceDir = dirs.ace,
	modDir = topDir+'mod/itm/',
	datDir = topDir+'dat/itm/',
	wwwDir = topDir+'www/',
	imgDir = wwwDir+'img/';

var utl = require(topDir+'utl'),
	all = utl.all,
	is = global.is || utl.is,
	now = global.now || utl.now,
	log = global.log || utl.log,
	ext = utl.ext,
	ACI = utl.aci;

// log('@@@@@@@@@@@@@@@ itm.js loaded:',{datDir,topDir,dirs,top});

// var 
var hitDir = datDir+'hit/',
	items = {},
	data = {},  // Used to store data for datMsg()
	keys = {},  // Live reference for all keys.
	servUrl = 'insrc.pro',  // Fix! Automate.
	fromEmail = 'admin@'+servUrl;




var aci = {
		get: {
			itm: getItm,
			all: getAll,
			typ: getTyp,			
		},
		set: {
			itm: setItm,
		},
		add: {
			
		},
		rem: {

		},
		ini: {
			itm: iniItm,
		},
		del: {

		},
		exe: {
			
		},
	},
	me = ACI(aci,ITM),
	on = {};
	me.on = addOn;


log('################### ITM() Loaded! ######################### ');
return module.exports = me;



// Executes call based on obj structure; checks against aci and makes appropriate call if applicable, or returns if none match parameters.
function ITM(v,r){
	log('==> ITM() Called. =====',v);
	if (!v) { return is.fnc(r,''); }  // Fix. Handle.
	var chk = checkData(v),
		cbk = is.fnc(r),
		msg = 'Completed.';

	if (!chk) { return badCall(); }  // Fix. Error handling.
	var hit = v.hit,
		cmd = v.cmd,
		typ = v.typ,
		obj = cmd && aci[cmd],
		fnc = obj && obj[typ],
		dat = dec(v.dat),
		act = v.act;
	
	// dat.hit = hit;  // Fix. Handle this in initial call.
	// processDat(v,r);  // Fix!
	// v.proj && iniProj(v.proj);
	// log('ITM executing: ',{cmd,typ,obj,fnc,dat});
	is.fnc(fnc) ? fnc(dat,r) : badCall();  // Fix. Handle ideally.
	// log('<== ITM() Completed. =====');


	function checkData(dat){
		return dat; // Fix. Handle.
	}//checkData()


	function dec(dat){
		return dat;  // Fix!
	}//dec()


	function badCall(msg,dat){
		log('!!!!!!!!!!!!!!!! ITM() BAD CALL !!!!!!!!!!!!!!',v);  // {cmd,typ,obj,fnc});
		return cbk && cbk('bad call','badCall');  // Fix. Error handling.
	}//badCall()


}//ITM()





function getItm(v,r){
	if (!v) { log('itm.js getItm() received EMPTY v'); return is.fnc(r,''); }
	var tgt = getTgt(v);
	log('itm.js getItm(): ',{v,tgt});
	tgt ? readFile(tgt,(dat)=>{
		log('dat.js getItm('+tgt+') obtained'+(!dat&&' NO'||'')+' data: ',dat);
		is.fnc(r,dat);
	}) : is.fnc(r,'');
}//getItm()


function setItm(v,r){
	if (!v) { log('itm.js setItm() received EMPTY v'); return is.fnc(r,''); }
	var tgt = getTgt(v);
	log('itm.js setItm(): ',{v,tgt});
	tgt ? readFile(tgt,(dat)=>{
		log('dat.js setItm('+tgt+') obtained'+(!dat&&' NO'||'')+' data: ',dat);
		is.fnc(r,dat);
	}) : is.fnc(r,'');
}//setItm()


function iniItm(v,r){
	if (!v) { log('itm.js iniItm() received EMPTY v'); return is.fnc(r,''); }
	var typ = is.str(v.typ || v, 1) || '',
		sub = v.sub || '',
		loc = typ && datDir+typ+(sub&&'/'+sub||'')+'/' || '',  // Fix. Consolidate this functionality in a central function.
		tpl = typ && datDir+'typ/'+typ+'.json' || '',
		ext = v.ext || 'json',
		id = v.id || iniAID(typ,ext),
		tgt = loc + id + (ext ? ('.'+ext) : ''),
		dat = v.dat || '';
	log('itm.js iniItm(): ',{id,typ,loc,tpl,ext,tgt,dat});
	if (!tpl) {
		log('itm.js iniItm() found no tpl for '+typ+'!');  // Fix. Handle.
	}
	readFile(tpl,(obj)=>{
		if (!obj) { log('itm.js iniItm() found no tpl data for '+typ+'!'); }  // Fix. Handle.
		obj = obj || dat || {};
		log('itm.js iniItm('+typ+'): ',{dat,obj});
		dat && all.snc(dat,(o)=>{ obj[o.k]=o.v; });  // Fix? Safety checks?
		obj.id = id;  // Fix?
		log('itm.js iniItm('+typ+') writing new itm to file: '+tgt,obj);
		objToFile(dat,tgt);
	});
	is.fnc(r,id);
	return;  // Fix!
	getAll(loc,(arr)=>{
		log('itm.js iniItm() objects: ',arr);
		is.fnc(r,arr);
	});
}//iniItm()


function getTyp(v,r){
	if (!v) { log('itm.js getTyp() received EMPTY v'); return is.fnc(r,''); }
	var id = is.str(v.id || v, 1) || '',
		typ = is.str(v.typ, 1) || '',
		src = datDir + typ ? (typ+'/') : '';
	is.fnc(r,'');
}//getTyp()


// Synchronous function, standardizes target file for itm parameters.
function getTgt(v){
	if (!v) { log('itm.js getTgt() received EMPTY v'); return ''; }
	var id = is.str(v.id || v, 1) || '',
		typ = is.str(v.typ, 1) || 'itm',  // Fix?
		src = datDir+typ+'/',
		sub = is.str(v.sub) ? v.sub : '',
		loc = src+(sub&&(sub+'/'||'')),
		ext = v.ext || 'json',
		tgt = id && (loc + id + (ext ? ('.'+ext) : '')) || loc;  // Fix?
	log('itm.js getTgt(): ',{id,typ,src,sub,loc,ext,tgt,v});
	return tgt || '';  // Fix? Explore all scenarios
}//getTgt()



// Functions like readFileStr but from only the id.
function getStr(v,r){
	if (!v) { log('itm.js getStr() received EMPTY v'); return is.fnc(r,''); }
	var id = is.str(v.id || v, 1) || '',
		typ = is.str(v.typ, 1) || '',
		src = datDir + typ ? (typ+'/') : '';
	readFileStr(src,r);
}//getTyp()



function getItms(v,r){
	var id = is.str(v.id || v, 1) || '',
		arr = id.split(',');
	all.snc(arr,function(o){

	});
	is.fnc(r,'');
}//getMulti()




// Returns an array of objects representing all of the files in dir tgt
function getAll(v,r){
	if (!v) { return fail('itm.js getAll() received EMPTY v'); }
	var typ = is.str(v.typ,1),
		sub = is.str(v.sub,1),
		tgt = getTgt({typ,sub}),
		dat = [],
		ini = now();
	log('getAll() attempting to load: ',{typ,sub,tgt});
	tgt ? fs.readdir(tgt,(err,arr)=>{
		var cnt = arr && arr.length || 0;
		log('getAll('+tgt+') cnt: '+cnt+', arr: ',arr);
		cnt ? all.snc(arr,(o)=>{
			var num = o.n,
				val = o.v,
				file = tgt+val;
			log('itm.js getAll() reading file: '+file);
			readFile(file,fin);
		}) : fail('Empty dir.');
		
		function fin(obj){
			obj && dat.push(obj) && log('itm.js getAll() fin(): ',obj);  // Fix? Preserve order and number of files?  dat[num] = obj;
			--cnt;
			log('itm.js getAll() cnt: '+cnt);
			cnt || log('itm.js getAll() completed. lag: '+(now()-ini)+'ms.');
			cnt || is.fnc(r,dat);
		}//fin()
		
		function fail(msg){
			log('itm.js getAll() failed. Returning empty string: '+(msg||''),v);
			is.fnc(r,'');
		}//fail()
		
	}) : is.fnc(r,'');
	
}//getAll()






// Fix. Standardize and centralize these:





// Adds event handlers
function addOn(nam,fnc){
	log('itm.js addOn()',{nam,fnc});
	if (is.obj(nam)) { return addOns(nam); }
	if (!nam || !fnc || !is.str(nam) || !is.fnc(fnc)) { return; }
	var arr = on[nam] || (on[nam] = []);
	arr.push(fnc);
	
	function addOns(obj){
		all.snc(obj,function(o){
			var nam = o.k,
				fnc = o.v;
			addOn(nam,fnc);
		});
	}//addOns()
}//addOn()


function exeOn(nam,dat,cbk){
	log('itm.js exeOn()',{nam,dat,cbk});
	if (!nam || !is.str(nam)) { return; }
	var arr = on[nam];
	all.snc(arr,function(o){
		var fnc = o.v;
		fnc(dat,cbk);
	});
}//exeOn()



// Fix. Move into central module, optimize performance using actual database/keystore
function iniAID(typ,ext){
	typ = typ || 'ids';
	ext = ext || '';
	var aid, tgt, 
		ini = now();
	do { 
		aid = randStr(); 
		tgt = datDir+typ+'/'+aid+(ext?('.'+ext):'');
	} while (fs.existsSync(tgt));
	var lag = now() - ini;
	log('itm.js iniAID() lag: '+lag,{aid,tgt,typ});
	// fs.writeFile(tgt,'');  // Fix?
	return aid;
}//iniAID()


// Receives a numeric now() input and returns a time string formatted to EST. If typ is 'time' or 'date', only that segment will be returned.
function strEST(v,typ){
	var ms = v && v!='time' && v!='date' && v || +now(),
		dif = 4,  // Fix. Make dynamic bast on DST if applicable.
		zone = 'America/New_York',  // 'Eastern Time',  // 'EST' // ''
		local = ''+ms+' '+zone,
		calc = ms-3600000*dif,
		str = new Date(calc).toISOString().replace('T',' ').replace('Z',' EST'),
		arr = str.split(' '),
		date = arr[0],
		time = arr[1],
		res = v=='date' && date || v=='time' && time || str;
	// log('strEST',{ms:ms,str:str,arr:arr,date:date,time:time,res:res});
	return res;
}//strEST()


// Saves a data obj as a json string to tgt file location. If opt is set, it defines behavior if a file already exists, or if the path does not exist.
function objToFile(dat,tgt,opt){
	if (!dat || !tgt || !is.str(tgt)){ return log('itm.js objToFile() received bad args',{dat,tgt,opt}); }
	opt = opt || '';
	var bkp = opt=='bkp' || opt.bkp || '',
		msg = opt=='msg' || opt.msg || '',
		jsn = JSON.stringify(dat, null, "\t"),
		tgtIs = fs.existsSync(tgt);
	if (!jsn) {
		// Fix. Handle.
	} else if (tgtIs){
		msg && log('itm.js objToFile() Found existing file: '+tgt);
	}
	msg && log('itm.js objToFile() writing to: '+tgt,dat);
	fs.writeFileSync(tgt, jsn);
}//objToFile()


// Reads a json file asynchronously and calls cbk with the parsed data.
function readFile(tgt,cbk,msg){
	if (!tgt) { return log('itm.js readFile() received EMPTY tgt'); is.fnc(cbk,''); }
	msg && log('itm.js readFile() called.',{tgt,cbk,msg});
	fs.readFile(tgt, (err, str) => {
		msg && log('itm.js fs.readFile() completed.',{err,str});
		if (err) {
			msg && log('itm.js readFile() ERROR: ',err);
			return is.fnc(cbk,'');  // Fix. Actually handle.
		}
	  	var dat = str && JSON.parse(str) || '';  // Fix?
		is.fnc(cbk,dat);
	});
}//readFile()



// Functions like readFile
function readFileStr(tgt,cbk,msg){
	if (!tgt) { return log('itm.js readFileStr() received EMPTY tgt'); is.fnc(cbk,''); }
	msg && log('itm.js readFileStr() called.',{tgt,cbk,msg});
	fs.readFile(tgt, (err, str) => {
		msg && log('itm.js fs.readFileStr() completed.',{err,str});
		if (err) {
			msg && log('itm.js readFileStr() ERROR: ',err);
			return is.fnc(cbk,'');
		}
		var toStr = toString(),
			conc = ''+str,
			obj = {toStr,conc};
		log('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW itm.js readFileStr() obj: ',obj);
		is.fnc(cbk,'');
	});
	
}//readFileStr()



function moveFile(src,tgt,opt,cbk){
	opt = opt || '';
	var bkp = opt=='bkp' || opt.bkp || '',
		msg = opt=='msg' || opt.msg || '',
		srcArr = src && src.split('/'),
		tgtArr = tgt && tgt.split('/'),
		srcNam = srcArr && srcArr.pop(),
		tgtLen = tgtArr && tgtArr.length,
		tgtIs = fs.existsSync(tgt),
		tgtDir = tgtIs && fs.lstatSync(tgt).isDirectory(),
		bkpTgt = tgtIs && bkp && tgt+'_'+now();
	if (tgtDir){
		tgtLen && (!tgtArr[tgtLen-1]) && tgtArr.pop();
		tgtArr.push(srcNam);
		tgt = tgtArr.join('/');
	} else if (tgtIs){
		msg && log('itm.js moveFile() Found existing file: '+tgt);
		msg && bkp && log('itm.js moveFile() Backing up existing file to: '+bkpTgt);
		bkp && fs.rename(tgt, bkpTgt);
		// Fix. Handle other cases.
	}
	msg && log('itm.js moveFile()',{src,tgt});
	return fs.rename(src, tgt, function(err){
		msg && log('itm.js moveFile() COMPLETED.',{src,tgt});
		err && log('ALERT! itm.js moveFile() had issue moving file: ',{src,tgt,err});
		is.fnc(cbk||opt, tgt);
	});
	// return tgt;
}//moveFile()


// Used to relay quick data
function datMsg(dat,tgt){
	tgt = tgt || 'aMsg';
	var file = topDir+'dat/'+tgt+'.jsn';
	objToFile(dat,file);
}//datMsg()


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
