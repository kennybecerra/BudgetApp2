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
		
		UpdateBudget: function() {
			
			var inc_accu = 0;
			var exp_accu = 0;
			
			for (var itr = 0; itr < this.Income_Records.length; itr++) {
				inc_accu += (this.Income_Records[itr].Amount * 100);
			}
			this.Total_Income = (inc_accu / 100);
	
			for (var itr = 0; itr < this.Expense_Records.length; itr++) {
				exp_accu += (this.Expense_Records[itr].Amount * 100);
			}
			this.Total_Expense = (exp_accu / 100);
			
			this.Total = (inc_accu - exp_accu) / 100;
			
			//this.Total_Income_Percent = Number.parseFloat(this.Total_Income/(this.Total_Income + Math.abs(this.Total_Expense))).toFixed(2) * 100;
			this.Total_Income_Percent = Math.round((this.Total_Income /(this.Total_Income + this.Total_Expense)).toFixed(3) * 100);
			
			//this.Total_Expense_Percent = Number.parseFloat(Math.abs(this.Total_Expense)/(this.Total_Income + Math.abs(this.Total_Expense))).toFixed(2) * 100;
			this.Total_Expense_Percent = Math.round((this.Total_Expense /(this.Total_Income + this.Total_Expense)).toFixed(3) * 100);
			
			// Update Income individual record percentages
			for (var itr = 0; itr < this.Income_Records.length; itr++) {
				this.Income_Records[itr].Percent = Math.round((this.Income_Records[itr].Amount / this.Total_Income).toFixed(3) * 100);
			}
			// Update Expense individual record percentages
			for (var itr = 0; itr < this.Expense_Records.length; itr++) {
				this.Expense_Records[itr].Percent = Math.round((this.Expense_Records[itr].Amount / this.Total_Expense).toFixed(3) * 100);
			}
		}
	}
	
		return {
			AddRecord: function(sign, description, amount) {
				if (sign === "plus") {
				Budget.Income_Records.push( new Record(sign, description, amount));
				}
				else {
				Budget.Expense_Records.push( new Record(sign, description, amount));
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
			}
		
		
		}
	
	//Records object contructor
	function Record(sign, description, amount){
		this.Sign = sign;
		this.Description = description;
		this.Amount = amount;
		this.Percent = 0;
	}
	
})();



/* ------------  UI CONTROLLER START -----------  */

/* ------------  UI CONTROLLER END -----------  */

/* ------------ CONTROLLER START -----------  */

/* ------------ CONTROLLER END -----------  */

/* This functrion is used to remove a record from the tables*/






function RemoveItem(self) {
  console.log(self);
  var child = self.parentNode;
  child.parentNode.removeChild(child);
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


