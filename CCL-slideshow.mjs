const template=document.createElement('template') ;
template.innerHTML=`Hello World !` ;

const style=document.createElement('style') ;
style.innerHTML=`
ccl-slideshow
{
    overflow:hidden ;
    position:relative ;
    display:flex ;
}
` ;

class CCLSlideShow extends HTMLElement
{
    constructor()
    {
        super() ;
    }

    connectedCallback()
    {
        this.append(style.cloneNode(true)) ;
        this.slides=Array.from(this.querySelectorAll('ccl-slide')) ;
        this.applyAnimations() ;
        this.total=this.slides.length ;
        this.index=0 ;
        this.showSlide(this.index) ;

        const prevButtons=this.querySelectorAll('.slide-previous') ;
        prevButtons.forEach(prev => 
            prev.onclick=() => this.showSlide(this.index - 1)
        ) ;
        const nextButtons=this.querySelectorAll('.slide-next') ;
        nextButtons.forEach(next => 
            next.onclick=() => this.showSlide(this.index + 1)
        ) ;
    }

    showSlide(index) 
    { 
        if (index != this.index && index >= 0 && index < this.total) 
            { 
            const currentSlide=this.querySelector('ccl-slide:nth-child(' + (parseInt(this.index) + 1) + ')') ; 
            const nextSlide=this.querySelector('ccl-slide:nth-child(' + (parseInt(index) + 1) + ')') ; 
            
            const isReverse=index < this.index ;
            
            if (isReverse || index==0)
                this.classList.add('reverse-direction') ;
            else
                this.classList.remove('reverse-direction') ;
            
            nextSlide.classList.remove('active') ;
            nextSlide.style.transition='none' ;
            
            nextSlide.offsetHeight ;
            
            nextSlide.style.transition='' ;
            
            currentSlide.classList.add('exiting') ; 
            currentSlide.classList.remove('active') ; 
            
            nextSlide.classList.add('active') ; 
            
            setTimeout(() => 
            { 
                currentSlide.classList.remove('exiting') ;
            }, parseFloat(this.enterDuration) * 1000) ; 
            
            this.index=index ; 
        } 
    }

    applyAnimations() 
    {
        const animations=this.getAttribute("animations")?.split(" ") ?? [] ;
        this.enterDuration=this.getAttribute("enter-duration") ?? "0.3s" ;
        const exitDuration=this.getAttribute("exit-duration") ?? "0.3s" ;

        this.style.setProperty('--ENTER-DURATION', this.enterDuration) ;
        this.style.setProperty('--EXIT-DURATION', exitDuration) ;

        const styleElement=document.createElement('style') ;
        let css='' ;

        css += `
        ` ;

        animations.forEach(function(animation) 
        {
            switch (animation) 
            {
                case "opacity":
                    css += `
                        ccl-slide:not(.active) { opacity: 0 ; }
                        ccl-slide.active { opacity: 1 ; }
                        ccl-slide.exiting { opacity: 0 ; }
                    ` ;
                    break ;

                case "zoom-in":
                    css += `
                        ccl-slide:not(.active) { transform: scale(0.8) ; }
                        ccl-slide.active { transform: scale(1) ; }
                        ccl-slide.exiting { transform: scale(0.8) ; }
                    ` ;
                    break ;

                case "zoom-out":
                    css += `
                        ccl-slide:not(.active) { transform: scale(1.2) ; }
                        ccl-slide.active { transform: scale(1) ; }
                        ccl-slide.exiting { transform: scale(1.2) ; }
                    ` ;
                    break ;

                case "slide-down":
                    css += `
                        /* Direction normale (index augmente) */
                        ccl-slide:not(.active) { transform: translateY(-50%) ; }
                        ccl-slide.active { transform: translateY(0) ; }
                        ccl-slide.exiting { transform: translateY(50%) ; }
                        
                        /* Direction inverse (index diminue) */
                        .reverse-direction ccl-slide:not(.active) { transform: translateY(50%) ; }
                        .reverse-direction ccl-slide.exiting { transform: translateY(-50%) ; }
                    ` ;
                    break ;

                case "slide-up":
                    css += `
                        /* Direction normale (index augmente) */
                        ccl-slide:not(.active) { transform: translateY(50%) ; }
                        ccl-slide.active { transform: translateY(0) ; }
                        ccl-slide.exiting { transform: translateY(-50%) ; }
                        
                        /* Direction inverse (index diminue) */
                        .reverse-direction ccl-slide:not(.active) { transform: translateY(-50%) ; }
                        .reverse-direction ccl-slide.exiting { transform: translateY(50%) ; }
                    ` ;
                    break ;

                case "slide-left":
                    css += `
                        /* Direction normale (index augmente) */
                        ccl-slide:not(.active) { transform: translateX(50%) ; }
                        ccl-slide.active { transform: translateX(0) ; }
                        ccl-slide.exiting { transform: translateX(-50%) ; }
                        
                        /* Direction inverse (index diminue) */
                        .reverse-direction ccl-slide:not(.active) { transform: translateX(-50%) ; }
                        .reverse-direction ccl-slide.exiting { transform: translateX(50%) ; }
                    ` ;
                    break ;

                case "slide-right":
                    css += `
                        /* Direction normale (index augmente) */
                        ccl-slide:not(.active) { transform: translateX(-50%) ; }
                        ccl-slide.active { transform: translateX(0) ; }
                        ccl-slide.exiting { transform: translateX(50%) ; }
                        
                        /* Direction inverse (index diminue) */
                        .reverse-direction ccl-slide:not(.active) { transform: translateX(50%) ; }
                        .reverse-direction ccl-slide.exiting { transform: translateX(-50%) ; }
                    ` ;
                    break ;
            }
        }) ;

        styleElement.innerText=css ;
        this.append(styleElement) ;
    }
}

customElements.define("ccl-slideshow", CCLSlideShow) ;