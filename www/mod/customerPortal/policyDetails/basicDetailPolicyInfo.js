ACE.mod("basicDetailPolicyInfo", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/navBar.js");

  return basicDetailPolicyInfo;

  function basicDetailPolicyInfo(cfg) {
    let id = cfg.id || "",
      deatilPolicy,
      basicDetailPolicyInfoACI,
      aci = {
        add: {
          dat: addDat,
        },
      },
      ux = {
        id,
        aci,
        dom: iniDom(),
        ini: (m) => {
          cfg.ini(m);
          basicDetailPolicyInfoACI = m;
        },
      };
    return ux;

    function iniDom() {
      let dom = [
        {
          cls: "m-3",
          dom: [
            {
              cls: "my-2 d-flex",
              id: "policyName",
              dom: [
                {
                  cls: "fw-bold h6 me-3",
                  lbl: "Name on Policy:",
                },
                {
                  cls: "descripton",
                  lbl: "CAROLYN",
                },
              ],
            },
            {
              cls: "d-flex mb-2",
              id: "policyNumber",
              dom: [
                {
                  cls: "fw-bold h6 me-3",
                  lbl: "Policy Number:",
                },
                {
                  cls: "descripton",
                  lbl: "745334",
                },
              ],
            },

            {
              cls: "d-flex mb-2",
              id: "policyStatus",
              dom: [
                {
                  cls: "fw-bold h6 me-3",
                  lbl: "Status:",
                },
                {
                  cls: "descripton",
                  lbl: "inforce",
                },
              ],
            },

            {
              cls: "d-flex mb-2",
              id: "policyTerm",
              dom: [
                {
                  cls: "fw-bold h6 me-3",
                  lbl: "Policy term:",
                },
                {
                  cls: "descripton",
                  lbl: "6/8/2020 - 6/8/2020",
                },
              ],
            },

            {
              cls: "mb-2",
              id: "policyAddress",
              dom: [
                {
                  cls: "fw-bold h6 me-3",
                  lbl: "Property Address:",
                },
                {
                  cls: "descripton",
                  lbl: "12105 PARKHILL AVE CLEVELAND OH 44120-3031",
                },
              ],
            },

            {
              cls: "mb-2",
              id: "policyInsuredMailing",
              dom: [
                {
                  cls: "fw-bold h6 me-3",
                  lbl: "Insured Mailing Information:",
                },
                {
                  cls: "descripton ",
                  lbl: "12105 PARKHILL AVE CLEVELAND OH 44120-3031",
                },
              ],
            },

            {
              cls: "mb-2",
              id: "policytotal",
              dom: [
                {
                  cls: "fw-bold h6 mt-4",
                  lbl: "Total Permium:",
                },
                {
                  cls: "descripton ms-2 ",
                  lbl: "$90",
                },
              ],
            },
            {
              cls: "mb-2",
              id: "policyMortgagees",
              dom: [
                {
                  cls: "d-flex justify-content-between mt-4 mb-2 ",
                  dom: [
                    {
                      dom: [
                        {
                          cls: "fw-bold h6",
                          lbl: "Mortgagees:",
                        },
                        {
                          cls: "descripton",
                          lbl: "DWELLING",
                        },
                        {
                          cls: "descripton",
                          lbl: "Household Personal Property",
                        },
                        {
                          cls: "descripton",
                          lbl: "Hay in the field",
                        },
                        {
                          cls: "descripton",
                          lbl: "Machines",
                        },
                        {
                          cls: "descripton",
                          lbl: "Farm stuff",
                        },
                        {
                          cls: "descripton",
                          lbl: "Deductible",
                        },
                      ],
                    },
                  ],
                },
                {
                  cls: "mt-4 mb-2",
                  id: "policyAdditionalInsured",
                  dom: [
                    {
                      cls: "fw-bold h6 me-3 mt-2",
                      lbl: "Additional Insured:",
                    },
                    {
                      cls: "descripton",
                      lbl: "(none)",
                    },
                  ],
                },
              ],
            },
          ],
          ini: (m) => {
            basicDetailPolicyInfoACI = m;
          },
        },
      ];
      return dom;
    }

    function addDat(data) {
      basicDetailPolicyInfoACI.add([
        {
          cls: "my-2 d-flex",
          id: "policyName",
          dom: [
            {
              cls: "fw-bold h6 me-3",
              lbl: "Name on Policy:",
            },
            {
              cls: "descripton",
              lbl: "CAROLYN",
            },
          ],
        },
        {
          cls: "d-flex mb-2",
          id: "policyNumber",
          dom: [
            {
              cls: "fw-bold h6 me-3",
              lbl: "Policy Number:",
            },
            {
              cls: "descripton",
              lbl: "745334",
            },
          ],
        },

        {
          cls: "d-flex mb-2",
          id: "policyStatus",
          dom: [
            {
              cls: "fw-bold h6 me-3",
              lbl: "Status:",
            },
            {
              cls: "descripton",
              lbl: "inforce",
            },
          ],
        },

        {
          cls: "d-flex mb-2",
          id: "policyTerm",
          dom: [
            {
              cls: "fw-bold h6 me-3",
              lbl: "Policy term:",
            },
            {
              cls: "descripton",
              lbl: "6/8/2020 - 6/8/2020",
            },
          ],
        },

        {
          cls: "mb-2",
          id: "policyAddress",
          dom: [
            {
              cls: "fw-bold h6 me-3",
              lbl: "Property Address:",
            },
            {
              cls: "descripton",
              lbl: "12105 PARKHILL AVE CLEVELAND OH 44120-3031",
            },
          ],
        },

        {
          cls: "mb-2",
          id: "policyInsuredMailing",
          dom: [
            {
              cls: "fw-bold h6 me-3",
              lbl: "Insured Mailing Information:",
            },
            {
              cls: "descripton ",
              lbl: "12105 PARKHILL AVE CLEVELAND OH 44120-3031",
            },
          ],
        },

        {
          cls: "mb-2",
          id: "policytotal",
          dom: [
            {
              cls: "fw-bold h6 mt-4",
              lbl: "Total Permium:",
            },
            {
              cls: "descripton ms-2 ",
              lbl: "$90",
            },
          ],
        },
        {
          cls: "mb-2",
          id: "policyMortgagees",
          dom: [
            {
              cls: "d-flex justify-content-between mt-4 mb-2 ",
              dom: [
                {
                  dom: [
                    {
                      cls: "fw-bold h6",
                      lbl: "Mortgagees:",
                    },
                    {
                      cls: "descripton",
                      lbl: "DWELLING",
                    },
                    {
                      cls: "descripton",
                      lbl: "Household Personal Property",
                    },
                    {
                      cls: "descripton",
                      lbl: "Hay in the field",
                    },
                    {
                      cls: "descripton",
                      lbl: "Machines",
                    },
                    {
                      cls: "descripton",
                      lbl: "Farm stuff",
                    },
                    {
                      cls: "descripton",
                      lbl: "Deductible",
                    },
                  ],
                },
              ],
            },
            {
              cls: "mt-4 mb-2",
              id: "policyAdditionalInsured",
              dom: [
                {
                  cls: "fw-bold h6 me-3 mt-2",
                  lbl: "Additional Insured:",
                },
                {
                  cls: "descripton",
                  lbl: "(none)",
                },
              ],
            },
          ],
        },
      ]);
    }
  }
});
