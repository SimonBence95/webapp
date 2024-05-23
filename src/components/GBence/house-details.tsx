import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import validationSchema from '../password/validationSchema';
import { houses } from './houses';
import { House } from './types';

const HouseDetails: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const { houseId } = useParams<{ houseId: string }>();
  const house: House | undefined = houses.find(h => h.id === houseId);
  const navigate = useNavigate(); // Add this line to use navigate

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:5000/houses/{houseId}', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          throw new Error('Login failed');
        }
        // Handle successful login here
      } catch (error) {
        // Handle error here
        console.error(error);
      }
    },
  });

  if (!house) {
    return <Navigate to="/" />;
  }

  const handleNavigateToGryffindor = () => {
    navigate('/houses/gryffindor');
  };

  return (
    <div>
      <h1>{house.name}</h1>
      <img src={house.image} alt={`${house.name} image`} />
      <p>Common Room: {house.commonRoom}</p>
      <p>Animal: {house.animal}</p>
      <p>House Ghost: {house.ghost}</p>
      <p>Founder: {house.founder}</p>
      <p>Traits: {house.traits.join(', ')}</p>
      <p>House Colors: {house.houseColors.join(', ')}</p>
      <p>Current and Former Heads: {house.heads.join(', ')}</p>
      {isLoggedIn && <p>Points: {house.points}</p>}
      <button onClick={handleNavigateToGryffindor}>Go to Gryffindor</button> {/* Add this button */}
    </div>
  );
};

export default HouseDetails;
