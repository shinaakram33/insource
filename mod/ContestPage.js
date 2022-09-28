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
                { cls: 'p-3 bg-warning d-block' },
                {
                    cls: 'bg-white',
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
                                            cls: 'navbar-brand fw-bold text-center',
                                            dom: [
                                                { typ: 'span', lbl: 'FEARLESS TRIALS' },
                                                { typ: 'br' },
                                                { typ: 'span', lbl: 'LOGO HERE' },
                                            ],
                                        },
                                        {
                                            typ: 'a',
                                            cls: 'navbar-brand fw-bold text-center text-danger',
                                            dom: [
                                                { typ: 'span', lbl: 'ENTER' },
                                                { typ: 'br' },
                                                { typ: 'span', lbl: 'CONTEST' },
                                            ],
                                        },
                                        {
                                            typ: 'a',
                                            cls: 'navbar-brand fw-bold text-center text-success\r\n\r\n',
                                            dom: [
                                                { typ: 'span', lbl: 'OHIO' },
                                                { typ: 'br' },
                                                { typ: 'span', lbl: 'ADVENTURES' },
                                            ],
                                        },
                                        {
                                            typ: 'a',
                                            cls: 'navbar-brand fw-bold text-center text-success\r\n\r\n',
                                            dom: [
                                                { typ: 'span', lbl: 'EAT AND' },
                                                { typ: 'br' },
                                                { typ: 'span', lbl: 'DRINK' },
                                            ],
                                        },
                                        {
                                            typ: 'a',
                                            cls: 'navbar-brand fw-bold text-center text-success\r\n\r\n',
                                            dom: [
                                                { typ: 'span', lbl: 'PLAN YOUR' },
                                                { typ: 'br' },
                                                { typ: 'span', lbl: 'TRIP' },
                                            ],
                                        },
                                        {
                                            typ: 'a',
                                            cls: 'navbar-brand fw-bold text-center text-success\r\n\r\n',
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
                { cls: 'p-2 bg-dark d-block' },
                {
                    cls: 'h-100 d-inline-block',
                    style: 'width: 100%; background-color: var(--green);',
                    dom: [
                        {
                            cls: 'text-white fw-bold text-center lh-sm',
                            style: 'font-size: 40px;',
                            dom: [
                                { typ: 'span', lbl: 'PUT YOUR ' },
                                {
                                    typ: 'span',
                                    cls: 'text-warning',
                                    dom: [
                                        { typ: 'span', lbl: 'STORY ON' },
                                        { typ: 'br' },
                                        { typ: 'span', lbl: 'THE MAP CONTENT' },
                                    ],
                                },
                                { typ: 'br' },
                                {
                                    typ: 'h1',
                                    cls: 'lh-sm',
                                    style: 'font-size: 80px;margin-top: -10px;',
                                    lbl: 'CONTEST',
                                },
                            ],
                        },
                        {
                            cls: 'm-auto',
                            style: 'background-image: url(img/bg.jpg);height: 300px; background-size: cover;width: 400px;',
                        },
                        {
                            cls: 'fw-bolder text-center text-warning mt-3',
                            style: 'font-size: 40px;line-height: 35px;',
                            dom: [
                                { typ: 'span', lbl: 'SHARE YOUR STORY' },
                                { typ: 'br' },
                                {
                                    typ: 'span',
                                    cls: 'text-white',
                                    style: 'font-size: 30px;',
                                    lbl: '- WIN AN ADVENTURE!',
                                },
                            ],
                        },
                        {
                            typ: 'h2',
                            cls: 'fw-bolder text-center text-black mt-3',
                            lbl: 'October 15-December 15, 2022',
                        },
                        {
                            typ: 'p',
                            cls: 'text-center text-black mt-3',
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