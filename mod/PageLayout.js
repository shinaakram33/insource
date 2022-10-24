ACE.mod('PageLayout', function (ace) {
    var now = ace.now,
        is = ace.is;

    ace.get('mod', 'mod/SwapContent.js');
    ace.get('mod', 'mod/ContentUpload.js');
    ace.get('mod', 'mod/LandingPage.js');
    ace.get('mod', 'mod/ContestPage.js');
    ace.get('mod', 'mod/Contact.js');
    ace.get('mod', 'mod/story/StoryList.js');

    return PageLayout;

    function PageLayout(cfg) {
        const STORIES_URL = "https://iftheseroadscouldtalk.com/dat/dat_1853_5.js?t=1853_5&m=dat&d=eyJjbWQiOiJnZXQiLCJ0eXAiOiJzdG9yaWVzIiwiaGl0IjoxODUzLjN9";
        let { id = 'layout-' + now(), onLogin, onLogout } = cfg,
            isLoggedIn = false,
            swap,
            storiesData = getStoriesData(),
            storyListACI,
            storyACI,
            contentUploadACI,
            aci = {
                set: {
                    dat: setDat,
                    page: setPage,
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

        function setPage(v) {
            if(v === "help") {
                showContact();
            }
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
            if (isLoggedIn) {
                showContentUpload();
            } else {
                onLogout();
            }
        }

        function showContentUpload() {
            swap.set('loc', 3);
            contentUploadACI.exe('refreshMap');
        }

        function showContact() {
            swap.set('loc', 5);
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
                    cls: 'sticky-top',
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
                                                    href: 'https://iftheseroadscouldtalk.com',
                                                    target: '_blank',
                                                },
                                                {
                                                    typ: 'a',
                                                    cls: 'navbar-brand navbar-link',
                                                    dom: [
                                                        { typ: 'span', lbl: 'SUBMIT A' },  // 'EAT AND' },
                                                        { typ: 'br' },
                                                        { typ: 'span', lbl: 'STORY' },  // 'DRINK' },
                                                    ],
                                                    on: {
                                                        click: () => {
                                                            showContentUpload();
                                                        },
                                                    },
                                                },
                                                {
                                                    typ: 'a',
                                                    cls: 'navbar-brand navbar-link',
                                                    dom: [
                                                        { typ: 'span', lbl: 'PLAN YOUR' },
                                                        { typ: 'br' },
                                                        { typ: 'span', lbl: 'TRIP' },
                                                    ],
                                                    on: {
                                                        click: () => {
                                                            rateStories();
                                                        },
                                                    },
                                                },
                                                {
                                                    typ: 'a',
                                                    cls: 'navbar-brand navbar-link',
                                                    dom: [
                                                        { typ: 'span', lbl: 'CONTACT' },
                                                        { typ: 'br' },
                                                        { typ: 'span', lbl: 'US' },
                                                    ],
                                                    on: {
                                                        click: () => {
                                                            showContact();
                                                        },
                                                    },
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
                            img: 'FEARLESS TRAILS Web contest page.jpeg',
                            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora temporibus, nihil obcaecati accusantium similique nesciunt exercitationem doloremque consequatur totam, eos voluptas ut assumenda atque odio magnam iusto! Distinctio amet saepe quibusdam? Autem, tenetur nesciunt recusandae iure dolore aliquam. Omnis impedit sed nemo id porro autem quia nobis, neque, ad quaerat tempora reprehenderit cupiditate eveniet delectus corporis asperiores animi iusto sit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, suscipit praesentium dolorum, reprehenderit error excepturi esse sit, tempore impedit ex ullam quaerat cupiditate ipsam fuga illum aliquam ratione aliquid saepe ab rerum maiores placeat perspiciatis possimus! Aliquid mollitia sed enim.',
                            start: 'October 15-December 15, 2022',
                            end: 'JANUARY 1, 2023',
                            enterContest,
                        },
                        {
                            mod: 'ContentUpload',
                            storiesList: updateStorieslist,
                            ini: (m) => {
                                contentUploadACI = m;
                            },
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
                                        storyACI.set('dat', storiesData
                                        // [
                                        //     {
                                        //         title: 'Story title 1',
                                        //         author: 'Author',
                                        //         recordedAt: '27-9-2022',
                                        //         lat: 31.4646435,
                                        //         lon: 74.2889282,
                                        //     },
                                        //     {
                                        //         title: 'Story title 2',
                                        //         author: 'Author',
                                        //         recordedAt: '27-9-2022',
                                        //         lat: 31.4646435,
                                        //         lon: 74.2889282,
                                        //     },
                                        //     {
                                        //         title: 'Story title 3',
                                        //         author: 'Author',
                                        //         recordedAt: '27-9-2022',
                                        //         lat: 31.4646435,
                                        //         lon: 74.2889282,
                                        //     },
                                        //     {
                                        //         title: 'Story title 4',
                                        //         author: 'Author',
                                        //         recordedAt: '27-9-2022',
                                        //         lat: 31.4646435,
                                        //         lon: 74.2889282,
                                        //     },
                                        //     {
                                        //         title: 'Story title 5',
                                        //         author: 'Author',
                                        //         recordedAt: '27-9-2022',
                                        //         lat: 31.4646435,
                                        //         lon: 74.2889282,
                                        //     },
                                        // ]
                                        );
                                    }, 1000);

                                },
                            },
                        },
                        {
                            mod: 'Contact',
                        },
                    ],
                },
            ];
            return dom;
        }


        async function getStoriesData(){
           storiesData = await fetch(STORIES_URL).then(response => response.json())
           console.log('Hello',storiesData)
           return storiesData
        }

        function updateStorieslist(loc, data){
            storyACI.set('dat', storiesData)
            swap.set('loc', loc)
        }
    }
});
