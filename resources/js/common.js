$(function() {

	// INIT

	$.fn.device();
	$.fn.gnbSize();

	smooth_scroll();
	scroll_flag();

	navi();
	sticky();
	small_nav();

	faq();
	family_site();
	magnific_popup();

	title_motion();


	// ON LOAD

    $(window).load(function() {

		$('body').addClass('load');

	});


	// ON RESIZE

	$(window).resize(function() {

		$.fn.device();
		$.fn.gnbSize();

	});


	// 부드러운 페이지 스크롤

	function smooth_scroll() {

	/*	var $window = $(window);
		var scrollTime = 1;
		var scrollDistance = $window.height() / 2.5;

		$window.on('mousewheel DOMMouseScroll', function(event) {

			event.preventDefault ? event.preventDefault() : event.returnValue = false;

			var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
			var scrollTop = $window.scrollTop();
			var finalScroll = scrollTop - parseInt(delta*scrollDistance);

			TweenMax.to($window, scrollTime, {

				scrollTo : { y: finalScroll, autoKill:true },
				ease: Power1.easeOut,
				overwrite: 5

			});

		});*/

	}


	// TOP 플로팅

	function scroll_flag() {

		var btnTopFlag = false;

		$(window).scroll( function() {

			if($(window).scrollTop() > 100) {

				if(!btnTopFlag) {
					$('.btn_top').stop(true).fadeIn(300);
				}
				btnTopFlag = true;

			} else {

				if(btnTopFlag) {
					$('.btn_top').stop(true).fadeOut(300);
				}
				btnTopFlag = false;
			}

		});

	}


	// GNB PC

	function navi() {

		$("#gnb").on("mouseenter", "> .box > ul > li", function() {
			if($("body").data("device") != "mobile") {
				$(this).css("height","332px");
				$(this).parents(".h_group").addClass('menu_hover');
				$(this).parents(".h_group").css("background","url(/ensi_front/resources/img/menu_bg.png)");
				$("#gnb > .box > ul > li > a").css("color","#444");
				$(this).parents(".h_group").stop().animate({"height":"300px"}, 300);
				$("#gnb .sub_menu").show();
			}
		});

		$(".h_group").on("mouseleave", function() {
			if($("body").data("device") != "mobile") {
				$("#gnb > .box > ul > li").css("height","auto");
				$("#gnb > .box > ul > li").parents(".h_group").stop().animate({"height":"91px"}, 300, function() {
					$(this).removeClass('menu_hover');
					$("#gnb > .box > ul > li").siblings().children(".sub_menu").hide();

					if($(".h_group").hasClass('affix')) {
						$(this).css("background","url(/ensi_front/resources/img/menu_bg.png)");
						$("#gnb > .box > ul > li > a").css("color","#444");
					} else {
						if(!$(".h_group").hasClass('sub')) {
							$(this).css("background","transparent");
						}
						$("#gnb > .box > ul > li > a").css("color","#fff");
					}

				});
			}
		});

		// GNB 키보드 접근

		$("#gnb").on("focusin", "> .box > ul > li > a", function() {
			if($("body").data("device") != "mobile") {
				if($(".h_group").hasClass("on") == false) {
					// $(this).css("height","332px");
					$(this).parents(".h_group").addClass('menu_hover');
					$(this).parents(".h_group").css("background","url(/ensi_front/resources/img/menu_bg.png)");
					$("#gnb > .box > ul > li > a").css("color","#444");
					$(this).parents(".h_group").stop().animate({"height":"332px"}, 300);
					$("#gnb .sub_menu").show();
				}
			}
		});

		$(document).on('focus', '.h_group h1 a, .lnb-nav li a, .slick-prev', function() {
			if($("body").data("device") != "mobile") {
				$("#gnb > .box > ul > li").parents(".h_group").stop().animate({"height":"91px"}, 300, function() {
					$("#gnb > .box > ul > li").siblings().children(".sub_menu").hide();
				});
			}
		});

	}


	// 상단메뉴 고정

	function sticky() {

		var fixed_offset = $('#header').offset();

		// alert(fixed_offset.top);

		$(window).on('scroll', $.throttle(1000 / 15, function() {

			if ( $(document).scrollTop() > fixed_offset.top ) {
				$('.h_group').addClass('affix');
				$('.h_group').css("background","#fff url(/ensi_front/resources/img/menu_bg.png)");
				$("#gnb > .box > ul > li > a").css("color","#444");
			} else {
				$('.h_group').removeClass('affix');
				if(!$(".h_group").hasClass('sub')) {
					$('.h_group').css("background","transparent");
				}
				$("#gnb > .box > ul > li > a").css("color","#fff");
			}

		}));

	}


	// GNB MOBILE

	function small_nav() {

		$(".btn_menu").on("click", function() {
			var overflowChk = $("body").css("overflow");
			var deviceHeight = $(window).height();

			if(overflowChk == "hidden") {
				$("body").css({
					"overflow":"visible",
					"height":"auto"
				});
			} else {
				$("body").css({
					"overflow":"hidden",
					"height":deviceHeight
				});
			}

			$("#gnb > .box").css("display","block");
			$(this).next().stop().animate({"right":"0%"}, 300);
			$("#gnb > .dim").fadeIn();
		});

		$("#gnb > .box").on("click", "> ul > li > a", function(e) {
			if($("body").data("device") == "mobile") {
				e.preventDefault();
				$("#gnb > .box > ul > li > .sub_menu > .inner > ul").filter(":not(:animated)").slideUp("fast");
				$(this).parent().find("> .sub_menu > .inner > ul").filter(":not(:animated)").slideToggle();
				if( $(this).parent().hasClass("current") ){
					$(this).parent().removeClass("current");
					return;
				}
				$("#gnb > .box > ul > li").removeClass("current");
				$(this).parent().toggleClass("current");
			}
		});

		$("#gnb").on("click", "> .dim, > .box > .btn_close", function() {
			$("body").css("overflow","visible");
			$("#gnb > .dim").hide();
			$("#gnb > .box").stop().animate({"right":"-80%"}, 300, function() {
				$("#gnb > .box").css("display","none");
			});
			$("#gnb .btn_menu").focus();
		});

	}


	// HOME (메인 페이지에서만 작동)

	if( $('body').hasClass('home') ) {

		// 메인 비주얼 줌-아웃 효과

		$('.visual').on('init', function(event, slick) {
			$(".slick-slide").eq(0).addClass("active-item");
		});

		$('.visual').on('afterChange', function(event, slick, currentSlide){
			$(".slick-slide").removeClass("active-item");
			$(this).find(".slick-slide").eq(currentSlide).addClass("active-item")
		});

		// 메인 비주얼

		$('.visual').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: true,
			fade: true,
			autoplay: true,
			autoplaySpeed: 5000
		});

		// 메인 비주얼 정지, 재생

		$('.visual_btn .btn_play').on('click', function(){
			var $pauseBtn = $(this);
			if ($pauseBtn.hasClass('on')){
				$(".visual").slick('slickPlay');
				$(this).text("정지");
				$pauseBtn.removeClass('on');
			} else {
				$(".visual").slick('slickPause');
				$(this).text("재생");
				$pauseBtn.addClass('on');
			}
		});

		// 메인 롤링 다운

		$('.floating').on('click', function(){
			var nextSec = $(".ensi.e2").offset().top - 91 ;
			var wHeight = $(window).height();

			$('html, body').animate({
				scrollTop : nextSec
				}, 400
			);
		});

		//

		$('.thesis_slider').slick({
		  dots: true,
		  /*infinite: false,*/ /* 20190128 수정 */
		  speed: 300,
		  slidesToShow: 3,
		  slidesToScroll: 3,
		  responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
		        infinite: true,
		        dots: true
		      }
		    },
		    {
		      breakpoint: 640,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		  ]
		});


		// 숫자로 보는 ENSI

		var ok = false;

		$('.walk_area').waypoint(function() {

			var tl = new TimelineMax();

			tl.to(".num_01", 1, {scrambleText:{text:"30", chars:"12345678910", revealDelay:0.1, tweenLength:false, ease:Linear.easeNone}});
			tl.to(".num_02", 1, {scrambleText:{text:"86", chars:"12345678910", revealDelay:0.1, tweenLength:false, ease:Linear.easeNone}});
			tl.to(".num_03", 1, {scrambleText:{text:"229", chars:"12345678910", revealDelay:0.1, tweenLength:false, ease:Linear.easeNone}});
			tl.to(".num_04", 1, {scrambleText:{text:"4679", chars:"12345678910", revealDelay:0.1, tweenLength:false, ease:Linear.easeNone}});

			this.destroy();

		}, {

			offset: "60%"

		});

	}


	// FAQ

	function faq() {

		$(".faqList dl dt a").on("click", function() {
			if($(this).parent().next().css("display") == "none") {
				$(".faqList dl dt a").removeClass('on');
				$(".faqList dl dd").slideUp(150);
				$(this).addClass('on');
				$(this).parent().next().slideDown(150);
			} else {
				$(".faqList dl dt a").removeClass('on');
				$(".faqList dl dd").slideUp(150);
			}
		});

	}


	//

	function family_site() {

		$(".btn_familyView").click(function(){
			if($(this).next().css("display") == "none") {
				$(".btn_familyView").removeClass("open");
				$(".list_family").slideUp(150);
				$(this).addClass("open");
				$(this).find(".txt").text("닫기");
				$(this).find("._down3").attr('class', 'ico _up3');
				$(this).next().slideDown(150);
			} else {
				$(".btn_familyView").removeClass("open");
				$(".list_family").slideUp(150);
				$(this).find(".txt").text("열림");
				$(this).find("._up3").attr('class', 'ico _down3');
			}
			return false;
		});

	}


	// 팝업 레이어

	function magnific_popup() {

		$('.popup-with-move-anim').magnificPopup({

			type: 'inline',
			callbacks : {
				open : function(){ $(window).load(); }
			},

			fixedContentPos: true,
			fixedBgPos: true,

			overflowY: 'hidden',

			closeBtnInside: true,
			preloader: false,

			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-slide-bottom'

		});

	}


	//

	function title_motion() {

		if( !$('body').hasClass('home') ) {

			var tl = new TimelineLite({delay:0.5});

			if($('.sub-banner .inner p').length > 0 ) {
				var title = new SplitText($('.sub-banner .inner p'), {type:"chars"});
				var title_chars = title.chars;

				tl.staggerFrom(title_chars, 1.2, motion({force3D:true, autoAlpha:0, y:10, ease:Back.easeOut,onComplete:function() {
						$('.sub-banner .inner p').addClass('completed');
					}
				}), 0.02, "+=0")
			}

		}

	}


	// 파일 업로드

	InputFileEvt(".wrap_fileSearch .btn1-s-slight", ".wrap_fileSearch input[type='file']", ".wrap_fileSearch .delete");


	// 동영상 반응형

	$( 'iframe[src^="https://www.youtube.com/"], iframe[src^="https://www.facebook.com/"], iframe[src^="https://goo.gl/"]' ).wrap( '<div class="youtubeWrap"></div>' );


	// DIV 영역내에서 마우스 휠

	$.fn.extend({
		mouse_wheel: function() {
			$(this).on('mousewheel', function(e) {
				if (e.originalEvent.wheelDelta >= 120) {
					this.scrollTop -= 50;
				} else if (e.originalEvent.wheelDelta <= -120) {
					this.scrollTop += 50;
				}
				return false;
			});
		}
	});

	// 컨퍼런스, 포럼, 연구세미나

	$('.papers-ensi .article-content').mouse_wheel();

	// 회원가입

	$('.box_agree').mouse_wheel();

});


