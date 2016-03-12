var Contact = function(name, id, email){
	var _id = id;
	var _name = name;
	var _email = email;
	var _phones = [];

	this.id = function (id) {
		_id = id;
	}

	this.name = function (name) {
		_name = name;
	}

	this.email = function (email) {
		_email = email;
	}
	
	this.phone = function(phone){
		_phones.push(phone);
	}

	this.getId = function(){
		return _id;
	}

	this.getName = function(){
		return _name;
	}

	this.getEmail = function(){
		return _email;
	}

	this.getPhones = function(){
		return _phones;
	}
}
