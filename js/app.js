ACE(function (ace) {
    var DOM = ace.get.v('dom'),
        contentUploadACI,
        storyListACI;

    ace.get('mod', 'mod/ContentUpload.js');
    ace.get('mod', 'mod/story/StoryList.js');

    DOM([
        {
            typ: 'nav',
            cls: 'navbar navbar-expand-lg bg-light',
            dom: [
                {
                    cls: 'container-fluid',
                    dom: [
                        { typ: 'a', cls: 'navbar-brand', href: '#', lbl: 'Fearless Trails' },
                        {
                            typ: 'button',
                            cls: 'navbar-toggler',
                            type: 'button',
                            'data-bs-toggle': 'collapse',
                            'data-bs-target': '#navbarNav',
                            'aria-controls': 'navbarNav',
                            'aria-expanded': 'false',
                            'aria-label': 'Toggle navigation',
                            dom: [{ typ: 'span', cls: 'navbar-toggler-icon' }],
                        },
                        {
                            cls: 'collapse navbar-collapse',
                            id: 'navbarNav',
                            dom: [
                                {
                                    typ: 'ul',
                                    cls: 'navbar-nav',
                                    dom: [
                                        {
                                            typ: 'li',
                                            cls: 'nav-item',
                                            dom: [
                                                { typ: 'a', cls: 'nav-link', href: '#', lbl: 'Upload Story' },
                                            ],
                                            on: {
                                                click: () => {
                                                    contentUploadACI.set('css', { display: 'flex' });
                                                    storyListACI.set('css', { display: 'none' });
                                                },
                                            },
                                        },
                                        {
                                            typ: 'li',
                                            cls: 'nav-item',
                                            dom: [{ typ: 'a', cls: 'nav-link', href: '#', lbl: 'Rate Stories' }],
                                            on: {
                                                click: () => {
                                                    contentUploadACI.set('css', { display: 'none' });
                                                    storyListACI.set('css', { display: 'block' });
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
            id: 'main-div',
            cls: 'container-fluid',
            dom: [
                {
                    mod: 'ContentUpload',
                    ini: (m) => {
                        contentUploadACI = m;
                    },
                },
            ],
        },
        {
            css: { display: 'none' },
            ini: (m) => {
                storyListACI = m;
            },
            dom: {
                mod: 'StoryList',
            },
        },
    ]);
});
