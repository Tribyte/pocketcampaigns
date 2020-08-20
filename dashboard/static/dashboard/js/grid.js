$(document).ready(function () {
    $(document).on("mousemove", function (e){
        if(dragging){
            var temp = $(document.elementsFromPoint(event.clientX, event.clientY)).closest(".outline");
            $(".outline").each(function() {
                if($(this) != temp && $(this).is(".active")){
                    $(this).removeClass("active");
                }
            })
            temp.addClass("active");
        }
    });
    $(document).on("dropped", function() {
        if(droppedElement.is(".campaign-element")){
            console.log(droppedElement.children(".campaign").children(".campaign-id").val());
        }
    });
});
