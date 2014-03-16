console.log("test");

var yeahBuddyViewModel = function(){
	var self = this;
	var _activityCache = null;
	var _userId = null;

	var init = function(){
		$.ajax({
			url: "https://www.fitocracy.com/home",
			success: function(data){
				var matches = data.match(/var user_id = "(\d*)"/);
				_userId = matches[1];
			}
		})
	}
	init();

	var getActivities = function(){
		if (_activityCache == null){
			$.ajax({
 				url: "https://www.fitocracy.com/get_user_activities/" + _userId,
	 			success: function(data){	
	 				_activityCache = data;
				}
			});
		}
		return _activityCache;
	}

	self.open = function(){
		$("#yeahBuddyDialog").dialog("open");	
		getActivities();

		
	}
};
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