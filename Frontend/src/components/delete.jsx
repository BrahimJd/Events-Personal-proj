import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const RoleManagement = () => {
  const { isAuthenticated, user, getIdTokenClaims } = useAuth0();
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [availableRoles, setAvailableRoles] = useState(['Admin']); // Roles disponibles para seleccionar

  useEffect(() => {
    const fetchUserRoles = async () => {
      if (isAuthenticated && user) {
        const idTokenClaims = await getIdTokenClaims();
        const roles = idTokenClaims['http://localhost:5173/roles'] || idTokenClaims['https://domain.com/roles'] || [];
        setSelectedRoles(roles);
      }
    };

    fetchUserRoles();
  }, [isAuthenticated, user, getIdTokenClaims]);

  const handleRoleSelection = (event) => {
    const selectedRole = event.target.value;
    if (!selectedRoles.includes(selectedRole)) {
      setSelectedRoles([...selectedRoles, selectedRole]);
    }
  };

  const handleRemoveRole = (roleToRemove) => {
    const updatedRoles = selectedRoles.filter(role => role !== roleToRemove);
    setSelectedRoles(updatedRoles);

    // Lógica para actualizar los roles en Auth0
    updateRolesInAuth0(updatedRoles);
  };

  const handleSaveRoles = async () => {
    // Lógica para agregar roles en Auth0
    if (isAuthenticated && user) {
      const idTokenClaims = await getIdTokenClaims();
      const accessToken = idTokenClaims.__raw; // Obtener el ID Token
      const userId = user.sub; // Obtener el User ID

      const apiUrl = `https://domain.us.auth0.com/api/v2/users/${userId}`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
      const data = {
        app_metadata: {
          roles: selectedRoles,
        },
      };

      try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            mode: 'no-cors', // Cambiar a 'no-cors'
          });
          

        console.log('Roles agregados exitosamente');
      } catch (error) {
        console.error('Error al agregar roles:', error);
      }
    }
  };

  return (
    <div>
      <h2>Administrar Roles</h2>
      <div>
        <h3>Roles Seleccionados:</h3>
        <ul>
          {selectedRoles.map((role, index) => (
            <li key={index}>
              {role}
              <button onClick={() => handleRemoveRole(role)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Seleccionar Roles:</h3>
        <select onChange={handleRoleSelection}>
          <option value="">Seleccionar...</option>
          {availableRoles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSaveRoles}>Guardar Roles</button>
    </div>
  );
};

export default RoleManagement;