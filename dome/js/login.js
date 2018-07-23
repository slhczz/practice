var db;
//页面加载成功后打开数据库
window.onload=function(){
	db = openDatabase("user","0.1","用户数据数据库",2000000);
}
//点击登录执行此函数对账号密码进行校验
function login(){
	var phoneNum = $("#account").val();
	var pwNum = $("#password").val();
	var flag = false;
	db.transaction(function(tx){
		//创建数据表
		tx.executeSql('create table if not exists users(phoneNum,email,pwNum)');
		//查询所有用户数据
		tx.executeSql('select * from users',[],function(tx,results){
			var len = results.rows.length;
			for(var i = 0; i < len; i++){
				//如果成功跳转至首页并修改为true
				if(phoneNum == results.rows.item(i).phoneNum && pwNum == results.rows.item(i).pwNum){
					alert("登陆成功,正在跳转至首页...");
					location.href = "index.html";
					flag = true;
					break;
				}
			}
			//若为false则跳转至本页面刷新数据
			if(!flag){
				alert("登陆失败,请重新输入用户名和密码!");
				location.href="login.html";
			}
		});
	});
	return flag;
}
