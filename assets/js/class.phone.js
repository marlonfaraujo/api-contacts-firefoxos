var Phone = function(type, number){

	var _type = type;
	var _number = number;

	this.type = function(type){
		_type = type;
	}

	this.number = function(number){
		_number = number;
	}

	this.getType = function(type){
		return _type;
	}

	this.getNumber = function(number){
		return _number;
	}
}
