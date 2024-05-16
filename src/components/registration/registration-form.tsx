import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Button, ButtonGroup } from '@chakra-ui/react';
import * as Yup from 'yup';

const RegistrationForm: React.FC = () => {
  const [bearerToken, setBearerToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const passwordValidator = (value: string | undefined) => {
    if (!value) return false; // Ha a bemenet undefined, akkor false
    return value.length >= 8 && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
  };
  
  const [sameAsHomeAddress, setSameAsHomeAddress] = useState(false);

  useEffect(() => {
    if (sameAsHomeAddress) {
      formik.setValues((values) => ({
        ...values,
        notificationAddress: values.homeAddress,
      }));
      formik.setFieldTouched('notificationAddress', true, false);
    } else {
      formik.setValues((values) => ({
        ...values,
        notificationAddress: {
          name: '',
          country: '',
          city: '',
          street: '',
          zip: '',
        },
      }));
      formik.setFieldTouched('notificationAddress', false, false);
    }
  }, [sameAsHomeAddress]);
  

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
      homeAddress: {
        name: '',
        country: '',
        city: '',
        street: '',
        zip: '',
      },
      notificationAddress: {
        name: '',
        country: '',
        city: '',
        street: '',
        zip: '',
      }
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Kötelező mező'),
      password: Yup.string().test('password-test', 'A jelszónak legalább 8 karakter hosszúnak kell lennie, és tartalmaznia kell legalább egy kisbetűt, egy nagybetűt, egy számot és egy speciális karaktert.', passwordValidator).required('Kötelező mező'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')], 'A két jelszó nem egyezik meg')
        .required('Kötelező mező'),
      firstName: Yup.string().required('Kötelező mező'),
      lastName: Yup.string().required('Kötelező mező'),
      homeAddress: Yup.object().shape({
        name: Yup.string().required('Kötelező mező'),
        country: Yup.string().required('Kötelező mező'),
        city: Yup.string().required('Kötelező mező'),
        street: Yup.string().required('Kötelező mező'),
        zip: Yup.string().required('Kötelező mező'),
      }),
      notificationAddress: Yup.object().shape({
        name: Yup.string().required('Kötelező mező'),
        country: Yup.string().required('Kötelező mező'),
        city: Yup.string().required('Kötelező mező'),
        street: Yup.string().required('Kötelező mező'),
        zip: Yup.string().required('Kötelező mező'),
      })
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('http://localhost:5000/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          setBearerToken(data.token);
          localStorage.setItem('token', data.token);
          setError('Sikeres regisztráció!');
          resetForm();
        } else {
          const errorData = await response.json();
          switch (response.status) {
            case 400:
              throw new Error(errorData.message || 'A bevitt adatok érvénytelenek.');
            case 409:
              throw new Error(errorData.message || 'A felhasználó már létezik.');
            default:
              throw new Error(errorData.message || 'Ismeretlen hiba történt.');
          }
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Hiba kezelése közben váratlan hiba történt.');
      }
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setError(null);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ textAlign: 'center' }}>Regisztrációs űrlap</h2>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="username"
            placeholder="Felhasználónév"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: '#e0e0e0'
            }}
          />
          {formik.touched.username && formik.errors.username ? (
            <div style={{ color: 'red' }}>{formik.errors.username}</div>
          ) : null}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            name="password"
            placeholder="Jelszó"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: '#e0e0e0'
            }}
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          ) : null}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Jelszó megerősítése"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: '#e0e0e0'
            }}
          />
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
            <div style={{ color: 'red' }}>{formik.errors.passwordConfirm}</div>
          ) : null}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="firstName"
            placeholder="Keresztnév"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: '#e0e0e0'
            }}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div style={{ color: 'red' }}>{formik.errors.firstName}</div>
          ) : null}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="lastName"
            placeholder="Vezetéknév"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: '#e0e0e0'
            }}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div style={{ color: 'red' }}>{formik.errors.lastName}</div>
          ) : null}
        </div>
        <h3>Otthoni cím</h3>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="homeAddress.name"
            placeholder="Név"
            value={formik.values.homeAddress.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: '#e0e0e0'
            }}
          />
          {formik.touched.homeAddress?.name && formik.errors.homeAddress?.name ? (
            <div style={{ color: 'red' }}>{formik.errors.homeAddress.name}</div>
          ) : null}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="homeAddress.country"
            placeholder="Ország"
            value={formik.values.homeAddress.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: '#e0e0e0'
            }}
          />
          {formik.touched.homeAddress?.country && formik.errors.homeAddress?.country ? (
            <div style={{ color: 'red' }}>{formik.errors.homeAddress.country}</div>
          ) : null}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="homeAddress.city"
            placeholder="Város"
            value={formik.values.homeAddress.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: '#e0e0e0'
            }}
          />
          {formik.touched.homeAddress?.city && formik.errors.homeAddress?.city ? (
            <div style={{ color: 'red' }}>{formik.errors.homeAddress.city}</div>
          ) : null}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="homeAddress.street"
            placeholder="Utca"
            value={formik.values.homeAddress.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: '#e0e0e0'
            }}
          />
          {formik.touched.homeAddress?.street && formik.errors.homeAddress?.street ? (
            <div style={{ color: 'red' }}>{formik.errors.homeAddress.street}</div>
          ) : null}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="homeAddress.zip"
            placeholder="Irányítószám"
            value={formik.values.homeAddress.zip}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: '#e0e0e0'
            }}
          />
          {formik.touched.homeAddress?.zip && formik.errors.homeAddress?.zip ? (
            <div style={{ color: 'red' }}>{formik.errors.homeAddress.zip}</div>
          ) : null}
        </div>

        <input
          type="checkbox"
          id="sameAsHomeAddress"
          name="sameAsHomeAddress"
          checked={sameAsHomeAddress}
          onChange={(e) => setSameAsHomeAddress(e.target.checked)}
        />
        <label htmlFor="sameAsHomeAddress">Az értesítési cím megegyezik a lakcímmel</label>
        <br/>
        
        <h3>Értesítési cím</h3>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="notificationAddress.name"
            placeholder="Név"
            value={formik.values.notificationAddress.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: '#e0e0e0'
            }}
          />
          {formik.touched.notificationAddress?.name && formik.errors.notificationAddress?.name ? (
            <div style={{ color: 'red' }}>{formik.errors.notificationAddress.name}</div>
          ) : null}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="notificationAddress.country"
            placeholder="Ország"
            value={formik.values.notificationAddress.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: '#e0e0e0'
            }}
          />
          {formik.touched.notificationAddress?.country && formik.errors.notificationAddress?.country ? (
            <div style={{ color: 'red' }}>{formik.errors.notificationAddress.country}</div>
          ) : null}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="notificationAddress.city"
            placeholder="Város"
            value={formik.values.notificationAddress.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: '#e0e0e0'
            }}
          />
          {formik.touched.notificationAddress?.city && formik.errors.notificationAddress?.city ? (
            <div style={{ color: 'red' }}>{formik.errors.notificationAddress.city}</div>
          ) : null}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="notificationAddress.street"
            placeholder="Utca"
            value={formik.values.notificationAddress.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: '#e0e0e0'
            }}
          />
          {formik.touched.notificationAddress?.street && formik.errors.notificationAddress?.street ? (
            <div style={{ color: 'red' }}>{formik.errors.notificationAddress.street}</div>
          ) : null}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="notificationAddress.zip"
            placeholder="Irányítószám"
            value={formik.values.notificationAddress.zip}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: '#e0e0e0'
            }}
          />
          {formik.touched.notificationAddress?.zip && formik.errors.notificationAddress?.zip ? (
            <div style={{ color: 'red' }}>{formik.errors.notificationAddress.zip}</div>
          ) : null}
        </div>

        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>
        )}

        <ButtonGroup>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#4CAF50',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Regisztráció
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: 'red',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Mégsem
          </button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default RegistrationForm;
