ACE.mod("policyDetails", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/navBar.js");
  ace.get("mod", "mod/mainMenu.js");
  ace.get("mod", "mod/welcomeMain.js");
  ace.get("mod", "mod/customerPortal/addAllPolicies.js");
  ace.get("mod", "mod/customerPortal/Documents/listAllDocuments.js");
  ace.get("mod", "mod/customerPortal/policyDetails/claim.js");
  ace.get("mod", "mod/customerPortal/policyDetails/policyDetails.js");
  ace.get("mod", "mod/customerPortal/policyDetails/basicDetailPolicyInfo.js");
  ace.get("mod", "mod/customerPortal/policyDetails/policyAndAgency.js");
  ace.get("mod", "mod/customerPortal/policyDetails/detailPolicyPayment.js");
  ace.get("mod", "mod/customerPortal/policyDetails/detailPolicyFormsList.js");
  ace.get("mod", "mod/customerPortal/policyDetails/underWriteInfo.js");

  return policyDetails;

  function policyDetails(cfg) {
    let id = cfg.id || "policy-details",
      // swapItem = cfg.swapItem,
      swap,
      navBarACI1,
      policyDetailsRefACI,
      policyDetailsModACI;
    ux = {
      id,
      dom: {
        dom: iniDom(),
        ini: (m) => {
          policyDetailsRefACI = m;
        },
      },
      ini: (m) => {
        cfg.ini(m);
        policyDetailsModACI = m;
      },
    };
    return ux;

    function iniDom() {
      let dom = [
        {
          dom: {
            mod: "navBar",
            cls: "sticky-top text-center",
            id: "policy-navBar",
            hello: "my2",
            title: "Policy Details",
            ini: (m) => {
              navBarACI1 = m;
            },
            swapItem,
            itemsData: [
              {
                label: "Customer Portal",
                loc: 7,
              },
              {
                label: "Policy Basic Info",
                loc: 1,
              },
              {
                label: "Policy Payments",
                loc: 2,
              },
              {
                label: "Policy Forms",
                loc: 3,
              },
              {
                label: "Policy Claims",
                loc: 4,
              },
              {
                label: "Policy Underwritng Info",
                loc: 5,
              },
              {
                label: "Polciy Ageny Info",
                loc: 6,
              },
              {
                label: "Home",
                loc: 8,
              },
            ],
            setUserInfo,
          },
        },
        {
          mod: "SwapContent",
          ini: (m) => {
            swap = m;
          },
          loc: 1,
          items: [
            {
              mod: "basicDetailPolicyInfo",
              ini: (m) => (basicDetailPolicyInfoACI = m),
              swapItem,
            },
            {
              mod: "detailPolicyPayment",
              ini: (m) => (detailPolicyPaymentACI = m),
              swapItem,
            },
            {
              mod: "detailPolicyFormsList",
              ini: (m) => (detailPolicyFormsListACI = m),
              swapItem,
            },
            {
              mod: "claim",
              ini: (m) => (claimACI = m),
              swapItem,
            },
            {
              mod: "underWriteInfo",
              ini: (m) => (underWriteInfoModACI = m),
              swapItem,
            },
            {
              mod: "policyAndAgency",
              ini: (m) => (policyAndAgencyModACI = m),
              swapItem,
            },
          ],
        },
      ];
      return dom;
    }
    function setUserInfo() {
      setAfterLoad(() => navBarACI1);
    }
    function setAfterLoad(module) {
      if (module()) {
        policyDetailsRefACI.add();
      } else {
        return setTimeout(() => {
          setAfterLoad(module);
        }, 0);
      }
    }

    function policyDetails(data) {
      swapItem(2);
    }

    function swapItem(loc) {
      if (loc === 7) {
        cfg.swapItem(3);
      } else if (loc === 8) {
        cfg.swapItem(1);
      } else {
        swap.set("loc", loc);
      }
    }
  }
});
