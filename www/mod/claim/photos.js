ACE.mod('photos', function(ace){
    ace.get('mod', 'mod/SwapContent.js');
    return photos;

    function photos(cfg){
        let id = cfg.id || '',
        photosACI, selectedPhotosACI, pictureSource, destinationType,
        aci = {
            set: {
                img: setDat
            },
            get: {
                dat: getDat
            }
        },
        ux = {
            id,
            aci,
            dom: iniDom(),
            ini: (m)=> {
                cfg.ini(m);
                photosACI = m;
            }
        };
        return ux;

        function iniDom(){
            let dom = [
                {
                    typ: 'form',
                    cls: 'mx-2 mt-3',
                    dom: [
                        {
                            cls: 'form-text',
                            lbl: "If you would like to submit any photos with this claim, please do it here"
                        },
                        {
                            typ: 'a',
                            lbl: 'TAKE PHOTO',
                            cls: 'w-100 text-center border-0 mt-3 nextBtn',    
                            ini: (m)=> {takephotoACI = m},
                            on: {
                                click: ()=> {
                                    cfg.setImage();
                                }
                            }
                        },
                        {
                            lbl: 'SELECT PHOTOS FROM LIBRARY',
                            cls: 'w-100 text-center border-0 mt-3 nextBtn',   
                            typ: 'input',
                            id: 'formFile',
                            type: 'file',
                            accept: 'image/*',
                            name: 'image',
                            multiple: true,
                            ini: (m) => {
                                fileACI = m; 
                            },
                            on:{
                                change: (e)=> {
                                   
                                    for(let element of e.target.files){
                                        selectedPhotosACI.add({
                                                    typ: 'img',
                                                    src: URL.createObjectURL(element),
                                                    alt:'img/website.png',
                                                    cls: 'mx-1 float-start',
                                                    css: {w: '25%', h: '30%'},
                                        })
                                    }
                                }
                            }
                        },
                        {
                            cls: 'form-text mt-3',
                            lbl: "Selected photos:"
                        },
                        {
                            cls: 'h-100',
                            ini: (m)=> {selectedPhotosACI = m}
                        }
                    ]
                }
            ]
            return dom;
        }

        function setDat(){
            try{
                pictureSource=navigator.camera.PictureSourceType;
                destinationType=navigator.camera.DestinationType;
                navigator.camera.getPicture(onSuccess, onFail,
                     {  quality: 20,
                        destinationType: Camera.DestinationType.DATA_URL ,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        mediaType: Camera.MediaType.PICTURE,
                        encodingType: Camera.EncodingType.JPEG
                });
                function onSuccess(imageURI) {
                    selectedPhotosACI.add('dom',{
                        typ: 'img',
                        src: "data:image/jpeg;base64,"+imageURI,
                        alt:'img/website.png',
                        cls: 'mx-1 float-start',
                        css: {w: '25%', h: '30%'},
                    });
                }
            
                function onFail(message) {
                    alert('Failed because: ' + message);
                }
            }catch(e){

                alert('error', e);
            }

        }

        function getDat(){}
    }
})