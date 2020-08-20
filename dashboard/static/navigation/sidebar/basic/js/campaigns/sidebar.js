class Campaigns {
    constructor(){
        this.search();
        this.sidebarMovingGradient();
        this.populateFormTitle();
        this.initClickDelete();
    }

    initClickDelete(){
        $(".element-ico").on("click", ".x-ico-btn", function(){
            var $this = $(this);
            var $title = $this.parent().prev().children("h2").text();
            if(confirm("Are you sure you want to destroy everything you love about " + $title + "????")){
                var form_data = new FormData();
                campaignID = $this.parent().parent().children(".campaign").children(".campaign-id").val();
                sendXHR("/api/campaigns/" + campaignID, "DELETE", form_data, function (data) {
                    $this.parent().parent().remove();
                });
                snackbar("RIP " + $title);
            }
        });
    }

    search(){
        $(".in").keyup(function () {
            var einput = $(".in").val().toUpperCase();
            $(".element").each(function () {
                if($(this).is(".new-campaign")) { $(this).show(); }
                else if($(this).children(".campaign").children("h2").text().toUpperCase().indexOf(einput) >= 0) { $(this).show(); }
                else { $(this).hide(); }
            });
        });
    }

    sidebarMovingGradient(){
        $(".campaign-nav").mousemove(function (e) {
            $(this).css({
                "background": "radial-gradient(farthest-corner at " + e.pageX + "px " + e.pageY + "px, rgba(var(--sidenav-background-color), .8) 20%, rgba(var(--sidenav-background-color), .5))",
                "background-repeat": "no-repeat",
                "background-size": "100vh 100vh",
                "transition": "ease-in-out .5s"
            });
        });
    }

    toggleSidebar(){
        if($(".campaign-nav").is(".active") && $(".new-campaign").is(".active")){
            $(".new-campaign").removeClass("active");
            $(".campaign-form").removeClass("active");
            setTimeout(function () {
                $(".campaign-nav").removeClass("active").removeClass("bubbles").removeClass("particletext");
            }, 500);
            this.removeSidebar();
        }
        else {
            $(".campaign-nav").toggleClass("active").toggleClass("bubbles").toggleClass("particletext");
        }
    }

    removeSidebar(){
        if($(".campaign-nav").is(".active") && $(".new-campaign").is(".active")){
            $(".new-campaign").removeClass("active");
            $(".campaign-form").removeClass("active");
            setTimeout(function () {
                $(".campaign-nav").removeClass("active").removeClass("bubbles").removeClass("particletext");
            }, 500);
            this.removeSidebar();
        }
        else {
            $(".campaign-nav").removeClass("active").removeClass("bubbles").removeClass("particletext");
        }
    }

    loadCards(){
        $(".element").click(function () {
            if (!$(this).is(".new-campaign")) {
                if (!$(this).is(".active") && $(this).next().children(".sub-element").length <= 1) {
                    var $this = $(this);
                    var form_data = new FormData();
                    var campaignID = $(this).children(".campaign").children(".campaign-id").val();
                    sendXHR("/api/campaigns/" + campaignID, "GET", form_data, function (data) {
                        for (var i = 0; i < data["cards"].length; i++) {
                            if (data['cards'][i]['id'] != null && data['cards'][i]['name'] != null) {
                                var campaign_template_data = new FormData();
                                campaign_template_data.append('id', data['cards'][i]['id'].toString());
                                campaign_template_data.append('name', data['cards'][i]['name']);
                                sendXHR_NoParse("/api/nav/sidebar/basic/templates/sub-element", "POST", campaign_template_data, function (data) {
                                    $this.next().children(".new-card").before(data);
                                });
                            }
                        }
                    });
                }
                $(this).toggleClass("active");
                $(this).next().toggleClass("active");
            }
        });
    }

    populateFormTitle(){
        $(".new-campaign").click(function () {
            if($(".in").val().length > 0){
                $(".title").val($(".in").val());
                $(".in").val("");
                $(".in").keyup();
            }
            $(".title").keyup();
            $(".new-campaign").toggleClass("active");
            $(".campaign-form").toggleClass("active");
        });
    }
}