
class ScrollWatch{
    constructor(el){
        this._el = document.querySelector(el);
        this._previouseScrollPosition = 0;
    }

    /**
     * Scroll the watched element to the bottom pf the page
     */
    scrollBottom(){
        this._el.scrollTop = this._el.scrollHeight;
    }

    /**
     * Scroll el to top
     */
    scrollTop(){
        this._el.scrollTop = 0;
    }

    /**
     * Set the position to restore to
     */
    savePosition(){
        this._previouseScrollPosition =  this._el.scrollHeight - this._el.scrollTop;
    }

    /**
     * Restore scroll position
     */
    scrollToPreviousPosition(){
        this._el.scrollTop = this._el.scrollHeight - this._previouseScrollPosition;

    }
}

export default ScrollWatch;