$(document).ready(function () {
    apps = new Apps();
    campaigns = new Campaigns();

    $(".sidebar").on("click", "#app-base", function () {
        campaigns.removeSidebar();
        apps.toggleSidebar();
    });
    $(".sidebar").on("click", "#campaign-base", function () {
        apps.removeSidebar();
        campaigns.toggleSidebar();
    });

    campaigns.loadCards();
    draggable(".draggable");
});


/*if(!hasBubbles && $(".campaign-nav").find("active") != 0){
    setTimeout(function () {
        addBubbles(".campaign-nav");
        hasBubbles = true;
    }, 750);
}*/