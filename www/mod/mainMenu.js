ACE.mod('mainMenu', function(ace){
    ace.get('mod', 'mod/SwapContent.js');
    ace.get('mod', 'mod/claim/createClaim.js');
    ace.get('mod', 'mod/Dat.js');
    return mainMenu;

    function mainMenu(cfg){
        let id = cfg.id || 'main-menu',
        mainMenuACI,swap,
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
                mainMenuACI = m;
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
                                                    typ: 'a',
                                                    cls: 'navbar-brand website-logo lead',
                                                    dom: [
                                                        { typ: 'span', lbl: 'Ohio FAIR Plan' },
                                                        { typ: 'br' },
                                                    ]
                                                },
                                                
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    typ: 'img',
                    src: './img/logo.png',
                    css: { w: '70%' },
                    cls: 'mx-auto d-block mt-3',
                    ini: (m) => {
                        imageACI = m;
                    },
                },
                {
                    cls: 'mainMenu',
                    dom: [
                        {
                            cls: 'row',
                            dom: [
                                {
                                    cls: 'w-50 col-sm-6',
                                    dom: [
                                        {
                                            typ: 'img',
                                            src: './img/claim.png',
                                            css: { w: '40%'},
                                            cls: 'mx-auto d-block',
                                            ini: (m) => {
                                                imageACI = m;
                                            },
                                        },
                                        {
                                            typ: 'span',
                                            lbl: 'SUBMIT A CLAIM',
                                            style: "font-size: 15px",
                                            cls: 'mx-auto d-block text-center'
                                        }
                                    ],
                                    on: {
                                        click: ()=> { cfg.swapItem(2) }
                                    }
                                },
                                {
                                    cls: 'w-50 col-sm-6 ml-5',
                                    dom: [
                                        {
                                            typ: 'img',
                                            src: './img/upload.png',
                                            css: { w: '40%'},
                                            cls: 'mx-auto d-block mt-3',
                                            ini: (m) => {
                                                imageACI = m;
                                            },
                                        },
                                        {
                                            typ: 'span',
                                            lbl: 'UPLOAD PHOTOS',
                                            style: "font-size: 15px",
                                            cls: 'mx-auto d-block text-center'
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            cls: 'row mt-4',
                            dom: [
                                {
                                    cls: 'w-50 col-sm-6',
                                    dom: [
                                        {
                                            typ: 'img',
                                            src: './img/call.png',
                                            css: { w: '40%'},
                                            cls: 'mx-auto d-block',
                                            ini: (m) => {
                                                imageACI = m;
                                            },
                                        },
                                        {
                                            typ: 'span',
                                            lbl: 'CALL US',
                                            style: "font-size: 15px",
                                            cls: 'mx-auto d-block text-center'
                                        }
                                    ],
                                    on: {
                                        click: ()=> {
                                            cordova.plugins.phonedialer.call(  
                                                "2125551212", 
                                                function(success) { console.log('Dialing succeeded'); }, 
                                                function(err) {
                                                  if (err == "empty") console.log("Unknown phone number");
                                                  else console.log("Dialer Error:" + err);    
                                                },  
                                                onSpeakerOn,
                                                appChooser
                                               );
                                        }
                                    }
                                },
                                {
                                    cls: 'w-50 col-sm-6',
                                    dom: [
                                        {
                                            typ: 'img',
                                            src: './img/website.png',
                                            css: { w: '40%'},
                                            cls: 'mx-auto d-block',
                                            ini: (m) => {
                                                imageACI = m;
                                            },
                                        },
                                        {
                                            typ: 'a',
                                            lbl: 'OUR WEBSITE',
                                            style: "font-size: 15px",
                                            cls: 'mx-auto d-block text-center',
                                            href: 'https://www.ohiofairplan.com/'
                                        }
                                    ]
                                },
                            ]
                        },
                    ]
                }
            ]
            return dom;
        }

        function setDat(dat){
            //set the phone number 
            // set website link
        }

        function getDat(){}

        function onSpeakerOn(result){
            console.log(result);        
        }
            
        function appChooser(result) {
            console.log(result);
        }
    }

})