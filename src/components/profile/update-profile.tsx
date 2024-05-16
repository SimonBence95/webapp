import React, { useEffect, useState } from 'react';
import { useFormik, FormikHelpers } from 'formik';
import { Button, ButtonGroup } from '@chakra-ui/react';
import * as Yup from 'yup';

interface FormValues {
  firstName: string;
  lastName: string;
}

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('Kötelező mező'),
  lastName: Yup.string().required('Kötelező mező'),
});

const UpdateProfileForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelpers: FormikHelpers<FormValues>) => {
      try {
        const { firstName, lastName } = values;
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Nincs token tárolva.');
          return;
        }

        const response = await fetch('http://localhost:5000/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ firstName, lastName }),
        });

        if (response.ok) {
          setError('Adatok sikeresen frissítve!');
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Ismeretlen hiba történt.');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Hiba kezelése közben váratlan hiba történt.');
      }
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Nincs token tárolva.');
          return;
        }

        const response = await fetch('http://localhost:5000/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          formik.setValues({
            firstName: data.firstName,
            lastName: data.lastName,
          });
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Ismeretlen hiba történt.');
        }
      } catch (error) {
        setError('Hiba a felhasználói adatok betöltésekor.');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ textAlign: 'center' }}>Adatok módosítása</h2>
      <form onSubmit={formik.handleSubmit}>
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
        <ButtonGroup spacing="6" style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" colorScheme="blue" size="lg">Mentés</Button>
        </ButtonGroup>
      </form>
      {error && <div style={{ color: error === 'Adatok sikeresen frissítve!' ? 'green' : 'red', marginTop: '20px' }}>{error}</div>}
    </div>
  );
};

export default UpdateProfileForm;
