var Sandbox = function(core) {
	this.core = core;
};

Sandbox.prototype = {
		find: function(selector, context) {
			return this.core.dom.query(selector, context);
		},
		notify: function(topic, data) {
			console.log("inside notify");
			this.core.publish(topic, data);
		},
		listen: function(topic, fn) {
			this.core.subscribe(topic, fn);
		},
		bind: function(element, evt, fn) {
			this.core.dom.bind(element, evt, fn);
		},
		unbind: function(element, evt, fn) {
			this.core.dom.unbind(element, evt, fn);
		},
		ignore: function(topic) {
			
		},
		request: function(options) {
			this.core.request(options);
		},
		trim : function(input) {
			return this.core.dom.trim(input);
		},
		tmpl : function(template, data) {
			return this.core.tmpl(template, data);
		}
};

