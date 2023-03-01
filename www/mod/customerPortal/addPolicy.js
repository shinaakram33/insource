ACE.mod("addPolicy", function (ace) {
  return addPolicy;

  function addPolicy(cfg) {
    let id = cfg.id || "add-policy",
      addPolicyACI,
      policyNumberACI,
      accessCodeACI,
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
          addPolicyACI = m;
        },
      };
    return ux;

    function iniDom() {
      let dom = [
        {
          cls: "m-2",
          dom: [
            {
              cls: "fw-bold h4 my-3",
              lbl: "Add Policy:",
            },
            {
              typ: "form",
              cls: "mx-2 mt-3",
              dom: [
                {
                  cls: "form-text",
                  lbl: "Policy Number",
                },
                {
                  cls: "form-control inputField mb-3",
                  typ: "input",
                  type: "text",
                  ini: (m) => {
                    policyNumberACI = m;
                  },
                },
                {
                  cls: "form-text mt-2",
                  lbl: "Access Code",
                },
                {
                  cls: "form-control inputField",
                  typ: "input",
                  type: "text",
                  ini: (m) => {
                    accessCodeACI = m;
                  },
                },
              ],
            },
            {
              cls: "mt-3",
              style: "margin-right: 5%",
              dom: {
                typ: "button",
                lbl: "Add Policy",
                cls: "float-end nextBtn",
                ini: (m) => {
                  nextBtnACI = m;
                },
                on: {
                  click: () => {
                    submitPolicy();
                  },
                },
              },
            },
          ],
        },
      ];
      return dom;
    }

    function setDat() {
      policyNumberACI.set("val", "");
      accessCodeACI.set("val", "");
    }

    function getDat() {
      return {
        policy_number: policyNumberACI.get.v("val"),
        access_code: accessCodeACI.get.v("val"),
      };
    }

    function submitPolicy() {
      ace.ini.itm(
        {
          aspect: "itm",
          cmd: "ini",
          typ: "policy",
          v: getDat(),
        },
        function (dat) {
          alert("claim submitted successfully");
          setDat();
        }
      );
    }
  }
});
