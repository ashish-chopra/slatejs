var Core = (function() {
	
	var register, start, startAll, stop, stopAll,
		boot, debug, log, publish, subscribe, unsubscribe;
	
	var moduleData = {}, // module instances stored
		channels = {},
		debug = true;    // enable debugging feature
		
	register =  function(moduleId, creator) {
		if (typeof moduleId === 'string' && typeof creator === 'function') {
			if (!moduleData[moduleId]) {
				moduleData[moduleId] = {};
				moduleData[moduleId].creator = creator;
				moduleData[moduleId].instance = null;
			} else {
				log("Registration Failed: Module with moduleId '" + moduleId + "' already exists.");
			}
			
		} else {
			log("Registration Failed: Module '" + moduleId + "' Either moduleId or creator are of incorrect formats");
		}
	};
	
	startAll = function() {
		var moduleId;
		for (moduleId in moduleData) {
			console.log("isnide startAll + " + moduleId);
			if (moduleData.hasOwnProperty(moduleId)) {
				console.log("calling start");
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
		console.log("inside boot");
		startAll();
	};
	start = function(moduleId) {
		if (typeof moduleId === 'string') {
			var data = moduleData[moduleId];
			console.log(data);
			console.log(this);
			console.log(Core);
			if(data) {
				data.instance = data.creator(new Sandbox(Core));
				data.instance.init();
			} else {
				log("Start Failed: module '" + moduleId + "' does not exist.");
			}
		} else {
			log("start method FAILED: ModuleId is of incorrect format.");
		}
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
			elems = $(selector);
		}
		/*var ret = elems.get();
			ret.length = elems.length;*/
		return elems;
	};
	
	bind = function(element, evt, fn) {
		if (typeof evt === 'function') {
			fn = evt;
			evt = 'click';
		}
		$(element).bind(evt, fn);
	};
	
	unbind = function(element, evt, fn) {
		if (typeof evt === 'function') {
			fn = evt;
			evt = 'click';
		}
		$(element).unbind(evt, fn);
	};
	
	trim = function(data) {
		if (typeof data === 'string') {
			return $.trim(data);
		}else {
			throw new Error("Illegal input format in trim()");
		}	
	};
	request = function(options) {
		
		options = options || {};
		if (options.url == undefined){
			throw new Error("Request Failed in Core: Cannot send request with undefined URL");
		}
		var method = options.method || "GET";
		var dataType = options.dataType || "json";
		$.ajax({
			url : options.url,
			type: method,
			dataType: dataType,
			success: options.success
		});
	};
	
	tmpl = function(template, data) {
		return $.tmpl(template, data);
	};
	
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
		boot: boot,
		dom : {
			query: query,
			bind: bind,
			unbind: unbind,
			trim: trim
		},
		request: request,
		tmpl: tmpl
	};
}());