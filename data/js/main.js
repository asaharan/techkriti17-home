window.previousScrollY = 0;
var paddingTopOfSecondSection = 80;
var isScrolling = false;
var isMobile = false;

var backgroundImageContainer = document.getElementById('background-image-container');
var thirdSectionPositionHelper = document.getElementById('third-section-position-helper');
var bodyScrollHelper =  document.getElementById('body-scroll-helper');
var dummyScroll = document.getElementById('dummy-scroll');

function init(){
	// var backgroundImageContainer = document.getElementById('background-image-container');
	// var thirdSectionPositionHelper = document.getElementById('third-section-position-helper');
	// var bodyScrollHelper =  document.getElementById('body-scroll-helper');
	// var dummyScroll = document.getElementById('dummy-scroll');
	if(window.innerWidth < 900){
		isMobile = true;
	}
	
	if(!isMobile){
		dummyScroll.setAttribute('style','height:'+bodyScrollHelper.scrollHeight+'px');
		window.addEventListener('scroll',function(){
			var scrollY = window.scrollY;
			// backgroundImageContainer.setAttribute('style','transform:translateY('+ scrollY/2 + 'px);');
			handleQuantumScroll();
		});
	}else{
		bodyScrollHelper.setAttribute('class','body-scroll-helper relative');
		smoothScrollTo(0);
	}
	
};
init();

function handleQuantumScroll(){
	if(isScrolling){
		return;
		previousScrollY = window.scrollY;
	}
	console.log('Scroll now', previousScrollY ,window.scrollY);
	var scrollY = window.scrollY;
	var criticalScroll = window.innerHeight - paddingTopOfSecondSection;
	if(previousScrollY == scrollY){
		return;
	}
	if(scrollY < previousScrollY && scrollY < criticalScroll){
		//scroll to top
		// window.scrollTo(0,0);
		// window.scroll({top:0,left:0,behaviour:'smooth'});
		bodyScrollHelper.setAttribute('class','body-scroll-helper transition');
		isScrolling = true;
		setTimeout(function(){
			smoothScrollTo(0);
		},50);
	}else{
		if(scrollY > previousScrollY && scrollY < criticalScroll){
			// window.scrollTo(0,criticalScroll);
			// window.scroll({top:criticalScroll,left:0,behaviour:'smooth'});
			bodyScrollHelper.setAttribute('class','body-scroll-helper transition');
			isScrolling = true;
			setTimeout(function(){
				smoothScrollTo(criticalScroll);
			},50);
		}else{
			bodyScrollHelper.setAttribute('class','body-scroll-helper');
			smoothScrollTo(scrollY,true);
		}
	}
	previousScrollY = scrollY;
	return false;
}
function smoothScrollTo(y, not_smooth){
	console.log('smoothScrollTo',y);
	// isScrolling = true;
	if(!not_smooth || not_smooth == undefined ){
		setTimeout(function(){
			window.scrollTo(0,y);
			previousScrollY = y;
			isScrolling = false;
		},1500);
	}
	bodyScrollHelper.setAttribute('style','transform:translateY('+ -y +'px);');
	window.scrollTo(0,y);
}
function smoothScrollBy(x){


	return;
	var sign = 1;
	var scrollByPixels = 10;
	if(x < 0){
		sign = -1;
		x = -x;
	}

	console.log(sign, x);
	if(x==0){
		isScrolling = false;
		return;
	}
	isScrolling = true;
	window.scrollBy(0, sign * scrollByPixels);
	setTimeout(function(){
		if(x < scrollByPixels ){
			x = scrollByPixels;
		}
		smoothScrollBy( sign * ( x - scrollByPixels) );	
	},scrollByPixels/10);
}