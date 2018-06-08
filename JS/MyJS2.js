/* *********************************************
The code is split into three modules

BudgetController : holds the data structure where the information is stored

UIController :  holds all functionality to change the UI, i.e. adds
or removes income_records

Conttroller : connects the rpevious two modules together, also functions as an initializer
to the page.

***********************************************/

/*Intialization - Immediately invoking functions*/
/* ------------  BUDGET CONTROLLER START -----------  */
var BudgetController = (function () {
	
	//Data structure to hold the BudgetController
	Budget = {
		Total_Income: 0,
		Total_Income_Percent: 0,
		Total_Expense: 0,
		Total_Expense_Percent: 0,
		Total: 0,
		
		Income_Records: [],
		Expense_Records: [],
		counter: 0,
		
		UpdateBudget: function() {
			
			var inc_accu = 0;
			var exp_accu = 0;
			
			for (var itr = 0; itr < this.Income_Records.length; itr++) {
				inc_accu += (this.Income_Records[itr].Amount * 100);
			}

			this.Income_Records.length === 0 ? this.Total_Income = 0 : this.Total_Income = (inc_accu / 100);
	
			for (var itr = 0; itr < this.Expense_Records.length; itr++) {
				exp_accu += (this.Expense_Records[itr].Amount * 100);
			}

			this.Expense_Records.length === 0 ? this.Total_Expense = 0 : this.Total_Expense = (exp_accu / 100);
			
			this.Total = Number.parseFloat(((inc_accu - exp_accu) / 100).toFixed(2));
			
			//this.Total_Income_Percent = Number.parseFloat(this.Total_Income/(this.Total_Income + Math.abs(this.Total_Expense))).toFixed(2) * 100;

			//this.Total_Income_Percent = Math.round((this.Total_Income /(this.Total_Income + this.Total_Expense)).toFixed(3) * 100);
			this.Income_Records.length === 0 ? this.Total_Income_Percent = 0.00 : this.Total_Income_Percent = Number.parseFloat((Math.round((this.Total_Income/(this.Total_Income + this.Total_Expense)) * 10000) / 100).toFixed(2));

			//this.Total_Expense_Percent = Number.parseFloat(Math.abs(this.Total_Expense)/(this.Total_Income + Math.abs(this.Total_Expense))).toFixed(2) * 100;
			//this.Total_Expense_Percent = Math.round((this.Total_Expense /(this.Total_Income + this.Total_Expense)).toFixed(3) * 100);
			this.Expense_Records.length === 0 ? this.Total_Expense_Percent = 0.00 : this.Total_Expense_Percent = Number.parseFloat((Math.round((this.Total_Expense/(this.Total_Income + this.Total_Expense)) * 10000) / 100).toFixed(2));

			// Update Income individual record percentages
			for (var itr = 0; itr < this.Income_Records.length; itr++) {
				//this.Income_Records[itr].Percent = Math.round((this.Income_Records[itr].Amount / this.Total_Income).toFixed(3) * 100);
				this.Income_Records[itr].Percent = Number.parseFloat((Math.round((this.Income_Records[itr].Amount / this.Total_Income) * 10000) / 100).toFixed(2));

			}
			// Update Expense individual record percentages
			for (var itr = 0; itr < this.Expense_Records.length; itr++) {
				//this.Expense_Records[itr].Percent = Math.round((this.Expense_Records[itr].Amount / this.Total_Expense).toFixed(3) * 100);
				this.Expense_Records[itr].Percent = Number.parseFloat((Math.round((this.Expense_Records[itr].Amount / this.Total_Expense) * 10000) / 100).toFixed(2));
			}

			

			

		}
	}
	
		return {
			Total: function () { return Budget.Total;},
			Total_Income: function () { return Budget.Total_Income;},
			Total_Expense: function () { return Budget.Total_Expense;},
			Total_Income_Percent: function () { return Budget.Total_Income_Percent;},
			Total_Expense_Percent: function () { return Budget.Total_Expense_Percent;},
			Income_Records: function () { return Budget.Income_Records;},
			Expense_Records: function () { return Budget.Expense_Records;},
			AddRecord: function(sign, description, amount, id) {

				sign === "plus" ? Budget.Income_Records.push( new Record(description, amount, id)) : Budget.Expense_Records.push( new Record(description, amount, id));
				Budget.UpdateBudget();
				
			},
			RemoveRecord: function (id) {
				for (var itr = 0; itr < Budget.Income_Records.length; itr++) {
					if (Budget.Income_Records[itr].Id === id) {
						Budget.Income_Records.splice(itr, 1)
					}
				}
				for (var itr = 0; itr < Budget.Expense_Records.length; itr++) {
					if (Budget.Expense_Records[itr].Id === id) {
						Budget.Expense_Records.splice(itr, 1)
					}
				}
				Budget.UpdateBudget();

			},
			ShowBudget: function() {
				console.log('********** BUDGET START ************');
				console.log(Budget);
				console.log('********** BUDGET END ************');
			},
			Update: function () {
				Budget.UpdateBudget();
			},
			showCounter: function () { return Budget.counter;},
			IncrementCounter: function () {Budget.counter++; }
		
		
		}
	
	//Records object contructor
	function Record(description, amount, id){
		this.Description = description;
		this.Amount = amount;
		this.Id = id;
		this.Percent = 0;
	}
	
})();



