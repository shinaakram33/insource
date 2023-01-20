ACE.mod('submitClaim', function(ace){
    ace.get('mod', 'mod/SwapContent.js');
    return submitClaim;

    function submitClaim(cfg){
        let id = cfg.id || '',
        mainMenuACI,
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
            let dom = [
                {
                    typ: 'form',
                    cls: 'mx-2 mt-3',
                    dom: [
                        {
                            cls: 'form-text mb-3',
                            lbl: "Thank you for this information. By clicking Submit Claim, you are acknowledging that the information provided is correct to the best of your knowledge."
                        },
                        {
                            cls: 'form-text mb-3',
                            lbl: 'Once the claim has been submitted, you will receive confirmation and can expect to be contacted by a representative within a business day.'
                        }
                    ]
                }
            ]
            return dom;
        }

        function setDat(dat){}

        function getDat(){}
    }
})