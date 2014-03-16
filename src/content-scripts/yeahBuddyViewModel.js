var yeahBuddyViewModel = function(){
	var self = this;	
	var _userId = null;

	self.activitiesViewModel = ko.observable();
	self.test = ko.observable("adsf");


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

	init();

	

	self.open = function(){
		$("#yeahBuddyDialog").dialog("open");			
	}
};

var yeahBuddyActivitiesViewModel = function(model){
	var self = this;
	var activities = model;

	self.currentPage = ko.observable(0);
	self.pageSize = ko.observable(25);
	var lastPage = ko.computed(function(){
		return Math.floor(model.length / self.pageSize());
	});
	var sliceStart = ko.computed(function(){
		return self.currentPage() * self.pageSize();
	});
	var sliceEnd =ko.computed(function(){
		return sliceStart() + self.pageSize();
	});
	self.displayedActivities = ko.computed(function(){
		return activities.slice(sliceStart(), sliceEnd());
	});

	self.nextPage = function(){
		if (self.currentPage() + 1 <= lastPage())
			self.currentPage(self.currentPage() + 1);
	}

	self.previousPage = function(){
		if (self.currentPage() - 1 >= 0)
			self.currentPage(self.currentPage() - 1);
	}
}

// (function(activityId){
// 	$.ajax({
// 		url: "https://www.fitocracy.com/_get_activity_history_json/?activity-id=" + activityId,
// 		success: function(data){		
// 			var repPRs = {};
// 			var excercise = data[0].actions[0].action.name;
			 
// 			for (var i = 0; i < data.length; i++){
// 				for (var j = 0; j < data[i].actions.length; j++){
// 					var weight = data[i].actions[j].effort0_imperial, reps = data[i].actions[j].effort1_imperial, repsString = reps.toString(), date = data[i].actions[j].actiondate, string_imperial = data[i].actions[j].string_imperial;
// 					if (typeof repPRs[reps] === "undefined" || repPRs[reps].weight <= weight){
// 						repPRs[reps] = {"weight": weight, "reps": reps, "string": string_imperial, "date": date};			
// 					}		
// 				}	
// 			}
// 			console.log({"exercise": excercise, "repPRs": repPRs});
// 		}
// 	});
// })("1");