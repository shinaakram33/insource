ACE.mod('Audio', function (ace) {
    var is = ace.is,
        log = ace.log,
        now = ace.now,
        all = ace.all,
        que = ace.que,
        ext = ace.ext,
        tic = ace.tic,
        utl = ace.get.v('utl'),
        env = ace.get.v('env'),
        DOM = ace.get.v('dom'),
        ACI = ace.get.v('aci'),
        COM = ace.get.v('com'),
        CFG = ace.get.v('cfg');

    var ele;

    return Audio;

    function Audio(cfg) {
        let id = cfg.id || 'audio-' + now() * 10, //fix
            playerId = id + '-player',
            media = cfg.media,
            aci = {
                set: {
                    media: loadMedia,
                },
                exe: {
                    play: playMedia,
                    pause: pauseMedia,
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
        } //ini()

        function iniDom() {
            let dom = {
                typ: 'audio',
                cls: 'op-player__media',
                id: playerId,
                controls: 'controls',
                playsinline: 'playsinline',
                ini: (m) => {
                    playerACI = m;
                    iniAudio();
                },
            };
            if (media) {
                dom.dom = {
                    typ: 'source',
                    src: media,
                    type: 'audio/mp3',
                };
            }
            return dom;
        } //iniDom()

        function iniAudio() {
            const p = new OpenPlayerJS(playerId);
            p.init();
        }

        function loadMedia(v) {
            const player = OpenPlayerJS.instances[playerId];
            player.src = media = v;
            player.load();

            setTimeout(() => {
                player.play();
            }, 250);
        } //loadMedia()

        function playMedia() {
            const player = OpenPlayerJS.instances[playerId];
            player?.play();
        }

        function pauseMedia() {
            const player = OpenPlayerJS.instances[playerId];
            player?.pause();
        }
    } //Audio()
});
