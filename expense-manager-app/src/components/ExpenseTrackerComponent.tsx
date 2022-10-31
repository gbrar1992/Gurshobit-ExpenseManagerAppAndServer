import { ChangeEvent, Component, FormEvent} from "react"
import { saveData } from "../services/data"

type Props = {
    onSuccess : any
    onClose : any
}

type State = {
    payeeName : string
    product : string
    price : number
    setDate : string
}

class ExpenseTrackerComponent extends Component<Props, State> {
    constructor (props : Props) {
        super(props)
        this.state = {
            payeeName : "",
            product : "",
            price : 0,
            setDate : this.setDefaultExpenseDate()
        }

        this.setExpensePayeeName = this.setExpensePayeeName.bind(this)
        this.setExpenseProductName = this.setExpenseProductName.bind(this)
        this.setExpenseAmount = this.setExpenseAmount.bind(this)
        this.setExpenseDate = this.setExpenseDate.bind(this)
    }
    

    setDefaultExpenseDate = () => {
        const date = new Date();
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    }

    setExpensePayeeName = (event : ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            payeeName : event.target.value
        })
    }

    setExpenseProductName = (event : ChangeEvent<HTMLInputElement>) => {
        this.setState({
            product : event.target.value
        })
    }

    setExpenseAmount = (event : ChangeEvent<HTMLInputElement>) => {
        this.setState({
            price : parseInt(event.target.value)
        })
    }

    setExpenseDate = (event : ChangeEvent<HTMLInputElement>) => {
        this.setState({
            setDate : event.target.value,
        })
    }

    expenseFormSubmitHandler = async (event : FormEvent<HTMLFormElement>) =>{
        event?.preventDefault()
        const finalDate = {
            ...this.state
        }
        const data = await saveData(finalDate)
        this.props.onSuccess()
    }
    
    el = document.createElement('div')

    render () {

    const element =(
        <>
            <section>
                <header>
                    <h1>Add New Expense</h1>
                    <p>Make sure you fill all the fileds where * is provided</p>
                </header>
                <form onSubmit={this.expenseFormSubmitHandler}>
                    <article>
                        <p>Name</p>
                        <select name="Name" id="district" required value={this.state.payeeName} onChange={this.setExpensePayeeName}>
                            <option value="" defaultChecked>Choose</option>
                            <option value="Rahul">Rahul</option>
                            <option value="Ramesh">Ramesh</option>
                        </select>
                    </article>

                    <article>
                        <p>Product purchased</p>
                        <input type="text" required  value={this.state.product} onChange={this.setExpenseProductName}/>
                    </article>

                    <article>
                        <p>Price</p>
                        <input type="number" required value={this.state.price} onChange={this.setExpenseAmount}/>
                    </article>

                    <article>
                        <p>Date</p>
                        <input type="date" required value={this.state.setDate} onChange={this.setExpenseDate}/>
                    </article>

                    <button type="button" className="form-button" onClick={this.props.onClose}>Close</button>
                    <button className="form-button">Submit</button>
                </form>
            </section>
        </>
    )

    return element
    }
}

export default ExpenseTrackerComponent