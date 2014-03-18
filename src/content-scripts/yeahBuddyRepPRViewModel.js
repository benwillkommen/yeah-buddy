var yeahBuddyRepPRViewModel = function(data){
	var self = this;

	var repPRs = {};
	self.repPRs = ko.observable();
	self.repPRsArray = ko.observableArray();
	self.excerciseName = ko.observable(data[0].actions[0].action.name);
	 
	for (var i = 0; i < data.length; i++){
		for (var j = 0; j < data[i].actions.length; j++){
			var weight = data[i].actions[j].effort0_imperial, reps = data[i].actions[j].effort1_imperial, repsString = reps.toString(), date = data[i].actions[j].actiondate, string_imperial = data[i].actions[j].string_imperial;
			if (typeof repPRs[reps] === "undefined" || repPRs[reps].weight <= weight){
				repPRs[reps] = {"weight": weight, "reps": reps, "string": string_imperial, "date": date};			
			}

				
		}	
	}	
	//console.log({"exercise": excercise, "repPRs": repPRs});
	
	for (var repNumber in repPRs) {
	    if (repPRs.hasOwnProperty(repNumber)) {
	    	var date = new Date(repPRs[repNumber].date);
	    	repPRs[repNumber].date = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
	        self.repPRsArray.push(repPRs[repNumber]);
	    }
	}
	self.repPRs(repPRs);
};