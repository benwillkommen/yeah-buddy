var activitiesViewModel = function(model){
	var self = this;
	self.activities = model;

	self.search = ko.observable("");
	self.searchTerms = ko.computed(function(){
		var terms = self.search().trim().split(" ");
		return $.grep(terms, function(elem, i){
			return elem !== "";
		});
	});
	self.filteredActivities = ko.computed(function(){
		return $.grep(self.activities, function(elem, i){
			var match = true;
			var terms = self.searchTerms();
			if (terms.length === 0)
				return true;
			$.each(terms, function(index, searchTerm){
				if (match && elem.name.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1){
					match = true;
				}
				else{
					match = false;
				}
			});
			return match;
		});
	});

	self.currentPage = ko.observable(0);
	self.pageSize = ko.observable(15);
	var lastPage = ko.computed(function(){
		return Math.floor(self.filteredActivities().length / self.pageSize());
	});
	var sliceStart = ko.computed(function(){
		return self.currentPage() * self.pageSize();
	});
	var sliceEnd =ko.computed(function(){
		return sliceStart() + self.pageSize();
	});
	
	self.displayedActivities = ko.computed(function(){
		return self.filteredActivities().slice(sliceStart(), sliceEnd());
	});

	self.nextPage = function(){
		if (self.currentPage() + 1 <= lastPage())
			self.currentPage(self.currentPage() + 1);
	};

	self.previousPage = function(){
		if (self.currentPage() - 1 >= 0)
			self.currentPage(self.currentPage() - 1);
	};

	self.currentRepPR = ko.observable();
	self.loading = ko.observable(false);

	self.heading = ko.computed(function(){
		if(typeof self.currentRepPR() !== "undefined" && !self.loading()){
			return self.currentRepPR().excerciseName();
		}
		return "&nbsp;"
	});

	self.selectActivity = function(activity){
		yeahBuddyPostBox.notifySubscribers(activity, "activitySelected");
	};

	self.showRepPRs = function(activity){
		self.loading(true);	
		if (typeof activity.repPRViewModel === "undefined"){
			$.ajax({
				url: "https://www.fitocracy.com/_get_activity_history_json/?activity-id=" + activity.id,
				success: function(data){
					activity.repPRViewModel = new repPRViewModel(data);
					self.currentRepPR(activity.repPRViewModel);	
					self.loading(false);				
				}
			});
		}
		else {
			self.currentRepPR(activity.repPRViewModel);
			self.loading(false);
		}
	};
};

