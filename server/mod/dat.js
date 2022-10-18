// var fs = require('fs');
// var Jimp = require('jimp');

var utl = require('../utl'),
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
    modDir = topDir + 'mod/',
    datDir = topDir + 'dat/',
    wwwDir = dirs.www,
    idsDir = dirs.ids;

// var hitDir = datDir + 'hit/',
//     items = {},
//     data = {}; // Used to store data for datMsg()

var aci = ACI(
    {
        get: {
            stories: getStories,
			story: getStory,
        },
        set: {},
        add: {},
        rem: {},
        ini: {
            story: iniStory,
        },
        del: {},
        exe: {},
    },
    DAT
);

module.exports = aci;

var ITM = require(modDir + 'itm');

return aci;

// A factory for generating new DAT instances with standardized interface.
function DAT() {
    log('################### DAT() Called! #########################');
} //DAT()

function iniStory(v, r) {
    ITM.ini('itm', { dat: v, typ: 'story' }, r);
}

function getStories(v, r) {
    ITM.get('all', { typ: 'story' }, r);
}

function getStory(v, r) {
	ITM.get('itm', { id: v, typ: 'story' }, r);
}

/*function addImg(id,nam,url){
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
}//processImages()*/
