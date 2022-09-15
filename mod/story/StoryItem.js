ACE.mod('StoryItem', function (ace) {
    var now = ace.now;

    ace.get('mod', 'mod/rating/Rate.js');
    ace.get('mod', 'mod/Audio.js');

    return StoryItem;

    function StoryItem(config) {
        let id = config.id || 'story-item' + now(),
            cls = 'story-item',
            ux = {
                id,
                cls: cls + ' d-inline-block m-3',
                dom: iniDom(),
                ini: config.ini,
            };

        return ux;

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
                                            { typ: 'h5', cls: 'card-title', lbl: 'Story title' },
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
