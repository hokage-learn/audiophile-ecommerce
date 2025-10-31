'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCart } from './CartContext';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number'),
  address: Yup.string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters'),
  city: Yup.string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters'),
  zipCode: Yup.string()
    .required('ZIP code is required')
    .matches(/^\d{4,10}$/, 'Invalid ZIP code'),
  country: Yup.string()
    .required('Country is required')
    .min(2, 'Country must be at least 2 characters'),
  paymentMethod: Yup.string()
    .oneOf(['cash', 'card'], 'Please select a payment method')
    .required('Payment method is required'),
  eMoneyNumber: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema
      .required('E-Money number is required')
      .matches(/^\d{9}$/, 'E-Money number must be 9 digits'),
    otherwise: (schema) => schema.notRequired(),
  }),
  eMoneyPin: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema
      .required('E-Money PIN is required')
      .matches(/^\d{4}$/, 'E-Money PIN must be 4 digits'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default function CheckoutForm({ onSubmit, error, isSubmitting = false }) {
  const { cart, getGrandTotal } = useCart();

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    paymentMethod: 'card', // Default to e-Money as shown in design
    eMoneyNumber: '',
    eMoneyPin: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, formikHelpers) => {
        console.log('Form submitted with values:', values);
        console.log('Form errors:', formikHelpers.errors);
        onSubmit(values, formikHelpers);
      }}
      enableReinitialize={false}
    >
      {({ values, errors, touched, setSubmitting, isSubmitting: formikIsSubmitting }) => {
        // Prevent form submission if already submitting
        const isCurrentlySubmitting = isSubmitting || formikIsSubmitting;
        
        return (
        <Form 
          id="checkout-form" 
          className="flex flex-col gap-6" 
          noValidate
        >
          <h2 className="text-[32px] font-bold tracking-[1.15px] uppercase mb-8">CHECKOUT</h2>

          {/* Billing Details */}
          <fieldset className="border-none p-0 m-0 flex flex-col gap-4">
            <legend className="text-[13px] font-bold tracking-[1px] uppercase text-[#D87D4A] mb-2 px-0">
              BILLING DETAILS
            </legend>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-[12px] font-bold tracking-[0.2px] mb-1">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Alexei Ward"
                  className={`w-full py-[18px] px-6 border rounded bg-white text-[#101010] text-[15px] font-bold placeholder:opacity-40 transition-colors focus:outline-none focus:border-[#D87D4A] ${errors.name && touched.name ? 'border-[#D87D4A]' : 'border-[#F1F1F1]'}`}
                  aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                  aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                />
                <ErrorMessage name="name" component="span" id="name-error" className="text-[#D87D4A] text-[15px] mt-1 block" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-[12px] font-bold tracking-[0.2px] mb-1">
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="alexei@mail.com"
                  className={`w-full py-[18px] px-6 border rounded bg-white text-[#101010] text-[15px] font-bold placeholder:opacity-40 transition-colors focus:outline-none focus:border-[#D87D4A] ${errors.email && touched.email ? 'border-[#D87D4A]' : 'border-[#F1F1F1]'}`}
                  aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                  aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                />
                <ErrorMessage name="email" component="span" id="email-error" className="text-[#D87D4A] text-[15px] mt-1 block" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-[12px] font-bold tracking-[0.2px] mb-1">
                Phone Number
              </label>
              <Field
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1 202-555-0136"
                className={`w-full py-[18px] px-6 border rounded bg-white text-[#101010] text-[15px] font-bold placeholder:opacity-40 transition-colors focus:outline-none focus:border-[#D87D4A] ${errors.phone && touched.phone ? 'border-[#D87D4A]' : 'border-[#F1F1F1]'}`}
                aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
                aria-invalid={errors.phone && touched.phone ? 'true' : 'false'}
              />
              <ErrorMessage name="phone" component="span" id="phone-error" className="text-[#D87D4A] text-[15px] mt-1 block" />
            </div>
          </fieldset>

          {/* Shipping Info */}
          <fieldset className="border-none p-0 m-0 flex flex-col gap-4">
            <legend className="text-[13px] font-bold tracking-[1px] uppercase text-[#D87D4A] mb-2 px-0">
              SHIPPING INFO
            </legend>

            <div className="flex flex-col gap-1">
              <label htmlFor="address" className="text-[12px] font-bold tracking-[0.2px] mb-1">
                Address
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                placeholder="1137 Williams Avenue"
                className={`w-full py-[18px] px-6 border rounded bg-white text-[#101010] text-[15px] font-bold placeholder:opacity-40 transition-colors focus:outline-none focus:border-[#D87D4A] ${errors.address && touched.address ? 'border-[#D87D4A]' : 'border-[#F1F1F1]'}`}
                aria-describedby={errors.address && touched.address ? 'address-error' : undefined}
                aria-invalid={errors.address && touched.address ? 'true' : 'false'}
              />
              <ErrorMessage name="address" component="span" id="address-error" className="text-[#D87D4A] text-[15px] mt-1 block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="zipCode" className="text-[12px] font-bold tracking-[0.2px] mb-1">
                  ZIP Code
                </label>
                <Field
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  placeholder="10001"
                  className={`w-full py-[18px] px-6 border rounded bg-white text-[#101010] text-[15px] font-bold placeholder:opacity-40 transition-colors focus:outline-none focus:border-[#D87D4A] ${errors.zipCode && touched.zipCode ? 'border-[#D87D4A]' : 'border-[#F1F1F1]'}`}
                  aria-describedby={errors.zipCode && touched.zipCode ? 'zipCode-error' : undefined}
                  aria-invalid={errors.zipCode && touched.zipCode ? 'true' : 'false'}
                />
                <ErrorMessage name="zipCode" component="span" id="zipCode-error" className="text-[#D87D4A] text-[15px] mt-1 block" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="city" className="text-[12px] font-bold tracking-[0.2px] mb-1">
                  City
                </label>
                <Field
                  type="text"
                  id="city"
                  name="city"
                  placeholder="New York"
                  className={`w-full py-[18px] px-6 border rounded bg-white text-[#101010] text-[15px] font-bold placeholder:opacity-40 transition-colors focus:outline-none focus:border-[#D87D4A] ${errors.city && touched.city ? 'border-[#D87D4A]' : 'border-[#F1F1F1]'}`}
                  aria-describedby={errors.city && touched.city ? 'city-error' : undefined}
                  aria-invalid={errors.city && touched.city ? 'true' : 'false'}
                />
                <ErrorMessage name="city" component="span" id="city-error" className="text-[#D87D4A] text-[15px] mt-1 block" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="text-[12px] font-bold tracking-[0.2px] mb-1">
                Country
              </label>
              <Field
                type="text"
                id="country"
                name="country"
                placeholder="United States"
                className={`w-full py-[18px] px-6 border rounded bg-white text-[#101010] text-[15px] font-bold placeholder:opacity-40 transition-colors focus:outline-none focus:border-[#D87D4A] ${errors.country && touched.country ? 'border-[#D87D4A]' : 'border-[#F1F1F1]'}`}
                aria-describedby={errors.country && touched.country ? 'country-error' : undefined}
                aria-invalid={errors.country && touched.country ? 'true' : 'false'}
              />
              <ErrorMessage name="country" component="span" id="country-error" className="text-[#D87D4A] text-[15px] mt-1 block" />
            </div>
          </fieldset>

          {/* Payment Details */}
          <fieldset className="border-none p-0 m-0 flex flex-col gap-4">
            <legend className="text-[13px] font-bold tracking-[1px] uppercase text-[#D87D4A] mb-2 px-0">
              PAYMENT DETAILS
            </legend>

            <div className="flex flex-col md:flex-row md:items-start gap-4 md:justify-between">
              <label className="text-[12px] font-bold tracking-[0.2px] mb-1 md:mb-0">Payment Method</label>
              <div className="flex flex-col gap-4 flex-1 md:max-w-[309px]" role="radiogroup" aria-label="Payment method">
                <label className={`flex items-center gap-4 p-4 border rounded cursor-pointer transition-colors ${values.paymentMethod === 'card' ? 'border-[#D87D4A]' : 'border-[#F1F1F1]'} hover:border-[#FBAF85]`}>
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    className="w-5 h-5 cursor-pointer accent-[#D87D4A]"
                  />
                  <span className="text-[14px] font-bold tracking-[0] text-[#101010]">e-Money</span>
                </label>
                <label className={`flex items-center gap-4 p-4 border rounded cursor-pointer transition-colors ${values.paymentMethod === 'cash' ? 'border-[#D87D4A]' : 'border-[#F1F1F1]'} hover:border-[#FBAF85]`}>
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    className="w-5 h-5 cursor-pointer accent-[#D87D4A]"
                  />
                  <span className="text-[14px] font-bold tracking-[0] text-[#101010]">Cash on Delivery</span>
                </label>
              </div>
              <ErrorMessage name="paymentMethod" component="span" className="text-[#D87D4A] text-[15px] mt-1 block md:hidden" />
            </div>
            <div className="hidden md:block">
              <ErrorMessage name="paymentMethod" component="span" className="text-[#D87D4A] text-[15px] mt-1 block" />
            </div>

            {values.paymentMethod === 'card' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="eMoneyNumber" className="text-[12px] font-bold tracking-[0.2px] mb-1">
                    E-Money Number
                  </label>
                  <Field
                    type="text"
                    id="eMoneyNumber"
                    name="eMoneyNumber"
                    placeholder="238521993"
                    className={`w-full py-[18px] px-6 border rounded bg-white text-[#101010] text-[15px] font-bold placeholder:opacity-40 transition-colors focus:outline-none focus:border-[#D87D4A] ${errors.eMoneyNumber && touched.eMoneyNumber ? 'border-[#D87D4A]' : 'border-[#F1F1F1]'}`}
                    aria-describedby={errors.eMoneyNumber && touched.eMoneyNumber ? 'eMoneyNumber-error' : undefined}
                    aria-invalid={errors.eMoneyNumber && touched.eMoneyNumber ? 'true' : 'false'}
                  />
                  <ErrorMessage name="eMoneyNumber" component="span" id="eMoneyNumber-error" className="text-[#D87D4A] text-[15px] mt-1 block" />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="eMoneyPin" className="text-[12px] font-bold tracking-[0.2px] mb-1">
                    E-Money PIN
                  </label>
                  <Field
                    type="text"
                    id="eMoneyPin"
                    name="eMoneyPin"
                    placeholder="6891"
                    className={`w-full py-[18px] px-6 border rounded bg-white text-[#101010] text-[15px] font-bold placeholder:opacity-40 transition-colors focus:outline-none focus:border-[#D87D4A] ${errors.eMoneyPin && touched.eMoneyPin ? 'border-[#D87D4A]' : 'border-[#F1F1F1]'}`}
                    aria-describedby={errors.eMoneyPin && touched.eMoneyPin ? 'eMoneyPin-error' : undefined}
                    aria-invalid={errors.eMoneyPin && touched.eMoneyPin ? 'true' : 'false'}
                  />
                  <ErrorMessage name="eMoneyPin" component="span" id="eMoneyPin-error" className="text-[#D87D4A] text-[15px] mt-1 block" />
                </div>
              </div>
            )}
          </fieldset>

          {error && (
            <div 
              className="bg-[#D87D4A] text-white py-3 px-4 rounded text-[15px] font-medium" 
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}
          
          {/* Continue & Pay button - moved to summary section in checkout page */}
          <div className="hidden">
            <button
              type="submit"
              className="w-full bg-[#D87D4A] text-white py-[15px] px-8 font-bold text-[13px] tracking-[1px] uppercase cursor-pointer transition-colors hover:bg-[#FBAF85] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cart.length === 0 || isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'PROCESSING...' : 'CONTINUE & PAY'}
            </button>
          </div>
        </Form>
        );
      }}
    </Formik>
  );
}
