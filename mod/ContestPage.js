ACE.mod('ContestPage', function (ace) {
    var now = ace.now,
        is = ace.is;

    return ContestPage;

    function ContestPage(cfg) {
        let id = cfg.id || 'contest-page-' + now(),
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
                { cls: 'p-2 bg-dark d-block' },
                {
                    cls: 'h-100 d-inline-block',
                    style: 'width: 100%; background-color: var(--green);',
                    dom: [
                        {
                            typ: 'img',
                            src: './img/FEARLESS TRAILS Web contest page.jpeg',
                            css: { w: '500px' },
                            cls: 'mx-auto d-block',
                        },
                        {
                            typ: 'h2',
                            cls: 'fw-bolder text-center text-black mt-3',
                            lbl: 'October 15-December 15, 2022',
                        },
                        {
                            typ: 'p',
                            cls: 'text-center text-black p-3 col col-lg-9 mx-auto',
                            lbl: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora temporibus, nihil obcaecati accusantium similique nesciunt exercitationem doloremque consequatur totam, eos voluptas ut assumenda atque odio magnam iusto! Distinctio amet saepe quibusdam? Autem, tenetur nesciunt recusandae iure dolore aliquam. Omnis impedit sed nemo id porro autem quia nobis, neque, ad quaerat tempora reprehenderit cupiditate eveniet delectus corporis asperiores animi iusto sit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, suscipit praesentium dolorum, reprehenderit error excepturi esse sit, tempore impedit ex ullam quaerat cupiditate ipsam fuga illum aliquam ratione aliquid saepe ab rerum maiores placeat perspiciatis possimus! Aliquid mollitia sed enim.',
                        },
                        {
                            typ: 'h3',
                            cls: 'fw-bolder text-center text-white mt-3 mb-4 fst-italic',
                            lbl: 'WINNERS ANNOUNCED JANUARY 1,2023',
                        },
                    ],
                },
            ];
            return dom;
        }
    }
})