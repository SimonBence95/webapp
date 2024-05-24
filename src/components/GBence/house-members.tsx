import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Member {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

const HouseMembers: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const { houseId } = useParams<{ houseId: string }>();
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    if (!isLoggedIn || !houseId) {
      navigate(`/houses/${houseId}/members`);
      return;
    }

    fetch(`http://localhost:5000/houses/${houseId}/members`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          navigate(`/houses/${houseId}`);
          return;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        return response.json();
      })
      .then(data => {
        setMembers(data);
        setFilteredMembers(data);
      })
      .catch(error => console.error('Error fetching members:', error));
  }, [houseId, isLoggedIn, navigate]);

  useEffect(() => {
    const filtered = members.filter(member => 
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(filtered);
    setPage(1); // Reset to first page on search
  }, [searchTerm, members]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleNextPage = () => {
    if ((page * itemsPerPage) < filteredMembers.length) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Members of {houseId}</h1>
      <input 
        type="text" 
        placeholder="Search by name or email" 
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      <div>
        {paginatedMembers.map(member => (
          <div key={member.userId} style={{ marginBottom: '10px' }}>
            <p>{member.firstName} {member.lastName}</p>
            <p>{member.email}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={handlePreviousPage} disabled={page === 1} style={{ marginRight: '10px' }}>Previous</button>
        <button onClick={handleNextPage} disabled={(page * itemsPerPage) >= filteredMembers.length}>Next</button>
      </div>
    </div>
  );
};

export default HouseMembers;
