import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ModalComponent from "@/components/.ui/Modal";

const CartBtn = <><ShoppingCartOutlinedIcon /></>;

const CartModal = () => {
  return (
    <>
      <ModalComponent
        ariaTitle="Your Cart"
        ariaDescription="View and manage the items in your cart"
        modalBtnContent={CartBtn}
        modalBtnClassName="transparent no-border"
        modalHeader={<h2>Your Cart</h2>}
        // btnAction={submitBtn}
        // closeOnAction={closeOnAction}
      >
        <div className="form-container modal-form">
          Cart
        </div>
      </ModalComponent>
    </>
  );
};

export default CartModal;