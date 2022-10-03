ACE.mod('PageLayout', function (ace) {
    var now = ace.now,
        is = ace.is;

    ace.get('mod', 'mod/SwapContent.js');
    ace.get('mod', 'mod/ContentUpload.js');
    ace.get('mod', 'mod/LandingPage.js');
    ace.get('mod', 'mod/ContestPage.js');
    ace.get('mod', 'mod/story/StoryList.js');

    return PageLayout;

    function PageLayout(cfg) {
        let id = cfg.id || 'layout-' + now(),
            swap,
            storyListACI,
            storyACI,
            aci = {
                set: {
                    dat: setDat,
                },
                get: {
                    dat: getDat,
                },
            },
            ux = {
                id,
                aci,
                dom: iniDom(),
                ini,
            },
            me;

        return ux;

        function ini(m) {
            me = m;
            is.fnc(cfg.ini, m);
        }

        function setDat(v) {
            //todo
        }

        function getDat() {
            //todo
        }

        function rateStories() {
            swap.set('loc', 4);
        }

        function enterContest() {
            swap.set('loc', 3);
        }

        function iniDom() {
            let dom = [
                {
                    cls: 'icons-bar',
                    dom: [
                        {
                            cls: 'container-fluid',
                            dom: [
                                {
                                    cls: 'row',
                                    dom: [
                                        { cls: 'col-md-10' },
                                        {
                                            cls: 'col-md-2',
                                            dom: [
                                                {
                                                    cls: 'icons-container',
                                                    dom: [
                                                        { typ: 'i', cls: 'm-2 bi bi-facebook' },
                                                        { typ: 'i', cls: 'm-2 bi bi-twitter' },
                                                        { typ: 'i', cls: 'm-2 bi bi-instagram' },
                                                        {
                                                            cls: 'search-icon',
                                                            dom: [{ typ: 'i', cls: 'm-2 bi bi-search' }],
                                                        },
                                                    ],
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
                    dom: [
                        {
                            cls: 'navbar-customize',
                            dom: [
                                {
                                    typ: 'nav',
                                    cls: 'navbar navbar-light ',
                                    dom: [
                                        {
                                            cls: 'container-fluid',
                                            dom: [
                                                {
                                                    typ: 'a',
                                                    cls: 'navbar-brand website-logo',
                                                    dom: [
                                                        { typ: 'span', lbl: 'FEARLESS TRIALS' },
                                                        { typ: 'br' },
                                                        { typ: 'span', lbl: 'LOGO HERE' },
                                                    ],
                                                    on: {
                                                        click: () => {
                                                            swap.set('loc', 1);
                                                        },
                                                    },
                                                },
                                                {
                                                    typ: 'a',
                                                    cls: 'navbar-brand contest',
                                                    dom: [
                                                        { typ: 'span', lbl: 'ENTER' },
                                                        { typ: 'br' },
                                                        { typ: 'span', lbl: 'CONTEST' },
                                                    ],
                                                    on: {
                                                        click: () => {
                                                            swap.set('loc', 2);
                                                        },
                                                    },
                                                },
                                                {
                                                    typ: 'a',
                                                    cls: 'navbar-brand navbar-link',
                                                    dom: [
                                                        { typ: 'span', lbl: 'OHIO' },
                                                        { typ: 'br' },
                                                        { typ: 'span', lbl: 'ADVENTURES' },
                                                    ],
                                                },
                                                {
                                                    typ: 'a',
                                                    cls: 'navbar-brand navbar-link',
                                                    dom: [
                                                        { typ: 'span', lbl: 'EAT AND' },
                                                        { typ: 'br' },
                                                        { typ: 'span', lbl: 'DRINK' },
                                                    ],
                                                },
                                                {
                                                    typ: 'a',
                                                    cls: 'navbar-brand navbar-link',
                                                    dom: [
                                                        { typ: 'span', lbl: 'PLAN YOUR' },
                                                        { typ: 'br' },
                                                        { typ: 'span', lbl: 'TRIP' },
                                                    ],
                                                },
                                                {
                                                    typ: 'a',
                                                    cls: 'navbar-brand navbar-link',
                                                    dom: [
                                                        { typ: 'span', lbl: 'CONTACT' },
                                                        { typ: 'br' },
                                                        { typ: 'span', lbl: 'US' },
                                                    ],
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
                    mod: 'SwapContent',
                    ini: function (m) {
                        swap = m;
                    },
                    loc: 1,
                    items: [
                        {
                            mod: 'LandingPage',
                            enterContest,
                            rateStories,
                        },
                        {
                            mod: 'ContestPage',
                        },
                        {
                            mod: 'ContentUpload',
                        },
                        {
                            css: { display: 'none' },
                            ini: (m) => {
                                storyListACI = m;
                            },
                            dom: {
                                mod: 'StoryList',
                                ini: (m) => {
                                    storyACI = m;
                                    setTimeout(() => {
                                        storyACI.set('dat', [
                                            {
                                                title: 'Story title 1',
                                                author: 'Author',
                                                recordedAt: '27-9-2022',
                                                lat: 31.4646435,
                                                lon: 74.2889282,
                                            },
                                            {
                                                title: 'Story title 2',
                                                author: 'Author',
                                                recordedAt: '27-9-2022',
                                                lat: 31.4646435,
                                                lon: 74.2889282,
                                            },
                                            {
                                                title: 'Story title 3',
                                                author: 'Author',
                                                recordedAt: '27-9-2022',
                                                lat: 31.4646435,
                                                lon: 74.2889282,
                                            },
                                            {
                                                title: 'Story title 4',
                                                author: 'Author',
                                                recordedAt: '27-9-2022',
                                                lat: 31.4646435,
                                                lon: 74.2889282,
                                            },
                                            {
                                                title: 'Story title 5',
                                                author: 'Author',
                                                recordedAt: '27-9-2022',
                                                lat: 31.4646435,
                                                lon: 74.2889282,
                                            },
                                        ]);
                                    }, 1000);
                                },
                            },
                        },
                    ],
                },
            ];
            return dom;
        }
    }
});