$(".hidden-at-loading").hide().removeClass("hidden-at-loading");

(function transfertParams() {
    let params = window.location.href.split('#')[0].split('?')[1]?.split('&');

    if (!params) return;

    let paramsToTransfert = [
        'utm_source',
        'utm_campaign',
        'utm_medium',
        'reserved_code_email',
        'reserved_code_segment'
    ];

    let finalParams = "";

    for (let param of params) {
        if (paramsToTransfert.includes(param.split('=')[0])) {
            finalParams += '&' + param;
        }
    }

    $(".transfert-params").map((index, item) => {
        let href = item.getAttribute("href");

        if (!href.includes("?")) {
            href += "?";
            finalParams = finalParams.substring(1)
        }

        href += finalParams;

        console.log(href);
    })
})();

class mdv_RevealBox {
    constructor(htmlElement) {
        this.html = htmlElement;
        this.id = htmlElement.data("box-id");
        this.oneShot = (htmlElement.data("one-shot") === "true");
        this.disabled = (htmlElement.data("disabled") === "true");
        this.trigger = htmlElement.find("[data-mdv_reveal-box_trigger='" + this.id + "']");
        this.content = htmlElement.find(">.mdv_reveal-box-content");
        this.bind = htmlElement.data("bind");
        //console.log("id:", this.id);
        //console.log("oneShot:", htmlElement.data("one-shot"));
        //console.log("disabled:", this.disabled);
        if (htmlElement.data("open") === true) {
            this.hidden = false;
        } else {
            this.content.hide();
            this.hidden = true;
        }
        this.group = this.html.data("group");

        this.handleTriggerClick = this.handleTriggerClick.bind(this);
        this.showBox = this.showBox.bind(this);
        this.hideBox = this.hideBox.bind(this);
        this.toggleBox = this.toggleBox.bind(this);

        this.trigger.on("click", this.handleTriggerClick)
    }

    hideBox() {
        this.content.slideUp("slow")
        this.hidden = true;
    }

    showBox() {
        for (let i = 0; i < revealBoxArray.length; i++) {
            if (revealBoxArray[i].hidden === false && revealBoxArray[i].group === this.group)
                revealBoxArray[i].hideBox();
        }

        this.content.slideDown("slow");
        this.hidden = false;
    }

    toggleBox() {
        if (this.disabled === true)
            return;
        if (this.oneShot === true)
            this.disabled = true;
        if (this.hidden === true)
            this.showBox();
        else
            this.hideBox();
    }

    handleTriggerClick() {
        //console.log("this.disabled: ", this.disabled);
        //console.log("this.oneshot: ", this.oneShot);
        this.toggleBox();
        if (this.bind) {
            let bind = revealBoxArray.find((item) => {return item.id === this.bind});

            if (bind)
                bind.toggleBox();
        }
    }
}

let revealBoxArray = [];
$(".mdv_reveal-box").map((index, item) => {
    let newRevealBox = new mdv_RevealBox($(item))
    revealBoxArray.push(newRevealBox);
})