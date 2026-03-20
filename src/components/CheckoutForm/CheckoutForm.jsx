import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { createOrder } from '../../services/firebase/orders'
import { formatPrice } from '../../utils/formatPrice'
import EmptyState from '../EmptyState/EmptyState'
import PageHeader from '../PageHeader/PageHeader'
import './CheckoutForm.css'

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  confirmEmail: '',
}

const CHECKOUT_FIELDS = [
  {
    name: 'name',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Tu nombre completo',
  },
  {
    name: 'phone',
    label: 'Telefono',
    type: 'tel',
    placeholder: '11 5555 5555',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'nombre@correo.com',
  },
  {
    name: 'confirmEmail',
    label: 'Confirmar email',
    type: 'email',
    placeholder: 'Repite tu email',
  },
]

function isValidEmail(value) {
  return /\S+@\S+\.\S+/.test(value)
}

function validateForm(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Ingresa tu nombre.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Ingresa tu telefono.'
  }

  if (!values.email.trim()) {
    errors.email = 'Ingresa tu email.'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Ingresa un email valido.'
  }

  if (!values.confirmEmail.trim()) {
    errors.confirmEmail = 'Confirma tu email.'
  } else if (values.email.trim() !== values.confirmEmail.trim()) {
    errors.confirmEmail = 'Los emails no coinciden.'
  }

  return errors
}

function CheckoutForm() {
  const { cart, clearCart, getTotalItems, getTotalPrice } = useCart()
  const [formValues, setFormValues] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderId, setOrderId] = useState('')

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
    setSubmitError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (cart.length === 0) {
      setSubmitError('Tu carrito esta vacio. Agrega productos antes de comprar.')
      return
    }

    const validationErrors = validateForm(formValues)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const newOrderId = await createOrder({
        buyer: {
          name: formValues.name.trim(),
          phone: formValues.phone.trim(),
          email: formValues.email.trim(),
        },
        items: cart.map(({ id, title, price, quantity }) => ({
          id,
          title,
          price,
          quantity,
        })),
        total: totalPrice,
      })

      clearCart()
      setOrderId(newOrderId)
      setFormValues(INITIAL_FORM)
    } catch (error) {
      setSubmitError(error.message || 'No pudimos registrar tu orden.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (orderId) {
    return (
      <section className="checkout page-section">
        <div className="checkout__success section-card">
          <p className="page-header__eyebrow">Compra exitosa</p>
          <h1 className="section-title">Tu orden fue generada correctamente</h1>
          <p className="checkout__success-text">
            Guardamos la compra en Firestore. Tu ID de orden es:
          </p>
          <code className="checkout__order-id">{orderId}</code>
          <div className="checkout__success-actions">
            <Link className="button" to="/">
              Volver al catalogo
            </Link>
            <Link className="button button--secondary" to="/cart">
              Ver carrito vacio
            </Link>
          </div>
        </div>
      </section>
    )
  }

  if (cart.length === 0) {
    return (
      <section className="checkout page-section">
        <EmptyState
          title="No podes finalizar la compra"
          message="Tu carrito esta vacio. Agrega productos antes de abrir el checkout."
          actionLabel="Ir al catalogo"
          actionTo="/"
        />
      </section>
    )
  }

  return (
    <section className="checkout page-section">
      <PageHeader
        eyebrow="Checkout"
        title="Completa tus datos"
        subtitle="Confirma la compra y genera la orden en Firestore sin recargar la pagina."
      />

      <div className="checkout__layout">
        <form className="checkout__form section-card" onSubmit={handleSubmit}>
          {CHECKOUT_FIELDS.map((field) => (
            <label key={field.name} className="checkout__field">
              <span>{field.label}</span>
              <input
                type={field.type}
                name={field.name}
                value={formValues[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
              />
              {errors[field.name] && <small>{errors[field.name]}</small>}
            </label>
          ))}

          {submitError && <p className="checkout__error">{submitError}</p>}

          <button type="submit" className="button" disabled={isSubmitting}>
            {isSubmitting ? 'Generando orden...' : 'Confirmar compra'}
          </button>
        </form>

        <aside className="checkout__summary section-card">
          <h2 className="checkout__summary-title">Resumen de la orden</h2>
          <div className="checkout__summary-list">
            {cart.map((item) => (
              <div key={item.id} className="checkout__summary-item">
                <div>
                  <strong>{item.title}</strong>
                  <span>
                    {item.quantity} x {formatPrice(item.price)}
                  </span>
                </div>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>

          <div className="checkout__summary-total">
            <span>Total ({totalItems} unidades)</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default CheckoutForm
