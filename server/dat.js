
var fs = require('fs');
var Jimp = require('jimp');


var utl = require('./utl'),
	all = utl.all,
	is = global.is || utl.is,
	now = global.now || utl.now,
	log = global.log || utl.log,
	ext = utl.ext,
	ACI = utl.aci;

var top = global,
	dirs = top.dirs || '',
	topDir = dirs.top,
	aceDir = dirs.ace,
	modDir = topDir+'mod/',
	datDir = topDir+'dat/',
	wwwDir = dirs.www,
	idsDir = dirs.ids;

var STRIPE = require(modDir + 'stripe-implementation');

var hitDir = datDir+'hit/',
	items = {},
	data = {};  // Used to store data for datMsg()

	var aci = ACI({
		get: {
			widgets: getWidgets,
			user: getUsr,
			maker: getUsr,
			itm: getItm,
		},
		set: {

		},
		add: {
			hit: addHit,
			proj: addProj,
			itm: addItm,
			cart: addHit,
			tab: addHit,
		},
		rem: {

		},
		ini: {
			hit: iniHit,
			proj: addProj,
			itm: addItm,
			maker: iniMaker,
			prod: iniProd,
			
		},
		del: {

		},
		exe: {
			hit: finHit,
			img: processImages,
			hits: archiveHits,
			// dat: exeDat,
		},
	},DAT);


module.exports = aci;


var ITM = require(modDir+'itm');


return aci;



// A factory for generating new DAT instances with standardized interface.
function DAT(dat, cbk){
	log('################### DAT() Called! #########################');
	var chk = checkData(dat),
		msg = 'Completed.';
	// log('DAT executing: ',dat);
	processDat(dat,cbk);
	// is.fnc(cbk,msg);

	function checkData(dat){
		return dat; // Fix. Handle.
	}//checkData()
}//DAT()


function processDat(obj,cbk){
	if (!obj) { return log('processDat() No object passed!',obj); }

	// return;  // Fix.
	items = {};
	all.snc(obj,function(o){  // Fix. Make async.
		var key = o.k,
			val = o.v;
		addProj(val);
	});
	objToFile(items, topDir+'dat/images.json');
	processImages(items,cbk);
	// datMsg(data);
}//processDat()



function getItm(v,r){
	ITM.get('itm',v,r);
}//getItm()



// Adds a js file with the project hash, to load as widget.
function addProj(dat){
	if (!dat) { return log('addProj() received empty data: ',dat); }
	var tgt = topDir+'dat/',
		src = tgt+'src/',
		hash = dat.hash,
		itms = dat.dat,
		file = src+hash+'.jsn',
		jsn = JSON.stringify(dat, null, "\t"),
		pre = fs.readFileSync(src+'pre.txt'),  // Fix. Make async.
		aft = fs.readFileSync(src+'aft.txt'),  // Fix. Make async.
		fnc = [pre,jsn,aft].join(''),
		code = tgt+hash+'.js';
	log('Writing data to '+file,jsn);
	// log('Writing FUNCTION to '+code,fnc);
	fs.writeFileSync(file, jsn);  // Fix. Make async.
	fs.writeFileSync(code, fnc);  // Fix. Make async.
	all.snc(itms,function(o){  // Fix. Make async.
		addItm(o.v);
	});
}//addProj()


// Adds an individual item record
function addItm(dat){
	// return log('addItm() data: ',dat); 
	if (!dat) { return log('addItm() received empty data: ',dat); }
	var id = dat.id,
		imgSrc = dat.imgSrc;
	if (!id || !imgSrc) { return log('addItm() missing img data: ',dat); }
	var tgt = topDir+'dat/itm/',
		img = id+'.png',
		thumb = id+'_small.png',
		file = tgt+id+'.jsn',
		imgUrl = dat.imgTgt,
		jsn = JSON.stringify(dat, null, "\t");
	log('addItm() Writing to '+file,jsn);  // Fix.
	fs.writeFileSync(file, jsn);  // Fix. Make async.
	addImg(id,imgSrc,imgUrl);
}//addItm()


