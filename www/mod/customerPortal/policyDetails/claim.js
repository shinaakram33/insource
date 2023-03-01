ACE.mod("claim", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/claim/createClaim.js");
  ace.get("mod", "mod/Dat.js");
  return claim;

  function claim(cfg) {
    let id = cfg.id || "main-menu",
      claimACI,
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
          claimACI = m;
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
                  cls: "fw-bold my-2 h4",
                  lbl: "Claims:",
                },
              ],
            },

            {
              dom: [
                {
                  cls: "clalimTableCont",
                  dom: [
                    {
                      cls: "mt-2 clalimTable",
                      dom: [
                        {
                          cls: "mx-2 text-break",
                          dom: [
                            {
                              cls: "row",
                              dom: [
                                {
                                  cls: "tabelHr fw-bold col-2",
                                  lbl: "Loss Date",
                                },
                                {
                                  cls: "tabelHr fw-bold col-2",
                                  lbl: "Date Reported",
                                },
                                {
                                  cls: "tabelHr fw-bold col-2",
                                  lbl: "Claim No",
                                },
                                { cls: "tabelHr fw-bold col-2", lbl: "Cause" },
                                { cls: "tabelHr fw-bold col-2", lbl: "Status" },
                                {
                                  cls: "tabelHr fw-bold col-2",
                                  lbl: "Payments",
                                },
                              ],
                            },
                            {
                              cls: "row",
                              dom: [
                                {
                                  cls: "tabelDAt col-2",
                                  lbl: "1/20/2023",
                                },
                                {
                                  cls: "tabelDAt col-2",
                                  lbl: "1/20/2023",
                                },
                                {
                                  typ: "a",
                                  cls: "tabelDAt col-2",
                                  lbl: "160123",
                                },
                                {
                                  cls: "tabelDAt col-2",
                                  lbl: "VANDALISM & MAL MISCHIEF",
                                },
                                {
                                  cls: "tabelDAt col-2",
                                  lbl: "OPEN",
                                },
                                {
                                  cls: "tabelDAt col-2",
                                  lbl: "$0.00",
                                },
                              ],
                            },
                          ],
                        },
                        {
                          cls: "mx-2 text-break",
                          dom: [
                            {
                              cls: "row",
                              dom: [
                                {
                                  cls: "tabelDAt col-2",
                                  lbl: "1/20/2023",
                                },
                                {
                                  cls: "tabelDAt col-2",
                                  lbl: "1/20/2023",
                                },
                                {
                                  typ: "a",
                                  cls: "tabelDAt col-2",
                                  lbl: "160123",
                                },
                                {
                                  cls: "tabelDAt col-2",
                                  lbl: "VANDALISM & MAL MISCHIEF",
                                },
                                {
                                  cls: "tabelDAt col-2",
                                  lbl: "OPEN",
                                },
                                {
                                  cls: "tabelDAt col-2",
                                  lbl: "$0.00",
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
          ],
        },
      ];
      return dom;
    }

    function setDat() {}

    function getDat() {}
  }
});
