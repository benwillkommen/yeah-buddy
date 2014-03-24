var yeahBuddyViewModel = function(){
	var self = this;	
	var _userId = ko.observable();

	self.activitiesViewModel = ko.observable();
	self.BIGRON = ko.computed(function(){
		return _userId() !== null;
	})

	var getActivities = function(){		
		$.ajax({
			url: "https://www.fitocracy.com/get_user_activities/" + _userId(),
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
				//if there are no matches, assume the user is not logged in and don't do anything
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

	self.backupData = function(){
		var _activityHistory = {};

		//build an object with property names that are activityIds
		for(var i = 0; i < self.activitiesViewModel().activities.length; i++){
			_activityHistory[self.activitiesViewModel().activities[i].id] = null;
		}

		//recursion: not just for CS101 quizzes!
		var getActivtyHistory = function(activityHistory){			
			var activityToDownload = null;

			//find the next activityToDownload
			for(var activityId in activityHistory){				
				if (activityHistory[activityId] === null){
					activityToDownload = activityId;
					break;
				}
			}

			if(activityToDownload === null){
				//all values for each activityId have a value. save file and return to stop recursion.
				var fileParts = [JSON.stringify(activityHistory)];
					
				var blob = new Blob(fileParts, {type : 'application/json'});
				saveAs(blob, "fitocracyHistory.json");		
				return;
			}

			//there are still values in activityHistory that are null. resume spamming thier history endpoint.
			$.ajax({
				url: "https://www.fitocracy.com/_get_activity_history_json/?activity-id=" + activityToDownload,
				success: function(data){
					activityHistory[activityToDownload] = data;
					getActivtyHistory(activityHistory);
				}
			});			
		}		

		getActivtyHistory(_activityHistory);		
	};

	init();		
};