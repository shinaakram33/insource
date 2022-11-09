ACE.mod('ProjectDetailsItem', function(ace){
    return ProjectDetailsItem

    function ProjectDetailsItem(cfg){
        let id = cfg.id,
        aci = {
            set: {
                dat: setDat
            },
            get: {
                dat: getDat
            }
        },
        ux = {
            id,
            aci,
            dom: iniDom(),
            ini: (m)=> {
                cfg.ini(m)
            }
        };
        
        return ux;

        function iniDom(){
            let dom = [
                {
                    cls: 'container',
                    dom: [
                        {
                        cls: 'row',
                        dom: [
                                {
                                    cls: 'col',
                                    dom: {
                                        typ: 'button',
                                        cls: "btn btn-secondary mr-2",
                                        lbl: 'Go Back',
                                        on: {
                                            click: ()=>{}
                                        }
                                    }
                                },
                                {
                                    cls: 'col',
                                    dom: {
                                        typ: 'button',
                                        cls: "btn btn-primary float-end",
                                        lbl: 'Project Board',
                                        on: {
                                            click: ()=>{}
                                        }
                                    }       
                                }
                            ]
                        },

                        {
                            cls: 'row',
                            dom: [
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'h4',
                                            cls: '',
                                            lbl: 'Title',
                                        }
                                    },
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'span',
                                            cls: '',
                                            lbl: '',
                                            ini: (m)=>(titleACI = m)
                                        }       
                                    }
                                ]
                        },

                        {
                            cls: 'row',
                            dom: [
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'h4',
                                            cls: '',
                                            lbl: 'Description',
                                        }
                                    },
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'span',
                                            cls: '',
                                            lbl: '',
                                            ini: (m)=>(descACI = m)
                                        }       
                                    }
                                ]
                        },

                        {
                            cls: 'row',
                            dom: [
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'h4',
                                            cls: '',
                                            lbl: 'Status',
                                        }
                                    },
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'span',
                                            cls: '',
                                            lbl: '',
                                            ini: (m)=>(statusACI = m)
                                        }       
                                    }
                                ]
                        },

                        {
                            cls: 'row',
                            dom: [
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'h4',
                                            cls: '',
                                            lbl: 'Team Lead',
                                        }
                                    },
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'span',
                                            cls: '',
                                            lbl: '',
                                            ini: (m)=>(leadACI = m)
                                        }       
                                    }
                                ]
                        },

                        {
                            cls: 'row',
                            dom: [
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'h4',
                                            cls: '',
                                            lbl: 'Team Members',
                                        }
                                    },
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'span',
                                            cls: '',
                                            lbl: '',
                                            ini: (m)=>(membersACI = m)
                                        }       
                                    }
                                ]
                        },

                        {
                            cls: 'row',
                            dom: [
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'h4',
                                            cls: '',
                                            lbl: 'Repository Link',
                                        }
                                    },
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'span',
                                            cls: '',
                                            lbl: '',
                                            ini: (m)=>(repoACI = m)
                                        }       
                                    }
                                ]
                        },

                        {
                            cls: 'row',
                            dom: [
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'h4',
                                            cls: '',
                                            lbl: 'Dcoumentation Link',
                                        }
                                    },
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'span',
                                            cls: '',
                                            lbl: '',
                                            ini: (m)=>(docsACI = m)
                                        }       
                                    }
                                ]
                        },

                        {
                            cls: 'row',
                            dom: [
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'h4',
                                            cls: '',
                                            lbl: 'Google Sheet Link',
                                        }
                                    },
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'span',
                                            cls: '',
                                            lbl: '',
                                            ini: (m)=>(sheetACI = m)
                                        }       
                                    }
                                ]
                        },

                        {
                            cls: 'row',
                            dom: [
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'h4',
                                            cls: '',
                                            lbl: 'Created By',
                                        }
                                    },
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'span',
                                            cls: '',
                                            lbl: '',
                                            ini: (m)=>(createdByACI = m)
                                        }       
                                    }
                                ]
                        },

                        {
                            cls: 'row',
                            dom: [
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'h4',
                                            cls: '',
                                            lbl: 'Created At',
                                        }
                                    },
                                    {
                                        cls: 'col',
                                        dom: {
                                            typ: 'span',
                                            cls: '',
                                            lbl: '',
                                            ini: (m)=>(createdAtACI = m)
                                        }       
                                    }
                                ]
                        },
                        
                        // {
                        //     dom: [
                        //         {
                        //             typ: 'span',
                        //             lbl: '',
                        //             ini: (m)=>(titleACI = m)
                        //         },
                        //         {
                        //             typ: 'span',
                        //             lbl: '',
                        //             ini: (m)=>(descACI = m)
                        //         },
                        //         {
                        //             typ: 'span',
                        //             lbl: '',
                        //             ini: (m)=>(statusACI = m)
                        //         },
                        //         {
                        //             typ: 'span',
                        //             lbl: '',
                        //             ini: (m)=>(leadACI = m)
                        //         },
                        //         {
                        //             typ: 'span',
                        //             lbl: '',
                        //             ini: (m)=>(membersACI = m)
                        //         },
                        //         {
                        //             typ: 'a',
                        //             lbl: '',
                        //             ini: (m)=>(repoACI = m)
                        //         },
                        //         {
                        //             typ: 'a',
                        //             lbl: '',
                        //             ini: (m)=>(docsACI = m)
                        //         },
                        //         {
                        //             typ: 'a',
                        //             lbl: '',
                        //             ini: (m)=>(sheetACI = m)
                        //         },
                        //         {
                        //             typ: 'span',
                        //             lbl: 'Created at: ',
                        //             dom: {
                        //                 typ: 'span',
                        //                 lbl: '',
                        //                 ini: (m)=>(dateACI = m)
                        //             }
                        //         }
                        //     ]
                        // }
                    ]
                }
                
            ]
            return dom;
        }

        function setDat(data){
            titleACI.set('lbl', data.title)
            descACI.set('lbl', data.desc)
            statusACI.set('lbl', data.status)
            leadACI.set('lbl', data.teamLead)
            membersACI.set('lbl', data.teamMembers)
            repoACI.set('lbl', data.repo)
            docsACI.set('lbl', data.docs)
            sheetACI.set('lbl', data.sheet)
            createdAtACI.set('lbl', data.createdAt)
        }

        function getDat(){

        }
    }
})