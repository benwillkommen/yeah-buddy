var yeahBuddyDataExportViewModel = function(activities){
	var self = this;
	var _activities = activities;

	var timeStamp = function(){
		return new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
	};

	var updateUI = function(){
		//scroll to the bottom of the log
		$("#exportLog").scrollTop($("#exportLog").scrollTop()+$("#exportLog ul li").last().position().top); 

		//update progressbar
		$("exportProgressBar").progressbar("value", self.percentExported());
	};

	self.activitiesDownloaded = ko.observable(0);
	self.totalActivities = ko.observable(activities.length);
	self.percentExported = ko.computed(function(){
		var percent = Math.floor(100 * self.activitiesDownloaded() / self.totalActivities());		
		return percent;
	});

	self.logEntries = ko.observableArray();
	self.errors = ko.observable(0);
	self.backupInProgress = ko.observable(false);
	self.backupFinished = ko.observable(false);

	self.backupData = function(){
		self.backupInProgress(true);
		self.backupFinished(false);
		self.errors(0);
		self.logEntries.removeAll();

		var _activityHistory = {};

		//build an object with property names that are activityIds
		for(var i = 0; i < _activities.length; i++){
			_activityHistory[_activities[i].id] = {id: _activities[i].id, name: _activities[i].name, data: null};
		}

		//recursion: not just for CS101 quizzes!
		var getActivtyHistory = function(activityHistory){			
			var activityToDownload = null;

			//find the next activityToDownload
			for(var activityId in activityHistory){				
				if (activityHistory[activityId].data === null){
					activityToDownload = activityHistory[activityId];
					break;
				}
			}

			if(activityToDownload === null){
				//all values for each activityId have a value. save file and return to stop recursion.
				self.logEntries.push(timeStamp() + " Saving history file...");
				var fileParts = [JSON.stringify(activityHistory)];
					
				var blob = new Blob(fileParts, {type : 'application/json'});
				saveAs(blob, "fitocracyHistory.json");	
				self.backupInProgress(false);	
				self.backupFinished(true);
				return;
			}

			//there are still values in activityHistory that are null. resume spamming thier history endpoint.
			self.logEntries.push(timeStamp() + " Downloading activity " + activityToDownload.id + ", " + activityToDownload.name);
			$.ajax({
				url: "https://www.fitocracy.com/_get_activity_history_json/?activity-id=" + activityToDownload.id,
				success: function(data){
					activityHistory[activityToDownload.id].data = data;
					self.activitiesDownloaded(self.activitiesDownloaded() + 1);
					self.logEntries.push(timeStamp() + " Activity " + activityToDownload.id + ", " + activityToDownload.name + " downloaded successfully!");
					updateUI();
					getActivtyHistory(activityHistory);
				},
				error: function(){
					self.errors(self.errors() + 1);
					self.activitiesDownloaded(self.activitiesDownloaded() + 1);
					self.logEntries.push(timeStamp() + " ERROR: Something went wrong downloading  activity " + activityToDownload.id + ", " + activityToDownload.name);
					updateUI();
				}
			});			
		}		

		getActivtyHistory(_activityHistory);		
	};
}