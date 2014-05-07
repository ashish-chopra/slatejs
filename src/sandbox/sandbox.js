var sandbox = function(core) {
	var ignore, request;
	
	return {
		find: function(selector, context) {
			return core.dom.query(selector, context);
		},
		notify: function(topic, data) {
			core.publish(topic, data);
		},
		listen: function(topic, data) {
			core.subscribe(topic, data);
		},
		bind: function(element, evt, fn) {
			core.dom.bind(element, evt, fn);
		},
		unbind: function(element, evt, fn) {
			core.dom.unbind(element, evt, fn);
		},
		ignore: ignore,
		request: request
	};
	
};