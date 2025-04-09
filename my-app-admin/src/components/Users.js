import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEnvelope } from 'react-icons/fa';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active'
  });

  useEffect(() => {
    // Simulate fetching users
    const initialUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-123-4567', registered: '2023-05-15', status: 'active', medications: 3 },
      { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', phone: '555-987-6543', registered: '2023-06-22', status: 'active', medications: 5 },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '555-456-7890', registered: '2023-07-03', status: 'inactive', medications: 0 },
      { id: 4, name: 'Emily Wilson', email: 'emily@example.com', phone: '555-234-5678', registered: '2023-08-11', status: 'active', medications: 2 },
      { id: 5, name: 'Robert Brown', email: 'robert@example.com', phone: '555-876-5432', registered: '2023-09-05', status: 'active', medications: 4 }
    ];
    setUsers(initialUsers);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const handleOpenModal = (user = null) => {
    if (user) {
      setCurrentUser(user);
      setFormData({ 
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: user.status
      });
    } else {
      setCurrentUser(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        status: 'active'
      });
    }
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    
    if (currentUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === currentUser.id ? { 
          ...user, 
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          status: formData.status
        } : user
      );
      setUsers(updatedUsers);
    } else {
      // Add new user
      const newUser = {
        ...formData,
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        registered: today,
        medications: 0
      };
      setUsers([...users, newUser]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="users-page">
      <div className="page-header">
        <h2>Users Management</h2>
        <div className="actions">
          <div className="search-bar">
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="add-btn" onClick={() => handleOpenModal()}>
            <FaPlus /> Add User
          </button>
        </div>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Registered</th>
              <th>Status</th>
              <th>Medications</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.registered}</td>
                <td>
                  <span className={`status ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.medications}</td>
                <td className="actions-cell">
                  <button className="email-btn" title="Send email">
                    <FaEnvelope />
                  </button>
                  <button className="edit-btn" onClick={() => handleOpenModal(user)}>
                    <FaEdit />
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{currentUser ? 'Edit User' : 'Add New User'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="submit-btn">
                  {currentUser ? 'Update' : 'Add'} User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;