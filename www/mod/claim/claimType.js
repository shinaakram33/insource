ACE.mod('claimType', function(ace){
    return claimType;

    function claimType(cfg){
        let id = cfg.id || 'claim-type',
        lossTypeACI,lossDateACI,claimTypeACI,
        aci = {
            set: {
                dat: setDat
            },
            get: {
                dat: getDat
            }
        },
        ux = {
            id,
            aci,
            dom: iniDom(),
            ini: (m)=> {
                cfg.ini(m);
                claimTypeACI = m;
            }
        };
        return ux;

        function iniDom(){
            let dom = [
                {
                    typ: 'form',
                    cls: 'mx-2 mt-3',
                    dom: [
                        {
                            cls: 'form-text',
                            lbl: "What type of loss are you reporting?"
                        },
                        {
                            cls: 'form-control inputField mb-3',
                            typ: 'input',
                            type: 'text',
                            ini: (m)=> {lossTypeACI = m}
                        },
                        {
                            cls: 'form-text mt-2',
                            lbl: "When did the loss occur?"
                        },
                        {
                            cls: 'form-control inputField',
                            typ: 'input',
                            type: 'date',
                            ini: (m)=> {lossDateACI = m}
                        }
                    ]
                }
            ]
            return dom;
        }

        function setDat(){
            lossTypeACI.set('val', '');
            lossDateACI.set('val', '');
        }

        function getDat(){
            return {
                loss_type: lossTypeACI.get.v('val'),
                loss_date: lossDateACI.get.v('val')
            }
        }
    }
})