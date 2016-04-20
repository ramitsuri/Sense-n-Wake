var serverPath = 'http://' + window.location.hostname + ':' + window.location.port;

var sensorsData;
var actuatorsData;
$(document).ready(function(){

    $.ajax({
        url : serverPath + '/sensors',
        type: GET,
        success : function(sensors) {
            sensorsData = sensors;
            var len = sensors.length;
            for(var i=0;i<len;++i) {
                var opt = $('<option/>')
                    .attr('value', sensors[i].sensorID)
                    .text(sensors[i].sensorID);
                $('sensor_id_1')
                    .append(opt);
            }

            $('sensor_id_1').on('change', function() {
                var sensorID = this.value;
                $('sensor_val_1').empty();
                if(sensorID == null) {
                    return;
                }

                if(sensorsData == null) return;

                var len = sensorsData.length;
                for(var i=0; i<len; ++i) {
                    var sensor = sensorsData[i];
                    if(sensor.sensorID == sensorID) {
                        var values = sensor[i].sensorValues;
                        for(var j=0; j<values.length; ++j) {
                            var opt = $('<option/>')
                                .attr('value', values[j].value)
                                .text(values[j].value);
                            $('sensor_val_1').
                                append(opt);
                        }
                    }
                }

            });
        }
    });

    $.ajax({
        url : serverPath + '/actuators',
        type: GET,
        success : function(actuators) {
            actuatorsData = actuators;
            var len = actuators.length;
            for(var i=0;i<len;++i) {
                var opt = $('<option/>')
                    .attr('value', actuators[i].actuatorID)
                    .text(actuators[i].actuatorID);
                $('actuator_id_1')
                    .append(opt);
            }

            $('actuator_id_1').on('change', function() {
                var actuatorID = this.value;
                $('actuator_val_1').empty();
                if(actuatorID == null) {
                    return;
                }

                if(actuatorsData == null) return;

                var len = actuatorsData.length;
                for(var i=0; i<len; ++i) {
                    var actuator = actuatorsData[i];
                    if(actuator.sensorID == actuatorID) {
                        var values = actuator[i].actuatorValues;
                        for(var j=0; j < values.length; ++j) {
                            var opt = $('<option/>')
                                .attr('value', values[j].value)
                                .text(values[j].value);
                            $('actuator_val_1').
                            append(opt);
                        }
                    }
                }
            });
        }
    });
    
    $('subBtn').on('click', function(e){
        e.preventDefault();
        submitNewApp();
    });
    
});

function submitNewApp() {
    
}