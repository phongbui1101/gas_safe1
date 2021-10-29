const USERNAME = "phongbui1101";
const KEY = "aio_RkEE84QMHQWww7iYnQriO0oB4PfA";
const USERNAME_1 = "phongbui1101";
const KEY_1 = "aio_RkEE84QMHQWww7iYnQriO0oB4PfA";

$(document).ready(function() {
sessionStorage.sensor = 11;
sessionStorage.fan = 11;
sessionStorage.led = 1;
sessionStorage.speaker = 10;
setInterval(function(){
    $.getJSON("https://io.adafruit.com/api/v2/"+USERNAME_1+"/feeds/bk-iot-gas/data?limit=1&x-aio-key="+KEY_1,
    function(data){
        var cond = Number(sessionStorage.led) % 3;
        var count_led = (Number(sessionStorage.led) % 2) + 1;
        sessionStorage.led = Number(sessionStorage.led) + 1;
        if (data[0].value==1 && cond == 0) {
            $.ajax({
                url:"https://io.adafruit.com/api/v2/"+USERNAME+"/feeds/bk-iot-led/data?limit=1&x-aio-key="+KEY, 
                dataType:'json',
                type:'post',
                headers:{'Content-Type':'application/json'},
                data: JSON.stringify({"value":count_led}),
            });
            var count_speaker = ((Number(sessionStorage.speaker) % 10) + 1)*100;
            sessionStorage.speaker = Number(sessionStorage.speaker) + 1;
            $.ajax({
                url:"https://io.adafruit.com/api/v2/"+USERNAME+"/feeds/bk-iot-speaker/data?limit=1&x-aio-key="+KEY, 
                dataType:'json',
                type:'post',
                headers:{'Content-Type':'application/json'},
                data: JSON.stringify({"value":count_speaker}),
            });
        } 
        if (data[0].value!=sessionStorage.sensor) {
            sessionStorage.led = 1;
            sessionStorage.speaker = 10;
            sessionStorage.sensor = data[0].value;
            if (sessionStorage.sensor==0) source ="./include/safe.php";
            else source ="./include/danger.php";
            $.ajax({url:source, success: function(response){
                $('#Home').html(response);
            }});
            if (sessionStorage.sensor==0){
                $.ajax({
                    url:"https://io.adafruit.com/api/v2/"+USERNAME+"/feeds/bk-iot-led/data?limit=1&x-aio-key="+KEY, 
                    dataType:'json',
                    type:'post',
                    headers:{'Content-Type':'application/json'},
                    data: JSON.stringify({"value":0}),
                });
                $.ajax({
                    url:"https://io.adafruit.com/api/v2/"+USERNAME+"/feeds/bk-iot-speaker/data?limit=1&x-aio-key="+KEY, 
                    dataType:'json',
                    type:'post',
                    headers:{'Content-Type':'application/json'},
                    data: JSON.stringify({"value":0}),
                });
            }
            $.getJSON("https://io.adafruit.com/api/v2/"+USERNAME_1+"/feeds/bk-iot-relay/data?limit=1&x-aio-key="+KEY_1,
                function(data){
                if (data[0].value==1) source ="./include/fan_on.php";
                else {
                    source ="./include/fan_off.php";
                    if (sessionStorage.sensor==1){
                        $.ajax({
                            url:"https://io.adafruit.com/api/v2/"+USERNAME_1+"/feeds/bk-iot-relay/data?limit=1&x-aio-key="+KEY_1, 
                            dataType:'json',
                            type:'post',
                            headers:{'Content-Type':'application/json'},
                            data: JSON.stringify({"value":'1'}),
                        });
                        source ="./include/fan_on.php";
                    }
                }
                $.ajax({url:source, success: function(response){
                    $('#Fan').html(response);
                }});
            });
        };
    })
    $.getJSON("https://io.adafruit.com/api/v2/"+USERNAME_1+"/feeds/bk-iot-relay/data?limit=1&x-aio-key="+KEY_1,
    function(data){
        if (data[0].value!=sessionStorage.fan) {
            sessionStorage.fan = data[0].value;
            if (sessionStorage.fan==1) source ="./include/fan_on.php";
            else source ="./include/fan_off.php";
            $.ajax({url:source, success: function(response){
                $('#Fan').html(response)
            }})
        };
    })
}, 1000);

$(document).on('click', '#On-fan', function(){
    $.ajax({
        url:"https://io.adafruit.com/api/v2/"+USERNAME_1+"/feeds/bk-iot-relay/data?limit=1&x-aio-key="+KEY_1, 
        dataType:'json',
        type:'post',
        headers:{'Content-Type':'application/json'},
        data: JSON.stringify({"value":1}),
    });
});

$(document).on('click', '#Off-fan', function(){
    $.ajax({
        url:"https://io.adafruit.com/api/v2/"+USERNAME_1+"/feeds/bk-iot-relay/data?limit=1&x-aio-key="+KEY_1, 
        dataType:'json',
        type:'post',
        headers:{'Content-Type':'application/json'},
        data: JSON.stringify({"value":0}),
    });
});

// Dong ho
// Tao 2 mang chua ten ngay thang
var monthNames = [ "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 6", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12" ];
var dayNames= ["Chủ nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"]
 
// Tao moi doi tuong Date()
var newDate = new Date();
// Lay gia tri thoi gian hien tai
newDate.setDate(newDate.getDate());
// Xuat ngay thang, nam
$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
 
setInterval( function() {
    // lay gia tri giay trong doi tuong Date()
    var seconds = new Date().getSeconds();
    // Chen so 0 vao dang truoc gia tri giay
    $("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
    },1000);
 
setInterval( function() {
    // Tuong tu lay gia tri phut
    var minutes = new Date().getMinutes();
    // Chen so 0 vao dang truoc gia tri phut neu gia tri hien tai nho hon 10
    $("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
    },1000);
 
setInterval( function() {
    // Lay gia tri gio hien tai
    var hours = new Date().getHours();
    // Chen so 0 vao truoc gia tri gio neu gia tri nho hon 10
    $("#hours").html(( hours < 10 ? "0" : "" ) + hours);
    }, 1000);
});
