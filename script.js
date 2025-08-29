let expenses =[] // creating an empty list so that we store the data that user entered.
let totalAmount = 0;  // a variable to keep track from 0 to the total.

// craeting a constatnt  variables.
const categorySelect = document.getElementById('category_select')
const amountInput = document.getElementById('amount_input')
const InfoInput = document.getElementById('info')
const dateInput = document.getElementById('date_input')
const addBtn = document.getElementById('add_btn')
const expenseTableBody = document.getElementById('expense-table-body')
const totalAmountCell = document.getElementById('total-amount')
//
addBtn.addEventListener('click',function(){   // adding event listner and making a function when button is clicked.
    const category=categorySelect.value;     
    const info=InfoInput.value;
    const amount =Number(amountInput.value);
    const date = dateInput.value;
// validations.
    if(category ===''){                // if category section is empty than alert the user
        alert('please select a category');
        return;
    }
    if(isNaN(amount) || amount<=0){       // check if user enter the wrong input like cahracter (Nan: Not a number)
        alert('please enter a valid amount');
        return;
    }
    if(info ===''){            // if info is empty tha alert the user.
        alert('please enter a valid amount info');
        return;
    }
    if(date ===''){            // if date is empty than alert the user.
        alert('please select a date');
        return;
    }
    // toatl amount updating.
    expenses.push({category,amount,info,date})
    if(category === 'Income'){      // if category is income the amount is added to the total amount.
        totalAmount+=amount;
    }
    if(category === 'Expense'){     // if category is expense the amount is subtrated to the total amount.
        totalAmount-=amount; 
    }
     totalAmountCell.textContent = totalAmount;
// a new row is inserted to the expense table body
     const newRow = expenseTableBody.insertRow();

     const categoryCell = newRow.insertCell();
     const AmountCell = newRow.insertCell();
     const InfoCell = newRow.insertCell();
     const dateCell = newRow.insertCell();
     const deleteCell = newRow.insertCell();

     const deleteBtn = document.createElement('button');    // delete btn creation.
     deleteBtn.textContent ='Delete';
     deleteBtn.classList.add('delete-btn');
     deleteBtn.addEventListener('click', function(){         // event lisrtner is added to the delete btn.
        expenses.splice(expenses.indexOf(expense),1);
        if(category === 'Income'){                // when clcicking on the button if it was an income ,the amount is now subtrated from the total amount.
            totalAmount+=amount;
        }
        if(category === 'Expense'){                // when clcicking on the button if it was an expense ,the amount is now added to the total amount.
            totalAmount-=amount;
        }
        if(category === 'Expense'){                // clciking on the delete btn vanishes the row.
            totalAmount+=amount;
        }

        totalAmountCell.textContent=totalAmount;
        expenseTableBody.removeChild(newRow)
     })
     const expense = expenses[expenses.length-1];
     categoryCell.textContent=expense.category;
     AmountCell.textContent=expense.amount;
     InfoCell.textContent=expense.info;
     dateCell.textContent=expense.date;
     deleteCell.appendChild(deleteBtn);

});
// for loop
for(const expense of expenses){
    if(category === 'Income'){
        totalAmount+=amount;
    }
    if(category === 'Expense'){
        totalAmount-=amount;
    }
     totalAmountCell.textContent = totalAmount;

     const newRow = expenseTableBody.insertRow();

     const categoryCell = newRow.insertCell();
     const AmountCell = newRow.insertCell();
     const InfoCell = newRow.insertCell();
     const dateCell = newRow.insertCell();
     const deleteCell = newRow.insertCell();

     const deleteBtn = document.createElement('button');
     deleteBtn.textContent ='Delete';
     deleteBtn.classList.add('delete-btn');
     deleteBtn.addEventListener('click', function(){
        expenses.splice(expenses.indexOf(expense),1);
        if(category === 'Income'){
            totalAmount-=amount;
        } 
        if(category === 'Expense'){
            totalAmount+=amount;
        }

        totalAmountCell.textContent=totalAmount;
        expenseTableBody.removeChild(new Row)
     })
     const expense = expenses[expenses.length-1];
     categoryCell.textContent=expense.category;
     AmountCell.textContent=expense.amount;
     InfoCell.textContent=expense.info;
     dateCell.textContent=expense.date;
     deleteCell.appendChild(deleteBtn);
}

