ACE.mod("policyDocs", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/claim/createClaim.js");
  ace.get("mod", "mod/Dat.js");
  return policyDocs;

  function policyDocs(cfg) {
    let id = cfg.id || "main-menu",
      policyDocsACI,
      formACI,
      swap;
    (aci = {
      set: {
        dat: setDat,
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
          policyDocsACI = m;
        },
      });

    return ux;

    function iniDom() {
      let dom = [
        {
          cls: "p-2",
          dom: [
            {
              dom: [
                {
                  cls: "fw-bold my-2 h4",
                  lbl: "All Policy Documents",
                },
                {
                  cls: "my-2",
                  lbl: "Documents are generally available by the next business day.",
                },
                {
                  cls: " my-2 polDescr",
                  lbl: "OFP assumes no liability for any errors in the information contained within the Portal.   All content is provided as is without warranty of any kind.",
                },
              ],
            },
            {
              cls: "clalimTableCont",
              dom: [
                {
                  cls: "mt-3 clalimTable",
                  dom: [
                    {
                      cls: "m-2 text-break",
                      dom: [
                        {
                          cls: "row",
                          dom: [
                            {
                              typ: "a",
                              cls: "tabelHr fw-bold col-2",
                              lbl: "File#",
                            },
                            {
                              typ: "a",
                              cls: "tabelHr fw-bold col-2",
                              lbl: "Claim#",
                            },
                            {
                              typ: "a",
                              cls: "tabelHr fw-bold col-3",
                              lbl: "Document",
                            },
                            {
                              typ: "a",
                              cls: "tabelHr fw-bold col-3",
                              lbl: "Insured",
                            },
                            {
                              typ: "a",
                              cls: "tabelHr fw-bold col-2",
                              lbl: "DATE",
                            },
                          ],
                        },
                        {
                          cls: "row",
                          dom: [
                            {
                              cls: "tabelDAt col-2",
                              lbl: "7230588",
                            },
                            {
                              cls: "tabelDAt col-2",
                              lbl: "-",
                            },
                            {
                              typ: "a",
                              cls: "tabelDAt col-3",
                              lbl: "Dwelling Fire Replacement Certificate",
                            },
                            {
                              cls: "tabelDAt col-3",
                              lbl: "FENDERSON CAROL",
                            },
                            {
                              cls: "tabelDAt col-2",
                              lbl: "12-31-2022",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
      return dom;
    }

    function setDat() {}

    function getDat() {}
  }
});
