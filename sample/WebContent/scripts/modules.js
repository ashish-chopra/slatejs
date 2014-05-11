Core.register("notification-module", function(sb) {
	var text, inputBar, hideButton, 
		init, destroy;
	var isLoaded = false;
	
	var constMap = {
			info : "vh-success",
			error : "vh-error",
			warning : "vh-warn",
			hideButton: "&nbsp; &nbsp;<a class='vh-hide' onclick='$(this).parent().remove()'>Hide</a>"
	};
	
	init = function() {
		if(isLoaded) {
			destroy();
		}
		inputBar = sb.find(".loader");
		sb.listen('show', showNotifications, this);
		sb.listen('hide', hideNotifications, this);
	};
	
	destroy = function() {
		sb.ignore('show', showNotifications);
		sb.ignore('hide', hideNotifications);
		inputBar = null;
		isLoaded = false;
	};
	
	showNotifications = function(evt) {
		
		var message = "Loading...";
		var level, isButton = false;
		if (evt) {
			message = evt.message ? evt.message : message;
			level = evt.level;
		}
		var cssClass = "";
		
		if (level == 1) {
			cssClass = constMap.info;
			isButton = true;
		} else if (level == 2) {
			cssClass = constMap.error;
			isButton = true;
		} else {
			cssClass = constMap.warning;
		}
		console.log(inputBar);
		var template = sb.find("<span></span>"); // replace it with createElement()
		template.append("<b>" + message + "</b>");
		if (isButton) {
			template.append(constMap.hideButton);
			template.attr("class", cssClass);	
		}
		inputBar.empty();
		inputBar.html(template);
	};
	hideNotifications = function(evt) {
		inputBar.empty();
	}
	return {
		init: init,
		destroy: destroy
	};
});

Core.register("search-module", function(sb) {
	var searchBox, searchButton, searchTemplate, validate,
		searchType,init, destroy, isLoaded = false;
	
	init = function() {
		if(isLoaded) {
			destroy();
		}
		console.log("inside init")
		searchBox = sb.find("#search-box");
		searchType = sb.find("#search-type");
		searchTemplate = sb.find("#search-template");
		console.log(searchBox);
		searchButton = sb.find("#search-button");
		sb.bind(searchButton, 'click', searchProducts);
		isLoaded = true;
	};
	
	destroy = function() {
		sb.unbind(searchButton, 'click', searchProducts);
		searchBox = searchButton = null;
		isLoaded = false;
	};
	validate = function() {
		if (sb.trim(searchBox.val()) === ""){
			sb.notify('show', {message : "Please enter the search item to proceed.", level: 2});
			return false;
		}
		return true;
	};
	searchProducts = function(evt) {
		if(validate()) {
			sb.notify('show');
			var keyword = searchBox.val();
			findItemInProducts(sb.trim(keyword));
		}
		console.log("exiting search products");
	};
	
	findItemInProducts = function(keyword) {
		console.log('inside findIntemInProducts');
		sb.request({
			url: "data/data.json",
			success : function(data) {
				var index = findInJSON(data, searchType.val(), keyword);
				if (index != -1) {
					var content = sb.tmpl(searchTemplate, data.products[index]);
					sb.notify('render', {content: content});
					sb.notify('currentSearch', {data: data.products[index]});
				} else {
					sb.notify('hide'); 
					sb.notify('currentSearch', {});
					sb.notify('render', { content:"<h4>The searched product is not available.<br/> Try the search with \"All Categories\" type selected. <br/> Note: The current version is the testing version and only few product search is functional. To know more please click on the \"Help\" link on the left side.</h4>"});
				}
			}
		});
	};

	findInJSON = function(data, type, text) {
		var items = data.products;
		for(var i = 0; i < items.length; i++) {
			var data = items[i];
			if(data.name.toLowerCase().indexOf(text.toLowerCase()) != -1){
				if(type == 0 || type == data.type){
					return i;
				}
			}
		}
		return -1;
	};
	
	return {
		init : init,
		destroy : destroy
	};
});

Core.register("rendering-module", function(sb){
	var init, destroy, contentPane, isLoaded = false;
	init = function() {
		if(isLoaded) {
			destroy();
		}
		contentPane = sb.find("#content-pane");
		sb.listen('render', renderOnScreen, this);
		isLoaded = true;
	};
	
	destroy = function() {
		sb.ignore('render', renderOnScreen, this);
		contentPane = null;
		isLoaded = false;
	};
	
	renderOnScreen = function(data) {
		contentPane.fadeOut(1000, function() {
			sb.notify('hide');
			contentPane.html(data.content).fadeIn(1000);
		});
	}
	return {
		init : init,
		destroy: destroy
	};
});

Core.register("tabs-module", function(sb) {
	var init, destroy, links, 
		isLoaded = false, 
		activeClass = "sidebar-hover";
	init = function() {
		if(isLoaded) {
			destroy();
		}
		links = sb.find(".sidebar li");
		searchTemplate = sb.find("#search-template");
		customerReviewTemplate = sb.find("#cr-template");
		compareTemplate = sb.find("#compare-template");
		sb.listen('currentSearch', getCurrentSearch, this);
		sb.bind(links, 'click', highlight);
		console.log("before render help on reboot");
		renderHelpOnBoot();
		isLoaded = true;
	};
	
	destroy = function() {
		isLoaded = false;
	};
	getCurrentSearch = function(obj) {
		if(obj.data){
			searchData = obj.data;
		} else {
			searchData = undefined;
		}
	}
	renderHelpOnBoot = function() {
		sb.request({
			url: "help.html",
			type: "GET",
			dataType: "text",
			success : function(data) {
				console.log("received success in renderHelpo");
				sb.notify('render', {content : data});
			}
		});
	};
	highlight = function() {
		var code = sb.find(this).attr("data");
			var activeLink = sb.find(this);
			links.each(function(){
				if(sb.find(this).hasClass(activeClass))
					sb.find(this).removeClass(activeClass);
			});
			activeLink.addClass(activeClass);
			switchScreens(code);
	};
	
	switchScreens = function(code) {
		sb.notify('show');
		switch(code) {
		case "0":
			sb.notify('render', {content: sb.tmpl(searchTemplate, searchData)});
			break;
		case "1" :
			sb.notify('render', {content: sb.tmpl(customerReviewTemplate, searchData)});;
			break;
		case "2" :
			sb.notify('render', {content: sb.tmpl(compareTemplate, searchData)});
			break;
		case "4" :
			renderHelpOnBoot();
			break;
		}
	}
	
	return {
		init : init,
		destroy: destroy
	};
});
