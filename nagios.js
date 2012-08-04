Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*'
]);

Ext.onReady(function() {
    Ext.QuickTips.init();

    // Set up a model to use in our Store
	Ext.define('User', {
    	extend: 'Ext.data.Model',
    	fields: [
        	{name: 'name', type: 'string'},
        	{name: 'desc', type: 'string'},
        	{name: 'state', type: 'int'},
        	{name: 'output', type: 'string'}
     		]
 		});

 var myStore = Ext.create('Ext.data.Store', {
     model: 'User',
     proxy: {
         type: 'ajax',
         url: 'nag_json.php',
         reader: {
             type: 'json',
             root: 'nagios'
         }
     },
     groupField: 'name',
     sorters: 'state',
     autoLoad: true
 });

 	

	var myGrid = Ext.create('Ext.grid.Panel', {
	    title: 'Nagios',
	    store: myStore,
	    //layout:'ux.center',
	    columns: [
	        { text: 'Hostname',  dataIndex: 'name', hidden: true },
	        { text: 'Desc', dataIndex: 'desc', flex: 2 },
	       	
	        { text: 'Output', dataIndex: 'output', flex: 3},
	        //{ text: 'State', dataIndex: 'state', flex: 1 },
	        {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 25,
                items: [{
                	tooltip: "",
                    getClass: function(v, meta, rec) {          // Or return a class from a function
                        if (rec.get('state') == 0) {
                            	this.items[0].tooltip  = 'Ok';
                            	return 'ok-col';
        	                } else if (rec.get('state') == 1) {
                            	this.items[0].tooltip  = 'Warning';
                            	return 'warning-col';
    	                    } else if (rec.get('state') == 2) {
    	                    	this.items[0].tooltip  = 'Alert';
    	                    	return 'alert-col';
    	                    }
	                    }
                }]
            }
	    ],
	    features: [{ftype:'grouping'}],
	    height: 650,
	    width: 600,
	    renderTo: 'nagios'

		});
	
	myGrid.store.sort([
    { property: 'state',  direction: 'DESC' }
    
		]);
	

});