ACE.mod('Star', function (ace) {
    var now = ace.now,
        is = ace.is;

    ace.get('mod', 'mod/story/StoryItem.js');

    return Star;

    function Star(cfg) {
        let id = cfg.id || 'star-' + now(),
            pos = cfg.pos,
            startSelected = cfg.startSelected,
            aci = {
                set: {
                    active: setActive,
                    inactive: setInactive,
                },
                get: {
                    pos: getPos,
                },
            },
            starACI,
            ux = {
                typ: 'a',
                id,
                cls: 'bi bi-star',
                aci,
                css: {
                    color: 'red',
                },
                ini,
                on: {
                    click: handleClick,
                }
            };

        return ux;

        function ini(m) {
            starACI = m;
            is.fnc(cfg.ini, m);
        }


        function handleClick() {
            startSelected(pos);
        }

        function setActive() {
            starACI.rem('cls', 'bi-star');
            starACI.set('cls', 'bi-star-fill');
        }

        function setInactive() {
            starACI.rem('cls', 'bi-star-fill');
            starACI.set('cls', 'bi-star');
        }

        function getPos() {
            return pos;
        }
    }
})