// Creates a maker account/file structure and associates it to a usr.
function iniMaker(v,r){
	log('@@@@@@@@@@@@@@@@@@@@@@@@ dat.js iniMaker() called: ',v)
	var sess = v.sess || '',  // Fix?
		usr = sess.usr || '',
		dat = v.dat,
		tgt = usr && datDir+'itm/maker/'+usr+'.json', 
		tpl = datDir+'maker/tpl.json';

		//STRIPE.ini('customer', v, ()); 
	return ITM.ini.itm({id:usr,typ:'maker'},r);   // Using itm for the low-level handling.
	
	log('dat.js iniMaker() opening: ',v)
	if (!usr || fs.existsSync(tgt)) {  // Fix? May be better to just open async and check via that.
		usr ? log('dat.js iniMaker() this maker already exists: '+tgt) : log('dat.js iniMaker() received no usr hash: ',v);
		return is.fnc(r,''); 
	}
	var obj = {
		
	};
	log('dat.js iniMaker() initializing maker to: '+tgt,dat);
	objToFile(dat, tgt);
	is.fnc(r,dat);
}//iniMaker()


// Initialize a single product unique to a specific vendor.
function iniProd(v,r){
	var merchs = {
			amazon: 1,
			walmart: 1,
			shopify: 1,
		},
		merch = v.merch || v.merchant,
		ok = merch && merchs[merch];
	if (!ok) { 
		log('dat.js iniProd() received invalid merch: ',v)
		return is.fnc(r,''); 
	}
	var id = v.id,
		tgt = datDir+'product/'+merch+'/',
		chk = fs.existsSync(tgt);
	if (chk) {  
		log('dat.js iniProd() id '+id+' already exists.',v);  // Fix. Handle.
	}
	objToFile(v,tgt);
	is.fnc(r,v);
}//iniProd()



