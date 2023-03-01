ACE.mod("formTest", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/claim/createClaim.js");
  ace.get("mod", "mod/Dat.js");
  return formTest;

  function formTest(cfg) {
    let id = cfg.id || "main-menu",
      formTestACI,
      companyACI,
      phoneACI,
      addTextACI,
      formACI,
      swap;
    (aci = {
      set: {
        dat: setDat,
        itm: setItm,
      },
      get: {
        dat: getDat,
      },
    }),
      (ux = {
        id,
        aci,
        dom: iniDom(),
        ini: (m) => {
          cfg.ini(m);
          formTestACI = m;
        },
      });

    return ux;

    function iniDom() {
      let dom = [
        {
          typ: "form",
          dom: [
            {
              cls: "form-outline my-2",
              dom: [
                {
                  typ: "label",
                  cls: "form-label",
                  for: "form6Example3",
                  lbl: "Company name:",
                },
                {
                  typ: "input",
                  cls: "form-control",
                  type: "text",
                  id: "form6Example3",
                  placeholder: "Add Company",
                  ini: (m) => {
                    companyACI = m;
                  },
                },
              ],
            },
            {
              cls: "form-outline my-2",
              dom: [
                {
                  typ: "label",
                  cls: "form-label",
                  for: "form6Example6",
                  lbl: "Phone:",
                },
                {
                  typ: "input",
                  cls: "form-control",
                  type: "number",
                  id: "form6Example6",
                  placeholder: "Add Phone Number",
                  ini: (m) => {
                    phoneACI = m;
                  },
                },
              ],
            },
            {
              cls: "form-outline my-2",
              dom: [
                {
                  typ: "label",
                  cls: "form-label",
                  for: "form6Example7",
                  lbl: "Additional information:",
                },
                {
                  typ: "textarea",
                  cls: "form-control",
                  id: "form6Example7",
                  rows: "4",
                  ini: (m) => {
                    addTextACI = m;
                  },
                  placeholder: "Add Text Here",
                },
              ],
            },
          ],
        },
      ];
      return dom;
    }

    function setDat() {
      companyACI.set("val", "");
      phoneACI.set("val", "");
      addTextACI.set("val", "");
    }

    function getDat() {
      return {
        companyName: companyACI.get.v("val"),
        phoneNum: phoneACI.get.v("val"),
        addText: addTextACI.get.v("val"),
      };
    }

    function setItm(data) {
      companyACI.set("val", data);
    }
  }
});