// DEVICE CHK

$.fn.device = function() {

	var size = $(window).width() + 17; // 스크롤바 width 추가

	if(size <= 1200) {
		$("body").data("device","mobile");
	/* } else if(size > 1024 && size < 1280) {
		$("body").data("device","tablet"); */
	} else {
		$("body").data("device","pc");
	}

}

// GNB SETTING

$.fn.gnbSize = function() {

	var deviceWidth = $(window).width();
	var deviceHeight = $(window).height();

	if($("body").data("device") == "mobile") {

		$("body").css("overflow","visible");
		$("#gnb > .box").css({
			"height":deviceHeight,
			"background":"#fff"
		});
		$("#gnb .sub_menu").show();
		$("#gnb .sub_menu ul").hide();
		if($("#gnb > .dim").length == 0) {
			$("#gnb").append("<div class='dim' style='display:none;position:fixed;top:0px;left:0px;z-index:10;width:" + (deviceWidth + 17) + "px;height:" + deviceHeight + "px;background:#000;filter:alpha(opacity=50);opacity:0.5'></div>");
		}

	} else {

		$("body").css("overflow","visible");
		$("#header .h_group > div > h1 > a > img").css("display","block");

		$("#gnb > div.box").css({
			"display":"block",
			"height":"auto",
			"background":"none"
		});
		$("#gnb > div.box").css("right","-80%");
		$("#gnb > div.box > ul > li").removeClass("current");
		$("#gnb .sub_menu").hide();
		$("#gnb .sub_menu ul").show();
		$("#gnb .sub_menu > div .inner > ul").show();
		$("#gnb > .dim").remove();

	}

}

