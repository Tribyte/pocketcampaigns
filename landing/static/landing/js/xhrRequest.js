function sendXHR(url, sendType, formData, callback) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            callback(JSON.parse(request.response));
        }
    }

    request.open(sendType, url);
    request.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    request.send(formData);
}

function sendXHR_NoParse(url, sendType, formData, callback) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            callback(request.response);
        }
    }

    request.open(sendType, url);
    request.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    request.send(formData);
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}