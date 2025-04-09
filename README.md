# Pill Reminder API

This API allows managing patients, reminders, and prescription uploads for a pill reminder system.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Start the server:
   ```sh
   npm start
   ```

3. Endpoints:
   - `GET /api/patients/total` - Get total patient count.
   - `GET /api/patients/` - List all patients.
   - `PUT /api/patients/:id/status` - Enable/disable patient account.
   - `GET /api/patients/:id/prescriptions` - Get prescription upload status.
   - `GET /api/reminders/:id/current` - Get active reminders.
