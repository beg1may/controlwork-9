import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectCategories} from "../../../store/slices/categorySlice.ts";
import {FormEvent, useEffect, useState} from "react";
import BackDrop from "../BackDrop/BackDrop.tsx";
import * as React from "react";
import {closeModal, selectModalOpen} from "../../../store/slices/transactionsSlice.ts";
import {fetchCategories} from "../../../store/thunks/categoryThunks.ts";
import {createTransactions} from "../../../store/thunks/transactionsThunks.ts";

interface Props extends React.PropsWithChildren{
    show?: boolean;
    title?: string;
    onClose: React.MouseEventHandler;
}

const Modal: React.FC<Props> = ({show = false, title, onClose}) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const isOpen = useAppSelector(selectModalOpen);
    const [formState, setFormState] = useState({
        type: 'expense',
        categoryId: '',
        amount: '',
    });

    useEffect(() => {
        if(isOpen) {
            dispatch(fetchCategories());
        }
    }, [dispatch, isOpen]);

    useEffect(() => {
        setFormState( prevState => ({
            ...prevState,
            categoryId: '',
        }) )
    }, [formState.type]);

    const makeFinanceTracker = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name] : value,
        }));
    };

    const close = () => {
        dispatch(closeModal());
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await dispatch(createTransactions({
            categoryId: formState.categoryId,
            amount: parseFloat(formState.amount),
            createAt: (new Date().toDateString())
        }));
        close();
    };

    const categoryByType = categories.filter(category => category.type === formState.type);
    console.log(categoryByType);

    return (
        <div>
            <BackDrop show={show} onClickBackDrop={onClose}/>
            <div className="modal show" style={{
                display: show ? 'block' : 'none', position: 'fixed',
                width: '500px',
                height: '450px',
                overflow: 'auto',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={onSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">{title}</h1>
                        </div>
                        <div className="modal-body p-3">

                            <label htmlFor='type'>Type</label>
                            <select
                                className='form-select form-select-lg mb-3'
                                id='type'
                                name='type'
                                value={formState.type}
                                onChange={makeFinanceTracker}
                            >
                                <option value='income'>Income</option>
                                <option value='expense'>Expense</option>
                            </select>

                            <label htmlFor='categoryId'>Category</label>
                            <select
                                className='form-select form-select-lg mb-3'
                                id='categoryId'
                                name='categoryId'
                                value={formState.categoryId}
                                onChange={makeFinanceTracker}
                                required
                            >
                                <option value=''>Select Category</option>
                                {categoryByType.map(category => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            <div className='mb-3'>
                                <label htmlFor='amount' className='form-label'>Amount</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='Enter Amount'
                                    id='amount'
                                    name='amount'
                                    value={formState.amount}
                                    onChange={makeFinanceTracker}
                                    required
                                    min={'0.01'}
                                    step={'0.01'}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type='button'
                                className="btn btn-secondary"
                                onClick={close}
                            >Cancel
                            </button>
                            <button type='submit' className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;