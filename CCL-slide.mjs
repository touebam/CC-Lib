const style=document.createElement('style') ;
style.innerHTML=`
ccl-slide
{
    display:block ;
    width:100% ;
    height:100% ;

    position:absolute ;
    top:0 ;
    left:0 ;
    pointer-events:none ;
    opacity:0 ;
    transform:translateX(0) scale(1) ;

    transition:all var(--ENTER-DURATION) ease ;
}

ccl-slide.active 
{
    opacity:1 ;
    pointer-events:auto ;
    position:relative ;
}

ccl-slide.entering 
{
    transition:all var(--ENTER-DURATION) ease ;
}
ccl-slide.exiting 
{
    transition:all var(--EXIT-DURATION) ease ;
}
` ;

class CCLSlide extends HTMLElement
{
    constructor()
    {
        super() ;
    }

    connectedCallback()
    {
        this.append(style.cloneNode(true)) ;
    }
    
    show() 
    {
        this.classList.add('active') ;
    }

    hide() 
    {
        this.classList.remove('active') ;
    }
}

customElements.define("ccl-slide", CCLSlide) ;