ACE.mod('Star', function (ace) {
    var now = ace.now,
        is = ace.is;

    return Star;

    function Star(cfg) {
        let id = cfg.id || 'star-' + now(),
            pos = cfg.pos,
            active = cfg.active || false,
            starSelected = cfg.starSelected,
            starHovered = cfg.starHovered,
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
                cls: 'bi bi-star' + (active ? '-fill' : ''),
                aci,
                css: {
                    color: 'red',
                },
                ini,
                on: {
                    click: handleClick,
                    mouseover: handleHover,
                },
            };

        return ux;

        function ini(m) {
            starACI = m;
            is.fnc(cfg.ini, m);
        }

        function handleHover() {
            starHovered(pos);
        }

        function handleClick() {
            starSelected(pos);
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