ACE.mod("inputMod", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  //   ace.get("mod", "mod/claim/claim.js");
  ace.get("mod", "mod/Dat.js");
  return inputMod;

  function inputMod(cfg) {
    let id = cfg.id || "main-menu",
      inputModACI,
      inputACI,
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
          inputModACI = m;
        },
      });

    return ux;

    function iniDom() {
      let dom = [
        {
          typ: cfg.typ,
          type: cfg.type,
          cls: cfg.cls,
          id: cfg.id,
          placeholder: cfg.placeholder,
          ini: (m) => {
            inputACI = m;
          },
        },
      ];
      return dom;
    }
    function addDat(data) {
      //array of objects
      inputACI.add({
        typ: cfg.typ,
        type: cfg.type,
        cls: cfg.cls,
        id: cfg.id,
        placeholder: cfg.placeholder,
      });
    }
  }
});
