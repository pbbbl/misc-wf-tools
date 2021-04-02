
var activeSlideHeight = 1;
$( function () {
    var els = $( '.w-slider.auto-size .w-slide' );



    var observer = new MutationObserver( function ( mutations ) {
        mutations.forEach( function ( mutation ) {
            var mname = mutation.attributeName;
            var validName = mname == 'aria-hidden';
            if ( !validName ) {
                return;
            }

            var mel = mutation.target;
            var $mel = $( mel );
            var isSlide = $mel.hasClass( 'w-slide' ) || $mel.hasClass( '.w-slide' ) || false;

            var melVisible = false;
            if ( !mel.ariaHidden || mel.ariaHidden == 'undefined' || mel.ariaHidden == null || mel.ariaHidden == false ) {
                melVisible = true;
            }
            melVisible = isSlide && melVisible;
            if ( !melVisible ) {
                return;
            }
            if ( melVisible ) {

                activeSlideHeight = $mel.children().height();
                var next = $mel.parent().next();
                var nextHeight = 1;
                if ( next.height() ) {
                    nextHeight += next.height() - 1;


                }
                if ( mel.style.marginTop ) {
                    nextHeight += mel.style.marginTop;

                }
                if ( mel.style.marginBottom ) {
                    nextHeight += mel.style.marginBottom;

                }
                var sliderHeight = nextHeight + activeSlideHeight;

                $mel.parent().parent().css( {
                    opacity: 1,
                    height: sliderHeight + 'px',
                } );
                $mel.parent().css( {
                    opacity: 1,
                    height: activeSlideHeight + 'px',
                } );
            }
        } );
    } );
    var observingSlides = false;
    while ( els && els.length && els.length >= 0 && !observingSlides ) {
        observingSlides = true;
        return els.each( function ( elIndex ) {
            var elemToObserve = this;
            observer.observe( elemToObserve, { attributes: true } );
        } );
    }
} );