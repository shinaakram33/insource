ACE.mod('createClaim', function(ace){
    ace.get('mod', 'mod/SwapContent.js');
    ace.get('mod', 'mod/claim/claimType.js');
    ace.get('mod', 'mod/claim/policyType.js');
    ace.get('mod', 'mod/claim/contactInfo.js');
    ace.get('mod', 'mod/claim/photos.js');
    ace.get('mod', 'mod/claim/submitClaim.js');
    const BUTTON_LABELS = ['NEXT', 'SUBMIT CLAIM'];
    return createClaim;

    function createClaim(cfg){
        let id = cfg.id || '',
        createClaimACI, claimSwap, claimloc=1,
        claimTypeACI, policyTypeACI, contactInfoACI,  photosACI, submitClaimACI, nextBtnACI,
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
                createClaimACI = m;
            }
        };
        return ux;

        function iniDom(){
            let dom= [
                {
                    cls: 'sticky-top mb-2',
                    dom: [
                        {
                            cls: 'navbar-customize',
                            dom: [
                                {
                                    typ: 'nav',
                                    cls: 'navbar',
                                    dom: [
                                        {
                                            cls: 'container-fluid',
                                            dom: [
                                                {
                                                    typ: 'img',
                                                    src: './img/back.png',
                                                    css: { w: '5%' },
                                                    on: {                 
                                                        click: () => {
                                                            swapLastModule();
                                                        },
                                                    },
                                                },
                                                {
                                                    typ: 'a',
                                                    cls: 'navbar-brand website-logo lead',
                                                    dom: [
                                                        { typ: 'span', lbl: 'Submit a Claim' },
                                                    ]
                                                },
                                                {
                                                    typ: 'img',
                                                    src: './img/delete.png',
                                                    css: { w: '5%' },
                                                    cls: 'float-end',
                                                    on: {
                                                        click: () => {
                                                            cfg.swapItem(1);
                                                        },
                                                    },
                                                    
                                                }
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    mod: "SwapContent",
                    ini: (m) => {
                        claimSwap = m;
                    },
                    loc: claimloc,
                    items: [
                      {
                        mod: 'claimType',
                        ini: (m)=> {claimTypeACI = m},
                      },
                      {
                        mod: 'policyType',
                        ini: (m)=> {policyTypeACI = m}
                      },
                      {
                        mod: 'contactInfo',
                        ini: (m)=> {contactInfoACI = m}
                      },
                      {
                        mod: 'photos',
                        setImage,
                        ini: (m)=> {photosACI = m}
                      },
                      {
                        mod: 'submitClaim',
                        ini: (m)=> {submitClaimACI = m}
                      }
                    ],
                },
                {
                    cls: 'mt-3',
                    style: "margin-right: 5%",
                    dom: {
                        typ: 'button',
                        lbl: BUTTON_LABELS[0],
                        cls: 'float-end nextBtn',
                        ini: (m)=> {nextBtnACI = m},
                        on: {
                            click: ()=> {
                                submitClaim();
                            }
                        }
                    }
                }
            ]
            return dom;
        }

        function setDat(){
            claimTypeACI.set('dat');
            policyTypeACI.set('dat');
            contactInfoACI.set('dat');
            nextBtnACI.set('lbl', BUTTON_LABELS[0]);
            claimloc=1;
            claimSwap.set('loc',1);
            cfg.swapItem(claimloc);
        }

        function getDat(){
            const claimTypeData = claimTypeACI.get.v('dat');
            const contactInfo = contactInfoACI.get.v('dat');
            return {
                    loss_type: claimTypeData.loss_type,
                    loss_date: claimTypeData.loss_date,
                    policy_number: policyTypeACI.get.v('dat'),
                    name: contactInfo.name,
                    relationship: contactInfo.relationship,
                    phone_number: contactInfo.phone_number,
                    phone_type: contactInfo.phone_type,
                    email: contactInfo.email, 
                    images: []
            };
        }

        function swapNextModule(){
            if(claimloc < 5){
                ++claimloc;
                claimSwap.set('loc', claimloc);
            }
        }

        function swapLastModule(){
            --claimloc;
            if(claimloc<1){
                ++claimloc;
                cfg.swapItem(1);
            }
            if(claimloc === 5)
                --claimloc;
            nextBtnACI.set('lbl', 'NEXT');
            claimSwap.set('loc', claimloc);
        }

        function submitClaim(){
            swapNextModule();
            if(claimloc === 5){
                nextBtnACI.set('lbl', BUTTON_LABELS[1]);
                ++claimloc;
            }
            else if(claimloc === 6){
                let claimData = getDat();
                ace.ini.itm({
                aspect: 'itm',
                cmd: 'ini',
                typ: 'claim',
                v: claimData
                }, function(dat){
                    console.log('Data saved successfullt with ID: ', dat);
                    setDat();
                }) 
            }
        }

        function setImage(){
            photosACI.set('img')
        }
    }
})