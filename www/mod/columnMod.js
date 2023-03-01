ACE.mod("columnMod", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  //   ace.get("mod", "mod/claim/claim.js");
  ace.get("mod", "mod/Dat.js");
  return columnMod;

  function columnMod(cfg) {
    let id = cfg.id || "main-menu",
      columnModACI,
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
          columnModACI = m;
        },
      });

    return ux;

    function iniDom() {
      let dom = [
        {
          lbl: cfg.label,
          cls: cfg.colClass,
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
