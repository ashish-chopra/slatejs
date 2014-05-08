/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/* This Source Code Form is "Incompatible With Secondary Licenses", as
 * defined by the Mozilla Public License, v. 2.0.
 */

	var utils = {};

	if (!utils.setup) 
		utils.setup = {
			init : function() {
				utils.notification.init();
				utils.searchBar.init();
				
			},
			destroy : function() {
				utils.notification.destroy();
				utils.searchBar.destroy();
			}
		};
	
	if(!utils.notification)
		utils.notification = {
			bar : null,
			message: "Loading...",
			timer : null,
			init : function() {
				this.bar = $(".loader");
			},
			show : function(msg) {
				if(msg == undefined)
					msg = this.message;
				this.bar.css("visibility", "visible").text(msg);
			},
			hide : function() {
				this.bar.css("visibility", "hidden");
			},
			destroy : function() {
				bar = null;
			}
			
		};
	
	if(!utils.searchBar) 
		utils.searchBar = {
			searchType : null,
			searchBox : null,
			searchButton : null,
			activeClass : "sidebar-hover",
			pane : null,
			links : null,
			activeLink : null,
			searchTemplate : null,
			customerReviewTemplate : null,
			compareTemplate : null,
			init: function() {
				this.searchType = $("#search-type");
				this.searchBox = $("#search-box");
				this.searchButton = $("#search-button");
				this.links = $(".sidebar li");
				this.pane = $("#content-pane");
				this.searchTemplate  = $("#search-template"); 
				this.customerReviewTemplate = $("#cr-template");
				this.compareTemplate = $("#compare-template");
				this.searchButton.live('click',{context : this}, this.searchItem);
				this.links.live('click', {context : this}, this.highlight);
				this.helpPage();
			},
			destory : function() {
				this.searchButton.die('click',{context : this}, this.searchItem);
				this.links.die('click', {context : this}, this.highlight);
				this.searchBox = null;
				this.searchType = null;
				this.searchButton = null;
				this.pane = null;
			},
			validate : function() {
				if($.trim(this.searchBox.val()) === ""){
					utils.notification.show("Please enter search item to proceed.");
					return false;
				}
				return true;
			},
			highlight : function(e) {
				var self = e.data.context;
				self.activeLink = $(this);
				
				self.links.each(function(){
					if($(this).hasClass(self.activeClass))
						$(this).removeClass(self.activeClass);
				});
				self.activeLink.addClass(self.activeClass);
				
				var code = $(this).attr("data");
				
				switch(code) {
				case "0":
					self.loadPage(self.searchTemplate);
					break;
				case "1" :
					self.loadPage(self.customerReviewTemplate);
					break;
				case "2" :
					self.loadPage(self.compareTemplate);
					break;
				case "3" :
					//self.loadPage(self.customerReviewTemplate);
					break;
				case "4" :
					self.helpPage();
					break;
				}
			},
			findInJSON : function(data, type, text) {
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
			},
	
			helpPage : function() {
				var self = this;
				utils.notification.show();
				this.pane.fadeOut(1000, function(){
					$.ajax({
						url : "help.html",
						type : "GET",
						success : function(data) {
							self.pane.html(data).fadeIn(1000);	
							utils.notification.hide();
						}
					});
				});
			},
			loadPage : function(template) {
				var self = this;
				if(self.validate()) {
					utils.notification.show();
					self.pane.fadeOut(1000, function() {
						$.ajax({
							url : "data/data.json",
							type : "GET",
							dataType : "json",
							success : function(data) {
									var index = self.findInJSON(data, self.searchType.val(), self.searchBox.val());
									utils.notification.hide();
									if (index != -1) {
										self.pane.html($.tmpl(template, data.products[index])).fadeIn(1000);
										
									} else {
										self.pane.html("<h4>The searched product is not available.<br/> Try the search with \"All Categories\" type selected. <br/> Note: The current version is the testing version and only few product search is functional. To know more please click on the \"Help\" link on the left side.</h4>").fadeIn(1000);
									}
									
							}
						});
					});	
				}	
			},
			searchItem : function(e) {
				var self = e.data.context;
				$("#home-link").click();
				
			}
		};