ACE.mod("detailPolicyPayment", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  return moduleName;

  function moduleName(cfg) {
    let id = cfg.id || "",
      detailPolicyPayment,
      detailPolicyPaymentACI;
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
          detailPolicyPayment = m;
        },
      });
    return ux;

    function iniDom() {
      let dom = [
        {
          cls: "m-3",
          dom: [
            {
              typ: "p",
              cls: "mt-2 ",
              id: "policyPaymentStatus",
              dom: [
                {
                  cls: "fw-bold h6",
                  lbl: "Payment Status:",
                },
                {
                  cls: "d-flex",
                  dom: [
                    {
                      cls: "me-3 descripton",
                      lbl: "Binder",
                    },
                    {
                      typ: "a",
                      lbl: "(View Document)",
                      cls: "descripton",
                      href: "https://www.ohiofairplan.com/",
                    },
                  ],
                },
              ],
            },
            {
              typ: "p",
              id: "policyReceivedTerm",
              dom: [
                {
                  cls: "fw-bold ,h6",
                  lbl: "Payment received this term:",
                },
                {
                  cls: "d-flex justify-content-between mt-2",
                  dom: [
                    {
                      dom: [
                        {
                          cls: "fw-bold h6 text-decoration-underline",
                          lbl: "Received",
                        },
                        {
                          cls: "descripton",
                          lbl: "1/2/2023",
                        },
                        {
                          cls: "descripton",
                          lbl: "1/3/2023",
                        },
                      ],
                    },

                    {
                      dom: [
                        {
                          cls: "fw-bold h6 text-decoration-underline",
                          lbl: "Amount",
                        },
                        {
                          cls: "descripton",
                          lbl: "$900.00",
                        },
                        {
                          cls: "descripton",
                          lbl: "$900.00",
                        },
                      ],
                    },
                    {
                      dom: [
                        {
                          cls: "fw-bold h6 text-decoration-underline",
                          lbl: "Check#",
                        },
                        {
                          cls: "descripton",
                          lbl: "1234",
                        },
                        {
                          cls: "descripton",
                          lbl: "1234",
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            {
              typ: "p",
              cls: "mt-2",
              id: "policyPaymentStatus",
              dom: [
                {
                  cls: "fw-bold",
                  lbl: "Coverage:",
                },
                {
                  cls: "d-flex justify-content-between my-2 ",
                  dom: [
                    {
                      dom: [
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
                    {
                      dom: [
                        {
                          cls: "descripton",
                          lbl: "$400,000",
                        },
                        {
                          cls: "descripton",
                          lbl: "$400,000",
                        },
                        {
                          cls: "descripton",
                          lbl: "$400,000",
                        },
                        {
                          cls: "descripton",
                          lbl: "$400,000",
                        },
                        {
                          cls: "descripton",
                          lbl: "$400,000",
                        },
                        {
                          cls: "descripton",
                          lbl: "$400,000",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          ini: (m) => {
            detailPolicyPaymentACI = m;
          },
        },
      ];
      return dom;
    }

    function addDat() {
      detailPolicyPaymentACI.add([
        {
          typ: "p",
          cls: "mt-2 ",
          id: "policyPaymentStatus",
          dom: [
            {
              cls: "fw-bold h6",
              lbl: "Payment Status:",
            },
            {
              cls: "d-flex",
              dom: [
                {
                  cls: "me-3 descripton",
                  lbl: "Binder",
                },
                {
                  typ: "a",
                  lbl: "(View Document)",
                  cls: "descripton",
                  href: "https://www.ohiofairplan.com/",
                },
              ],
            },
          ],
        },
        {
          typ: "p",
          id: "policyReceivedTerm",
          dom: [
            {
              cls: "fw-bold ,h6",
              lbl: "Payment received this term:",
            },
            {
              cls: "d-flex justify-content-between mt-2",
              dom: [
                {
                  dom: [
                    {
                      cls: "fw-bold h6 text-decoration-underline",
                      lbl: "Received",
                    },
                    {
                      cls: "descripton",
                      lbl: "1/2/2023",
                    },
                    {
                      cls: "descripton",
                      lbl: "1/3/2023",
                    },
                  ],
                },

                {
                  dom: [
                    {
                      cls: "fw-bold h6 text-decoration-underline",
                      lbl: "Amount",
                    },
                    {
                      cls: "descripton",
                      lbl: "$900.00",
                    },
                    {
                      cls: "descripton",
                      lbl: "$900.00",
                    },
                  ],
                },
                {
                  dom: [
                    {
                      cls: "fw-bold h6 text-decoration-underline",
                      lbl: "Check#",
                    },
                    {
                      cls: "descripton",
                      lbl: "1234",
                    },
                    {
                      cls: "descripton",
                      lbl: "1234",
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          typ: "p",
          cls: "mt-2",
          id: "policyPaymentStatus",
          dom: [
            {
              cls: "fw-bold",
              lbl: "Coverage:",
            },
            {
              cls: "d-flex justify-content-between my-2 ",
              dom: [
                {
                  dom: [
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
                {
                  dom: [
                    {
                      cls: "descripton",
                      lbl: "$400,000",
                    },
                    {
                      cls: "descripton",
                      lbl: "$400,000",
                    },
                    {
                      cls: "descripton",
                      lbl: "$400,000",
                    },
                    {
                      cls: "descripton",
                      lbl: "$400,000",
                    },
                    {
                      cls: "descripton",
                      lbl: "$400,000",
                    },
                    {
                      cls: "descripton",
                      lbl: "$400,000",
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
