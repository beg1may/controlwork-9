import {Link} from "react-router-dom";
import {useState} from "react";
import Modal from "../Ui/Modal/Modal.tsx";

const Toolbar = () => {
    const [showModal, setShowModal] = useState(false);

    const cancel = () => setShowModal(false);

    return (
        <>
            <nav className='navbar navbar-light bg-body-secondary'>
                <div className='container'>
                    <Link to='/' className='navbar-brand'>Finance Tracker</Link>
                    <button
                        onClick={() => setShowModal(true)}
                        className='btn btn-secondary'
                    >
                        Add
                    </button>
                </div>
            </nav>
            <Modal
                show={showModal}
                title="Add Expense/Income"
                onClose={cancel}
            >

            </Modal>
        </>
    );
};

export default Toolbar;