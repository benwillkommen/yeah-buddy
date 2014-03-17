var yeahBuddyViewModel = function(){
	var self = this;	
	var _userId = null;

	self.activitiesViewModel = ko.observable();

	var getActivities = function(){		
		$.ajax({
			url: "https://www.fitocracy.com/get_user_activities/" + _userId,
 			success: function(data){	
 				self.activitiesViewModel(new yeahBuddyActivitiesViewModel(data));
			}
		});		
	};

	var init = function(){
		$.ajax({
			url: "https://www.fitocracy.com/home",
			success: function(data){
				var matches = data.match(/var user_id = "(\d*)"/);
				_userId = matches[1];

				getActivities();
			}
		})
	}

	self.open = function(){
		$("#yeahBuddyDialog").dialog("open");			
	}

	init();		
};