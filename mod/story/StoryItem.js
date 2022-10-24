ACE.mod('StoryItem', function (ace) {
    var now = ace.now;

    ace.get('mod', 'mod/rating/Rate.js');
    ace.get('mod', 'mod/Audio.js');

    return StoryItem;

    function StoryItem(cfg) {
        let {
                id = 'story-item' + now(),
                audioRating = 0,
                relevRating = 0,
                complRating = 0,
                title,
                author,
                recordedAt,
                audio,
                lat,
                lon,
            } = cfg,
            cls = 'story-item',
            titleACI,
            authorACI,
            recordedAtACI,
            latACI,
            lonACI,
            rateACIList = [],
            aci = {
                get: {
                    dat: getCfg,
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

        function setDat(v) {
            if (!v) return;
            rateACIList[0].set('dat', v.audioRating);
            rateACIList[1].set('dat', v.relevRating);
            rateACIList[2].set('dat', v.complRating);
            titleACI.set('dat', v.title);
            authorACI.set('dat', 'By ' + v.author);
            recordedAtACI.set('dat', 'Date Recorded: ' + v.recordedAt);
            latACI.set('dat', 'Location: ' + v.lat);
            lonACI.set('dat', ', ' + v.lon);
        }

        function getCfg() {
            return {
                id,
                audioRating: rateACIList[0].get.v('dat').rating,
                relevRating: rateACIList[1].get.v('dat').rating,
                complRating: rateACIList[2].get.v('dat').rating,
                title,
                author,
                recordedAt,
                lat,
                lon,
                audio
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
                                                        lbl: 'By ' + author,
                                                        ini: (m) => {
                                                            authorACI = m;
                                                        },
                                                    },
                                                    {
                                                        lbl: 'Date Recorded: ' + recordedAt,
                                                        ini: (m) => {
                                                            recordedAtACI = m;
                                                        },
                                                    },
                                                    {
                                                        dom: [
                                                            {
                                                                typ: 'span',
                                                                lbl: 'Location: ' + lat,
                                                                ini: (m) => {
                                                                    latACI = m;
                                                                },
                                                            },
                                                            {
                                                                typ: 'span',
                                                                lbl: ', ' + lon,
                                                                ini: (m) => {
                                                                    lonACI = m;
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
                                                        media: "https://iftheseroadscouldtalk.com/aud/"+audio,
                                                        //'https://ccrma.stanford.edu/~jos/mp3/Latin.mp3',
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
