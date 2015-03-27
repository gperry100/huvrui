define( function(require) {

	var dataStore = 
	{
		set: function(key, value) {
		    if (!key || !value) {
		    	return;
		    }
		    if (typeof value === "object") {
		      value = JSON.stringify(value);
		    }

		    localStorage.setItem(key, value);
		},
		get: function(key) {
		    var value = localStorage.getItem(key);
		    if (!value) {
		    	return;
		    }
 			if (value === null) { 
 				return false;
 			};
		    if (value[0] === "{") {
		      value = JSON.parse(value);
	 		}

    		return value;
		}
	}

	//send the object back to require so it can be used in other modules.
	return dataStore;
});