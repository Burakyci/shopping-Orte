import * as React from "react";
import * as yup from "yup";
import { creditCardSchema } from "../helpers/creditCardSchema";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { IProduct } from "../types/productType";
import Landing from "../components/Landing";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

function LoginForm() {
  const navigate = useNavigate();
  const { myBasketstate } = useSelector((state: RootState) => state.app);
  const [formState, setFormState] = React.useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    name: "",
    focus: undefined,
  });
  const [discountPercentage, setDiscountPercentage] =
    React.useState<boolean>(false);

  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [errors, setErrors] = React.useState<any>({});
  const [touched, setTouched] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);

  const handlePayment = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    navigate("/sucsess");
  };

  const handleBlur = (fieldName: string) => {
    setTouched((prevTouched: any) => ({ ...prevTouched, [fieldName]: true }));
  };

  const handleInputFocus = (evt: any) => {
    setFormState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  React.useEffect(() => {
    let sum = 0;
    myBasketstate.forEach((product: IProduct) => {
      sum += parseFloat(product.price);
    });
    if (!discountPercentage) {
      setTotalPrice(sum);
    } else {
      setTotalPrice((sum = sum * 0.8));
    }
  }, [discountPercentage, myBasketstate]);

  React.useEffect(() => {
    (async () => {
      try {
        await creditCardSchema.validate(formState, { abortEarly: false });
        setErrors(undefined);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          let validationErrors: any = {};
          error.inner.forEach((err: yup.ValidationError) => {
            const fieldName = err.path || "general";
            validationErrors[fieldName] = err.message;
          });
          setErrors(validationErrors);
        }
      }
    })();
  }, [formState, touched]);

  return (
    <>
      {loading ? (
        <Landing />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "400px",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Cards
            number={formState.cardNumber}
            name={formState.name}
            expiry={formState.expirationDate}
            cvc={formState.cvv}
            focused={formState.focus}
          />
          <div>
            <p style={{ marginTop: 10 }}>
              Toplam Fiyat: {totalPrice.toFixed(2)} TL
            </p>
            <button
              type="button"
              disabled={totalPrice === 0 ? true : false}
              onClick={() => {
                setDiscountPercentage(!discountPercentage);
              }}
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                margin: 10,
                width: "100%",
              }}
            >
              {discountPercentage
                ? `Indirimi Iptal Et`
                : `%20 Indirim Kartini Kullan`}
            </button>
          </div>

          <form onSubmit={handlePayment}>
            <div>
              <div>
                <input
                  className="input"
                  name="name"
                  placeholder="Ad Soyad"
                  onBlur={() => handleBlur("name")}
                  value={formState.name}
                  onFocus={handleInputFocus}
                  onChange={(event) =>
                    setFormState({
                      ...formState,
                      name: event.target.value,
                    })
                  }
                />
                {touched?.name && errors?.name ? (
                  <p style={{ color: "red" }}>{errors?.name}</p>
                ) : (
                  <p></p>
                )}
              </div>

              <div>
                <input
                  className="input"
                  placeholder="Kart Numarasi"
                  name="cardNumber"
                  onFocus={handleInputFocus}
                  onBlur={() => handleBlur("cardNumber")}
                  onChange={(event) =>
                    setFormState({
                      ...formState,
                      cardNumber: event.target.value,
                    })
                  }
                  value={formState?.cardNumber}
                />
                {touched?.cardNumber && errors?.cardNumber ? (
                  <p style={{ color: "red" }}>{errors?.cardNumber}</p>
                ) : (
                  <p></p>
                )}
              </div>

              <div>
                <input
                  className="input"
                  placeholder="Son Kullanma Tarihi"
                  name="expirationDate"
                  onBlur={() => handleBlur("expirationDate")}
                  value={formState.expirationDate}
                  onFocus={handleInputFocus}
                  onChange={(event) =>
                    setFormState({
                      ...formState,
                      expirationDate: event.target.value,
                    })
                  }
                />
                {touched?.expirationDate && errors?.expirationDate ? (
                  <p style={{ color: "red" }}>{errors?.expirationDate}</p>
                ) : (
                  <p></p>
                )}
              </div>

              <div>
                <input
                  className="input"
                  name="cvv"
                  placeholder="CVV"
                  onBlur={() => handleBlur("cvv")}
                  value={formState.cvv}
                  onFocus={handleInputFocus}
                  onChange={(event) =>
                    setFormState({ ...formState, cvv: event.target.value })
                  }
                />
                {touched?.cvv && errors?.cvv ? (
                  <p style={{ color: "red" }}>{errors?.cvv}</p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>

            <button
              style={{ width: "100%" }}
              className="btn-basketAdd"
              disabled={errors && true}
              type="submit"
            >
              {totalPrice === 0 ? "Sepetinizde ürün Yok" : "öde"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default LoginForm;
