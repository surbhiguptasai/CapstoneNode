

function showAccountDetails (data) {
	//$("#showResult").tabulator();


		$("#showResult").tabulator({
            // set height of table (optional)
            fitColumns:true,
            responsiveLayout:true, //fit columns to width of table (optional)
            pagination:"remote",
            paginationSize:10,
            columns:[ //Define Table Columns
            {title:"AccountID", field:"accountCode", sorter:"number", align:"left",headerFilter:true},
              {//create column group
              	
            title:"Personal Info",
            columns:[
                {title:"Name", field:"name", sorter:"string",headerFilter:true},
        {title:"Gender", field:"gender", sorter:"string",headerFilter:true},
        {title:"Email", field:"email", sorter:"string",headerFilter:true,formatter:"email"},
        {title:"City", field:"city", sorter:"string",headerFilter:true},
        {title:"Phone", field:"phone", sorter:"string",headerFilter:true},
        {title:"SSN", field:"ssn", sorter:"string",headerFilter:true}
            ],
        },

        {//create column group
            title:"Account Info",
            columns:[
        {title:"AccountType", field:"acttype", sorter:"string",headerFilter:true},        
        {title:"BranchName", field:"branchName", sorter:"string",headerFilter:true},        
        {title:"AccountOpenDate", field:"actopendate", sorter:"date",headerFilter:true},
        {title:"Balance", field:"totalAmount", sorter:"string",headerFilter:true,formatter:"money"}
           ],
        }
        // {title:"Favourite Color", field:"col", sorter:"string", sortable:false},
        // {title:"Date Of Birth", field:"dob", sorter:"date", align:"center"},
    ],
    rowClick:function(e, id, data, row){ //trigger an alert message when the row is clicked
        //alert("Row " + id + " Clicked!!!!");
    },
});
		//Set initial page
$("#showResult").tabulator("setPage", 1);
		$("#download-csv").click(function(){
    $("#showResult").tabulator("download", "csv", "data.csv");
});

//trigger download of data.json file
$("#download-json").click(function(){
    $("#showResult").tabulator("download", "json", "data.json");
});



	$("#showResult").tabulator("setData", data.users);

	
	//$("#showResult").html(val);	


}
function getAllUsers(callback) {
	var numRecords=10;
	var url="http://localhost:8080/users";

    var accountCode=$("#accountCode").val();
     var acttype=$("#acttype").val();
     var ssn=$("#ssn").val();
     var username=$("#username").val();
     var gender=$("#gender").val();
     var city=$("#city").val();
    //alert("accountId is "+accountId);

    var queryString = {};
// var jsonObj = {};
// jsonObj ["accountID"] = 10;

    if(accountCode != undefined && accountCode != null && accountCode.length > 0)
    	queryString ["accountCode"] = accountCode;
      if(acttype != "SelectAccountType" && acttype != null && acttype.length > 0)
    	queryString ["acttype"] = acttype;
    if(ssn != undefined && ssn != null && ssn.length > 0)
    	queryString ["ssn"] = ssn;
    if(username != undefined && username != null && username.length > 0)
    	queryString ["username"] = username;
    if(gender != "SelectGender" && gender != null && gender.length > 0)
    	queryString ["gender"] = gender;
     if(city != "SelectCity" && city != null && city.length > 0)
    	queryString ["address.city"] = city;

//alert("id"+accountId);
 
       		//firing ajax request..
    $.getJSON(url,queryString,callback);
}
function userSubmit() {	
	$("#userSubmit").click(function(event) {
		$("#hidden").removeClass('toggle');
		$("#hidden").addClass('show');
		getAllUsers(showAccountDetails);
	});

}
function showActtype(data){
	$.each(data,function(k,v){
		$.each(v,function(k1,v1)
		{
		$("#acttype").append("<option>"+v1+"</option>");
	    })
	})
}
function populateActType() {
	var url="http://localhost:8080/distinct?distinct=acttype";
	 var queryString = {};

	$.getJSON(url,queryString,showActtype);
}

function showGentype(data){
	$.each(data,function(k,v){
		$.each(v,function(k1,v1)
		{
		$("#gender").append("<option>"+v1+"</option>");
	    })
	})
}
function populateGenType() {
	var url="http://localhost:8080/distinct?distinct=gender";
	 var queryString = {};

	$.getJSON(url,queryString,showGentype);
}

function showCitytype(data){
	$.each(data,function(k,v){
		$.each(v,function(k1,v1)
		{
		$("#city").append("<option>"+v1+"</option>");
	    })
	})
}
function populateCityType() {
	var url="http://localhost:8080/distinct?distinct=address.city";
	 var queryString = {};

	$.getJSON(url,queryString,showCitytype);
}

$(function(){
	populateCityType();
	populateGenType();
	populateActType();
	userSubmit();

});