import Ember from 'ember';

export default Ember.Route.extend({
	// modelChanged: Ember.observer('modelLen', function() {
	//     // deal with the change
	//     console.log('MODEL MUDOU');
	// }),
	// model: '',
	modelLen: Ember.computed('model', function() {
		return this.modelFor(this.routeName).length;
	}),
	model() {
		console.log('MODEL HAHA');
		return this.store.findAll('pauta').then(function(pautas) {
			return pautas.map(function(item) {
				let marker = Ember.A([{
				  id: 'pautalocal-'+item.get('slug'), 
				  lat: item.get('lat'),
				  lng: item.get('lng'),
				  icon: 'https://maps.google.com/mapfiles/ms/icons/red.png',
				  label: '',
				  opacity: 0.8,
				  optimized: true,
				  infoWindow: {
					content: '<div>' + item.get('local') + '</div>',
				    visible: false
				  },
				  animation: window.google.maps.Animation.DROP,
				  clickable: true,
				  crossOnDrag: true,
				  cursor: 'pointer',
				  draggable: false,
				  title: 'string',
				  visible: true,
				  zIndex: 999
				}]);
				item.set('marker', marker);
				return item;
			});
		});
	},
	afterModel() {
		// this.set('model', model);
		// console.log('this.model', model);
		console.log('modelLen', this.get('modelLen'));
		// model.addObserver(function() {
		// 	console.log('MUDOU MUDOU');
		// });
	},
	actions: {
		verPauta(slug) {
			console.log('VER PAUTA slug', slug);
			this.router.transitionTo('pauta', slug);
		},
		addPauta() {
			console.log('ADICIONAR NOVA PAUTA');
			this.router.transitionTo('pauta.adicionar', 'novo');
		},
		editPauta(slug) {
			console.log('ALTERAR PAUTA slug', slug);
			this.router.transitionTo('pauta.alterar', slug);	
		},
		delPauta(id) {
			console.log('EXCLUIR PAUTA id', id);
			this.router.transitionTo('pauta.excluir', id);	
		}
	}
});