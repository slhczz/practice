$(document).ready(function(){
	
	//全选
	$("input[name=all]").click(function(){
		var all = $(this).is(":checked");
		$("input[name=id]").attr("checked",all);
		Count();
	})
	//单个选
	function ifAllcheck(){
		var check = $("input[name=id]");
		var sum = check.length;
		var a=0;
		check.each(function(indec,dom){
			if($(dom).is(":checked")){
				a++;
			}
		});
		if(a==sum){
			$("input[name=all]").attr("checked",true);
		}else{
			$("input[name=all]").attr("checked",false);
		}
	}
	ifAllcheck()
	$("input[name=id]").click(function(){
		ifAllcheck();
		Count();
	});
	
	//计算价格
	function Count(){
		var check = $(".price");
		var sum = 0;
		check.each(function(i,dom){
			var num = $(dom).find("em").text();
			var price = $(dom).parent().next().find(".combo-value").val()*num;
			$(dom).parent().next().next().find(".amount").find("em").text(price);
			var xuan = $(dom).parent().prev().prev().find("[name=id]").is(":checked");
			if(xuan){
				sum=sum+price;
			}
		});
		$("#total-amount").find("em").text(sum);
	}
	Count();
	
	//数量增加减少
//	function addnumber(dom,flag){
//		var $input =$(dom).parent().find("input[name=count]");
//		var value = $input.val();
//		if(flag){
//			value++;
//		}else{
//			value--;
//			if(value<=0){
//				value=1;
//			}
//		}
//	
//		$input.val(value);
//		Count();
//	}
//	$(".combo-plus").click(function(){
//		addnumber(this,true);
//	});
//	$(".combo-minus").click(function(){
//		addnumber(this,false);
//	});
	
	$(".combo-plus").click(function(){
		var $input =$(this).parent().find("input[name=count]");
		var value = $input.val();
		value++;
		$input.val(value);
		Count();
	});
	$(".combo-minus").click(function(){
		var $input =$(this).parent().find("input[name=count]");
		var value = $input.val();
		value--;
		if(value<=0){
				value=1;
		}
		$input.val(value);
		Count();
	});
	
	//删除商品
	$("#cart-delete").click(function(){
		var check = $("[name=id]");
		check.each(function(i,dom){
			var xuan = $(dom).is(":checked");
			if(xuan){
				$(dom).parent().parent().remove();
			}
		});
		Count();
	})
});