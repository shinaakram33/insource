var top = global,
	topDir = process.cwd()+'/',
	aceDir = topDir+'ace/',
	datDir = topDir+'dat/',
	modDir = topDir+'mod/',
	catDir = datDir+'cat/',
	wwwDir = topDir+'www/',
	dirs = top.dir = top.dirs = {
		top: topDir,
		ace: aceDir,
		dat: datDir,
		cat: catDir,
		www: wwwDir,
	};
var dat = require(modDir + 'dat');
var itm = require(modDir + 'itm');
// var sshcert = require(topDir + 'SSHCert');

// sshcert.exe('viewCert', {userName: 'shina', hostName: 'ft'});

var user = {
    name: 'Someone 2',
};

// dat.ini('story', user, (a) => {
// 	console.log("This is done: ", a);
// });

dat.get('stories', {id: 'bCNBNfJzrOsUlHCeQRLZqTJnNOQSTM', typ: 'story'}, (a) => {
	console.log("Returned with: ", a);
});

// itm.ini('itm', { dat: user, typ: 'user' }, (a) => {
//     console.log('Return function', a);
// });

// itm.get('itm', { id: 'BhkxhUKcBFVknbUZSEtqwWuZVLgpZ', typ: 'user' }, (v) => {
//     console.log('My Obj', v);
// });
