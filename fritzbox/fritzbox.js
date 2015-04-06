module.exports = function(RED) {
    "use strict";



function isEmpty(str) {
    return (str.length === 0 || !str.trim());
}
	
    function FritzboxInNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var address = config.address;
		var CallMonitor = require('fritzbox-callmonitor');
		

if(!isEmpty(address))
{
var monitor = new CallMonitor(address, 1012);

monitor.on('inbound', function (data) {
  console.log('- Incoming');
  console.log(data);
  var json = JSON.parse(data);
  		var obj = {
			deviceid: "fritzbox",
			status: "isRinging",
			caller: ""	
		};
		obj.caller= json.caller;
  node.send(obj);  
});

monitor.on('connected', function (data) {
  console.log('- Connection Established');
  console.log(data);
    var json = JSON.parse(data);
  		var obj = {
			deviceid: "fritzbox",
			status: "isConnected",
			caller: ""
			};
		obj.caller= json.caller;
  node.send(obj);  
});

monitor.on('disconnected', function (data) {
  console.log('- Connection Ended');
  console.log(data);
    var json = JSON.parse(data);
  		var obj = {
			deviceid: "fritzbox",
			status: "isDisconnected",
			caller: ""
		};
		obj.caller= json.caller;

  node.send(obj);
});
        
              
}
        this.on('close', function() {
      
        });
    }
    RED.nodes.registerType("fritzbox",FritzboxInNode);    
}

