var yeahBuddyRepPRViewModel = function(data){
	var self = this;

	var repPRs = {};
	self.repPRs = ko.observable();
	self.repPRsArray = ko.observableArray();
	self.recordsByWeight = ko.observableArray();
	self.recordsByReps = ko.observableArray();
	self.excerciseName = ko.observable(data[0].actions[0].action.name);
	self.displayedRecordsByWeight = ko.observable();
	self.displayedRecordsByReps = ko.observable();
	self.detailWeight = ko.observable();
	self.detailReps = ko.observable();
	var _recordsByWeight = {}, _recordsByReps = {};
	 
	self.setRecordDetails = function(repPR){
		self.detailWeight(repPR.weight);
		self.detailReps(repPR.reps);

		var rbw = self.recordsByWeight();
		for (var i = 0; i < rbw.length; i++){
			if (rbw[i][0]["weight"] === repPR.weight){
				self.displayedRecordsByWeight(rbw[i]);
			}
		}

		var rbr = self.recordsByReps();
		for (var i = 0; i < rbr.length; i++){
			if (rbr[i][0]["reps"] === repPR.reps){
				self.displayedRecordsByReps(rbr[i]);
			}
		}
	};



	self.showRecordDetails = ko.computed(function(){
		return typeof self.displayedRecordsByWeight() !== "undefined";
	});

	var formatDate = function(fitoDateString){
		var date = new Date(fitoDateString);
	    return (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
	};

	for (var i = 0; i < data.length; i++){
		for (var j = 0; j < data[i].actions.length; j++){
			
			var weight = data[i].actions[j].effort0_imperial, 
				reps = data[i].actions[j].effort1_imperial, 
				repsString = reps.toString(),
				date = data[i].actions[j].actiondate,
				string_imperial = data[i].actions[j].string_imperial,
				workoutId = data[i].actions[j].action_group_id;

			if (typeof repPRs[reps] === "undefined" || repPRs[reps].weight <= weight){
				repPRs[reps] = {"weight": weight, "reps": reps, "string": string_imperial, "date": formatDate(date)};			
			}

			if (typeof _recordsByWeight[weight] === "undefined"){
				_recordsByWeight[weight] = [];
				_recordsByWeight[weight].push({"weight": weight, "reps": reps, "date": formatDate(date), url: "https://www.fitocracy.com/entry/" + workoutId});
			} else if (_recordsByWeight[weight].slice(-1)[0].reps < reps){
				_recordsByWeight[weight].push({"weight": weight, "reps": reps, "date": formatDate(date), url: "https://www.fitocracy.com/entry/" + workoutId});
			}

			if (typeof _recordsByReps[reps] === "undefined"){
				_recordsByReps[reps] = [];
				_recordsByReps[reps].push({"weight": weight, "reps": reps, "date": formatDate(date), url: "https://www.fitocracy.com/entry/" + workoutId});
			} else if (_recordsByReps[reps].slice(-1)[0].weight < weight){
				_recordsByReps[reps].push({"weight": weight, "reps": reps, "date": formatDate(date), url: "https://www.fitocracy.com/entry/" + workoutId});
			}
		}	
	}	
	//console.log({"exercise": excercise, "repPRs": repPRs});
	
	for (var repNumber in repPRs) {
	    if (repPRs.hasOwnProperty(repNumber)) {	    	
	        self.repPRsArray.push(repPRs[repNumber]);
	    }
	}

	for (var weightProperty in _recordsByWeight) {
	    if (_recordsByWeight.hasOwnProperty(weightProperty)) {	    	
	        self.recordsByWeight.push(_recordsByWeight[weightProperty].reverse());
	    }
	}

	for (var repsProperty in _recordsByReps) {
	    if (_recordsByReps.hasOwnProperty(repsProperty)) {	    	
	        self.recordsByReps.push(_recordsByReps[repsProperty].reverse());
	    }
	}

	self.repPRs(repPRs);
};