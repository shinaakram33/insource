ACE.mod('ContentUpload', function (ace) {
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

    ace.get('mod', '/mod/LeafMap.js');

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
            lonACI,
            formACI,
            mapACI,
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
            let dom = [
                {
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
                                                for: 'formTitle',
                                                cls: 'form-label',
                                                lbl: 'Title',
                                            },
                                            {
                                                typ: 'input',
                                                id: 'formTitle',
                                                cls: 'form-control',
                                                required: 'required',
                                                ini: (m) => {
                                                    titleACI = m;
                                                },
                                            },
                                            {
                                                cls: 'invalid-feedback',
                                                lbl: 'Please provide a valid title.',
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
                                                required: 'required',
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
                                                for: 'formAuthor',
                                                cls: 'form-label',
                                                lbl: 'Author',
                                            },
                                            {
                                                typ: 'input',
                                                id: 'formAuthor',
                                                cls: 'form-control',
                                                required: 'required',
                                                ini: (m) => {
                                                    authorACI = m;
                                                },
                                            },
                                            {
                                                cls: 'invalid-feedback',
                                                lbl: 'Please provide a valid author name.',
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
                                                accept: '.pdf',
                                                required: 'required',
                                                on: {
                                                    change: (e) => {
                                                        console.log(
                                                            e.target.files[0]
                                                                .size
                                                        );
                                                    },
                                                },
                                                ini: (m) => {
                                                    fileACI = m;
                                                },
                                            },
                                            {
                                                cls: 'invalid-feedback',
                                                lbl: 'Please select a PDF document.',
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
                                                accept: 'audio/*',
                                                required: 'required',
                                                ini: (m) => {
                                                    audioACI = m;
                                                },
                                            },
                                            {
                                                cls: 'invalid-feedback',
                                                lbl: 'Please select an audio file.',
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
                                                required: 'required',
                                                ini: (m) => {
                                                    textACI = m;
                                                },
                                            },
                                            {
                                                cls: 'invalid-feedback',
                                                lbl: 'Please provide a text story.',
                                            },
                                        ],
                                    },
                                    {
                                        cls: 'row mb-3',
                                        dom: [
                                            {
                                                cls: 'col-md-6',
                                                dom: [
                                                    {
                                                        typ: 'label',
                                                        cls: 'form-label',
                                                        for: 'formLat',
                                                        lbl: 'Latitude',
                                                    },
                                                    {
                                                        typ: 'input',
                                                        cls: 'form-control',
                                                        id: 'formLat',
                                                        readonly: 'readonly',
                                                        ini: (m) => {
                                                            latACI = m;
                                                        },
                                                    },
                                                ],
                                            },
                                            {
                                                cls: 'col-md-6',
                                                dom: [
                                                    {
                                                        typ: 'label',
                                                        cls: 'form-label',
                                                        for: 'formLon',
                                                        lbl: 'Longitude',
                                                    },
                                                    {
                                                        typ: 'input',
                                                        cls: 'form-control',
                                                        id: 'formLon',
                                                        readonly: 'readonly',
                                                        ini: (m) => {
                                                            lonACI = m;
                                                        },
                                                    },
                                                ],
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
                                                click: (e) => {
                                                    const o = getData();
                                                    console.log(o);
                                                    // submit(o);
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    cls: 'col-5 m-4',
                    dom: {
                        mod: 'LeafMap',
                        // loc: loc,
                        // zoom: zoom,
                        ini: function (m) {
                            window.mapACI = mapACI = m;
                            iniMap();
                        },
                        modes: {
                            iniTour: function (e) {
                                log('Tour');
                            },
                            getLoc: function (e) {
                                log('Loc');
                            },
                            dft: function (e) {
                                var latlng = e.latlng,
                                    lat = latlng.lat,
                                    lon = latlng.lng,
                                    loc = { lat, lon };
                                log('Default', e);
                                loc.zoom = 17; // Fix.
                                setLoc(loc);
                                pauseTracking = 1;
                                // addMsg('*** mapACI CLICKED! loc: ', loc);
                            },
                        },
                    },
                },
            ];
            return dom;
        }

        function setLoc(v, r) {
            var poi = (v && is.obj(v)) || '',
                lat = poi.lat,
                lon = poi.lon,
                loc = { lat, lon },
                msg = 'lat: ' + lat + ', lon: ' + lon + ' -- ';

            latACI.set('val', lat);
            lonACI.set('val', lon);
            mapACI.set('loc', v, r); // Fix. Manage parameters.
            // outputDiv.set('lbl',msg+now());
        } //setLoc()

        function iniMap() {
            //nothing here yet
        }
    }
});
