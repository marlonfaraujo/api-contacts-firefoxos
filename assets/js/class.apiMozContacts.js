var ApiMozContacts = function(){

	var requestMoz;
	var options = {
		sortBy: '',
		sortOrder: 'ascending',
		filterBy: [],
		filterValue: [],
		filterOp: ''
	};
	var _contact;
	var _contacts = [];
	var self = this;

	this.getAllContacts = function (contactName, callback) {
		_contacts = [];
		options.sortBy = 'name';

		if(contactName){
			options.filterBy = ['name'];
			options.filterValue = [contactName];
		}
		options.filterOp = 'startsWith';
		requestMoz = navigator.mozContacts.getAll(options);

		requestMoz.onsuccess = function () {
			if(this.result) {
				self.setContact(this.result);
				this.continue();

			}else{
				callback(_contacts);
			}
		}

		requestMoz.onerror = function (e) {
			console.log('Erro ao carregar contatos. Ex: ' + e);
		}
	}

	this.findContact = function(id, callback){

		options.sortBy = 'name';
		options.filterBy = ['id', 'name'];
		options.filterValue = [id];
		options.filterOp = 'equals';

		requestMoz = navigator.mozContacts.find(options);

		requestMoz.onsuccess = function () {
			if(this.result) {

				callback(this.result[0])

			} else {
				callback(_contacts);
			}
		}

		requestMoz.onerror = function (e) {
			console.log('Erro ao carregar contato. Ex: ' + e);
		}

	}

	this.saveContact = function(data, res, callback){

		var contact = {};
		if(res && res.id){
			contact = res;
            for(var i = 0; i < contact.tel.length; i++){
                if(contact.tel[i].type[0] == data.type){
                    contact.tel[i].value = data.phone;
                    break;
                } 
            }
		}else{
			contact = new mozContact();
			contact.tel = [{type: ['mobile'], value: data.phone, carrier: '', pref: ''}];
		}
		contact.name = [data.name];
		contact.givenName = [data.name];

		requestMoz = navigator.mozContacts.save(contact);

		requestMoz.onsuccess = function () {

			callback('Contato salvo com sucesso');
		}

		requestMoz.onerror = function (e) {
			callback('Erro ao salvar contato');
			console.log('Erro ao salvar contato. Ex: ' + e);
		}
	}

	this.updateContact = function(contact, callback){

		self.findContact(contact.id, function(res){
			if(res){
				self.saveContact(contact, res, function(data){
					callback(data);
				});
			}
		});
	}

	this.removeContact = function(id, callback){

		self.findContact(id, function(data){
			if (data) {

				requestMoz = navigator.mozContacts.remove(data);

				requestMoz.onsuccess = function () {
					callback('Contato excluído com sucesso');
				}

				requestMoz.onerror = function (e) {
					callback('Erro ao excluir contato');
					console.log('Erro ao excluir contato. Ex: ' + e);
				}
			}
		});
	}

	this.setContact = function(contact){
		_contact = new Contact(contact.name || contact.givenName, contact.id);

		for(var i = 0; i < contact.tel.length; i++){
			_contact.phone(new Phone(contact.tel[i].type[0], contact.tel[i].value));
		}
		_contacts.push(_contact);
	}
}
