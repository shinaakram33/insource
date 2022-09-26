ACE.mod('StoryItem', function (ace) {
    var now = ace.now;

    ace.get('mod', 'mod/rating/Rate.js');
    ace.get('mod', 'mod/Audio.js');

    return StoryItem;

    function StoryItem(cfg) {
        let id = cfg.id || 'story-item' + now(),
            cls = 'story-item',
            audioRating = cfg.audioRating || 0,
            relevRating = cfg.relevRating || 0,
            complRating = cfg.complRating || 0,
            title = cfg.title,
            rateACIList = [],
            aci = {
                get: {
                    dat: getDat,
                    rank: getSortingRank,
                    cfg: getCfg,
                },
                set: {
                    dat: setDat,
                },
            },
            ux = {
                id,
                cls: cls + ' d-inline-block m-3',
                dom: iniDom(),
                aci,
                ini: cfg.ini,
            };

        return ux;

        function getDat() {
            //todo
        }

        function setDat() {
            //todo
        }

        function getCfg() {
            return {
                id,
                audioRating: rateACIList[0].get.v('dat').rating,
                relevRating: rateACIList[1].get.v('dat').rating,
                complRating: rateACIList[2].get.v('dat').rating,
                title,
            };
        }

        function getSortingRank() {
            let rated = 0;
            rateACIList.forEach(rate => {
                if (rate.get.v('isRated'))
                    rated++;
            });
            return rated;
        }

        function iniDom() {
            let dom = [
                {
                    cls: 'card',

                    dom: [
                        {
                            cls: 'row g-0',
                            dom: [
                                {
                                    cls: 'col-md-4',
                                    dom: {
                                        typ: 'img',
                                        cls: 'card-img-top',
                                        src: '/img/story.jpg',
                                        alt: '...',
                                        css: {
                                            'object-fit': 'cover',
                                            h: '100%',
                                        },
                                    },
                                },
                                {
                                    cls: 'col-md-8',
                                    dom: {
                                        cls: 'card-body',
                                        dom: [
                                            { typ: 'h5', cls: 'card-title', lbl: title },
                                            {
                                                typ: 'p',
                                                cls: 'card-text',
                                                dom: [
                                                    {
                                                        lbl: 'By Author',
                                                    },
                                                    {
                                                        lbl: 'Date Recorded: 15-09-2022',
                                                    },
                                                    {
                                                        lbl: 'Location: 38.3964, -76.86118',
                                                    },
                                                    {
                                                        css: { display: 'flex' },
                                                        dom: [
                                                            {
                                                                cls: 'me-3',
                                                                typ: 'span',
                                                                lbl: 'Audio Quality',
                                                            },
                                                            {
                                                                mod: 'Rate',
                                                                rating: audioRating,
                                                                ini: (m) => {
                                                                    rateACIList[0] = m;
                                                                },
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        css: { display: 'flex' },
                                                        dom: [
                                                            {
                                                                cls: 'me-3',
                                                                typ: 'span',
                                                                lbl: 'Relevance',
                                                            },
                                                            {
                                                                mod: 'Rate',
                                                                rating: relevRating,
                                                                ini: (m) => {
                                                                    rateACIList[1] = m;
                                                                },
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        css: { display: 'flex' },
                                                        dom: [
                                                            {
                                                                cls: 'me-3',
                                                                typ: 'span',
                                                                lbl: 'Completeness',
                                                            },
                                                            {
                                                                mod: 'Rate',
                                                                rating: complRating,
                                                                ini: (m) => {
                                                                    rateACIList[2] = m;
                                                                },
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        mod: 'Audio',
                                                        media: 'https://ccrma.stanford.edu/~jos/mp3/Latin.mp3',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    ],
                },
            ];
            return dom;
        }
    }
});
