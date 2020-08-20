class Apps {
    constructor(){
        this.hasBubbles = false;
    }

    toggleSidebar() {
        $(".app-nav").toggleClass("active").toggleClass("bubbles").toggleClass("particletext");
    }

    removeSidebar() {
        $(".app-nav").removeClass("active").removeClass("bubbles").removeClass("particletext");
    }
}