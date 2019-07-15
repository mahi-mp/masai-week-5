
//main body chi
var temp1=document.querySelector('body')
//div 1
var create_el=document.createElement('div')
create_el.setAttribute('id','original_div')
create_el.setAttribute('class','child_div')
temp1.appendChild(create_el);

//sort_creation & search_creation
var temp=document.querySelector('#original_div')
var create_el1=document.createElement('div')
create_el1.textContent=" Do you want to Sort"
create_el1.setAttribute('id','click_me_sort')
temp.appendChild(create_el1);

var create_el2=document.createElement('div')
create_el2.textContent="Do you want to Search"
create_el2.setAttribute('id','click_me_search')
temp.appendChild(create_el2);

//div 2
var create_div2=document.createElement('div')
create_div2.setAttribute('id','main_second_div')
create_div2.setAttribute('class','child_div')
temp1.appendChild(create_div2);

//search
function final_search(res)
{
	var take_input=document.getElementById("search_input").value
	var temp=JSON.parse(res)
	for (var i =0; i <temp.length; i++)
	{
		if(temp[i]["id"] == take_input)
		{
			display(temp[i])
		}
	}
}

function create_element_search()
{
	create_div2.innerHTML=""
	var search_second_div=document.querySelector("#original_div")
	var create_search=document.createElement('input')
	create_search.setAttribute('id','search_input')
	create_search.setAttribute('class','child_div')
	search_second_div.appendChild(create_search);	

	var create_search1=document.createElement('button')
	create_search1.textContent="Submit"
	create_search1.setAttribute('id','search_btn')
	create_search1.setAttribute('class','child_div')
	search_second_div.appendChild(create_search1);

	function search_function()
	{
		var data=new XMLHttpRequest();
		data.open('GET',"https://raw.githubusercontent.com/masai-school/assignments-data/master/data/dummy/json/company_valuations.json");
		data.send();
		data.onload=function()
		{
			if (data.status==200) 
			{
				final_search(data.response);

			}
			else
			{
				alert('data.status');
			}	
		}
	}
	search_btn.addEventListener('click',search_function )
}
click_me_search.addEventListener('click',create_element_search )

//get data function
function get_data()
{
	create_div2.innerHTML=""
	var data=new XMLHttpRequest();
	data.open('GET',"https://raw.githubusercontent.com/masai-school/assignments-data/master/data/dummy/json/company_valuations.json");
	data.send();
	data.onload=function()
	{
		if (data.status==200) 
		{
			sort_stock_price(data.response);

		}
		else
		{
			alert('data.status');
		}
	}
}
click_me_sort.addEventListener('click',get_data)

//display data
function display(input2)
{	
	var search_second_div=document.querySelector("#main_second_div")
	var cr_el_display=document.createElement('div');
	cr_el_display.setAttribute('id','display_layout')
	cr_el_display.setAttribute('class','child_div')
	cr_el_display.innerHTML=input2.stock_price + "<br>" + input2.id + "<br>"  + input2.market_cap
								+ "<br>"  + input2.stock_symbol + "<br>"  + input2.title ;
	search_second_div.appendChild(cr_el_display);
}

function sort(input)
{
	var sort_arr=input;
	for(var i=0; i<=sort_arr.length-1; i++)
    {
      for(var j=0; j<=sort_arr.length-1; j++)
      {
        if(sort_arr[j]>sort_arr[j+1])
        {
          var temp=sort_arr[j]
          sort_arr[j]=sort_arr[j+1]
          sort_arr[j+1]=temp
        }
      }
    }
    return sort_arr
}

function only_array(input)
{
	var new_array=[];
	for (var i =0; i < input.length ; i++) 
	{
		new_array.push(input[i]["stock_price"])
	}
	return sort(new_array);
}

//sort data by stock price
function sort_stock_price(input)
{
	var data_in_obj=JSON.parse(input)
	var final =only_array(data_in_obj)
	for (var i =0; i <=final.length-1 ; i++) 
	{
		for (var j =0; j <=data_in_obj.length-1 ; j++) 
		{
			if(final[i] == data_in_obj[j]["stock_price"])
			{
				display(data_in_obj[j])
			}	
		}
	}
}

function remove_el()
{
	temp1.removeChild(create_el1)
	temp1.removeChild(create_el2)
}