/* ------------  UI CONTROLLER START -----------  */
var UIController = (function () {
	
	return {
		RemoveRecord: function (my_id) {
			var List_income = document.getElementsByClassName("income")[0].childNodes;
			var List_expense = document.getElementsByClassName('expense')[0].childNodes;

	
			for ( var i = 0; i < List_income.length; i++) {
				if (List_income[i].id === my_id){
				List_income[i].parentNode.removeChild(List_income[i]);
				}
			}
			for ( var i = 0; i < List_expense.length; i++) {
				if (List_expense[i].id === my_id){
				List_expense[i].parentNode.removeChild(List_expense[i]);
				}
			}
		},
		UpdateUI: function (total, totalIncome, totalIncomePercent, totalExpense, totalExpensePercent, IR, ER) {
			document.getElementsByClassName('total')[0].innerText = total;
			document.getElementsByClassName('total-income')[0].innerText = '+ ' + totalIncome;
			document.getElementsByClassName('total-income-percent')[0].innerText = totalIncomePercent + ' %';
			document.getElementsByClassName('total-expenses')[0].innerText = '- ' + totalExpense;
			document.getElementsByClassName('total-expenses-percent')[0].innerText = totalExpensePercent + ' %';

			for (var i = 0; i < IR.length; i++) {
				document.getElementById(IR[i].Id).getElementsByClassName('item-percent')[0].innerText = IR[i].Percent + ' %';
			}
			for (var i = 0; i < ER.length; i++) {
				document.getElementById(ER[i].Id).getElementsByClassName('item-percent')[0].innerText = ER[i].Percent + ' %';
			}


		},
		AddRecord: function (sign, description, amount, id) {

			mystring = ["<div class=\"row income-record\" id=\"" + id + "\">",
			"<p class=\"item-description\">" + description + "</p>",
			"<p class=\"item-amount\">" + amount + "</p>",
			"<p class=\"item-percent\">%</p>",
			"<button class=\"delete-button\"><i class=\"ion-ios-close-outline\"></i></button>",
		  	"</div>\n"].join("\n");
	  
		  	mystring2 = ["<div class=\"row expenses-record\" id=\"" + id + "\">",
			"<p class=\"item-description\">" + description + "</p>",
			"<p class=\"item-amount\">" + amount + "</p>",
			"<p class=\"item-percent\">%</p>",
			"<button class=\"delete-button\"><i class=\"ion-ios-close-outline\"></i></button>",
		 	"</div>\n"].join("\n");
	  
			sign === 'plus' ? document.getElementsByClassName('income')[0].innerHTML+= mystring : document.getElementsByClassName('expense')[0].innerHTML+= mystring2;
		} 
	}
})();


