var delay = false;
$(document).on('mousewheel DOMMouseScroll', function(event) {
    if($("body").data("device") != "mobile") {
        event.preventDefault();
        if(delay) return;

        delay = true;
        setTimeout(function(){delay = false},200)

        var WE = event.originalEvent.wheelDelta || -event.originalEvent.detail;

        var page = document.getElementsByTagName('section');
        if(WE < 0) {
            for(var i = 0; i < page.length; i++) {
                var pageT = page[i].getClientRects()[0].top;
                if(pageT >= 40) break;
            }
        }
        else {
            for(var i = page.length-1; i >= 0; i--) {
                var pageT = page[i].getClientRects()[0].top;
                if(pageT < -20) break;
            }
        }

        if( typeof page[i] !== 'undefined' ) {
            $('html, body').animate({
                scrollTop: page[i].offsetTop - 35
            });
        }
    }
});

// 페이스북 동영상 재생
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'
));
