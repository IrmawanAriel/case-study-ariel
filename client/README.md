# Employee Database CRUD Application Instructions

## Objective:

Develop a basic CRUD (Create, Read, Update, Delete) application using a JavaScript framework or vanilla JavaScript.

## Task Overview:

Create a simple table application that allows users to:

- Add new rows to the table with specified data.
- Edit existing rows and update their data.
- Delete rows from the table.

## Requirements:

1. **Technology:**

   - Choose any JavaScript framework or library you are comfortable with (e.g., React, Vue, jQuery, vanilla JavaScript).

2. **Data Storage:**

   - Use the provided JSON server to post/read the data.

3. **User Interface:**

   - Design a user-friendly interface with clear labels and input fields.

4. **Functionality:**

   - Ensure the CRUD operations work as expected, with proper error handling and validation.

5. **State Management:**

   - Implement state management using a suitable approach for your chosen framework (e.g., Redux, Pinia, useState/useReducer).

6. **Responsiveness (optional):**
   - Ensure the application adapts to different screen sizes.

## Page Structure/Layout:

1. **Form Create:**

   - Use a page for the form.
   - Autogenerate the NIP using the format: `AQI-[joinDate (ddmmyyyy)]-[auto-increment]`.
     - Example: `AQI-13112024-001`, `AQI-03012025-002`.

2. **Form Update:**

   - Use a page with auto-populated data.
   - Disable the NIP and Join Date fields.

3. **Detail Page:**

   - Include buttons to update (redirect to form update) and delete (remove from JSON).

4. **Index Page:**
   - Display a table with data from the API (read).
   - Include a filter/search section to filter the data.
   - Provide action buttons to update/delete.
   - Add a button to create new entries.

## Data Structure (Table Employee):

- **NIP (Nomer Induk Pegawai)**
- **First name**
- **Last name**
- **Address**
- **Position**
- **Salary**
- **Division**
- **Working Status**
- **Birthday**
- **Join Date**
