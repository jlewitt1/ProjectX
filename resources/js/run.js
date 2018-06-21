
$('#range').on("change", function () {
    $('.output').val(this.value + " Km");
}).trigger("change");

$('.log-in').on("click", function () {
    $('.login-screen').css('display', 'flex');
});

function hide(){
    $('.login-screen').css('display', 'none');
}

function cal(){
    $('.loader').css('display', 'block');
}