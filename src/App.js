import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateStep1 = () => {
    let errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email address is invalid';
    if (!formData.phone) errors.phone = 'Phone number is required';
    return errors;
  };

  const validateStep2 = () => {
    let errors = {};
    if (!formData.address1) errors.address1 = 'Address Line 1 is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.zip) errors.zip = 'Zip Code is required';
    return errors;
  };

  const handleNext = () => {
    let validationErrors = {};
    if (step === 1) validationErrors = validateStep1();
    if (step === 2) validationErrors = validateStep2();

    if (Object.keys(validationErrors).length === 0) {
      setStep(step + 1);
    } else {
      setErrors(validationErrors);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
    localStorage.removeItem('formData');
  };

  return (
    <div className="container">
      <h1 className='toph'>Multi-Step Login form</h1>
      <div className="tabs">
        <button className={step === 1 ? 'active' : ''} onClick={() => setStep(1)}>Step 1</button>
        <button className={step === 2 ? 'active' : ''} onClick={() => setStep(2)}>Step 2</button>
        <button className={step === 3 ? 'active' : ''} onClick={() => setStep(3)}>Step 3</button>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            <h2>Step 1: Personal Information</h2>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h2>Step 2: Address Information</h2>
            <div className="form-group">
              <label>Address Line 1</label>
              <input type="text" name="address1" value={formData.address1} onChange={handleChange} />
              {errors.address1 && <span className="error">{errors.address1}</span>}
            </div>
            <div className="form-group">
              <label>Address Line 2</label>
              <input type="text" name="address2" value={formData.address2} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label>State</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} />
              {errors.state && <span className="error">{errors.state}</span>}
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
              {errors.zip && <span className="error">{errors.zip}</span>}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h2>Step 3: Confirmation</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Address Line 1:</strong> {formData.address1}</p>
            <p><strong>Address Line 2:</strong> {formData.address2}</p>
            <p><strong>City:</strong> {formData.city}</p>
            <p><strong>State:</strong> {formData.state}</p>
            <p><strong>Zip Code:</strong> {formData.zip}</p>
          </div>
        )}

        <div className="navigation-buttons">
          {step > 1 && <button type="button" onClick={handlePrev}>Back</button>}
          {step < 3 && <button type="button" onClick={handleNext}>Next</button>}
          {step === 3 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default App;




