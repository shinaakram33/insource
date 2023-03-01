ACE.mod("detailPolicyFormsList", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  return moduleName;

  function moduleName(cfg) {
    let id = cfg.id || "",
      deatilPolicy,
      detailPolicyFormsListModACI,
      detailPolicyFormsListACI;

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
          detailPolicyFormsListModACI = m;
        },
      });
    return ux;

    function iniDom() {
      let dom = [
        {
          cls: "m-3",
          dom: [
            {
              cls: "fw-bold h5 ms-1",
              lbl: "Forms",
            },
            {
              cls: "ms-4",
              dom: [
                {
                  type: "a",
                  lbl: "FP 00 12:",
                  cls: "d-block fw-bold h6 mt-3",
                  href: "#",
                },
                {
                  type: "text",
                  cls: "fs-7 href_detail descripton",
                  lbl: "FARM PROP - FARM DWELL, APPURTENANT STRUCT & HOUSHOLD PP COV",
                },
                {
                  type: "a",
                  lbl: "FP 00 13:",
                  cls: "d-block fw-bold h6 mt-3",
                  href: "#",
                },
                {
                  type: "text",
                  cls: "fs-7 href_detail descripton",
                  lbl: "FARM PROP - FARM DWELL, APPURTENANT STRUCT & HOUSHOLD PP COV",
                },
                {
                  type: "a",
                  lbl: "FP 00 14:",
                  cls: "d-block fw-bold h6 mt-3",
                  href: "#",
                },
                {
                  type: "text",
                  cls: "fs-7 href_detail descripton",
                  lbl: "FARM PROP - FARM DWELL, APPURTENANT STRUCT & HOUSHOLD PP COV",
                },
                {
                  type: "a",
                  lbl: "FP 00 15:",
                  cls: "d-block fw-bold h6 mt-3",
                  href: "#",
                },
                {
                  type: "text",
                  cls: "fs-7 href_detail descripton",
                  lbl: "FARM PROP - FARM DWELL, APPURTENANT STRUCT & HOUSHOLD PP COV",
                },
                {
                  type: "a",
                  lbl: "FP 00 16:",
                  cls: "d-block fw-bold h6 mt-3",
                  href: "#",
                },
                {
                  type: "text",
                  cls: "fs-7 href_detail descripton",
                  lbl: "FARM PROP - FARM DWELL, APPURTENANT STRUCT & HOUSHOLD PP COV",
                },
              ],
            },
          ],
          ini: (m) => {
            detailPolicyFormsListACI = m;
          },
        },
      ];
      return dom;
    }

    function addDat(data) {
      detailPolicyFormsListACI.add([
        {
          cls: "fw-bold h5 ms-1",
          lbl: "Forms",
        },
        {
          cls: "ms-4",
          dom: [
            {
              type: "a",
              lbl: "FP 00 12:",
              cls: "d-block fw-bold h6 mt-3",
              href: "#",
            },
            {
              type: "text",
              cls: "fs-7 href_detail descripton",
              lbl: "FARM PROP - FARM DWELL, APPURTENANT STRUCT & HOUSHOLD PP COV",
            },
            {
              type: "a",
              lbl: "FP 00 13:",
              cls: "d-block fw-bold h6 mt-3",
              href: "#",
            },
            {
              type: "text",
              cls: "fs-7 href_detail descripton",
              lbl: "FARM PROP - FARM DWELL, APPURTENANT STRUCT & HOUSHOLD PP COV",
            },
            {
              type: "a",
              lbl: "FP 00 14:",
              cls: "d-block fw-bold h6 mt-3",
              href: "#",
            },
            {
              type: "text",
              cls: "fs-7 href_detail descripton",
              lbl: "FARM PROP - FARM DWELL, APPURTENANT STRUCT & HOUSHOLD PP COV",
            },
            {
              type: "a",
              lbl: "FP 00 15:",
              cls: "d-block fw-bold h6 mt-3",
              href: "#",
            },
            {
              type: "text",
              cls: "fs-7 href_detail descripton",
              lbl: "FARM PROP - FARM DWELL, APPURTENANT STRUCT & HOUSHOLD PP COV",
            },
            {
              type: "a",
              lbl: "FP 00 16:",
              cls: "d-block fw-bold h6 mt-3",
              href: "#",
            },
            {
              type: "text",
              cls: "fs-7 href_detail descripton",
              lbl: "FARM PROP - FARM DWELL, APPURTENANT STRUCT & HOUSHOLD PP COV",
            },
          ],
        },
      ]);
    }
  }
});
