import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {
    selectDeleteLoadings,
    selectFetchingLoadings,
    selectTotal,
    selectTransactions
} from "../../store/slices/transactionsSlice.ts";
import {useEffect} from "react";
import {deleteTransaction, fetchTransactions} from "../../store/thunks/transactionsThunks.ts";
import dayjs from 'dayjs'
import Spinner from "../Ui/Spiner/Spiner.tsx";

const Transactions = () => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(selectTransactions);
    const fetchingLoading = useAppSelector(selectFetchingLoadings);
    const deleteLoading = useAppSelector(selectDeleteLoadings);
    const total = useAppSelector(selectTotal);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const onDelete = async (task_id: string) => {
        await dispatch(deleteTransaction(task_id));
        await dispatch(fetchTransactions());
    };


    return (
        <div className="d-flex flex-column gap-3">
            <div className="card col-3">
                {deleteLoading || fetchingLoading ? (
                    <Spinner />
                ) : (
                    <div>
                        <div className="card-body">
                            Total: {total} KGS
                        </div>
                        {transactions.map((transaction) => (
                            <div className="card" key={transaction.id}>
                                <div className="card-body d-flex justify-content-between">
                                    <span>{dayjs(transaction.createAt).format('DD.MM.YYYY HH:mm:ss')}</span>
                                    <span>{transaction.category.name}</span>
                                    <span>
                {transaction.category.type === 'expense' ? '-' : '+'}
                                        {transaction.amount} KGS
              </span>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => onDelete(transaction.id)}
                                    >
                                        x
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Transactions;