function scollTopStart() {

	$('html,body').stop().animate({ scrollTop: 0 }, 600);

}

// text motion

function motion(args) {

	args.rotation = 0.1;
	return args

}

// 팝업 새창 오픈

function PopOpenEvt(url, w, h) {

	winObject = window.open(url,'_blank','top=0,left=0,width='+w+',height='+h+',resizable=no,scrollbars=yes');

}

// input[type="file"] 이벤트

function InputFileEvt(btnFile, inputFile, btnDelete) {

// 파일첨부 링크 클릭 시

	$(document).on("click", btnFile, function(){
		var fileId = $(this).attr("href");
		$(fileId).click();

		return false;
	});

// 파일 첨부 완료, 변경 시

	$(document).on("change", inputFile, function(e){
		var fileObj  = $(this).val(),
			Prt = $(this).parent(),
			pathHeader , pathMiddle, pathEnd, allFilename, fileName, extName;

		if (fileObj != "")
		{
			pathHeader = fileObj.lastIndexOf("\\");
			pathMiddle = fileObj.lastIndexOf(".");
			pathEnd = fileObj.length;
			fileName = fileObj.substring(pathHeader+1, pathMiddle);
			extName = fileObj.substring(pathMiddle+1, pathEnd);
			allFilename = fileName+"."+extName;

			$(this).parent().children(".fileName").html(allFilename);
			$(Prt).children(".btn1-s-slight").hide();
			$(Prt).children(".delete").detach();
			$(Prt).children(".fileName").after('<a href="#" class="ico_ del delete">첨부된 ' + allFilename + ' 파일 삭제</a>');
			$(Prt).children(".delete").fadeIn();
		}

	});

// 파일 삭제 시

	$(document).delegate(btnDelete, "click", DeleteFileEvt);

	function DeleteFileEvt()
	{
		var _this = $(this);
		$(_this).parent().children("input[type='file']").val(null);
		$(_this).parent().children(".btn1-s-slight").show();
		$(_this).parent().children(".fileName").html("");
		$(_this).detach();
		return false;
	}

// 레이어팝업닫기

	function closePop(){
		$('#commentPopCont').hide();
	}

}

// social 링크 열기

$(document).ready(function(){
	$('.sns_link').click(function(){
		var state = $('.icon_li').css('display');
		if(state == 'none'){
			$('.icon_li').show();
		}else{
			$('.icon_li').hide();
		}
	});
});


// 레이어 팝업창 내 슬라이드

$(document).ready(function() {

	$('.slider').on('init', function(slick) {
		$('.ensi_wrap .brochure_box .img_slider .slick-slide img').css("visibility","visible");
	}).slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		fade: true,
		autoplay: false,
		autoplaySpeed: 2000
	});

});


// ENSI 컨텐츠 하단 슬라이드

$(function(){

    $(".info_box").slick({
        slidesToShow: 3,
        arrows: true,
        dots: false,
        infinite: true,
        autoplay: false,
        centerMode: true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 986,
                settings: {
                    dots: false,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    dots: false,
                    centerMode: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.papers-ensi .article-content').slimScroll({
        height: '600px',
        color: '#ebe6de',
        allowPageScroll: true,
        alwaysVisible: true
    });

});