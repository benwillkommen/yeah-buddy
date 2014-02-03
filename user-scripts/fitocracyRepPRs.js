//1. be logged into fitocracy
//2. open chrome console
//3. paste this in
//4. figure out the activityId of the exercise you want to look up rep PRs for. you can do this by looking at network traffic in the "You -> Performance" section of the site (this script uses the same endpoint that the performance graphs use). chrome dev tools noobs, check out this highly sophisticated diagram: http://i.imgur.com/TvImk93.png
//5. change the parameter passed in to the id of whatever exercise you looked up in step 4. this gist is passing in an activityId of "1" on line 26, which happens to be bench press (lol @ bench press having an id of 1. bro level: xenowang/dicktalens).
//6. run it and enjoy your json of PRs!
 
(function(activityId){
	$.ajax({
		url: "https://www.fitocracy.com/_get_activity_history_json/?activity-id=" + activityId,
		success: function(data){		
			var repPRs = {};
			var excercise = data[0].actions[0].action.name;
			 
			for (var i = 0; i < data.length; i++){
				for (var j = 0; j < data[i].actions.length; j++){
					var weight = data[i].actions[j].effort0_imperial, reps = data[i].actions[j].effort1_imperial, repsString = reps.toString(), date = data[i].actions[j].actiondate, string_imperial = data[i].actions[j].string_imperial;
					if (typeof repPRs[reps] === "undefined" || repPRs[reps].weight <= weight){
						repPRs[reps] = {"weight": weight, "reps": reps, "string": string_imperial, "date": date};			
					}		
				}	
			}
			console.log({"exercise": excercise, "repPRs": repPRs});
		}
	});
})("1");