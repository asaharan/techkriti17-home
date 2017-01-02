window.previousScrollY = 0;
var paddingTopOfSecondSection = 40;
var isScrolling = false;
var isMobile;

var backgroundImageContainer = document.getElementById('background-image-container');
var thirdSectionPositionHelper = document.getElementById('third-section-position-helper');
var bodyScrollHelper =  document.getElementById('body-scroll-helper');
var dummyScroll = document.getElementById('dummy-scroll');

var scrollCollector = 0;

function init(){
	// var backgroundImageContainer = document.getElementById('background-image-container');
	// var thirdSectionPositionHelper = document.getElementById('third-section-position-helper');
	// var bodyScrollHelper =  document.getElementById('body-scroll-helper');
	// var dummyScroll = document.getElementById('dummy-scroll');
	if(window.innerWidth < 900){
		if(isMobile){
			return false;
		}
		isMobile = true;
	}else{
		if(isMobile==false){
			return;
		}
		isMobile = false;
	}
	
	if(!isMobile){
		bodyScrollHelper.setAttribute('class','body-scroll-helper transition');
		dummyScroll.setAttribute('style','height:'+bodyScrollHelper.scrollHeight+'px');
		window.addEventListener('scroll',function(){
			var scrollY = window.scrollY;
			handleQuantumScroll();
		});
		// smoothScrollTo(0);
		// console.log('is not mobile');
	}else{
		thirdSectionPositionHelper.setAttribute('data-open','true');
		dummyScroll.setAttribute('style','height:0px');
		bodyScrollHelper.setAttribute('class','body-scroll-helper relative');
		// smoothScrollTo(0);
		// console.log('is mobile');
	}
	
};
window.addEventListener('load',init);
window.addEventListener('resize',init);
function handleQuantumScroll(){
	if(isScrolling){
		return;
		previousScrollY = window.scrollY;
	}
	// console.log('Scroll now', previousScrollY ,window.scrollY);
	var scrollY = window.scrollY;
	var criticalScroll = window.innerHeight - paddingTopOfSecondSection;
	if(previousScrollY == scrollY){
		return;
	}
	if(scrollY < previousScrollY && scrollY < criticalScroll){
		//scroll to top
		// window.scrollTo(0,0);
		// window.scroll({top:0,left:0,behaviour:'smooth'});
		if( scrollY < criticalScroll - 60 ){
			bodyScrollHelper.setAttribute('class','body-scroll-helper transition');
			isScrolling = true;
			scrollCollector = 0;
			setTimeout(function(){
				smoothScrollTo(0,false,function(){
					thirdSectionPositionHelper.setAttribute('data-open','false');
				});
			},50);
		}
	}else{
		if(scrollY > previousScrollY && scrollY <= criticalScroll){
			//show third section
			// window.scrollTo(0,criticalScroll);
			// window.scroll({top:criticalScroll,left:0,behaviour:'smooth'});
			bodyScrollHelper.setAttribute('class','body-scroll-helper transition');
			isScrolling = true;
			scrollCollector = 0;
			// console.log('data-open true');
			setTimeout(function(){
				smoothScrollTo(criticalScroll, false, function(){
					thirdSectionPositionHelper.setAttribute('data-open','true');
				});
			},50);
		}else{

			scrollCollector += (scrollY - previousScrollY);
			if(Math.abs(scrollCollector) < 10){
				return;
			}
			// if(Math.abs(scrollY - previousScrollY) < 10 ){
			// 	if(scrollY <  previousScrollY){
			// 		scrollY = previousScrollY - 10;
			// 	}else{
			// 		scrollY = previousScrollY + 10;
			// 	}
			// }
			// console.log('data-open true', scrollY, previousScrollY, criticalScroll);
			thirdSectionPositionHelper.setAttribute('data-open','true');
			bodyScrollHelper.setAttribute('class','body-scroll-helper');
			smoothScrollTo(scrollY,true);
			scrollCollector = 0;
		}
	}
	previousScrollY = scrollY;
	return false;
}
function smoothScrollTo(y, not_smooth, callback){
	// console.log('smoothScrollTo',y);
	// isScrolling = true;
	if(!not_smooth || not_smooth == undefined ){
		setTimeout(callback, 1000);
		setTimeout(function(){
			window.scrollTo(0,y);
			previousScrollY = y;
			isScrolling = false;
			// if(typeof callback == 'function'){
			// 	callback();
			// }
		},1500);
	}
	var tr = 'transform:translateY('+ -y +'px);';
	var transformation = tr; 
	transformation += '-webkit-'+tr;
	transformation += '-moz-'+tr;
	transformation += '-ms-'+tr;
	transformation += '-o-'+tr;
	bodyScrollHelper.setAttribute('style',transformation);
	// window.scrollTo(0,y);
	if(not_smooth==true){
		if(typeof callback == 'function'){
			callback();
		}
	}
}