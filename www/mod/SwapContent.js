ACE.mod('SwapContent', function(ace){

	var is = ace.is,
		log = ace.log,
		now = ace.now,
		all = ace.all,
		ext = ace.ext,
		DOM = ace.get.v('dom'),
		ACI = ace.get.v('aci'),
		COM = ace.get.v('com'),
		utl = ace.get.v('utl'),
		ERR = utl.err;

	return SwapContent;

	// SwapContent factory: generates structure to allow switching out visibility of multiple contained divs to alternately display their content individually.
	function SwapContent(cfg){
		cfg = cfg || {};
		var id = cfg.id || 'swap-'+now(),
			cls = is.str(cfg.cls,1),
			itms = cfg.items,
			items = [0],
			keys = [''],
			refs = {0:0},
			len = getLen(),
			cur = cfg.cur,
			loc = cfg.loc,
			active,
			has = {
				items: items,
				active: active,
			},
			my = {
				keys: keys,
				refs: refs,
			},
			aci = {
				nam: 'SwapContent',
				get: {
					'act': active,
					'cur': cur,
					'len': getLen,
					'loc': getLoc,
					'ref': getRef,
					'itm': {
						int: function(v){ return items[v] || ERR('Value loc out of range', {v:v,items:items}); },
						str: function(v){ return items[getLoc(v)] || ERR('Item ref not recognized', {v:v,items:items}); },
						not: function(v){ return active || ERR('No item active', {items:items}); },
					},
				},
				set: {
					itm: setItem,
					loc: {
						int: setLoc
					},
				},
				exe: {
					next: exeNext,
					prev: exePrev,
					hideAll: hideAll,
					_: {
						int: setLoc,
					},
				},
				add: addItem,
				_: function(v) { return me.exe(v); },
			},
			cssDft = {
				display: 'none',
			},
			css = ext([cssDft,cfg.css]),
			dom = [],
			show = setShow(cfg.show),
			hide = setHide(cfg.hide),
			me;

		itms = is.arr(itms) || is.obj(itms) || [];  // Fix?  // is.str(itms,1) && DOM.get('.'+itms);  // Fix. Address latent dom generation.

		return {
			id: id,
			cls: cls,
			css: css,
			aci: aci,
			on: cfg.on,
			// dom: items,
			ini: ini,
		};


		// The ini handler called once DOM structure has been initialized.
		function ini(aci){
			me = aci;
			is.fnc(cfg.ini, me);
			buildItems();
			// hideAll(loc);

		}//ini()


		// Generates item structure and initializes module vars.
		function buildItems(){
			var len = 0,
				cnt = 0;
			all.snc(itms, function(o){
				var num = o.n + 1,
					itm = o.v,
					ref = is.str(o.k,1) || cfg.keys && cfg.keys[num-1],
					ini = itm.ini;
				if (is.obj(itm) && !itm.par) { itm.par = id; }
				itm.ini = function(m){
					// log('itm.ini() called: ',m);
					items[num] = m;  // items.push(m);
					is.fnc(ini,m);
					cnt--;
					if (!cnt) {
						complete();
					}
				};
				DOM(itm);
				// var ele = me.get.v('ele');
				// log('ele:', ele);
				// DOM({
				// 	id: 'test-ele-'+num,
				// 	lbl: 'Ref: '+ref,
				// 	par: id,
				// });
				// log('SwapContent()', {num:num,itm:itm,ref:ref,item:item,itm:itm});
				// if (!item) { return (err=1) && log('Invalid item passed.', itm); }  // Fix? How do we handle bad items as far as loc is concerned?
				if (!loc && ref && cur==ref) { loc = num; }
				if (ref && !is.num(ref) && !is.str(ref,'n') && !refs[ref]) { refs[ref]=num; }
				refs[num] = refs[ref] && ref || 0;
				// items.push(item);
				cnt++;
			});
			// cnt = len;
			loc = loc || len && 1 || 0;

			function complete(){
				// log('buildItems() Completed.');
				hideAll(loc);
				me.exe('show');  // set('css',{display:'block'});
			}//complete()

		}//buildItems()


		function getLen(){
			return items.length-1;
		}//getLen()

		function getLoc(v){
			var itm = v && is.str(v) && refs[v] || is.int(v) && items[v] && v;
			return !v && loc || itm || 0;
		}//getLoc()

		function getRef(v){
			return !is(v) && cur || is.int(v) && keys[v] || is.str(v,1) && loc || '';
		}//getRef()

		function setItem(v){
			var num = getLoc(v),
				item = items[num];
			if (item) {
				// log('setItem('+v+') resolved to '+num+', activating new item.');
				active && hide(active);
				show(item);
				return active = item;
			} else {
				return ERR('Invalid setItem value.', {v:v,num:num,items:items});
			}
		}//setItem()

		function setLoc(v){
			var len = getLen(),
				old = loc;
			// log('SWAP set.loc() from '+old+' to '+v);
			if (!len) { return ERR('Can not set loc to "'+v+'", no items in SWAP.'); }
			return is.int(v) && v>0 && v<=len && setItem(loc=v) || ERR('Bad value or out of range', {v:v,len:len});
		}//setLoc()

		function setRef(v){
			if (!is.str(v)) { return; }
		}//setLoc()

		// Hides all of the items, unless showLoc is passed
		function hideAll(showLoc){
			all.snc(items, function(o){
				var num = o.n,
					itm = o.v,
					skip = num && is.int(showLoc) && num==showLoc;
				num && (skip ? show(active=itm,num) : hide(itm,num));
			});
		}//hideAll();

		// Establishes the show method based on the input parameters.
		function setShow(v){
			return show = function(itm){
				itm && itm.exe && is.fnc(itm.exe,'show');
			};  // setMechanism(v||{display:'block'}, 'show');
		}//setShow()

		// Establishes the hide method based on the input parameters.
		function setHide(v){
			return hide = function(itm){
				itm && itm.exe && is.fnc(itm.exe,'hide');
			};  // setMechanism(v||{display:'none'}, 'hide');
		}//_hide()

		// Returns the relevant show/hide mechanism based on the input typ.
		function setMechanism(v,state){
			var fncs = {
					obj: function(itm, ref){
						// log('SwapItem.'+state+'('+(ref||'')+'): ', v);
						itm.set('css',v);
					},
					str: function(itm){ itm.add('cls',v); },
					fnc: function(itm){ v(itm); },
					_: function(itm){

					},
				},
				typ = is.typ(v),
				fnc = typ && fncs[typ] || fncs['_'];
			// Fix. Apply trans, lag, etc.
			return fnc;
		}//setMechanism()

		function addItem(){
			// Fix. Complete this.
		}//addItem()

		// Jumps to the next item, or cycles to the first if at the last item.
		function exeNext(){
			var len = getLen(),
				old = loc;
			if (!len) { return ERR('No items in SWAP.'); }
			loc = (++loc > len) ? 1 : loc;
			// log('SWAP incrementing from '+old+' to '+loc);
			return setItem(loc);
		}//exeNext()

		// Jumps to the next item, or cycles to the first if at the last item.
		function exePrev(){
			var len = getLen(),
				old = loc;
			if (!len) { return ERR('No items in SWAP.'); }
			loc = (--loc <= 0) ? len : loc;
			// log('SWAP decrementing from '+old+' to '+loc);
			return setItem(loc);
		}//exePrev()

	};//SwapContent



});