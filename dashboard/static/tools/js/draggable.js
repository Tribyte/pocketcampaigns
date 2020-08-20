var dragging = false;
var droppedElement = null;

var move = function(event){
    dragging = true;
    event.data.element.css({
        "left": event.clientX - event.data.shiftX,
        "top": event.clientY - event.data.shiftY
    });
}

var release = function(event){
    dragging = false;
    droppedElement = event.data.element;
    $(document).unbind("mousemove", move).unbind("mouseup", release).trigger("dropped");
    event.data.callback(event);
}

function drag(element, page, callback){
    var shiftX = page.clientX - element.position().left;
    var shiftY = page.clientY - element.position().top;
    $(document).bind("mousemove", { element: element, shiftX: shiftX, shiftY: shiftY }, move);
    $(document).bind("mouseup", {element: element, callback: callback}, release);
}

var getClick = function(event){
    $this = $(this);
    dragging = false;
    $("<div id=\"delete-me\"></div>").css({ "height": $this.outerHeight(true), "width": $this.outerWidth(true) }).insertAfter($this, event);
    $this.css({"position": "fixed", "z-index": "1"});
    drag($this, event, function (data) {
        $this.removeAttr("style");
        $("#delete-me").remove();
    });
}

function draggable(element){
    $(element).unbind("mousedown", getClick);
    $(element).bind("mousedown", getClick);
}