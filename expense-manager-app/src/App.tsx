import {
  createBrowserRouter
} from "react-router-dom";
import './App.css';
import ExpensesList from './components/ExpensesListComponent';
import ExpenseTrackerComponent from './components/ExpenseTrackerComponent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ExpensesList />,
  },
  {
    path: "/add",
    element: <ExpenseTrackerComponent onClose={null} onSuccess={null} />
  }
]);

export default router;