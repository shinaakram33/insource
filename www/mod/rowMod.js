ACE.mod("rowMod", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  //   ace.get("mod", "mod/claim/claim.js");
  ace.get("mod", "mod/Dat.js");
  return rowMod;

  function rowMod(cfg) {
    let id = cfg.id || "main-menu",
      rowModACI,
      columnACI,
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
          rowModACI = m;
        },
      });

    return ux;

    function iniDom() {
      let colDom = [];
      cfg.columns?.forEach((element) => {
        colDom.push({
          mod: "columnMod",
          label: element.label,
          colClass: element.colClass,
          on: {
            click: () => {
              cfg.click();
            },
          },
        });
      });
      let dom = [
        {
          typ: "table",
          style: "width:100%",
          dom: [
            {
              typ: "tr",
              dom: [
                { typ: "td", lbl: "Emil" },
                { typ: "td", lbl: "Tobias" },
                { typ: "td", lbl: "Linus" },
              ],
            },
          ],
        },

        {
          lbl: cfg.label,
          cls: cfg.row,
          dom: colDom,
          ini: (m) => {
            columnACI = m;
          },
        },
      ];
      return dom;
    }
    function addDat(data) {
      //array of objects
      columnACI.add({
        cls: element.col,
        lbl: element.lbl,
      });
    }
  }
});