// Returns user data for a user id.
function getUsr(v,r){
	var usr = v && is.str(v.usr || v, 1) || '',
		ini = now(),
		data;
	if (!usr) { return fail(); }
	log('dat.js getUsr()',{v,usr});
	ITM.get.itm({
		typ: 'maker',
		id: usr,
	},(dat)=>{
		if (!dat) { return fail(); }
		data = dat;
		log('dat.js getUsr('+usr+') obtained data: ',data);
		getWidgets(usr,(dat)=>{
			var len = dat && dat.length || 0;
			log('dat.js getUsr() getWidgets() obtained '+len+' widgets: ',dat);
			dat = dat || [];
			data.widgets = dat;
			data.templates && handle();
		});
		getTemplates(usr,(dat)=>{
			var len = dat && dat.length || 0;
			log('dat.js getUsr() getWidgets() obtained '+len+' templates: ',dat);
			dat = dat || [];
			data.templates = dat;
			data.widgets && handle();
		});
	});
	
	function handle(){
		var lag = now()-ini;
		log('dat.js getUsr('+usr+') handle() took '+lag+'ms. Returning maker data: ',data);
		is.fnc(r,data);
	}//handle()
	
	function fail(){
		log('dat.js getUsr('+(usr||'EMPTY')+') handle() returning empty string.');
		is.fnc(r,'');
	}//fail()
	
	return;
	
	var data = {
		usr: {
			name: 'Adam Smith',
			profileImage: 'img/profile-1.png',
			phone: '+91234567890',
			company: 'Shared Vision',
			instaLink: 'instagram.com/',
			youtubeLink: 'youtube.com/',
			email: 'adam@gmail.com',
			plan: 'free',
		},
		widgets: [
			{
				id: '0',
				widgetName: 'Test Widget 1',
				brandImage: '',
				position: 'center',
				colors: {
					bgc: 'red',
					itm: 'blue',
					pri: '',
					txt: '',
					top: '',
				},
				useImageAsDefault: false,
				useColorsAsDefault: false,
				affiliteInfo: {
					amazon: '',
					walmart: '',
					applyIds: false,
				},
				sections: [
					{
						sectionName: 'materials',
						products: [
							{
								id: randStr(),
								link: 'link1',
								name: 'product1',
								broken: false,
							},
							{
								id: randStr(),
								name: 'Hammer',
								merchant: 'Amazon',
								link:
								'https://www.amazon.es/Dodot-Aqua-Pure-Toallitas-Paquetes/dp/B07NW6WMGD?ref_=Oct_d_obs_d_1862264031&pd_rd_w=dkCLh&content-id=amzn1.sym.0cde40b7-98fa-4b31-a03b-17a732646b9b&pf_rd_p=0cde40b7-98fa-4b31-a03b-17a732646b9b&pf_rd_r=ZMP2WT55A26KDPX6XDFW&pd_rd_wg=d5nLb&pd_rd_r=9b9fbda8-8cde-4010-b846-a851adb60e6e&pd_rd_i=B07NW6WMGD',
								posts: 10,
								price: '',
								broken: true,
							},
						],
					},
					{
						sectionName: 'products',
						products: [
							{
								id: randStr(),
								link: 'linkz',
								name: 'product',
								broken: false,
							},
							{
								id: randStr(),
								name: 'Hammer',
								merchant: 'Amazon',
								link:
								'https://www.amazon.es/Dodot-Aqua-Pure-Toallitas-Paquetes/dp/B07NW6WMGD?ref_=Oct_d_obs_d_1862264031&pd_rd_w=dkCLh&content-id=amzn1.sym.0cde40b7-98fa-4b31-a03b-17a732646b9b&pf_rd_p=0cde40b7-98fa-4b31-a03b-17a732646b9b&pf_rd_r=ZMP2WT55A26KDPX6XDFW&pd_rd_wg=d5nLb&pd_rd_r=9b9fbda8-8cde-4010-b846-a851adb60e6e&pd_rd_i=B07NW6WMGD',
								posts: 10,
								price: '',
								broken: true,
							},
						],
					},
				],
				quickLink: 'https://widget.sharedvision.com/669768748 h=da3300dea1&badge=0&autopause=0&player_id=0&app_id=58479',
				embedCode: '<div style="padding:54.52% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/669768748?h=da3300dea1&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Behance"></iframe></div><script src="https://player.vimeo.com/api/player.js"/>',
			},
			{
				id: '1',
				widgetName: 'Test Widget 2',
				brandImage: '',
				position: 'center',
				colors: {
					bgc: 'red',
					itm: 'blue',
					pri: '',
					txt: '',
					top: '',
				},
				useImageAsDefault: false,
				useColorsAsDefault: false,
				affiliteInfo: {
					amazon: '',
					walmart: '',
					applyIds: false,
				},
				sections: [
					{
						sectionName: 'materials',
						products: [
							{
								id: '',
								link: 'link1',
								name: 'product1',
							},
						],
					},
					{
						sectionName: 'products',
						products: [
							{
								id: '',
								link: 'linkz',
								name: 'product',
							},
						],
					},
				],
				quickLink: 'https://widget.sharedvision.com/669768748 h=da3300dea1&badge=0&autopause=0&player_id=0&app_id=58479',
				embedCode: '<div style="padding:54.52% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/669768748?h=da3300dea1&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Behance"></iframe></div><script src="https://player.vimeo.com/api/player.js"/>',
			},
			{
				id: '2',
				widgetName: 'Test Widget 3',
				brandImage: '',
				position: 'center',
				colors: {
					bgc: 'red',
					itm: 'blue',
					pri: '',
					txt: '',
					top: '',
				},
				useImageAsDefault: false,
				useColorsAsDefault: false,
				affiliteInfo: {
					amazon: '',
					walmart: '',
					applyIds: false,
				},
				sections: [
					{
						sectionName: 'materials',
						products: [
							{
								id: '',
								link: 'link1',
								name: 'product1',
							},
						],
					},
					{
						sectionName: 'products',
						products: [
							{
								id: '',
								link: 'linkz',
								name: 'product',
							},
							{
								id: randStr(),
								name: 'Hammer',
								merchant: 'Amazon',
								link:
								'https://www.amazon.es/Dodot-Aqua-Pure-Toallitas-Paquetes/dp/B07NW6WMGD?ref_=Oct_d_obs_d_1862264031&pd_rd_w=dkCLh&content-id=amzn1.sym.0cde40b7-98fa-4b31-a03b-17a732646b9b&pf_rd_p=0cde40b7-98fa-4b31-a03b-17a732646b9b&pf_rd_r=ZMP2WT55A26KDPX6XDFW&pd_rd_wg=d5nLb&pd_rd_r=9b9fbda8-8cde-4010-b846-a851adb60e6e&pd_rd_i=B07NW6WMGD',
								posts: 10,
								price: '',
								broken: true,
							},
						],
					},
				],
				quickLink: 'https://widget.sharedvision.com/669768748 h=da3300dea1&badge=0&autopause=0&player_id=0&app_id=58479',
				embedCode: '<div style="padding:54.52% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/669768748?h=da3300dea1&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Behance"></iframe></div><script src="https://player.vimeo.com/api/player.js"/>',
			},
		],
		templates: [],
	};
	is.fnc(r,data);
}//getUsr()


