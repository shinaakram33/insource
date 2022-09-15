ACE.mod('StoryList', function (ace) {
    var now = ace.now;

    ace.get('mod', 'mod/story/StoryItem.js');

    return StoryList;

    function StoryList(config) {
        let id = config.id || 'story-list' + now(),
            cls = 'story-list',
            ux = {
                id,
                cls: cls + ' m-3 d-flex justify-content-center',
                dom: iniDom(),
                ini: config.ini,
            };

        return ux;

        function iniDom() {
            let dom = [
                {
                    mod: 'StoryItem',
                },
                {
                    mod: 'StoryItem',
                },
                {
                    mod: 'StoryItem',
                },
                {
                    mod: 'StoryItem',
                },
                {
                    mod: 'StoryItem',
                },
            ];
            return dom;
        }
    }
});
