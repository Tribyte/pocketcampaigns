$.getScript('/static/frontend/js/xhrRequest.js', function () { });

var hasBubbles = false;

$(document).ready(function () {
    //togggle sidebar
    $("#campaign-base").click(function () {
        if($(".options-nav").find("active") != 0 && $(".new-campaign").find("active") != 0){
            $(".new-campaign").removeClass("active");
            $(".campaign-form").removeClass("active");
            setTimeout(function () {
            }, 50);
        }
        $(".options-nav").toggleClass("active");
        $(".options-nav").toggleClass("bubbles");
        $(".options-nav").toggleClass("particletext");
        if(!hasBubbles && $(".options-nav").find("active") != 0){
            setTimeout(function () {
                addBubbles(".options-nav");
                hasBubbles = true;
            }, 750);
        }
    });
    //search
    $(".in").keyup(function () {
        var einput = $(".in").val().toUpperCase();
        $(".element").each(function () {
            if($(this).is(".new-campaign")) { $(this).show(); }
            else if($(this).children(".campaign").children("h2").text().toUpperCase().indexOf(einput) >= 0) { $(this).show(); }
            else { $(this).hide(); }
        });
    });
    //get campaign data
    // $(".campaign").click(function () {
    //     var form_data = new FormData();
    //     campaignID = $(this).children(".campaign-id").val();

    //     sendXHR("/api/campaigns/" + campaignID, "GET", form_data, function (data) {
    //         console.log(data);
    //     });
    // });
    //new campaign
    $(".new-campaign").click(function () {
        $(this).toggleClass("active");
        $(".campaign-form").toggleClass("active");
    });
});

//Todo: sidebar gradient
//https://codepen.io/frank1006/pen/EJxOVj