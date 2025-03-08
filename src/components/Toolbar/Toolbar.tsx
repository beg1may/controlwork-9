import {Link} from "react-router-dom";
import Modal from "../Ui/Modal/Modal.tsx";
import {closeModal, openModal, selectModalOpen} from "../../store/slices/transactionsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";

const Toolbar = () => {
    const dispatch = useAppDispatch();
    const modal = useAppSelector(selectModalOpen);

    const open = () => dispatch(openModal());
    const close = () => dispatch(closeModal());

    return (
        <>
            <nav className='navbar navbar-light bg-body-secondary'>
                <div className='container'>
                    <Link to='/' className='navbar-brand'>Finance Tracker</Link>
                    <button
                        onClick={open}
                        className='btn btn-secondary'
                    >
                        Add
                    </button>
                </div>
            </nav>
            <Modal
                show={modal}
                title="Add Expense/Income"
                onClose={close}
            />
        </>
    );
};

export default Toolbar;