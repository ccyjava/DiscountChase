var index=1;
var card_li=$(".more_list li");
var card_list=[];
var x;
//$("#smsCode").val(523)
for(i=0;i<card_li.length;i++){
	x=card_li[i];
	console.log(x)
	tmp={}
	tmp["card_num"]=$(x).attr("cardNumberDisplay");
	tmp["bindid"]=$(x).attr("bindid");
	tmp["bankno"]=$(x).attr("bankno");
	card_list.push(tmp);
}


var f =$("<div id=\"CrackIt\"class=\"btn_blue\" role=\"button\" style=\"float:right\" >Start </div>");
var stop =$("<div id=\"StopIt\"class=\"btn_blue\" role=\"button\" style=\"float:right\"  >Stop</div>");
stop.insertAfter($("#order-detail-info div:last"));
f.insertAfter($("#order-detail-info div:last"));
$("#StopIt").click(function() {
	clearInterval(inte);
});
$("#CrackIt").click(function() {
	var current_id=$("#bindId").val();
	for(i=0;i<card_list.length;i++){
		if(card_list[i]["bindid"]==current_id){
			index=i;
		}
	}
	inte=self.setInterval("trypay()",1000);
});


function trypay(){
    $(".more_list li")[index].click();
    //index++;
    if($("#discount-chk-u").attr("checked")){
    	$("#btnCardPay").mousedown();
    	var currentdate = new Date(); 
		var datetime = "Time: " + currentdate.getDate() + "/"
		                + (currentdate.getMonth()+1)  + "/" 
		                + currentdate.getFullYear() + " @ "  
		                + currentdate.getHours() + ":"  
		                + currentdate.getMinutes() + ":" 
		                + currentdate.getSeconds() + ":"
		                + currentdate.getMilliseconds();
    	console.log("Success!  "+datetime);
    	clearInterval(inte);
    }else{
    	
    	var currentdate = new Date(); 
		var datetime = "Time: " + currentdate.getDate() + "/"
		                + (currentdate.getMonth()+1)  + "/" 
		                + currentdate.getFullYear() + " @ "  
		                + currentdate.getHours() + ":"  
		                + currentdate.getMinutes() + ":" 
		                + currentdate.getSeconds() + ":"
		                + currentdate.getMilliseconds();
    	console.log("Discount not start! "+datetime);
    }
}
//var inte=self.setInterval("trypay()",1000);