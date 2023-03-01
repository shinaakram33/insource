ACE.mod("form", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/claim/createClaim.js");
  ace.get("mod", "mod/Dat.js");

  return form;

  function form(cfg) {
    let id = cfg.id || "main-menu",
      formACI,
      dropdownACI,
      formTestACI,
      fullNameACI,
      emailACI,
      addressACI,
      navACI,
      swap;
    (aci = {
      set: {
        dat: setDat,
      },
      get: {
        dat: getDat,
      },
      add: {
        dat: addDat,
      },
    }),
      (ux = {
        id,
        aci,
        dom: iniDom(),
        ini: (m) => {
          cfg.ini(m);
          formACI = m;
        },
      });

    return ux;

    function iniDom() {
      let dom = [
        {
          cls: "sticky-top mb-2",
          dom: [
            {
              cls: "navbar-customize",
              dom: [
                {
                  typ: "nav",
                  cls: "navbar",

                  dom: [
                    {
                      cls: "container-fluid",
                      dom: [
                        {
                          typ: "a",
                          cls: "navbar-brand website-logo lead",
                          dom: [
                            { typ: "span", lbl: "Ohio FAIR Plan" },
                            { typ: "br" },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          ini: (m) => {
            navACI = m;
          },
        },
        {
          typ: "form",
          cls: " my-4",
          dom: [
            {
              cls: "form-group m-2",
              dom: [
                {
                  typ: "label",
                  for: "full_name_id",
                  cls: "control-label my-2",
                  lbl: "Full Name:",
                },
                {
                  typ: "input",
                  type: "text",
                  cls: "form-control",
                  id: "full_name_id",
                  placeholder: "John Deer",
                  ini: (m) => {
                    fullNameACI = m;
                  },
                },
                {
                  typ: "label",
                  for: "email_id",
                  cls: "control-label my-2",
                  lbl: "Email:",
                },
                {
                  typ: "input",
                  type: "email",
                  cls: "form-control",
                  id: "email_id",
                  placeholder: "name@domain.com",
                  ini: (m) => {
                    emailACI = m;
                  },
                },
                {
                  mod: "dropdown",
                  dummy,
                  ini: (m) => {
                    dropdownACI = m;
                  },
                },
                {
                  typ: "label",
                  for: "address_id",
                  cls: "control-label my-2",
                  lbl: "Address:",
                },
                {
                  typ: "input",
                  type: "Text",
                  cls: "form-control",
                  id: "address_id",
                  placeholder: "Add Address",
                  ini: (m) => {
                    addressACI = m;
                  },
                },
                {
                  mod: "formTest",
                  ini: (m) => {
                    formTestACI = m;
                  },
                },
              ],
            },
          ],
        },
        {
          cls: "form-group d-flex justify-content-around my-5",
          dom: [
            {
              typ: "button",
              type: "submit",
              cls: "btn btn-primary",
              lbl: "Submit",
              on: {
                click: () => {
                  formMess();
                  Submit();
                },
              },
            },
            {
              typ: "button",
              cls: "btn btn-primary ",
              type: "reset",
              lbl: "Reset",
              on: {
                click: () => {
                  Reset();
                },
              },
            },
            {
              typ: "button",
              cls: "btn btn-primary",
              type: "button",
              lbl: "Color",
              on: {
                click: () => {
                  Color();
                },
              },
            },
          ],
        },
      ];
      return dom;
    }

    function setDat() {
      dropdownACI.set("dat");
      formTestACI.set("dat");
      fullNameACI.set("val", "");
      emailACI.set("val", "");
      addressACI.set("val", "");
    }

    function getDat() {
      dropdownACI.get.v("dat");
      formTestACI.get.v("dat");
      fullNameACI.get.v("val", "");
      emailACI.get.v("val", "");
      addressACI.get.v("val", "");
    }

    function addDat() {
      navACI.add("cls", "bg-dark");
    }

    function formMess() {
      alert("Hello!, Your form has been submitted successfully.");
    }

    function Submit() {
      setDat();
      getDat();
      cfg.updatePolicies();
    }
    function Reset() {
      setDat();
      getDat();
    }

    function Color() {
      addDat();
    }

    function dummy(hi) {
      formTestACI.set("itm", hi);
    }
  }
});