var controller = (function ( BudgetCtrl, UICtrl) {

	var d = new Date();
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	document.getElementById("month").innerText = months[d.getMonth()];
	document.getElementById("year").innerText = d.getFullYear();

	/*
	function Adding() {
		var Sign = document.querySelector(".my-dropdown").value;
		var Description = document.querySelector(".my-description").value;
		var Amount = document.querySelector(".my-amount").value;
		var current = BudgetCtrl.showCounter();
		var idString = "record-"

		var myId = idString + current;

			BudgetCtrl.AddRecord( Sign, Description, Amount, myId);
			UICtrl.AddRecord(Sign, Description, Amount, myId);
			UICtrl.UpdateUI( BudgetCtrl.Total(), BudgetCtrl.Total_Income(), BudgetCtrl.Total_Income_Percent(), Budget.Total_Expense(), Budget.Total_Expense_Percent(), BudgetCtrl.Income_Records(), BudgetCtrl.Expense_Records());
			
	}
	*/
	document.querySelector('.add-button').addEventListener('click', function () {
		var Sign = document.querySelector(".my-dropdown").value;
		var Description = document.querySelector(".my-description").value;
		var Amount = document.querySelector(".my-amount").value;
		var current = BudgetCtrl.showCounter();
		var idString = "record-"

		var myId = idString + current;

			BudgetCtrl.AddRecord( Sign, Description, Amount, myId);
			UICtrl.AddRecord(Sign, Description, Amount, myId);
			UICtrl.UpdateUI( BudgetCtrl.Total(), BudgetCtrl.Total_Income(), BudgetCtrl.Total_Income_Percent(), BudgetCtrl.Total_Expense() , BudgetCtrl.Total_Expense_Percent(), BudgetCtrl.Income_Records(), BudgetCtrl.Expense_Records());
			BudgetCtrl.IncrementCounter();
			
			document.getElementById(myId).getElementsByClassName('delete-button')[0].addEventListener('click', function (){
				var child = this.parentNode;
				child.parentNode.removeChild(child);
				BudgetCtrl.RemoveRecord(myId);		
				UICtrl.UpdateUI( BudgetCtrl.Total(), BudgetCtrl.Total_Income(), BudgetCtrl.Total_Income_Percent(), BudgetCtrl.Total_Expense() , BudgetCtrl.Total_Expense_Percent(), BudgetCtrl.Income_Records(), BudgetCtrl.Expense_Records());
			});
			
	});

})(BudgetController, UIController);

/* ------------  UI CONTROLLER END -----------  */

/* ------------ CONTROLLER START -----------  */

/* ------------ CONTROLLER END -----------  */

/* This functrion is used to remove a record from the tables*/





function RemoveItem(self) {
  console.log(self);
  var child = self.parentNode;
  child.parentNode.removeChild(child);
}

function SecondTesting () {
	var my_id = 'inc-rec-2';
	
	var List_income = document.getElementsByClassName("income")[0].childNodes;
	var List_expense = document.getElementsByClassName('expense')[0].childNodes;

	console.log(List_income);
	
	for ( var i = 0; i < List_income.length; i++) {
		if (List_income[i].id === my_id){
			List_income[i].parentNode.removeChild(List_income[i]);
		}
	}
	for ( var i = 0; i < List_expense.length; i++) {
		if (List_expense[i].id === my_id){
			List_expense[i].parentNode.removeChild(List_expense[i]);
		}
	}

}

function ThirdTesting() {
	var total = 231.43;
	var totalIncome = 5034.34;
	var totalIncomePercent = 23.45;
	var totalExpense = 2345.54;
	var totalExpensePercent = 12.86;

	document.getElementsByClassName('total')[0].innerText = total;
	document.getElementsByClassName('total-income')[0].innerText = totalIncome;
	document.getElementsByClassName('total-income-percent')[0].innerText = totalIncomePercent + ' %';
	document.getElementsByClassName('total-expenses')[0].innerText = totalExpense;
	document.getElementsByClassName('total-expenses-percent')[0].innerText = totalExpensePercent + ' %';

	document.getElementById('inc-rec-1').getElementsByClassName('item-percent')[0].innerText = '100 %';
}

