import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ModalComponent from "@/components/.ui/Modal";
import { Close } from "@mui/icons-material";

import { useCartStore } from "@/providers/cart-provider";
import Button from '@/components/.ui/Button';

const CartModal = () => {
  const { items, removeFromCart } = useCartStore((state) => state);
  const CartBtn = <><ShoppingCartOutlinedIcon /></>;

  const handleRemoveFromCart = (lineItemId: string) => {
    removeFromCart(lineItemId);
  };

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Implement checkout logic here
  }

  const checkoutBtn = (
    <Button onClick={handleCheckout} className="primary">
      Checkout
    </Button>
  );

  return (
    <>
      <ModalComponent
        ariaTitle="Your Cart"
        ariaDescription="View and manage the items in your cart"
        modalBtnContent={CartBtn}
        modalBtnClassName="transparent no-border"
        modalHeader={<h2>Your Cart</h2>}
        btnAction={checkoutBtn}
        reverseBtnOrder={true}
        // closeOnAction={closeOnAction}
      >
        <div className="form-container modal-form cart-modal-content">
          {items.length > 0 ? (
            <>
              <ul>
                {items.map((item) => (
                  <li key={item.lineItemId} className="cart-item">
                    <div className="cart-item-details">
                      <span className="cart-item-name">{item.lineItem}</span>
                    </div>
                    <div className="cart-item-actions">
                      <div className="cart-item-price">
                        ${item.price.toFixed(2)}
                      </div>
                      <div>
                        <Button className="icon danger" onClick={() => handleRemoveFromCart(item.lineItemId)}>
                          <Close />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <span className="cart-total-label">Subtotal:</span> <span className="cart-total-amount">${totalPrice.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </ModalComponent>
    </>
  );
};

export default CartModal;