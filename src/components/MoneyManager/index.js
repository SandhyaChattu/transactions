import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import TransactionItem from '../TransactionItem'
const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManger extends Component {
  state = {
    Balance: 0,
    Income: 0,
    Expenses: 0,
    Type: 'INCOME',
    title: '',
    amount: '',
    transactionList: [],
  }
  title = e => {
    this.setState({title: e.target.value})
  }
  Amount = event => {
    this.setState({amount: event.target.value})
  }
  typeChange = event => {
    this.setState({Type: event.target.value})
  }
  formSubmit = () => {
    const {title, amount, Type, transactionList} = this.state
    const newTransaction = {
      id: v4(),
      title,
      amount,
      Type,
    }

    if (Type === 'INCOME') {
      this.setState(prevState => ({
        Income: prevState.amount,
        Balance: prevState.amount - prevState.Expenses,
        transactionList: [...prevState.transactionList, newTransaction],
      }))
    }
    this.setState(prevState => ({
      Expenses: prevState.amount,
      Balance: prevState.amount - prevState.Expenses,
      transactionList: [...prevState.transactionList, newTransaction],
    }))
  }
  remove=(id)=>{
    this.setState(prevState=>({transactionList:prevState.transactionList.filter((eachTransaction)=>eachTransaction.id !== id)}))
  }

  render() {
    const {Balance, Income, Expenses, transactionList} = this.state
    return (
      <div className="bg-container">
        <div className="profile-card">
          <h1 className="profile-head">Hi,Richard</h1>
          <p>
            Welcome back to your<span> MoneyManger</span>
          </p>
        </div>
        <div className="display-information-container">
          <div className="balance-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              alt="balance"
              className="subcard-img"
            />
            <div>
              <p>Your Balance</p>
              <p className="toDisplayMoney" data-testid="balanceAmount">
                RS{Balance}
              </p>
            </div>
          </div>

          <div className="income-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              alt="income"
              className="subcard-img"
            />
            <div>
              <p>Your Income</p>
              <p className="toDisplayMoney" data-testid="incomeAmount">
                RS {Income}
              </p>
            </div>
          </div>

          <div className="expenses-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              alt="expenses"
              className="subcard-img"
            />
            <div>
              <p>Your Expenses</p>
              <p className="toDisplayMoney" data-testid="expensesAmount">
                RS {Expenses}
              </p>
            </div>
          </div>
        </div>
        <div className="remaining-container">
          <form className="myForm" onSubmit={this.formSubmit}>
            <div>
              <h1>Add Transactions</h1>

              <label htmlFor="Title">Title</label>
              <br />
              <input
                type="text"
                placeholder="title"
                id="Title"
                onChange={this.title}
              />
              <br />
              <br />
              <label htmlFor="Amount">Amount</label>
              <br />
              <input
                type="text"
                placeholder="Amount"
                id="Amount"
                onChange={this.Amount}
              />
              <br />
              <br />
              <label htmlFor="type">Type</label>
              <br />
              <select onChange={this.typeChange}>
                <option value={transactionTypeOptions[0].optionId} selected>
                  {transactionTypeOptions[0].displayText}
                </option>
                <option value={transactionTypeOptions[1].optionId}>
                  {transactionTypeOptions[1].displayText}
                </option>
              </select>
              <br />
              <button className="AddBtn" type="submit">
                Add
              </button>
            </div>
            <div>
              <h1 className="">History</h1>
              <div className="listheading">
                <p className="listItem">Title</p>
                <p className="listItem">Amount</p>
                <p className="listItem"> Type</p>
              </div>
              <ul>
                {transactionList.map(eachTransaction => {
                  <TransactionItem
                    key={eachTransaction.id}
                    transactiondetails={eachTransaction} Delete={this.remove}
                  />
                })}
              </ul>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default MoneyManger
