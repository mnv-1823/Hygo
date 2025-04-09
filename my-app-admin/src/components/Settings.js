import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';

function Settings() {
  const [settings, setSettings] = useState({
    appName: 'PillReminder',
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    reminderBefore: 15,
    reminderRepeat: 30,
    maxReminders: 3,
    theme: 'light',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic would go here
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h2>System Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section">
          <h3>General Settings</h3>
          <div className="form-group">
            <label>Application Name</label>
            <input
              type="text"
              name="appName"
              value={settings.appName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Theme</label>
            <select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h3>Notification Settings</h3>
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="emailNotifications"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />
            <label htmlFor="emailNotifications">Enable Email Notifications</label>
          </div>
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="pushNotifications"
              name="pushNotifications"
              checked={settings.pushNotifications}
              onChange={handleChange}
            />
            <label htmlFor="pushNotifications">Enable Push Notifications</label>
          </div>
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="smsNotifications"
              name="smsNotifications"
              checked={settings.smsNotifications}
              onChange={handleChange}
            />
            <label htmlFor="smsNotifications">Enable SMS Notifications</label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Reminder Settings</h3>
          <div className="form-group">
            <label>Remind Before (minutes)</label>
            <input
              type="number"
              name="reminderBefore"
              value={settings.reminderBefore}
              onChange={handleChange}
              min="0"
              max="60"
            />
          </div>
          <div className="form-group">
            <label>Reminder Repeat Interval (minutes)</label>
            <input
              type="number"
              name="reminderRepeat"
              value={settings.reminderRepeat}
              onChange={handleChange}
              min="0"
              max="120"
            />
          </div>
          <div className="form-group">
            <label>Maximum Reminders</label>
            <input
              type="number"
              name="maxReminders"
              value={settings.maxReminders}
              onChange={handleChange}
              min="1"
              max="10"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">
            <FaSave /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
