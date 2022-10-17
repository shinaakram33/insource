var top = global,
	topDir = process.cwd()+'/',
	aceDir = topDir+'ace/',
	datDir = topDir+'dat/',
	catDir = datDir+'cat/',
	wwwDir = topDir+'www/',
	dirs = top.dir = top.dirs = {
		top: topDir,
		ace: aceDir,
		dat: datDir,
		cat: catDir,
		www: wwwDir,
	};
var itm = require(topDir + 'itm');
// var sshcert = require(topDir + 'SSHCert');

// sshcert.exe('viewCert', {userName: 'shina', hostName: 'ft'});

var user = {
    name: 'Ali',
};
itm.ini('itm', {dat: user, typ: 'user'}, (a) => {
    console.log("Return function", a);
});

// itm.get('itm', "GPPKgTGZWeRQGNaJZJJOLgwqMDpdcA", (v) => {
//     console.log("My Obj",v);
// });
