var core = (function() {
	
	var register, start, startAll, stop, stopAll,
		boot, debug, log, publish, subscribe, unsubscribe;
	
	var moduleData = {}, // module instances stored
		channels = {},
		debug = true;    // enable debugging feature
		
	register =  function(moduleId, creator) {
		if (typeof moduleId === 'string' && typeof creator === 'function') {
			moduleData[moduleId].creator = creator;
			moduleData[moduleId].instance = null;
		} else {
			log("Module '" + moduleId + "': REGISTRATION FAILED", 1);
		}
	};
	
	start = function(moduleId) {
		if (typeof moduleId === 'string') {
			var data = moduleData[moduleId];
			if(data) {
				data.instance = data.creator(new Sandbox(this));
				data.instance.init();
			}
		} else {
			log("start method FAILED: ModuleId is of incorrect format.");
		}
	};
	
	startAll = function() {
		var moduleId;
		for (moduleId in moduleData) {
			if (moduleData.hasOwnProperty(moduleId)) {
				start(moduleId);
			}
		}
	};
	
	stop = function(moduleId) {
		if (typeof moduleId === 'string') {
			var data = moduleData[moduleId];
			if(data) {
				data.instance.destroy();
				data.instance = null;
			}
		} else {
			log("stop method FAILED: ModuleId is of incorrect format.");
		}
	};
	
	stopAll = function() {
		var moduleId;
		for (moduelId in moduleData) {
			if (moduleData.hasOwnProperty(moduleId)) {
				stop(moduleId);
			}
		}
	};
	
	boot = function() {
		startAll();
	};
	
	debug = function(on) {
		debug = on ? true : false;
	};
	
	log = function(message, severity) {
		var method = (severity || severity == 1) ? 'log' : (severity == 2) ? 'warn' : 'error';
		console[method](message);
	};
	
	publish = function(topic, data) {
		var subscriptions = channels[topic];
		if (subscriptions) {
			for (var i = 0; i < subscriptions.length; i++) {
				var item = subscriptions[i];
				item.callback.call(item.context, data);
			}
		}
	};
	
	subscribe = function(topic, fn, target) {
		target = target || this;
		var subscriptions = channels[topic] || [];
		subscriptions.push({callback: fn, context: target});
		channels[topic] = subscriptions;
	};
	
	unsubscribe = function(topic, evt, target) {
		target = target || this;
		var subscriptions = channels[topic] || [];
		for(var index = 0; index < subscriptions.length; index++) {
			if (subscriptions[index].callback == fn && subscriptions[index].context == target){
				break;
			}
		}
		subscriptions.splice(index, 1);
		channels[topic] = subscriptions;
	};
	
	// dom methods
	query = function(selector, context) {
		var elems;
		if (context && context.find) {
			elems = context.find(selector);
		} else {
			elems = jQuery(selector);
		}
		var ret = elems.get();
			ret.length = elems.length;
	};
	
	bind = function(element, evt, fn) {
		if (typeof evt === 'function') {
			fn = evt;
			evt = 'click';
		}
		jQuery(elem).bind(evt, fn);
	};
	
	unbind = function(element, evt, fn) {
		if (typeof evt === 'function') {
			fn = evt;
			evt = 'click';
		}
		jQuery(elem).unbind(evt, fn);
	}
	
	return {		
		register: register,
		start: start,
		stop: stop,
		startAll: startAll,
		stopAll: stopAll,
		log: log,
		debug: debug,
		publish: publish,
		subscribe: subscribe,
		unsubscribe: unsubscribe,
		boot: boot
	};
}());