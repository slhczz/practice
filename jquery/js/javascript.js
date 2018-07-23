$(function(){
	var slider = $("#scroll .slider"); //获取ul
	var img = $("#scroll .slider li");  //获取图片
//	img.not(img.eq(0).hide());   //除第一张其它隐藏
	var num = $("#scroll .num");  //自定义页码
	var len = slider.find("li").length; //li的长度
	var page = "",index=0;
	
	//循环遍历页码
	for(var i=0;i<len;i++){
		if(i===0){
			page +='<li class=on>'+(i+1)+'</li>';
		}else{
			page +='<li>'+(i+1)+'</li>'
		}
	}
	num.html(page);
	 //显示索引对应的图片
	function showPic(index){
		img.eq(index).show().siblings("li").hide();
		num.find("li").eq(index).addClass('on').siblings("li").removeClass("on")
	}
	//鼠标移动到索引上切换并显示图片
	$(".num li").mousemove(function(){
		index = $(this).index();
		showPic(index)
	})
	//设置自动延时
	$("#scroll").hover(function(){
		clearInterval(window.timer);
	},function(){
		window.timer=setInterval(function(){
			showPic(index);
			index++;
			if(index===len){
				index=0;
			}
		},2000)
	}).trigger('mouseleave');
})