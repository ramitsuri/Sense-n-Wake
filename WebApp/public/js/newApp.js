var serverPath = 'http://' + window.location.hostname + ':' + window.location.port;

var sensorsData;
var actuatorsData;
$(document).ready(function(){

    $.ajax({
        url : serverPath + '/devices/sensors',
        type: 'GET',
        success : function(sensors) {
            sensorsData = sensors;
            var len = sensors.length;
            for(var i=0;i<len;++i) {
                var opt = $('<option/>')
                    .attr('value', sensors[i].sensorID)
                    .text(sensors[i].sensorID);
                $('#sensor_id_1')
                    .append(opt);
            }

            $('#sensor_id_1').on('change', function() {
                var sensorID = this.value;
                //console.log(sensorID);
                $('#sensor_val_1').empty();
                $('#sensor_val_1').attr('disabled', true);
                if(!sensorID) {
                    ////console.log('sesnor id is null');
                    return;
                }

                if(!sensorsData) {
                    ////console.log("Sensor data is empty");
                    return;
                }

                $('#sensor_val_1').attr('disabled', false);
                var len = sensorsData.length;
                for(var i=0; i<len; ++i) {
                    var sensor = sensorsData[i];
                    if(sensor.sensorID == sensorID) {
                        var values = sensorsData[i].sensorValues;
                        for(var j=0; j < values.length; ++j) {
                            var opt = $('<option/>')
                                .attr('value', values[j].value)
                                .text(values[j].value);

                            $('#sensor_val_1').append(opt);
                        }
                    }
                }
            });
        }
    });

    $.ajax({
        url : serverPath + '/devices/actuators',
        type: 'GET',
        success : function(actuators) {
            //console.log(actuators);
            actuatorsData = actuators;
            var len = actuators.length;
            for(var i=0; i<len; ++i) {
                var opt = $('<option/>')
                    .attr('value', actuators[i].actuatorID)
                    .text(actuators[i].actuatorID);
                $('#act_id_1')
                    .append(opt);
            }

            $('#act_id_1').on('change', function() {
                var actuatorID = this.value;
                $('#act_val_1').empty();
                $('#act_val_1').attr('disabled', true);
                if(!actuatorID) {
                    return;
                }

                if(!actuatorsData) {
                    ////console.log("actuators data is empty");
                    return;
                }

                $('#act_val_1').attr('disabled', false);

                var len = actuatorsData.length;
                for(var i=0; i<len; ++i) {
                    var actuator = actuatorsData[i];
                    if(actuator.actuatorID == actuatorID) {
                        var values = actuatorsData[i].actuatorValues;
                        for(var j=0; j < values.length; ++j) {
                            var opt = $('<option/>')
                                .attr('value', values[j].value)
                                .text(values[j].value);
                            $('#act_val_1').
                            append(opt);
                        }
                    }
                }
            });
        }
    });
    
    $('#subBtn').on('click', function(e){
        e.preventDefault();
        submitNewApp();
    });
    
});

function submitNewApp() {

    var formData = $('#newApplicationForm').serialize();
    console.log(formData);

    $.ajax({
        url : serverPath + '/application/',
        type: 'POST',
        dataType: 'json',
        data: formData,
        success: function() {
            
        }
    });
}