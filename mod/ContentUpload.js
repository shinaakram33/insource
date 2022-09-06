ACE.mod('ContentUpload', function (ace) {
    var now = ace.now;
  
    return ContentUpload;
  
    function ContentUpload(cfg) {
        let id = cfg.id || 'content-upload' + now(),
            submit = cfg.submit,
            cls = 'content-upload',
            titleACI,
            descACI,
            authorACI,
            fileACI,
            audioACI,
            textACI,
            latACI,
            lonACI
            aci = {
                get: {
                    dat: getData,
                },
            },
            ux = {
                id,
                cls: cls + ' row',
                dom: iniDom(),
                aci,
                ini: cfg.ini,
            };

        return ux;

        function getData() {
            return {
                title: titleACI.get.v('val'),
                description: descACI.get.v('val'),
                author: authorACI.get.v('val'),
                file: fileACI.get.v('val'),
                audio: audioACI.get.v('val'),
                text: textACI.get.v('val'),
                lat: latACI.get.v('val'),
                lon: lonACI.get.v('val'),
            };
        }

        function iniDom() {
            let dom = {
                cls: 'card col-6 m-4',
                dom: {
                    cls: 'card-body',
                    dom: [
                        {
                            typ: 'h3',
                            cls: 'card-title mb-4',
                            lbl: 'Upload Story',
                        },
                        {
                            typ: 'form',
                            dom: [
                                {
                                    cls: 'mb-3',
                                    dom: [
                                        {
                                            typ: 'label',
                                            for: 'formTitle',
                                            cls: 'form-label',
                                            lbl: 'Title',
                                        },
                                        {
                                            typ: 'input',
                                            id: 'formTitle',
                                            cls: 'form-control',
                                            ini: (m) => {
                                                titleACI = m;
                                            },
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
                                            typ: 'input',
                                            id: 'formDesc',
                                            cls: 'form-control',
                                            ini: (m) => {
                                                descACI = m;
                                            },
                                        },
                                    ],
                                },
                                {
                                    cls: 'mb-3',
                                    dom: [
                                        {
                                            typ: 'label',
                                            for: 'formAuthor',
                                            cls: 'form-label',
                                            lbl: 'Author',
                                        },
                                        {
                                            typ: 'input',
                                            id: 'formAuthor',
                                            cls: 'form-control',
                                            ini: (m) => {
                                                authorACI = m;
                                            },
                                        },
                                    ],
                                },
                                {
                                    cls: 'mb-3',
                                    dom: [
                                        {
                                            typ: 'label',
                                            for: 'formFile',
                                            cls: 'form-label',
                                            lbl: 'File upload',
                                        },
                                        {
                                            typ: 'input',
                                            id: 'formFile',
                                            type: 'file',
                                            cls: 'form-control',
                                            ini: (m) => {
                                                fileACI = m;
                                            },
                                        },
                                    ],
                                },
                                {
                                    cls: 'mb-3',
                                    dom: [
                                        {
                                            typ: 'label',
                                            for: 'formAudio',
                                            cls: 'form-label',
                                            lbl: 'Audio upload',
                                        },
                                        {
                                            typ: 'input',
                                            id: 'formAudio',
                                            type: 'file',
                                            cls: 'form-control',
                                            ini: (m) => {
                                                audioACI = m;
                                            },
                                        },
                                    ],
                                },
                                {
                                    cls: 'mb-3',
                                    dom: [
                                        {
                                            typ: 'label',
                                            for: 'formStory',
                                            cls: 'form-label',
                                            lbl: 'Text story upload',
                                        },
                                        {
                                            typ: 'textarea',
                                            id: 'formStory',
                                            cls: 'form-control',
                                            ini: (m) => {
                                                textACI = m;
                                            },
                                        },
                                    ],
                                },
                                {
                                    cls: 'mb-3',
                                    dom: [
                                        {
                                            typ: 'label',
                                            for: 'formLat',
                                            cls: 'form-label',
                                            lbl: 'Latitude',
                                        },
                                        {
                                            typ: 'input',
                                            id: 'formLat',
                                            cls: 'form-control',
                                            type: 'number',
                                            ini: (m) => {
                                                latACI = m;
                                            },
                                        },
                                    ],
                                },
                                {
                                    cls: 'mb-3',
                                    dom: [
                                        {
                                            typ: 'label',
                                            for: 'formLon',
                                            cls: 'form-label',
                                            lbl: 'Longitude',
                                        },
                                        {
                                            typ: 'input',
                                            id: 'formLon',
                                            cls: 'form-control',
                                            type: 'number',
                                            ini: (m) => {
                                                lonACI = m;
                                            },
                                        },
                                    ],
                                },
                                {
                                    cls: 'd-grid',
                                    dom: {
                                        typ: 'button',
                                        cls: 'btn btn-primary',
                                        type: 'button',
                                        lbl: 'Submit',
                                        on: {
                                            click: () => {
                                                const o = getData();
                                                console.log(o);
                                                // submit(o);
                                            },
                                        },
                                    },
                                },
                            ],
                        }
                    ],
                },
            };
            return dom;
        }
    }
});
