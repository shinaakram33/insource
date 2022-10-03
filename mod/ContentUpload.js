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

    const SELECT_AUDIO_OR_TEXT_ERROR = "Please select an audio file or enter the story as text below.";
    const FILE_TOO_LARGE_ERROR = "File size should not be greater than 10 MB.";
    const FILE_SIZE = 10000000;
    const BACKEND_URL = "https://iftheseroadscouldtalk.com/";

    ace.get('mod', '/mod/LeafMap.js');
    ace.get('mod', '/mod/Gps.js');

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
            storyErrorACI,
            textACI,
            latACI,
            lonACI,
            formACI,
            mapACI,
            gpsACI,
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

        getGps();

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
                cls: 'row',
                dom: [
                    {
                        cls: 'card col m-4',
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
                                                    name: 'title',
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
                                                    name: 'desc',
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
                                                    name: 'author',
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
                                                    lbl: 'Upload Image',
                                                },
                                                {
                                                    typ: 'input',
                                                    id: 'formFile',
                                                    type: 'file',
                                                    cls: 'form-control',
                                                    accept: 'image/*',
                                                    required: 'required',
                                                    name: 'image',
                                                    ini: (m) => {
                                                        fileACI = m;
                                                    },
                                                },
                                                {
                                                    cls: 'invalid-feedback',
                                                    lbl: 'Please select an image.',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    dom: [
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
                                                    accept: '.mp3',
                                                    name: 'audio',
                                                    ini: (m) => {
                                                        audioACI = m;
                                                    },
                                                    on: {
                                                        change: (e) => {
                                                            if (audioACI.get.v('val') !== '') {
                                                                if (e.target.files[0].size > FILE_SIZE) {
                                                                    audioACI.add('cls', 'is-invalid');
                                                                    storyErrorACI.set(
                                                                        'lbl',
                                                                        FILE_TOO_LARGE_ERROR
                                                                    );
                                                                } else {
                                                                    storyErrorACI.set(
                                                                        'lbl',
                                                                        SELECT_AUDIO_OR_TEXT_ERROR
                                                                    );
                                                                    audioACI.add('cls', 'is-valid');
                                                                    audioACI.rem('cls', 'is-invalid');
                                                                    textACI.rem('cls', 'is-invalid');
                                                                }
                                                            }
                                                        },
                                                    },
                                                },
                                                {
                                                    cls: 'invalid-feedback',
                                                    ini: (m) => {
                                                        storyErrorACI = m;
                                                    },
                                                    lbl: SELECT_AUDIO_OR_TEXT_ERROR,
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
                                                    name: 'text',
                                                    ini: (m) => {
                                                        textACI = m;
                                                    },
                                                    on: {
                                                        change: (e) => {
                                                            if (textACI.get.v('val') !== '') {
                                                                textACI.add('cls', 'is-valid');
                                                                textACI.rem('cls', 'is-invalid');
                                                                if (
                                                                    audioACI.get.v('ele').files[0]?.size >
                                                                    FILE_SIZE
                                                                ) {
                                                                    audioACI.add('cls', 'is-invalid');
                                                                    storyErrorACI.set(
                                                                        'lbl',
                                                                        FILE_TOO_LARGE_ERROR
                                                                    );
                                                                } else {
                                                                    audioACI.rem('cls', 'is-invalid');
                                                                }
                                                            }
                                                        },
                                                    },
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
                                                            name: 'lat',
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
                                                            name: 'lon',
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
                                                    click: handleSubmit,
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                    {
                        cls: 'col m-4',
                        dom: {
                            mod: 'LeafMap',
                            // loc: loc,
                            // zoom: zoom,
                            ini: function (m) {
                                window.mapACI = mapACI = m;
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
                                },
                            },
                        },
                    },
                ],
            };
            return dom;
        }

        async function handleSubmit(e) {
            let form = formACI.get.v('ele');
            let isValid = form.checkValidity();
            form.classList.add('was-validated');
            const o = getData();
            storyErrorACI.set('lbl', SELECT_AUDIO_OR_TEXT_ERROR);
            if (o.text === '' && o.audio === '') {
                textACI.set('cls', 'is-invalid');
                audioACI.set('cls', 'is-invalid');
                isValid = false;
            } else {
                if (audioACI.get.v('ele').files[0]?.size > FILE_SIZE)
                {
                    audioACI.add('cls', 'is-invalid');
                    storyErrorACI.set('lbl', FILE_TOO_LARGE_ERROR);
                    isValid = false;
                } else {
                    textACI.rem('cls', 'is-invalid');
                    audioACI.rem('cls', 'is-invalid');
                }
            }
            if (isValid) {
                const data = new FormData(form);
                data.append('audio', audioACI.get.v('ele').files[0]);
                data.append('text', textACI.get.v('val'));
                data.append('lat', latACI.get.v('val'));
                data.append('lon', lonACI.get.v('val'));
                let response = await fetch(BACKEND_URL, {
                    method: 'POST',
                    body: data,
                });
                console.log(response);
            }
        }

        function setLoc(v, r) {
            var poi = (v && is.obj(v)) || '',
                lat = poi.lat,
                lon = poi.lon;

            latACI.set('val', lat);
            lonACI.set('val', lon);
            mapACI.set('loc', v, r); // Fix. Manage parameters.
        } //setLoc()

        function getGps() {
            if (!ace.get.gps) {
                return tic(getGps);
            }
            gpsACI = ace.get.gps();
            gpsACI.add('move', handleMove);
            // gpsACI.exe('follow', 1000);
        } //getGps()

        function handleMove(pos) {
            pos.zoom = 17; // Fix.
            setLoc(pos);
        } //handleMove()
    }
});