// Initializes a new widget record from the portal, and returns its object structure with a unique id.
function iniWidget(v,r){
	var usr = v && v.usr || '';
	log('dat.js iniWidget()',{v,usr});
	usr ? ITM.ini('itm',{
		typ: 'widget',
		sub: usr,
	},r) : is.fnc(r,'');
}//iniWidget()


// Saves data to a widget record.
function setWidget(v,r){
	var usr = '';
	log('dat.js iniWidget()',{v,usr});
	ITM.set('itm',{
		typ: 'widget',
		sub: usr,
		dat: v,
	},r);
}//setWidget()


// Initializes a new widget template, and returns its object structure with a unique id.
function iniTemplate(v,r){
	
}//iniTemplate()


// Saves data to a widget template.
function setTemplate(v,r){
	
}//setTemplate()


// Returns all widgets registered for the logged in user/creator.
function getWidgets(v,r){
	var usr = is.str(v,1);
	log('dat.js getWidgets()',v);
	usr ? ITM.get('all',{
		typ: 'widget',
		sub: usr,
	},r) : is.fnc(r,'');
}//getWidgets()


// Returns all templates registered for the logged in user/creator.
function getTemplates(v,r){
	var usr = is.str(v,1);
	log('dat.js getTemplates()',v);
	usr ? ITM.get('all',{
		typ: 'template',
		sub: usr,
	},r) : is.fnc(r,'');
}//getTemplates()










function addImg(id,nam,url){
	var src = topDir+'img/',
		tgt = topDir+'www/img/itm/',
		img = tgt+id+'.png',
		thumb = tgt+id+'_small.png',
		imgChk = fs.existsSync(img),
		thumbChk = fs.existsSync(thumb),
		chk = imgChk && thumbChk;
	if (chk) { return log('Files already exist for '+id); }
	return getImage();
	var srcImg = src+nam,
		srcSml = src+'small'+nam,
		obj = {srcImg:srcImg,srcSml:srcSml,img:img,thumb:thumb};
	moveImg(srcImg, img);
	moveImg(srcSml, thumb);
	return;
	fs.existsSync(srcImg) || (chk=0) && fs.copyFileSync(srcImg, img);  // Fix. Make async.
	fs.existsSync(srcSml) || (chk=0) && fs.copyFileSync(srcSml, thumb);  // Fix. Make async.
	// log(chk ? 'Transferred files' : 'Issue transferring images!',obj);

	function getImage(){
		items[id] = url;
	}//getImage()

	function moveImg(src,tgt){
		var chk = fs.existsSync(src),
			retry = !chk && (src.slice(0,-5) + '.png');
		chk || log('Did not find "'+src+'".');
		chk = chk || retry && fs.existsSync(retry);
		chk && fs.copyFileSync(retry || src, tgt);
		log('moveImg() retry: '+retry, {chk:chk,src:src,tgt:tgt});
	}//moveImg()

}//addImg()


function iniImg(v){
	var src = "https://m.media-amazon.com/images/I/41E41wAhVsL.jpg",  // 'https://cart.joinsharedvision.com/img/sv/default.png',  // ,
		tgt = topDir+'www/edit.png';
	log('iniImg() called: ', {scr:src,tgt:tgt});
	return;
	Jimp.read(src, (err, imgInst) => {
		if (err) throw err;
		imgInst
			.resize(256, 256) // resize
			.quality(60) // set JPEG quality
			.greyscale() // set greyscale
			.write(tgt); // save
	});
}//iniImg()


