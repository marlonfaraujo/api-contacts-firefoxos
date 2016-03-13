var AppContacts = {};

(function(){

	'use strict';

	var apiMozContacts;

	AppContacts = {
		events: function(){

			var $search = $('#btn-search');
			var $contactName = $('.search .name-contact');
			var $itemMenu = $('.mdl-menu .mdl-menu__item');
			var $sectionList = $('#list');
			var $sectionRegister = $('#register');
			var $itemList = $('.mdl-data-table tbody');
			var $btnNew = $('#btn-add');
			var $btnSave = $('#btn-save');
			var $btnRemove = $('#btn-remove');

			$btnNew.on('click', function(){

				openFormContact();
			});

			$btnSave.on('click', function(){
				var contact = {
					id: $('#contact-id').val(),
					name: $('#name').val(),
					phone: $('#phone').val(),
                    type: $('#contact-type').val()
				};

				if(contact.id){
					apiMozContacts.updateContact(contact, function(data){
						
						openListContacts();
					});
				}else{
					apiMozContacts.saveContact(contact, {}, function(data){
						
						openListContacts();
					});
				}

			});

			$btnRemove.on('click', function(){
				var idContact = $('#contact-id').val();

				if(idContact){
					apiMozContacts.removeContact(idContact, function(data){
						
						openListContacts();
					});
				}else{
					openListContacts();
				}
			});

			$itemMenu.on('click', function(){
				var itemIndex = $(this).index();
				switch (itemIndex) {
					case 0:
						openFormContact();
						break;
					case 1:
						openListContacts();
						break;
					case 2:
						break;
					default:
						break;
				}
			});

			$itemList.on('click', 'tr', function(e){

				//findContact by id
				var contact = {
					id: $($(this).children()[0]).data('id'),
					name: $(this).children()[0].innerHTML,
					phone: $(this).children()[1].innerHTML,
                    type: $($(this).children()[1]).data('type')
				};

				openFormContact(contact);
			});

			$(window).on('resize', function(){
			    var win = $(this); //this = window

			    if (win.height() < 400) {
			    	$btnNew.hide();
			    }else{
			    	$btnNew.show();
			    }
			});


			$contactName.keyup(function(e) {

				e.preventDefault();
				e.stopPropagation();

				if($contactName.val()){
					AppContacts.setContacts($contactName.val());
				}
			});

			function openFormContact(contact){
				if(contact && (contact.name || contact.phone)){
					$('#contact-id').val(contact.id || "");
					$('#contact-type').val(contact.type || "");
					$('#name').val(contact.name || "").parent().addClass(contact.name ? 'is-dirty' : '');
					$('#phone').val(contact.phone || "").parent().addClass(contact.phone ? 'is-dirty' : '');
					$btnRemove.show();
				}else{
					$('#contact-id').val("");
					$('#contact-type').val("");
					$('#name').val("").parent().removeClass('is-dirty');
					$('#phone').val("").parent().removeClass('is-dirty');
					$btnRemove.hide();
				}
				$contactName.val("");
	    		$btnNew.hide();
				$sectionList.hide();
				$sectionRegister.show();
			}

			function openListContacts(){

				AppContacts.setContacts();

				$contactName.val("");
				$btnRemove.hide();
				$sectionRegister.hide();
			    $btnNew.show();
				$sectionList.show();
			}

		},
		setContacts: function(contactName){
			$('.mdl-data-table tbody').empty();
			apiMozContacts.getAllContacts(contactName, function(data){
				for(var i = 0; i < data.length; i++){
					if(data[i].getName()){
						for(var y = 0; y < data[i].getPhones().length; y++){
							var contentHtml = '<td data-id="'+ data[i].getId() +'" class="ellip">' + data[i].getName() + '</td>';
							contentHtml += '<td data-type="'+ data[i].getPhones()[y].getType() +'" class="ellip">' + data[i].getPhones()[y].getNumber() + '</td>';
							contentHtml += '<td><button class="mdl-button mdl-js-button mdl-button--primary" id="btn-edit">Editar</button></td>';
							$('.mdl-data-table tbody').append('<tr>'+ contentHtml +'</tr>');
                            //save json in localstorage
						}
					}
				}
			});
		},
		init: function(){
			apiMozContacts = new ApiMozContacts();
			AppContacts.events();
			AppContacts.setContacts();
		}
	};

	AppContacts.init();

})();