function JustTesting() {
	
	var myObj = document.querySelector('.income');
	
	console.log("document query selector return : " + myObj.isPrototypeOf(HTMLCollection));
	console.log("document query selector return : " + Object.getPrototypeOf(myObj));
	
	var myDomObj = document.getElementById('income');
	var myTags = document.getElementsByTagName('div');
	var myClasses = document.getElementsByClassName('item-description');
	
	console.log(typeof(myObj));
	console.log(myObj);
	console.log(typeof(myDomObj));
	console.log(myDomObj);
	console.log(typeof(myTags));
	console.log(myTags);
	console.log(typeof(myClasses));
	console.log(myClasses);
	
	
	
	console.log(myClasses[1]);
	console.log(typeof(myClasses[1]));
	var mine = myClasses[1];
	console.log(mine.className);
	
	var children = myObj.childNodes;
	console.log(children);
	console.log(children.entries());
	//console.log(children.forEach());
	console.log(children.item(3));
}

function DeleteElement(self) {
	console.log(Object.getPrototypeOf(self));
	console.log(self);
	console.log('------- Testing Parents ---------');
	console.log(self.parentNode);
	console.log(Object.getPrototypeOf(self.parentNode));
	console.log(self.parentElement);
	console.log(Object.getPrototypeOf(self.parentElement));
	
}
function FourthTest (sign, description, amount, id) {

	mystring = ["<div class=\"row income-record\" id=\"" + id + "\">",
	  "<p class=\"item-description\">" + description + "</p>",
	  "<p class=\"item-amount\">" + amount + "</p>",
	  "<p class=\"item-percent\">%</p>",
	  "<button class=\"delete-button\"><i class=\"ion-ios-close-outline\"></i></button>",
	"</div>\n"].join("\n");

	mystring2 = ["<div class=\"row expenses-record\" id=\"" + id + "\">",
	  "<p class=\"item-description\">" + description + "</p>",
	  "<p class=\"item-amount\">" + amount + "</p>",
	  "<p class=\"item-percent\">%</p>",
	  "<button class=\"delete-button\"><i class=\"ion-ios-close-outline\"></i></button>",
	"</div>\n"].join("\n");

	sign === 'plus' ? document.getElementsByClassName('income')[0].innerHTML+= mystring : document.getElementsByClassName('expense')[0].innerHTML+= mystring2;
} 


function TestingEvents() {
var all = document.querySelectorAll('*');
var items = Array.prototype.slice.call(document.querySelectorAll('*'))
console.log(all);
console.log(items);

		function myFunc(element) {
			var listeners = getEventListeners(element);
				return {
					element: element,
					Parent: element.parentNode,
					listeners: Object.keys(listeners).map(function(k) {return { event: k, listeners: listeners[k] };
				})
			};
		}
var newItems = items.map(myFunc).filter(function(item) { return item.listeners.length > 0});
console.log(newItems);

}


function MyEvents(){
	var items = Array.prototype.slice.call(document.querySelectorAll('*')).map(function(element) {
		var listeners = getEventListeners(element);
			return {
				element: element,
				Parent: element.parentNode,
				listeners: Object.keys(listeners).map(function(k) {return { event: k, listeners: listeners[k] };
			})
		};
	}).filter(function(item) {
		return item.listeners.length;
	});
	
	// See below for things you can do with the items
	
	// Things you can do with the items
	
	// 1. log them to the console
	console.log(items);
	
	/*
	// 2. Put a red border around the elements
	items.forEach(function(item) {
		item.element.style.outline = '1px solid red';
	})
	*/
	// 3. generate a summary
	var summary = items.map(function(item) {
		var el = item.element,
			id = el.id,
			className = el.className;
		if (className instanceof SVGAnimatedString) {
			className = className.baseVal;
		}
		var str = el.tagName.toLowerCase() + (id ? '#' + id : '') + (className ? '.' + className.replace(/\s+/g, '.') : '');
		str += ' ' + item.listeners.map(function(l) {
			return l.event + ': ' + l.listeners.length;
		}).join(' ');
		return str;
	}).join('\n');
	
	console.log(summary);
}