import axios from "axios";
import ExpenseDataModel from "../models/ExpenseDataModel";

const fetchData = () => {
    return axios.get<ExpenseDataModel[]>(`http://localhost:3001/items`).then(response => response.data);
};

const saveData = (newExpense : Omit<ExpenseDataModel,'id'>) => {
    return axios.post<ExpenseDataModel>(`http://localhost:3001/items`,newExpense, {
        headers: {
            'Content-Type' : 'application/json'
        }

    }).then(response => response.data)
}

export {
    fetchData,
    saveData
}