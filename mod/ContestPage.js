ACE.mod('ContestPage', function (ace) {
    var now = ace.now,
        is = ace.is;

    return ContestPage;

    function ContestPage(cfg) {
        let {
                id = 'contest-page-' + now(),
                img,
                desc,
                start,
                end,
            } = cfg,
            imageACI,
            dateStartACI,
            dateEndACI,
            descACI,
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
            v.img && imageACI.set('src', './img/' + v.img);
            v.desc && descACI.set('lbl', v.desc);
            v.start && dateStartACI.set('lbl', v.start);
            v.end && dateEndACI.set('lbl', 'WINNERS ANNOUNCED ' + v.end.toUpperCase());
        }

        function getDat() {
            //todo
        }

        function iniDom() {
            let dom = [
                { cls: 'p-2 bg-dark d-block' },
                {
                    cls: 'h-100 d-inline-block',
                    style: 'width: 100%; background-color: var(--green);',
                    dom: [
                        {
                            typ: 'img',
                            src: './img/' + img,
                            css: { w: '500px' },
                            cls: 'mx-auto d-block',
                            ini: (m) => {
                                imageACI = m;
                            },
                        },
                        {
                            typ: 'h2',
                            cls: 'fw-bolder text-center text-black mt-3',
                            lbl: start,
                            ini: (m) => {
                                dateStartACI = m;
                            },
                        },
                        {
                            typ: 'p',
                            cls: 'text-center text-black p-3 col col-lg-9 mx-auto',
                            lbl: desc,
                            ini: (m) => {
                                descACI = m;
                            },
                        },
                        {
                            typ: 'h3',
                            cls: 'fw-bolder text-center text-white mt-3 mb-4 fst-italic',
                            lbl: 'WINNERS ANNOUNCED ' + end,
                            ini: (m) => {
                                dateEndACI = m;
                            },
                        },
                    ],
                },
            ];
            return dom;
        }
    }
})