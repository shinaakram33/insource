ACE.mod('LandingPage', function (ace) {
    var now = ace.now,
        is = ace.is;

    return LandingPage;

    function LandingPage(cfg) {
        let id = cfg.id || 'landing-page-' + now(),
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
                            cls: 'header-image',
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
                                                        },
                                                        {
                                                            typ: 'a',
                                                            cls: 'navbar-brand contest',
                                                            dom: [
                                                                { typ: 'span', lbl: 'ENTER' },
                                                                { typ: 'br' },
                                                                { typ: 'span', lbl: 'CONTEST' },
                                                            ],
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
                                { cls: 'header-heading', lbl: 'If These Roads Could Talk' },
                            ],
                        },
                        { cls: 'saperator-bar' },
                        {
                            cls: 'map-container p-4 flex-column d-flex align-items-center justify-content-center',
                            dom: [
                                {
                                    typ: 'h1',
                                    cls: 'text-white pb-3',
                                    dom: [
                                        {
                                            typ: 'b',
                                            dom: [
                                                { typ: 'span', lbl: 'PUT YOUR ' },
                                                {
                                                    typ: 'span',
                                                    cls: 'heading-color',
                                                    dom: [
                                                        { typ: 'span', lbl: 'STORY ON THE' },
                                                        { typ: 'br' },
                                                        { typ: 'span', lbl: 'MAP CONTENT' },
                                                    ],
                                                },
                                                { typ: 'span', lbl: ' CONTEST' },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    typ: 'p',
                                    cls: 'text-white m-0 pb-1 text-center',
                                    dom: [
                                        {
                                            typ: 'b',
                                            dom: [
                                                {
                                                    typ: 'i',
                                                    dom: [
                                                        {
                                                            typ: 'span',
                                                            lbl: 'Enter your story for the chance to win a 3-night\r\n stay',
                                                        },
                                                        { typ: 'br' },
                                                        {
                                                            typ: 'span',
                                                            lbl: "at Landoll's Mohican Castel and a $250 credit !",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    typ: 'p',
                                    cls: 'w-50 text-white text-center',
                                    lbl: "Every story entered into the Fearless Trails Mobile App Contest\r\n has a chance\r\n to win prices worth over\r\n $10,000! Let us hear your voice and read your story, so it may be shared with travelers across the\r\n buckeye\r\n state.\r\n Who know's? You could win the GRAND PRIZE!",
                                },
                                {
                                    typ: 'button',
                                    cls: 'btn pb-0 ',
                                    style: 'background-color: var(--red);',
                                    dom: [
                                        {
                                            typ: 'h4',
                                            cls: 'text-white',
                                            dom: [{ typ: 'b', lbl: 'ENTER TO WIN!' }],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            cls: 'about-container',
                            dom: [
                                {
                                    cls: 'container-fluid',
                                    dom: [
                                        {
                                            cls: 'row',
                                            dom: [
                                                { cls: 'col-md-0 col-lg-2' },
                                                {
                                                    cls: 'col-md-12 col-lg-4',
                                                    dom: [
                                                        {
                                                            typ: 'img',
                                                            cls: 'phone-image',
                                                            src: 'img/phone.jpg',
                                                        },
                                                    ],
                                                },
                                                {
                                                    cls: 'col-md-12 col-lg-6 pb-3',
                                                    dom: [
                                                        {
                                                            typ: 'h1',
                                                            cls: 'about-heading',
                                                            lbl: 'About Fearless',
                                                        },
                                                        {
                                                            cls: 'about-paragraph pb-4',
                                                            lbl: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.\r\n Modi\r\n consequuntur corrupti fugiat quae, nisi est sit eveniet deleniti laudantium provident\r\n voluptatem ea nam quaerat vitae ducimus obcaecati qui ab eligendi iste dolorum impedit\r\n facere? Excepturi soluta corrupti ex impedit dolorum, maxime odit nemo enim sequi ut ea\r\n provident nobis expedita architecto dolores dignissimos labore deserunt! Error harum ad\r\n optio laudantium? Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,\r\n ab\r\n possimus! Officiis quae at aspernatur, minus illum quis maxime perspiciatis tempora amet\r\n voluptatem similique quisquam blanditiis molestias cumque ut! Ipsa!',
                                                        },
                                                        {
                                                            typ: 'button',
                                                            cls: 'btn btn-dark button-customize',
                                                            type: 'button',
                                                            lbl: 'BE FEARLESS',
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        { cls: 'exploring', dom: [{ typ: 'i', lbl: "LET'S GO EXPLORING" }] },
                        {
                            typ: 'img',
                            src: 'img/phones.jpg',
                            height: '300px',
                            width: '100%',
                            style: 'background-size: cover;',
                        },
                        {
                            cls: 'container-fluid',
                            dom: [
                                {
                                    cls: 'row g-3',
                                    dom: [
                                        {
                                            cls: 'col-md-6 col-sm-12',
                                            dom: [
                                                {
                                                    typ: 'img',
                                                    style: 'width:100% ;',
                                                    height: '400px',
                                                    src: 'img/house.jpg',
                                                },
                                            ],
                                        },
                                        {
                                            cls: 'col-md-6 col-sm-12',
                                            dom: [
                                                {
                                                    typ: 'img',
                                                    style: 'width:100% ;',
                                                    height: '400px',
                                                    src: 'img/cosi.jpg',
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ];
            return dom;
        }
    }
})