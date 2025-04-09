import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

function Medications() {
  const [medications, setMedications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentMedication, setCurrentMedication] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    instructions: '',
    category: ''
  });

  useEffect(() => {
    // Simulate fetching medications
    const initialMedications = [
      { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', instructions: 'Take with food', category: 'Blood Pressure' },
      { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', instructions: 'Take with meals', category: 'Diabetes' },
      { id: 3, name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', instructions: 'Take in the evening', category: 'Cholesterol' },
      { id: 4, name: 'Levothyroxine', dosage: '50mcg', frequency: 'Once daily', instructions: 'Take on empty stomach', category: 'Thyroid' },
      { id: 5, name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', instructions: 'Take in the morning', category: 'Blood Pressure' }
    ];
    setMedications(initialMedications);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (medication = null) => {
    if (medication) {
      setCurrentMedication(medication);
      setFormData({ ...medication });
    } else {
      setCurrentMedication(null);
      setFormData({
        name: '',
        dosage: '',
        frequency: '',
        instructions: '',
        category: ''
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
    if (currentMedication) {
      // Update existing medication
      const updatedMedications = medications.map(med => 
        med.id === currentMedication.id ? { ...formData, id: med.id } : med
      );
      setMedications(updatedMedications);
    } else {
      // Add new medication
      const newMedication = {
        ...formData,
        id: medications.length > 0 ? Math.max(...medications.map(m => m.id)) + 1 : 1
      };
      setMedications([...medications, newMedication]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    const updatedMedications = medications.filter(med => med.id !== id);
    setMedications(updatedMedications);
  };

  return (
    <div className="medications-page">
      <div className="page-header">
        <h2>Medications Management</h2>
        <div className="actions">
          <div className="search-bar">
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search medications..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="add-btn" onClick={() => handleOpenModal()}>
            <FaPlus /> Add Medication
          </button>
        </div>
      </div>

      <div className="medications-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Instructions</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedications.map(medication => (
              <tr key={medication.id}>
                <td>{medication.name}</td>
                <td>{medication.dosage}</td>
                <td>{medication.frequency}</td>
                <td>{medication.instructions}</td>
                <td>{medication.category}</td>
                <td className="actions-cell">
                  <button className="edit-btn" onClick={() => handleOpenModal(medication)}>
                    <FaEdit />
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(medication.id)}>
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
            <h2>{currentMedication ? 'Edit Medication' : 'Add New Medication'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Medication Name</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Dosage</label>
                <input 
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Frequency</label>
                <select 
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select frequency</option>
                  <option value="Once daily">Once daily</option>
                  <option value="Twice daily">Twice daily</option>
                  <option value="Three times daily">Three times daily</option>
                  <option value="Four times daily">Four times daily</option>
                  <option value="As needed">As needed</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </div>
              <div className="form-group">
                <label>Instructions</label>
                <textarea 
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Blood Pressure">Blood Pressure</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Cholesterol">Cholesterol</option>
                  <option value="Pain Relief">Pain Relief</option>
                  <option value="Antibiotics">Antibiotics</option>
                  <option value="Vitamins">Vitamins</option>
                  <option value="Thyroid">Thyroid</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="submit-btn">
                  {currentMedication ? 'Update' : 'Add'} Medication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Medications;