ACE.mod('Rate', function (ace) {
    var now = ace.now;

    ace.get('mod', 'mod/rating/Star.js');

    return Rate;

    function Rate(cfg) {
        let id = cfg.id || 'rate-' + now(),
            starsACI = [],
            rating = 0,
            ux = {
                id,
                css: {
                    display: 'flex',
                },
                dom: iniDom(),
                ini: cfg.ini,
                on: {
                    mouseleave: () => starHovered(rating),
                },
            };

        return ux;

        function iniDom() {
            return [
                {
                    mod: 'Star',
                    pos: 1,
                    starSelected,
                    starHovered,
                    ini: (m) => {
                        starsACI[0] = m;
                    },
                },
                {
                    mod: 'Star',
                    pos: 2,
                    starSelected,
                    starHovered,
                    ini: (m) => {
                        starsACI[1] = m;
                    },
                },
                {
                    mod: 'Star',
                    pos: 3,
                    starSelected,
                    starHovered,
                    ini: (m) => {
                        starsACI[2] = m;
                    },
                },
                {
                    mod: 'Star',
                    pos: 4,
                    starSelected,
                    starHovered,
                    ini: (m) => {
                        starsACI[3] = m;
                    },
                },
                {
                    mod: 'Star',
                    pos: 5,
                    starSelected,
                    starHovered,
                    ini: (m) => {
                        starsACI[4] = m;
                    },
                },
            ];
        }

        function starHovered(num) {
            starsACI.forEach((v, i) => {
                if (i < num) {
                    v.set('active');
                } else {
                    v.set('inactive');
                }
            });
        }

        function starSelected(num) {
            rating = num;
            starHovered(num);
        }
    }
});
