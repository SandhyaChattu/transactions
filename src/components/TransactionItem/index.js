// Write your code here
const TransactionItem = props => {
  const {transactiondetails,Delete} = props
  const {title, Amount, Type} = transactiondetails
  const removeTransaction=()=>{
    Delete(id)
  }
  return (
    <li className="list-container">
      <p>{title}</p>
      <p>{Amount}</p>
      <p>{Type}</p>
      <button data-testid="delete" onClick={removeTransaction}>
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
        alt="delete"
      /></button>
    </li>
  )
}
export default TransactionItem
