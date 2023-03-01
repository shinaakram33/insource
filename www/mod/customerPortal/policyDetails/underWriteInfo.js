ACE.mod("underWriteInfo", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/claim/createClaim.js");
  ace.get("mod", "mod/Dat.js");
  return underWriteInfo;

  function underWriteInfo(cfg) {
    let id = cfg.id || "main-menu",
      underWriteInfoACI,
      underWriteInfoModACI,
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
          underWriteInfoModACI = m;
        },
      });

    return ux;

    function iniDom() {
      let dom = [
        {
          cls: "mx-3",
          dom: [
            {
              dom: [
                {
                  cls: "fw-bold mt-2 mb-4 h5",
                  lbl: "Underwriting Information:",
                },
              ],
            },

            {
              dom: [
                {
                  cls: "m-2 text-break",
                  dom: [
                    {
                      cls: "row",
                      dom: [
                        {
                          cls: "tabelHr fw-bold col-6 descriptonSub",
                          lbl: "Dwelling Construction:",
                        },
                        {
                          cls: "tabelHr col-6 descriptonSub",
                          lbl: "Frame ",
                        },
                      ],
                    },
                    {
                      cls: "row",
                      dom: [
                        {
                          cls: "tabelHr descriptonSub fw-bold col-6",
                          lbl: "Territory:",
                        },
                        {
                          cls: "tabelHr descriptonSub col-6",
                          lbl: "330",
                        },
                      ],
                    },
                    {
                      cls: "row",
                      dom: [
                        {
                          cls: "tabelHr descriptonSub fw-bold col-6",
                          lbl: "Protection Class:",
                        },
                        {
                          typ: "a",
                          href: "#",
                          cls: "tabelHr descriptonSub col-6",
                          lbl: "02",
                        },
                      ],
                    },
                    {
                      cls: "row",
                      dom: [
                        {
                          cls: "tabelHr descriptonSub fw-bold col-6",
                          lbl: "Occupancy Type: ",
                        },
                        {
                          cls: "tabelHr descriptonSub col-6",
                          lbl: "Tenant Occupied",
                        },
                      ],
                    },
                    {
                      cls: "row",
                      dom: [
                        {
                          cls: "tabelHr descriptonSub fw-bold col-6",
                          lbl: "Supplemental Heating:",
                        },
                        {
                          cls: "tabelHr descriptonSub col-6",
                          lbl: "N",
                        },
                      ],
                    },
                    {
                      cls: "row",
                      dom: [
                        {
                          cls: "tabelHr descriptonSub fw-bold col-6",
                          lbl: " Dwelling Coinsurance:",
                        },
                        {
                          cls: "tabelHr descriptonSub col-6",
                          lbl: "80%",
                        },
                      ],
                    },
                    {
                      cls: "row",
                      dom: [
                        {
                          cls: "tabelHr descriptonSub fw-bold col-6",
                          lbl: " Mine Subsidence:",
                        },
                        {
                          cls: "tabelHr descriptonSub col-6",
                          lbl: "No",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          ini: (m) => {
            underWriteInfoACI = m;
          },
        },
      ];
      return dom;
    }

    function addDat() {
      underWriteInfoACI.add([
        {
          dom: [
            {
              cls: "fw-bold mt-2 mb-4 h5",
              lbl: "Underwriting Information:",
            },
          ],
        },

        {
          dom: [
            {
              cls: "m-2 text-break",
              dom: [
                {
                  cls: "row",
                  dom: [
                    {
                      cls: "tabelHr fw-bold col-6 descriptonSub",
                      lbl: "Dwelling Construction:",
                    },
                    {
                      cls: "tabelHr col-6 descriptonSub",
                      lbl: "Frame ",
                    },
                  ],
                },
                {
                  cls: "row",
                  dom: [
                    {
                      cls: "tabelHr descriptonSub fw-bold col-6",
                      lbl: "Territory:",
                    },
                    {
                      cls: "tabelHr descriptonSub col-6",
                      lbl: "330",
                    },
                  ],
                },
                {
                  cls: "row",
                  dom: [
                    {
                      cls: "tabelHr descriptonSub fw-bold col-6",
                      lbl: "Protection Class:",
                    },
                    {
                      typ: "a",
                      href: "#",
                      cls: "tabelHr descriptonSub col-6",
                      lbl: "02",
                    },
                  ],
                },
                {
                  cls: "row",
                  dom: [
                    {
                      cls: "tabelHr descriptonSub fw-bold col-6",
                      lbl: "Occupancy Type: ",
                    },
                    {
                      cls: "tabelHr descriptonSub col-6",
                      lbl: "Tenant Occupied",
                    },
                  ],
                },
                {
                  cls: "row",
                  dom: [
                    {
                      cls: "tabelHr descriptonSub fw-bold col-6",
                      lbl: "Supplemental Heating:",
                    },
                    {
                      cls: "tabelHr descriptonSub col-6",
                      lbl: "N",
                    },
                  ],
                },
                {
                  cls: "row",
                  dom: [
                    {
                      cls: "tabelHr descriptonSub fw-bold col-6",
                      lbl: " Dwelling Coinsurance:",
                    },
                    {
                      cls: "tabelHr descriptonSub col-6",
                      lbl: "80%",
                    },
                  ],
                },
                {
                  cls: "row",
                  dom: [
                    {
                      cls: "tabelHr descriptonSub fw-bold col-6",
                      lbl: " Mine Subsidence:",
                    },
                    {
                      cls: "tabelHr descriptonSub col-6",
                      lbl: "No",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]);
    }
  }
});
