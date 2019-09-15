;( function( window ) {

	'use strict';

	function extend( a, b ) {
		for( var key in b ) {
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function switcher( elm, opt ) {
		this.elm = elm;
		this.opt = extend( {}, this.opt );
  		extend( this.opt, opt );
  		this._init();
	}

	switcher.prototype.opt = {
		start : 0
	};

	switcher.prototype._init = function() {
		// tabs elemes
		this.tabs = [].slice.call( this.elm.querySelectorAll( '.submenitem' ) );
		// content items
		this.items = [].slice.call( this.elm.querySelectorAll( '.rcol' ) );
		// current index
		this.current = -1;
		// show current content item
		this._show();
		// init events
		this._initEvents();
	};

	switcher.prototype._initEvents = function() {
		var self = this;
		this.tabs.forEach( function( tab, idx ) {
			tab.addEventListener( 'click', function( ev ) {
				ev.preventDefault();
				self._show( idx );
			} );
		} );
	};

	switcher.prototype._show = function( idx ) {
		if( this.current >= 0 ) {
			this.tabs[ this.current ].className = 'submenitem';
			this.items[ this.current ].className = 'rcol';
		}
		// change current
		this.current = idx != undefined ? idx : this.opt.start >= 0 && this.opt.start < this.items.length ? this.opt.start : 0;
		this.tabs[ this.current ].className = 'submenitem tcurrent';
		this.items[ this.current ].className = 'rcol pccurrent';
	};

	// add to global namespace
	window.switcher = switcher;

})( window );