// Obtains an image from v.url, saving it to 3 files based on v.id
function getImg(v,r){
	var id = v.id,
		url = v.url,
		src = topDir+'jpg/',
		tgt = topDir+'www/img/itm/',  // src+'tst/',
		imgSrc = src+id+'.jpg',
		imgTgt = tgt+id+'.png',
		thumb = tgt+id+'_small.png',
		chk = chkImg();
	// log('getImg() called: ', {scr:src,tgt:tgt,id:id,url:url});
	log('getImg('+id+') called: '+strEST());  // , {imgSrc:imgSrc,imgTgt:imgTgt,thumb:thumb});
	if (chk) {
		is.fnc(r,{id:id,status:-1});
		return log('getImg() already has image '+id);
	}
	Jimp.read(url, (err, imgInst) => {
		if (err) {
			is.fnc(r,{id:id,status:0});
			return log('getImg() ERROR: ',err);
			// throw err;
		}
		imgInst
			.quality(100)
			.write(imgSrc)
			.resize(500, Jimp.AUTO)
			.write(imgTgt)
			.resize(50, Jimp.AUTO)
			.write(thumb);
	});
	log(strEST()+' -- Converted: '+url+', saved to '+imgSrc);
	is.fnc(r,{id:id,status:1});

	function chkImg(){
		var imgChk = fs.existsSync(imgTgt),
			thumbChk = fs.existsSync(thumb),
			chk = imgChk && thumbChk;
		if (chk) { return chk; }
		var arr = url.split('/'),
			str = arr.pop(),
			nam = str && str.split('.').shift(),
			srcA = src+nam+'.jpg',
			srcB = src+id+'.jpg',
			srcChk = fs.existsSync(srcA),
			savChk = fs.existsSync(srcB);
		srcChk && (url = srcA);
		// savChk && (url = srcB);
	}//chkImg()
}//getImg()


function processImages(v,r){
	// return;
	var ini = now(),
		file = topDir+'dat/images.json',
		obj = is.obj(v) || require(file),
		track = {},
		cnt = 0;
		wait = 0;
	// log('processImages() ',obj);
	all.snc(obj,function(o){  // Fix. Make async.
		var key = o.k,
			val = o.v,
			num = o.n,
			ms = 700 + randNum(1000),
			lag = wait+ms;
		wait = lag;
		log('Queueing '+key, {ms:ms,lag:lag,wait:wait});
		cnt++;
		setTimeout(function(){
			getImg({id:key,url:val},handleDone);
		},lag);
	});
	!cnt && is.fnc(r,{msg:'Current'});
	// objToFile(items, file);
	// datMsg(data);

	function handleDone(obj){
		if (!obj) {
			return log('ALERT!!! processImages() received empty obj from handleDone()');  // Fix? Handle.
		}
		var id = obj.id,
			chk = obj.status,
			lag = now()-ini;
		track[id] = chk && lag || 0;
		(chk<0) && (track[id] = 1);  // Fix?
		cnt--;
		if (!cnt) {
			is.fnc(r,track);
		}
	}//handleDone()
}//processImages()






// Hit tracking functionality:


// Called to initialize a new hit record (for widget)
function iniHit(v){
	var time = v.time,
		ip = v.ip,
		hit = v.hit,
		from = v.from || '',
		proj = v.name || '',
		from = v.from || '',
		dateTime = strEST(time),
		arr = dateTime.split(' '),
		date = arr[0],
		time = arr[1],
		tgt = hitDir+hit,
		dat = {
			date: date,
			ip: ip,
			load: time,
			hit: hit,
			url: from,
			hash: proj,
		},
		jsn = JSON.stringify(dat, null, "\t");
	// log('iniHit() writing to: '+tgt,dat);
	fs.writeFileSync(tgt, jsn);
	// log('######################### IniHit:',v);
	if (!hit) { return log('!!!!!!!!!!!!!!!!!! Issue creating hit.',v); }
}//iniHit()


// Adds data to an existing hit record (for widget).
function addHit(v){
	// log('######################### addHit:',v);
	var time = v.time,
		ip = v.ip,
		hit = v.hit,
		tgt = hitDir+hit;

	fs.readFile(tgt, (err, str) => {
	  if (err) {
			// return log('addHit() ERROR: ',err);
			log('addHit() writing to archived hit.',v);
		}
	  var dat = str && JSON.parse(str) || {};
		dat && addDat(dat);
	});

	function addDat(dat){
		var mix = ext([dat,v]);
		objToFile(mix,tgt);
		return mix;
	}//addDat()

}//addHit()


