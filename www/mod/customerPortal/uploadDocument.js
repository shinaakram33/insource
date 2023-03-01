ACE.mod("uploadDocument", function (ace) {
  return uploadDocument;

  function uploadDocument(cfg) {
    let id = cfg.id || "upload-document",
      uploadDocumentModACI,
      yourNameACI,
      yourEmailACI,
      claimNumACI,
      youAreACI,
      insuredProACI,
      noteAboutACI,
      useFiledACI,
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
        ini: (m) => {
          cfg.ini(m);
          uploadDocumentModACI = m;
        },
      };
    return ux;

    function iniDom() {
      let dom = [
        {
          typ: "h4",
          lbl: "<b>Upload Files</b>",
          cls: "mx-2 mt-3",
        },
        {
          typ: "form",
          cls: "mx-2 mt-3",
          dom: [
            {
              cls: "form-text",
              lbl: "Your Name:",
            },
            {
              cls: "form-control inputField mb-3",
              typ: "input",
              type: "text",
              ini: (m) => {
                yourNameACI = m;
              },
            },
            {
              cls: "form-text mt-2",
              lbl: "Your Email:",
            },
            {
              cls: "form-control inputField",
              typ: "input",
              type: "text",
              ini: (m) => {
                yourEmailACI = m;
              },
            },
            {
              cls: "form-text mt-2",
              lbl: "You Are:",
            },
            {
              cls: "form-control inputField",
              typ: "input",
              type: "text",
              ini: (m) => {
                youAreACI = m;
              },
            },
            {
              cls: "form-text mt-2",
              lbl: "Claim Number: ",
            },
            {
              cls: "form-control inputField",
              typ: "input",
              type: "text",
              ini: (m) => {
                claimNumACI = m;
              },
            },
            {
              cls: "form-text mt-2",
              lbl: "Insured Property Zip Code: ",
            },
            {
              cls: "form-control inputField",
              typ: "input",
              type: "text",
              ini: (m) => {
                insuredProACI = m;
              },
            },
            {
              cls: "form-text mt-2",
              lbl: "Notes about Files:",
            },
            {
              cls: "form-control inputField",
              typ: "input",
              type: "text",
              ini: (m) => {
                noteAboutACI = m;
              },
            },
            {
              cls: "form-text my-3",
              lbl: "Use the filed below to attach a file. There is no limit to number of files. Size allowed is 10 MB and supported formats are : JPG, PNG, GIF, TIF, BMP, PDF, JPEG",
            },
            {
              cls: "form-control inputField",
              typ: "input",
              type: "file",
              ini: (m) => {
                useFiledACI = m;
              },
            },
          ],
        },
        {
          cls: "mt-3",
          style: "margin-right: 5%",
          dom: {
            typ: "button",
            lbl: "Upload",
            cls: "float-end nextBtn",
            ini: (m) => {
              nextBtnACI = m;
            },
            on: {
              click: () => {
                submitPolicy();
              },
            },
          },
        },
      ];
      return dom;
    }

    function setDat() {
      yourNameACI.set("val", "");
      yourEmailACI.set("val", "");
      youAreACI.set("val", "");
      claimNumACI.set("val", "");
      insuredProACI.set("val", "");
      noteAboutACI.set("val", "");
      useFiledACI.set("val", "");
    }

    function getDat() {
      return {
        your_name: yourNameACI.get.v("val"),
        your_email: yourEmailACI.get.v("val"),
        you_are: youAreACI.get.v("val"),
        claim_num: claimNumACI.get.v("val"),
        insured_property: insuredProACI.get.v("val"),
        note_about: noteAboutACI.get.v("val"),
        use_filed: useFiledACI.get.v("val"),
      };
    }

    function submitPolicy() {
      getDat();
      setDat();
    }
  }
});
