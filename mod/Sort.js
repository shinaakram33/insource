ACE.mod('Sort', function (ace) {
    var now = ace.now,
        is = ace.is;

    return Sort;

    function Sort(cfg) {
        let id = cfg.id || 'sort-' + now(),
            items = cfg.items || [],
            itemsACI = [],
            aci = {
                set: {
                    dat: sortData,
                },
                add: {
                    dat: addData,
                },
            },
            ux = {
                id,
                aci,
                dom: iniDom(),
                ini,
            },
            me;

        return ux;

        function ini(m) {
            me = m;
            is.fnc(cfg.ini, m);
        }

        function addData(v) {
            let ini = v.ini;
            v.ini = (m) => {
                itemsACI[itemsACI.length] = m;
                is.fnc(ini,m);
            };
            items.push(v);
            me.add(v);
        }

        function iniDom() {
            let dom = [];
            items?.forEach((itm, i) => {
                let ini = itm.ini;
                itm.ini = (m) => {
					itemsACI[i] = m;
					is.fnc(ini,m);
				};
                dom.push(itm);
            });
            return dom;
        }

        function sortData(ascending) {
            let sorted = [];
            if (ascending) {
                itemsACI.sort((a, b) => a.get.v('rank') - b.get.v('rank'));
            } else {
                itemsACI.sort((a, b) => b.get.v('rank') - a.get.v('rank'));
            }
            sorted = itemsACI.map((itm, i) => ({ ...items[i], ...itm.get.v('cfg') }));
            itemsACI.forEach((itm) => itm.del());
            itemsACI = [];
            sorted.forEach((itm) => me.add(itm));
        }
        
    }
})