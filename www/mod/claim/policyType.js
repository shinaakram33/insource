ACE.mod('policyType', function(ace){
    ace.get('mod', 'mod/SwapContent.js');
    return policyType;

    function policyType(cfg){
        let id = cfg.id || 'policy-type',
        policyTypeACI,policyNumberACI,
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
                policyTypeACI = m;
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
                            lbl: "Do you have OFP policy number associated with the loss?"
                        },
                        {
                            cls: 'form-check mt-2',
                            dom:[
                                {
                                    cls: 'form-check-input',
                                    typ: 'input',
                                    type: 'radio',
                                    name: 'policyNumberStatus'
                                },
                                {
                                    typ: 'label',
                                    lbl: 'Yes',
                                    cls: 'form-check-label text-secondary'
                                }
                            ]
                        },
                        {
                            cls: 'form-check mb-3',
                            dom:[
                                {
                                    cls: 'form-check-input',
                                    typ: 'input',
                                    type: 'radio',
                                    name: 'policyNumberStatus'
                                },
                                {
                                    typ: 'label',
                                    lbl: 'No',
                                    cls: 'form-check-label text-secondary'
                                }
                            ]
                        },
                        {
                            cls: 'form-text mt-2',
                            lbl: "Please Enter the OFP policy number"
                        },
                        {
                            cls: 'form-control inputField',
                            typ: 'input',
                            type: 'text',
                            ini: (m)=> {policyNumberACI = m}
                        }
                    ]
                }
            ]
            return dom;
        }

        function setDat(){
            policyNumberACI.set('val', '');
        }

        function getDat(){
            return policyNumberACI.get.v('val')
            
        }
    }
})