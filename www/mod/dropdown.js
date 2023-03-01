ACE.mod("dropdown", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/claim/createClaim.js");
  ace.get("mod", "mod/Dat.js");
  return dropdown;

  function dropdown(cfg) {
    let id = cfg.id || "main-menu",
      dropdownACI,
      formACI,
      swap,
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
          dropdownACI = m;
        },
      };

    return ux;

    function iniDom() {
      let dom = [
        {
          dom: [
            {
              dom: [
                {
                  typ: "form",
                  cls: "form-group",
                  dom: [
                    {
                      typ: "label",
                      for: "address_id",
                      cls: "control-label my-2",
                      lbl: "City:",
                    },
                    {
                      typ: "select",
                      cls: "form-control",
                      dom: [
                        {
                          typ: "option",
                          value: "Lahore",
                          lbl: "Lahore",
                        },
                        {
                          typ: "option",
                          value: "Islamabad",
                          lbl: "Islamabad",
                        },
                        {
                          typ: "option",
                          value: "Faisalabad",
                          lbl: "Faisalabad",
                        },
                        {
                          typ: "option",
                          value: "Karachi",
                          lbl: "Karachi",
                        },
                      ],
                      on: {
                        change: () => {
                          cfg.dummy("TDC");
                        },
                      },
                      ini: (m) => {
                        formACI = m;
                      },
                    },
                  ],
                },
              ],
            },
            // {
            //   cls: "form-group text-center",
            //   dom: [
            //     {
            //       typ: "button",
            //       type: "submit",
            //       cls: "btn btn-primary",
            //       lbl: "Submit",
            //       on: {
            //         click: () => {
            //           formMess();
            //         },
            //       },
            //     },
            //   ],
            // },
          ],
        },
        // {
        //   cls: "dropdown",
        //   dom: [
        //     {
        //       typ: "a",
        //       cls: "dropdown-toggle",
        //       href: "#",
        //       "data-bs-toggle": "dropdown",
        //       lbl: "Dropdown",
        //     },
        //     {
        //       cls: "dropdown-menu",
        //       dom: [
        //         { typ: "a", cls: "dropdown-item", href: "#", lbl: "Action" },
        //         {
        //           typ: "a",
        //           cls: "dropdown-item",
        //           href: "#",
        //           lbl: "Another action",
        //         },
        //       ],
        //     },
        //   ],
        // },
        // <div class="dropdown">
        //   <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
        //     Dropdown
        //   </a>
        //   <div class="dropdown-menu">
        //     <a href="#" class="dropdown-item">
        //       Action
        //     </a>
        //     <a href="#" class="dropdown-item">
        //       Another action
        //     </a>
        //   </div>
        // </div>,
      ];
      return dom;
    }

    function setDat() {
      formACI.set("val", "Islamabad");
    }

    function getDat() {}
  }
});
