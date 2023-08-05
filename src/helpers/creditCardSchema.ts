import * as Yup from "yup";

export const creditCardSchema = Yup.object({
  name: Yup.string().required("Ad ve soyad zorunludur"),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Geçersiz kart numarası")
    .required("Kart numarası zorunludur"),
  expirationDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Geçersiz son kullanım tarihi")
    .required("Son kullanım tarihi zorunludur"),
  cvv: Yup.string()
    .matches(/^\d{3,4}$/, "Geçersiz CVV")
    .required("CVV zorunludur"),
});
