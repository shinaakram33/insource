ACE.mod('Rate', function (ace) {
    var now = ace.now;

    ace.get('mod', 'mod/rating/Star.js');

    return Rate;

    function Rate(cfg) {
        let id = cfg.id || 'rate-' + now(),    
            starsACI = [],
            ux = {
                id,
                css: {
                    display: 'flex',
                },
                dom: iniDom(),
                ini: cfg.ini,
            };

        return ux;

        function iniDom() {
            return [
                {
                    mod: 'Star',
                    pos: 1,
                    startSelected,
                    ini: (m) => {
                        starsACI[0] = m;
                    },
                },
                {
                    mod: 'Star',
                    pos: 2,
                    startSelected,
                    ini: (m) => {
                        starsACI[1] = m;
                    },
                },
                {
                    mod: 'Star',
                    pos: 3,
                    startSelected,
                    ini: (m) => {
                        starsACI[2] = m;
                    },
                },
                {
                    mod: 'Star',
                    pos: 4,
                    startSelected,
                    ini: (m) => {
                        starsACI[3] = m;
                    },
                },
                {
                    mod: 'Star',
                    pos: 5,
                    startSelected,
                    ini: (m) => {
                        starsACI[4] = m;
                    },
                },
            ];
        }

        function startSelected(num) {
            starsACI.forEach((v, i) => {
                if(i < num) {
                    v.set('active');
                } else {
                    v.set('inactive');
                }
            })
        }
    }
});
