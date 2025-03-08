import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectTotal, selectTransactions} from "../../store/slices/transactionsSlice.ts";
import {useEffect} from "react";
import {fetchTransactions} from "../../store/thunks/transactionsThunks.ts";
import dayjs from 'dayjs'

const Transactions = () => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(selectTransactions);
    const total = useAppSelector(selectTotal);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);


    return (
        <div className='d-flex flex-column gap-3'>
            <div className='card col-3'>
                <div className='card-body'>
                    Total: {total} KGS
                </div>
                {transactions.map(transaction => (
                    <div className='card' key={transaction.id}>
                        <div className='card-body d-flex justify-content-between'>
                            <span>
                                {dayjs(transaction.createAt). format('DD.MM.YYYY HH:mm:ss')}
                            </span>
                            <span>{transaction.category.name}</span>
                            <span>
                                {transaction.category.type === 'expense' ? '-' : '+'}
                                {transaction.amount} KGS
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Transactions;