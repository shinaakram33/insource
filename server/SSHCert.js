const { exec } = require('child_process');
var utl = require('./utl'),
	ACI = utl.aci;

var me = ACI(
        {
            set: {
                ca: setCA,
            },
            exe: {
                generateCert: generateUserCert,
            },
        }
    );

return module.exports = me;


function setCA(v) {
    let name = v || '';
    execCommand(`./ssh-certificate.pl setup-ca ${name}`);
}

function generateUserCert(v) {
    let {name, host, ca, id, principals, validity} = v;
    execCommand(`./ssh-certificate.pl generate-user-cert ${name} ${host} ${ca} ${id} ${principals} ${validity}`);
}

function execCommand(cmd) {
    console.log(cmd);
    exec(cmd, (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        stderr ?? console.log(`stderr: ${stderr}`);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
    });
}