// Converts the object structure of a hit into a flat array format and stores it to an archival file.
function finHit(v){
	var id = v.id,
		tgt = v.tgt || '';

}//finHit()


function archiveHits(v,b){
	var ini = now(),
		bkp = [],
		cnt = 0,
		list;  // List of hits being handled.
	fs.readdir(hitDir,function(err,files){
		if (err) { return log('archiveHits() had issue reading files: ', err); }
		cnt = files.length;
		exeFiles(list=files);
	});

	function exeFiles(files){
		log('archiveHits() loaded files: ', files);
		all.snc(files,function(o){
			var val = o.v,
				hit = +val || 0;
			// log('exeFiles() val: '+val+', hit: '+hit);
			if (!hit) { return cnt--; }
			handleHit(hit);
		});
		// var tgt = hitDir+hit,
	}//exeFiles()

	function handleHit(hit){
		var max = 36000,
			dif = ini - hit,
			chk = dif >= max,
			src = hitDir+hit,
			tgt = hitDir+'old/'+hit,
			bad = hitDir+'bad/'+hit;
		chk || cnt--;// log();
		chk && fs.readFile(src, 'utf8', (err, str) => {
		  err && log('handleHit() threw err opening '+src, err);
			var dat = str && JSON.parse(str);
		  dat && processHit(dat) && moveFile(src,tgt) || moveFile(src,bad);
		});
	}//handleHit()

	function processHit(v){
		// log('processHit() v: ',v);
		var arr = [
			v.date || '',
			v.load || '',
			v.ip || '',
			v.clk || '',
			v.cartTime || '',
			v.ids || '',
			v.cnt || '',
			v.price || '',
			v.url || '',
			v.affID || '',
			v.hit || '',
			v.hash || '',
			v.proj || '',
			v.nams || '',
		];
		// log('processHit() arr: ',arr);
		bkp.push(arr);
		--cnt<1 && fin();
		return arr;
	}//processHit(data)()

	function moveFile(src,tgt){
		fs.existsSync(tgt) && (tgt = tgt+'_'+ini);
		fs.rename(src, tgt, function(err){
			err && log('ALERT! archiveHits() Issue moving file: ',{src:src,tgt:tgt,err});
		});
		return tgt;
	}//moveFile()

	function fin(){
		var tgt = hitDir+'bkp/'+ini;
		is.fnc(b,bkp);
		objToFile(bkp,tgt);
	}//fin()

}//archiveHits()




// Fix. Standardize and centralize these:



// Receives a numeric now() input and returns a time string formatted to EST. If typ is 'time' or 'date', only that segment will be returned.
function strEST(v,typ){
	var ms = v || +now(),
		dif = 4,
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
	if (!dat || !tgt || !is.str(tgt)){ return log('auth.js objToFile() received bad args',{dat,tgt,opt}); }
	opt = opt || '';
	var bkp = opt=='bkp' || opt.bkp || '',
		msg = opt=='msg' || opt.msg || '',
		jsn = JSON.stringify(dat, null, "\t"),
		tgtIs = fs.existsSync(tgt);
	if (!jsn) {
		// Fix. Handle.
	} else if (tgtIs){
		msg && log('auth.js objToFile() Found existing file: '+tgt);
	}
	msg && log('auth.js objToFile() writing to: '+tgt,dat);
	fs.writeFileSync(tgt, jsn);
}//objToFile()


// Reads a json file asynchronously and calls cbk with the parsed data.
function readFile(tgt,cbk,msg){
	msg && log('auth.js readFile() called.',{tgt,cbk,msg});
	fs.readFile(tgt, (err, str) => {
		msg && log('auth.js fs.readFile() completed.',{err,str});
		if (err) {
			msg && log('auth.js readFile() ERROR: ',err);
			return is.fnc(cbk,'');  // Fix. Actually handle.
		}
	  var dat = str && JSON.parse(str) || '';  // Fix?
		is.fnc(cbk,dat);
	});
}//readFile()




// Used to relay quick data
function datMsg(dat){
	var tgt = topDir+'dat/aMsg.jsn';
	objToFile(dat,tgt);
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


