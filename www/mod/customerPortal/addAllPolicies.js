ACE.mod("addAllPolicies", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/claim/createClaim.js");
  ace.get("mod", "mod/Dat.js");
  return addAllPolicies;

  function addAllPolicies(cfg) {
    let id = cfg.id || "main-menu",
      addAllPoliciesACI,
      allPoliciesACI,
      formACI,
      swap,
      aci = {
        add: {
          dat: addDat,
        },
      };
    ux = {
      id,
      aci,
      dom: iniDom(),
      ini: (m) => {
        cfg.ini(m);
        addAllPoliciesACI = m;
      },
    };

    return ux;

    function iniDom() {
      let dom = [
        {
          cls: "p-2",
          dom: [
            {
              dom: [
                {
                  cls: "fw-bold mb-2 h4",
                  lbl: "Customer Portal",
                },
              ],
            },
            {
              cls: "mt-3",
              dom: [
                { cls: "h6 fw-bold", lbl: "Last 18 Months of Activity" },
                {
                  cls: "m-2 text-break",
                  dom: [
                    {
                      cls: "row",
                      dom: [
                        {
                          typ: "a",
                          href: "#",
                          cls: "tabelHr fw-bold col-3",
                          lbl: "NAME",
                          on: {
                            click: () => {
                              cfg.updateColumn();
                            },
                          },
                        },
                        {
                          typ: "a",
                          href: "#",
                          cls: "tabelHr fw-bold col-3",
                          lbl: "PROPERTY",
                        },
                        {
                          typ: "a",
                          href: "#",
                          cls: "tabelHr fw-bold col-2",
                          lbl: "FILE#",
                        },
                        {
                          typ: "a",
                          href: "#",
                          cls: "tabelHr fw-bold col-2",
                          lbl: "STATUS",
                        },
                        {
                          typ: "a",
                          href: "#",
                          cls: "tabelHr fw-bold col-2",
                          lbl: "DATE",
                        },
                      ],
                    },
                    {
                      cls: "row",
                      dom: [
                        {
                          cls: "tabelDAt col-3",
                          lbl: "Carolyn",
                        },
                        {
                          cls: "tabelDAt col-3",
                          lbl: "Abc defjadha ajkdasd",
                        },
                        {
                          typ: "a",
                          href: "#",
                          cls: "tabelDAt col-2",
                          lbl: 78654,
                          on: {
                            click: () => {
                              cfg.policyDetails(78654);
                            },
                          },
                        },
                        {
                          cls: "tabelDAt col-2",
                          lbl: "Pending",
                        },
                        {
                          cls: "tabelDAt col-2",
                          lbl: "12-02-2023",
                        },
                      ],
                    },
                  ],
                  ini: (m) => {
                    allPoliciesACI = m;
                  },
                },
              ],
            },
          ],
        },
      ];
      return dom;
    }

    function addDat(data) {
      //array of objects
      data.forEach((element) => {
        //element is object and each object will have multiple properties.
        allPoliciesACI.add({
          cls: "row",
          dom: [
            {
              cls: "tabelDAt col-3",
              lbl: element.name,
            },
            {
              cls: "tabelDAt col-3",
              lbl: element.property,
            },
            {
              typ: "a",
              href: "#",
              cls: "tabelDAt col-2",
              lbl: element.file,
              on: {
                click: () => {
                  cfg.policyDetails(element.file);
                },
              },
            },
            {
              cls: "tabelDAt col-2",
              lbl: element.status,
            },
            {
              cls: "tabelDAt col-2",
              lbl: element.date,
            },
          ],
        });
      });
    }
  }
});
