//定义全局变量db代表数据库
var db;
//手机号码输入框失去焦点执行次函数,对手机号进行校验
function mobileBlur(){
	var phoneNum = $("#mobile").val();
	var reg = /^1[34578]\d{9}$/g;
	if(!reg.test(phoneNum)){
		$(".errorMobile").show();//校验手机号，如果错误显示错误信息,并返回false
		return false;
	}
	else{
		$(".errorMobile").hide();//如果手机号正确,错误信息隐藏,并返回true
		return true;
	}
}
//邮箱输入框失去焦点执行次函数,对邮箱进行校验
function emailBlur(){
	var email = $("#email").val();
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
	if(!reg.test(email)){
		$(".errorEmail").show();
		return false;
	}
	else{
		$(".errorEmail").hide();
		return true;
	}
}
//密码输入框失去焦点执行次函数,对密码进行校验
function passwordBlur(){
	var pwNum = $("#password").val();
	var reg = /^\S{6,16}$/;
	if(!reg.test(pwNum)){
		$(".errorPassword").show();
		return false;
	}
	else{
		$(".errorPassword").hide();
		return true;
	}
		
}
//校验密码框失去焦点后执行次函数,对校验密码进行校验
function password2Blur(){
	var pwNum2 = $("#password-confirmation").val();
	var pwNum = $("#password").val();
	if(pwNum != pwNum2){
		$(".errorPassword2").show();
		return false;
	}
	else{
		$(".errorPassword2").hide();
		return true;
	}
}
//页面加载后打开数据库user
window.onload=function(){
	 db = openDatabase("user","0.1","用户数据数据库",2000000);
}
//将所有输入框清空函数
function clearAll(){
	document.getElementById("mobile").innerHTML = "";
	document.getElementById("email").innerHTML = "";
	document.getElementById("password").innerHTML = "";
	document.getElementById("password-confirmation").innerHTML = "";
}
//点击注册时执行此函数,进行校验错误将数据清空正确跳转到登录页面
function register(){
	//判断输入框内容是否全部符合要求,如果有一个不满足则flag为false
	var flag = ((mobileBlur() && emailBlur()) && (password2Blur() && passwordBlur()));
	//判断是否选中条款
	if(!document.getElementById("check").checked){
		flag = false;
		alert("请阅读条款并打勾！");
	}
	//判断是否符合所有要求	
	if(flag){
		var phoneNum = $("#mobile").val();
		var email = $("#email").val();
		var pwNum = $("#password").val();
		db.transaction(function(tx){
			//创建数据表users
			tx.executeSql('create table if not exists users(phoneNum,email,pwNum)');
			//查询数据表users中所有的数据
			tx.executeSql('select * from users',[],function(tx,results){
				var len = results.rows.length;
				for(var i = 0; i < len; i++){
					//判断输入框的数据是否在数据库存在如果存在,弹出窗口提示,并清空所有内容,返回false
					if(phoneNum == results.rows.item(i).phoneNum && email == results.rows.item(i).email){
						alert("该用户已存在!");
						clearAll();
						return false;
					}
				}
				//如果不存在将数据添加到数据库中
				tx.executeSql('insert into users(phoneNum,email,pwNum)values(?,?,?)',[phoneNum,email,pwNum]);
			});
		});
	}
	//如果注册成功弹出提示信息
	if(flag){
		alert("注册成功,正在跳转至登录页面...")
	}
	return flag;
}
