var yeahBuddyViewModel = function(){
	var self = this;	
	var _userId = ko.observable(null);

	self.activitiesViewModel = ko.observable();
	self.dataExportViewModel = ko.observable();

	self.isAuthenticated = ko.computed(function(){
		return _userId() !== null;
	})

	var getActivities = function(){		
		$.ajax({
			url: "https://www.fitocracy.com/get_user_activities/" + _userId(),
 			success: function(activities){	
 				self.activitiesViewModel(new activitiesViewModel(activities));
 				self.dataExportViewModel(new dataExportViewModel(activities));
			}
		});		
	};

	var init = function(){
		$.ajax({
			url: "https://www.fitocracy.com/home",
			success: function(data){
				var matches = data.match(/var user_id = "(\d*)"/);
				//if there are no matches, assume the user is not logged in
				if(matches != null){
					_userId(matches[1]);
					getActivities();
				}		
			}
		});
	};

	self.open = function(){
		$("#yeahBuddyDialog").dialog("open");			
	};	

	init();		
};