ACE.mod('contactInfo', function(ace){
    ace.get('mod', 'mod/SwapContent.js');
    return contactInfo;

    function contactInfo(cfg){
        let id = cfg.id || '',
        contactinfoACI, nameACI, relationshipACI,phoneNumberACI,phoneTypeACI,emailACI,
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
                contactinfoACI = m;
            }
        };
        return ux;

        function iniDom(){
            let dom = [
                {
                    typ: 'form',
                    cls: 'mx-2 mt-4',
                    dom: [
                        {
                            cls: 'form-text',
                            lbl: "Primary Contact Name:"
                        },
                        {
                            cls: 'form-control inputField mb-3',
                            typ: 'input',
                            type: 'text',
                            ini: (m)=> {nameACI = m}
                        },
                        {
                            cls: 'form-text mt-2',
                            lbl: "Relationship:"
                        },
                        {
                            cls: 'form-control inputField',
                            typ: 'input',
                            type: 'text',
                            ini: (m)=> {relationshipACI = m}
                        },
                        {
                            cls: 'w-100 row',
                            dom: [
                                {
                                    css: {w: '50%'},
                                    dom: [
                                        {
                                            cls: 'form-text',
                                            lbl: "Phone number:"
                                        },
                                        {
                                            cls: 'form-control inputField mb-3',
                                            typ: 'input',
                                            type: 'text',
                                            ini: (m)=> {phoneNumberACI = m}
                                        },
                                    ]
                                },
                                {
                                    css: {w: '40%'},
                                    dom: [
                                        {
                                            cls: 'form-text mt-2',
                                            lbl: "Phone type:"
                                        },
                                        {
                                            cls: 'form-control inputField',
                                            typ: 'input',
                                            type: 'text',
                                            ini: (m)=> {phoneTypeACI = m}
                                        },
                                    ]
                                }        
                            ]
                        },
                        {
                            cls: 'form-text',
                            lbl: "Email:"
                        },
                        {
                            cls: 'form-control inputField mb-3',
                            typ: 'input',
                            type: 'email',
                            ini: (m)=> {emailACI = m}
                        },
                        
                    ]
                }
            ]
            return dom;
        }

        function setDat(){
            nameACI.set('val', '');
            relationshipACI.set('val', '');
            phoneNumberACI.set('val', '');
            phoneTypeACI.set('val', '');
            emailACI.set('val','');
        }

        function getDat(){
            return {
                name: nameACI.get.v('val'),
                relationship: relationshipACI.get.v('val'),
                phone_number: phoneNumberACI.get.v('val'),
                phone_type: phoneTypeACI.get.v('val'),
                email: emailACI.get.v('val')
            }
        }
    }
})