import { useEffect, useState } from "react"
import ExpenseDataModel from "../models/ExpenseDataModel"
import { fetchData } from "../services/data"
import ExpenseTrackerComponent from "./ExpenseTrackerComponent"

function ExpensesList (){
    const [items, setItems] = useState<ExpenseDataModel[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [sum, setSum] = useState<number | null>()
    const [amountSpentByRahul, setAmountSpentByRahul] = useState<number>(0)
    const [amountSpentByRamesh, setAmountSpentByRamesh] = useState<number>(0)
    const [expenseForm, setExpenseForm] = useState<boolean>(false)

    
    var amountSpentByRahulSum : number = 0
    var amountSpentByRameshSum : number = 0

    useEffect(()=>{
        const fetchMenu = async () => {
            try {
                const data = await fetchData()
                debugger;
                setItems(data)
                setSum(data.reduce((result,value) =>  result = result + value.price , 0 ))
                expenseShares(data)
            }

            catch (error : any) {
                setError(error)
            }
        }
        fetchMenu()
    },[expenseForm])

    const expenseShares = (data :ExpenseDataModel[]) =>{
        data.map(
            singleExpense => (
                singleExpense.payeeName === "Rahul" ? (
                    amountSpentByRahulSum += singleExpense.price
                ):
                (
                    amountSpentByRameshSum += singleExpense.price
                )
            )
        )
        setAmountSpentByRahul(amountSpentByRahulSum)
        setAmountSpentByRamesh(amountSpentByRameshSum)
    }

    const formEventSuccess =() => {
        setExpenseForm(false)
    }
    const formEventCancel = () => {
        setExpenseForm(false)
    }

    return (
        <>
            <header id="page-Header">Expense Manager App</header>
            <button id="Add-Button" onClick={() => setExpenseForm(true)}>Add</button>
            {
                expenseForm && (
                    <div className="form">
                        <ExpenseTrackerComponent onSuccess={formEventSuccess} onClose={formEventCancel}/>
                    </div>
                ) 
            }
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{width: 112}}>Payee</div>
            </>
            {
                items && (
                    items.map (
                        (person, pidx) =>(
                            <div key={pidx}>
                                <div className="use-inline date">{person.setDate}</div>
                                <div className="use-inline">{person.product}</div>
                                <div className="use-inline price">{person.price}</div>
                                <div className={`use-inline ${person.payeeName}`}>{person.payeeName}</div>
                            </div>
                        )
                    )
                )
            }
            <hr />
            
            <div className="use-inline ">Total: </div>
            <span className="use-inline total">{sum}</span> <br />
            <div className="use-inline ">Rahul paid: </div>
            <span className="use-inline total Rahul">{amountSpentByRahul}</span> <br />
            <div className="use-inline ">Ramesh paid: </div>
            <span className="use-inline total Ramesh">{amountSpentByRamesh}</span> <br />
            <span className="use-inline payable">{amountSpentByRahul>amountSpentByRamesh? "Pay Rahul " : "Pay Ramesh"}</span>
            <span className="use-inline payable price"> {Math.abs((amountSpentByRahul-amountSpentByRamesh)/2)}</span>
            
            {
               error && (
                    <>
                        {error?.message}
                    </>
                )
            }
        </>
    )
}

export default ExpensesList