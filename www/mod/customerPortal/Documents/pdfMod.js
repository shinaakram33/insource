ACE.mod("pdfMod", function (ace) {
  return pdfMod;

  function pdfMod(cfg) {
    let id = cfg.id || "pdf-module",
      pdfModACI,
      ux = {
        id,
        dom: iniDom(),
        ini: (m) => {
          cfg.ini(m);
          pdfModACI = m;
        },
      };

    return ux;

    function iniDom() {
      let dom = [
        {
          cls: "pdftest",
          typ: "embed",
          src: cfg.source,
          type: "application/pdf",
        },
      ];
      return dom;
    }
  }
});
