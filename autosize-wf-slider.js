var wfUseAutoSlideHeight = function () {
    var allSliders = $( '.w-slider' );
    $( '.w-slider.auto-size' ).attr( 'data-auto-size', true );
    $( '.w-slider.auto-size' ).css( { opacity: 0 } );
    var hasSliders = allSliders && allSliders.length && allSliders.length > 0;
    if ( !hasSliders ) {
        return;
    }
    var sliderMaskDiff = 1;
    var startSlide = $( '.w-slider.auto-size .w-slide:not([aria-hidden="true"])' );
    var activeSlideHeight = startSlide.children().height();
    runSlide( startSlide, activeSlideHeight, autoSliderHeight );
    function autoSliderHeight () {
        var els = $( '.w-slider.auto-size .w-slide' );
        els.each( function ( elIndex ) {
            var el = $( this );
            var id = el.attr( 'id' ) || false;
            if ( !id ) {
                el.attr( 'id', 'auto-id-slide-' + elIndex );
                el = $( '#auto-id-slide-' + elIndex );
                id = el.attr( 'id' );
            }
            var elemToObserve = this;

            var watchingAttr = 'data-watch-slide';

            var watching = el.attr( watchingAttr ) || false;

            if ( !watching ) {

                el.attr( watchingAttr, true );
                var logged = false;
                var observer = new MutationObserver( function ( mutations ) {
                    mutations.forEach( function ( mutation ) {
                        var mname = mutation.attributeName;

                        var validName = mname == 'aria-hidden';
                        if ( !validName ) {
                            return;
                        }

                        var mel = mutation.target;
                        var isSlide = mel.classList.contains( 'w-slide' );
                        var matched = mel.id === id;

                        var melVisible = false;
                        if ( !mel.ariaHidden || mel.ariaHidden == 'undefined' || mel.ariaHidden == null || mel.ariaHidden == false ) {
                            melVisible = true;
                        }
                        melVisible = isSlide && matched && melVisible;
                        if ( !melVisible ) {
                            return;
                        }
                        if ( melVisible ) {

                            activeSlideHeight = $( mel ).children().height();
                            runSlide( $( mel ), activeSlideHeight );
                        }
                    } );
                } );
                observer.observe( elemToObserve, { attributes: true } );

            }
        } );
    }
    function runSlide ( freshSlide, freshHeight, callback ) {
        var mask = freshSlide.parent();
        var slider = mask.parent();
        var sliderHeight = slider.height();
        var maskHeight = mask.height();
        sliderMaskDiff = sliderHeight - maskHeight;
        const newSliderHeight = freshHeight + sliderMaskDiff;
        freshSlide.parent().css( { opacity: 1, height: freshHeight + 'px' } );
        freshSlide.parent().parent().css( { opacity: 1, height: newSliderHeight + 'px' } );
        if ( callback ) {
            callback();
        }

    }

    var sliderHeightBount = false;
    window.addEventListener( 'resize', function () {
        if ( sliderHeightBount && typeof sliderHeightBount == 'function' ) {
            sliderHeightBount = false;
            return autoSliderHeight();
        }
        return;
    } );
    autoSliderHeight();


};

wfUseAutoSlideHeight();