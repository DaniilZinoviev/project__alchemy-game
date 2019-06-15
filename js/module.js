;(function(){
    var message = 'Сообщение модуля';

    function showMessage() {
        alert(message);
    }

    window.showMessage = showMessage;
    window.message = message;
}())