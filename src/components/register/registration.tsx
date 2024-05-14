import React, { useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
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
  });

  const [inputFocus, setInputFocus] = useState('');
  const [bearerToken, setBearerToken] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('homeAddress.')) {
      const addressKey = name.split('.')[1];
      setFormData({
        ...formData,
        homeAddress: { ...formData.homeAddress, [addressKey]: value },
      });
    } else if (name.startsWith('notificationAddress.')) {
      const addressKey = name.split('.')[1];
      setFormData({
        ...formData,
        notificationAddress: { ...formData.notificationAddress, [addressKey]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFocus = (name: string) => {
    setInputFocus(name);
  };

  const handleBlur = () => {
    setInputFocus('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     // Ellenőrizzük, hogy a jelszavak egyeznek-e
  if (formData.password !== formData.passwordConfirm) {
    setError('A két jelszó nem egyezik meg!');
    return; // Ne küldjük el a POST kérést, ha a jelszavak nem egyeznek
  }

    // Ellenőrizzük, hogy minden kötelező mező ki van-e töltve
    if (
      !formData.username ||
      !formData.password ||
      !formData.passwordConfirm ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.homeAddress.name ||
      !formData.homeAddress.country ||
      !formData.homeAddress.city ||
      !formData.homeAddress.street ||
      !formData.homeAddress.zip ||
      !formData.notificationAddress.name ||
      !formData.notificationAddress.country ||
      !formData.notificationAddress.city ||
      !formData.notificationAddress.street ||
      !formData.notificationAddress.zip
    ) {
      setError('Kérlek, töltsd ki az összes mezőt!');
      return; // Ne küldjük el a POST kérést, ha nem minden kötelező mező van kitöltve
    }

    // Ha minden kötelező mező ki van töltve, akkor elküldhetjük a POST kérést
    try {
      const response = await fetch('http://localhost:5000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setBearerToken(data.token);
        setError('Sikeres regisztráció!');
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

    // Visszaállítjuk az űrlap állapotát
    setFormData({
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
    });
  };

  const handleReset = () => {
    setFormData({
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
    });
    setError('');
  };
  

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ textAlign: 'center' }}>Regisztrációs űrlap</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="username"
            placeholder="Felhasználónév"
            value={formData.username}
            onChange={handleChange}
            onFocus={() => handleFocus('username')}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            name="password"
            placeholder="Jelszó"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => handleFocus('password')}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Jelszó megerősítése"
            value={formData.passwordConfirm}
            onChange={handleChange}
            onFocus={() => handleFocus('passwordConfirm')}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="firstName"
            placeholder="Keresztnév"
            value={formData.firstName}
            onChange={handleChange}
            onFocus={() => handleFocus('firstName')}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="lastName"
            placeholder="Vezetéknév"
            value={formData.lastName}
            onChange={handleChange}
            onFocus={() => handleFocus('lastName')}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
          />
        </div>
        <h3>Otthoni cím</h3>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="homeAddress.name"
            placeholder="Név"
            value={formData.homeAddress.name}
            onChange={handleChange}
            onFocus={() => handleFocus('homeAddress.name')}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="homeAddress.country"
            placeholder="Ország"
            value={formData.homeAddress.country}
            onChange={handleChange}
            onFocus={() => handleFocus('homeAddress.country')}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="homeAddress.city"
            placeholder="Város"
            value={formData.homeAddress.city}
            onChange={handleChange}
            onFocus={() => handleFocus('homeAddress.city')}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="homeAddress.street"
            placeholder="Utca"
            value={formData.homeAddress.street}
            onChange={handleChange}
            onFocus={() => handleFocus('homeAddress.street')}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="homeAddress.zip"
            placeholder="Irányítószám"
            value={formData.homeAddress.zip}
            onChange={handleChange}
            onFocus={() => handleFocus('homeAddress.zip')}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
          />
        </div>
        <h3>Értesítési cím</h3>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="notificationAddress.name"
            placeholder="Név"
            value={formData.notificationAddress.name}
            onChange={handleChange}
            onFocus={() => handleFocus('notificationAddress.name')}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="notificationAddress.country"
            placeholder="Ország"
            value={formData.notificationAddress.country}
            onChange={handleChange}
            onFocus={() => handleFocus('notificationAddress.country')}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="notificationAddress.city"
            placeholder="Város"
            value={formData.notificationAddress.city}
            onChange={handleChange}
            onFocus={() => handleFocus('notificationAddress.city')}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="notificationAddress.street"
            placeholder="Utca"
            value={formData.notificationAddress.street}
            onChange={handleChange}
            onFocus={() => handleFocus('notificationAddress.street')}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="notificationAddress.zip"
            placeholder="Irányítószám"
            value={formData.notificationAddress.zip}
            onChange={handleChange}
            onFocus={() => handleFocus('notificationAddress.zip')}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
          />
        </div>

        {error && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>
      )}

        <ButtonGroup>
        <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer' }}>
          Regisztráció
        </button>
        <button type="button" onClick={handleReset} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: 'red', color: 'white', cursor: 'pointer' }}>
            Mégsem
          </button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default RegistrationForm;
