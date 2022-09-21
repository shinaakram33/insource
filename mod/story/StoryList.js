ACE.mod('StoryList', function (ace) {
    var now = ace.now,
        is = ace.is;

    ace.get('mod', 'mod/story/StoryItem.js');
    ace.get('mod', 'mod/Sort.js');

    return StoryList;

    function StoryList(config) {
        let id = config.id || 'story-list' + now(),
            cls = 'story-list',
            storiesACI = [],
            sortACI,
            aci = {
                set: {
                    dat: setDat,
                },
                add: {
                    dat: addDat,
                },
            },
            ux = {
                id,
                cls: cls + ' m-3',
                dom: iniDom(),
                aci,
                ini: config.ini,
            };

        return ux;

        function setDat(v) {
            // todo
        }

        function addDat(v) {
            // todo
        }

        function sort(v) {
            if (v === 'rated') {
                sortACI.set('dat', false);
            } else {
                sortACI.set('dat', true);
            }
        }

        function iniDom() {
            let dom = [
                {
                    cls: 'm-3',
                    dom: [
                        {
                            typ: 'h4',
                            lbl: 'Sort by: ',
                            cls: 'd-inline-block me-3',
                        },
                        {
                            typ: 'button',
                            cls: 'btn btn-primary me-3',
                            lbl: 'Rated',
                            on: {
                                click: () => sort('rated'),
                            },
                        },
                        {
                            typ: 'button',
                            cls: 'btn btn-primary me-3',
                            lbl: 'Unrated',
                            on: {
                                click: () => sort('unrated'),
                            },
                        },
                    ],
                },
                {
                    dom: {
                        mod: 'Sort',
                        ini: (m) => {
                            sortACI = m;
                        },
                        items: [
                            {
                                mod: 'StoryItem',
                                ini: (m) => {
                                    storiesACI[0] = m;
                                },
                            },
                            {
                                mod: 'StoryItem',
                                ini: (m) => {
                                    storiesACI[1] = m;
                                },
                            },
                            {
                                mod: 'StoryItem',
                                ini: (m) => {
                                    storiesACI[2] = m;
                                },
                            },
                            {
                                mod: 'StoryItem',
                                ini: (m) => {
                                    storiesACI[3] = m;
                                },
                            },
                            {
                                mod: 'StoryItem',
                                ini: (m) => {
                                    storiesACI[4] = m;
                                },
                            },
                        ],
                    },
                },
            ];
            return dom;
        }
    }
});
