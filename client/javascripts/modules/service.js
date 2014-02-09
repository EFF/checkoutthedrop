define(function (){
	var service = function () {
		return {
			yo : function(man){
				console.log('yo' + man)
			}
		}
	}

	return service;
});