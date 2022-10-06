ACE.mod('Contact', function (ace) {
    var now = ace.now,
        is = (window.is = ace.is),
        log = (window.log = ace.log),
        now = (window.now = ace.now),
        all = (window.all = ace.all),
        ext = (window.ext = ace.ext),
        utl = ace.get.v('utl'),
        ERR = utl.err,
        tic = (window.tic = utl.tic),
        DOM = ace.get.v('dom'),
        ACI = ace.get.v('aci'),
        COM = ace.get.v('com'),
        cfg = ace.get.v('cfg');

    const BACKEND_URL = "https://iftheseroadscouldtalk.com/";

    return Contact;

    function Contact(cfg) {
        let id = cfg.id || 'contact-' + now(),
            submit = cfg.submit,
            cls = 'contact',
            subjectACI,
            descACI,
            emailACI,
            aci = {
                get: {
                    dat: getData,
                },
            },
            ux = {
                id,
                cls: cls + ' container-fluid',
                dom: iniDom(),
                aci,
                ini: cfg.ini,
            };

        return ux;

        function getData() {
            return {
                subject: subjectACI.get.v('val'),
                description: descACI.get.v('val'),
                email: emailACI.get.v('val'),
            };
        }

        function iniDom() {
            let dom = {
                cls: 'row',
                dom: [
                    {
                        cls: 'card col-lg-6 col-sm-8 col-11 mx-auto m-4',
                        dom: {
                            cls: 'card-body',
                            dom: [
                                {
                                    typ: 'h3',
                                    cls: 'card-title mb-4',
                                    lbl: 'Contact Us',
                                },
                                {
                                    typ: 'p',
                                    cls: 'mb-4',
                                    lbl: 'For issues with our service, additional information about our products or general inquries, please fill out the form below.  Please state the natuture of your inquiry, in the subject field, a brief description of your question or concern, a valid email so we can contact you and press the submit button.  We welcome any questions or feedback.',
                                },
                                {
                                    typ: 'form',
                                    cls: 'needs-validation',
                                    novalidate: 'novalidate',
                                    ini: (m) => {
                                        formACI = m;
                                    },
                                    dom: [
                                        {
                                            cls: 'mb-3',
                                            dom: [
                                                {
                                                    typ: 'label',
                                                    for: 'formSubject',
                                                    cls: 'form-label',
                                                    lbl: 'Subject',
                                                },
                                                {
                                                    typ: 'input',
                                                    id: 'formSubject',
                                                    cls: 'form-control',
                                                    required: 'required',
                                                    name: 'subject',
                                                    ini: (m) => {
                                                        subjectACI = m;
                                                    },
                                                },
                                                {
                                                    cls: 'invalid-feedback',
                                                    lbl: 'Please provide a valid subject.',
                                                },
                                            ],
                                        },
                                        {
                                            cls: 'mb-3',
                                            dom: [
                                                {
                                                    typ: 'label',
                                                    for: 'formDesc',
                                                    cls: 'form-label',
                                                    lbl: 'Description',
                                                },
                                                {
                                                    typ: 'textarea',
                                                    id: 'formDesc',
                                                    cls: 'form-control',
                                                    name: 'description',
                                                    required: 'required',
                                                    rows: '4',
                                                    ini: (m) => {
                                                        descACI = m;
                                                    },
                                                },
                                                {
                                                    cls: 'invalid-feedback',
                                                    lbl: 'Please provide a valid description.',
                                                },
                                            ],
                                        },
                                        {
                                            cls: 'mb-3',
                                            dom: [
                                                {
                                                    typ: 'label',
                                                    for: 'formEmail',
                                                    cls: 'form-label',
                                                    lbl: 'Email',
                                                },
                                                {
                                                    typ: 'input',
                                                    type: 'email',
                                                    id: 'formEmail',
                                                    cls: 'form-control',
                                                    name: 'email',
                                                    required: 'required',
                                                    ini: (m) => {
                                                        emailACI = m;
                                                    },
                                                },
                                                {
                                                    cls: 'invalid-feedback',
                                                    lbl: 'Please provide a valid email.',
                                                },
                                            ],
                                        },
                                        {
                                            cls: 'd-grid',
                                            dom: {
                                                typ: 'button',
                                                cls: 'btn btn-primary',
                                                type: 'submit',
                                                lbl: 'Submit',
                                                on: {
                                                    click: handleSubmit,
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                ],
            };
            return dom;
        }

        async function handleSubmit(e) {
            e.preventDefault();
            let form = formACI.get.v('ele');
            let isValid = form.checkValidity();
            form.classList.add('was-validated');
            const o = getData();
            return;
            if (isValid) {
                const data = new FormData(o);
                let response = await fetch(BACKEND_URL, {
                    method: 'POST',
                    body: data,
                });
            }
        }
    }
});
