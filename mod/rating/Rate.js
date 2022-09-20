ACE.mod('Rate', function (ace) {
    var now = ace.now;

    ace.get('mod', 'mod/rating/Star.js');

    return Rate;

    function Rate(cfg) {
        let id = cfg.id || 'rate-' + now(),
            starsACI = [],
            rating = cfg.rating || 0,
            aci = {
                get: {
                    dat: getDat,
                    isRated: getIsRated,
                },
            },
            ux = {
                id,
                css: {
                    display: 'flex',
                },
                dom: iniDom(),
                ini: cfg.ini,
                aci,
                on: {
                    mouseleave: () => starHovered(rating),
                },
            };

        return ux;

        function getDat() {
            return {
                rating,
            };
        }

        function getIsRated() {
            return rating > 0;
        }

        function iniDom() {
            return [
                {
                    mod: 'Star',
                    pos: 1,
                    starSelected,
                    starHovered,
                    active: rating > 0,
                    ini: (m) => {
                        starsACI[0] = m;
                    },
                },
                {
                    mod: 'Star',
                    pos: 2,
                    starSelected,
                    starHovered,
                    active: rating > 1,
                    ini: (m) => {
                        starsACI[1] = m;
                    },
                },
                {
                    mod: 'Star',
                    pos: 3,
                    starSelected,
                    starHovered,
                    active: rating > 2,
                    ini: (m) => {
                        starsACI[2] = m;
                    },
                },
                {
                    mod: 'Star',
                    pos: 4,
                    starSelected,
                    starHovered,
                    active: rating > 3,
                    ini: (m) => {
                        starsACI[3] = m;
                    },
                },
                {
                    mod: 'Star',
                    pos: 5,
                    starSelected,
                    starHovered,
                    active: rating > 4,
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
