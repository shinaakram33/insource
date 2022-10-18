const { exec } = require('child_process');
var utl = require('../utl'),
	ACI = utl.aci;

var dom,
    nam,
    prt,
    me = ACI(
        {
            set: {
                dat: setDat,
                default: setDat,
            },
            add: {
                subDomain: addSubDomain,
                domain: addDomain,
            },
            exe: {
                // renew: renewCert,
            },
        }
    );

return module.exports = me;

function setDat(v) {
    if (!v) return;
    dom = v.domain;
    prt = v.port;
    nam = v.name;
}

function addDomain(v) {
    let { domain = dom, port = prt, name = nam } = v;
    execCommand('./launch.pl create-cert ' + domain + ' ' + port + ' ' + name);
}

function addSubDomain(v) {
    let { domain = dom, port = prt, name = nam } = v;
    execCommand('./launch.pl create-cert ' + domain + ' ' + port + ' ' + name);
}

function execCommand(cmd) {
    console.log(cmd);
    exec(cmd, (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
    });
}
