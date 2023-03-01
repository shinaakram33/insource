ACE.mod("policyAndAgency", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/claim/createClaim.js");
  ace.get("mod", "mod/Dat.js");
  return policyAndAgency;

  function policyAndAgency(cfg) {
    let id = cfg.id || "main-menu",
      policyAndAgencyACI,
      policyAndAgencyModACI,
      formACI,
      swap;
    (aci = {
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
          policyAndAgencyModACI = m;
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
                  cls: "fw-bold mt-2 h6",
                  lbl: "Primary Policy Contact",
                },
                {
                  cls: "mt-3 descripton",
                  dom: [
                    {
                      lbl: "CHRISTINE JONES",
                    },
                    {
                      lbl: "Work: 614-777-9311",
                    },
                  ],
                },
              ],
            },
            {
              dom: [
                {
                  cls: "fw-bold mt-3 h6",
                  lbl: "Agency Contact",
                },
                {
                  cls: "mt-3 descripton",
                  dom: [
                    {
                      lbl: "TESTING AGENCY 5144",
                    },
                    {
                      lbl: "614-823-6056",
                    },
                  ],
                },
              ],
            },
          ],
          ini: (m) => {
            policyAndAgencyACI = m;
          },
        },
      ];
      return dom;
    }

    function addDat() {
      policyAndAgencyACI.add([
        {
          dom: [
            {
              cls: "fw-bold mt-2 h6",
              lbl: "Primary Policy Contact",
            },
            {
              cls: "mt-3 descripton",
              dom: [
                {
                  lbl: "CHRISTINE JONES",
                },
                {
                  lbl: "Work: 614-777-9311",
                },
              ],
            },
          ],
        },
        {
          dom: [
            {
              cls: "fw-bold mt-3 h6",
              lbl: "Agency Contact",
            },
            {
              cls: "mt-3 descripton",
              dom: [
                {
                  lbl: "TESTING AGENCY 5144",
                },
                {
                  lbl: "614-823-6056",
                },
              ],
            },
          ],
        },
      ]);
    }
  }
});
