# How to Use JSON Server

### Prerequisites:

- Node.js and npm should be installed.

### Steps to Run the JSON Server:

1. Install `json-server` (if you haven't already):

   ```bash
   npm install json-server
   ```

2. Navigate to the project directory where the `db.json` file is located

3. Start the JSON Server using the `db.json` file:

   ```bash
   json-server --watch db.json --port 3001
   ```

4. Access the JSON Server:
   - Open your browser and go to: `http://localhost:3001/employees`
   - This URL will return the list of employees.

### Available Routes:

- `GET /employees`: Get the list of employees.
- `GET /employees/:id`: Get a specific employee by ID (where `:id` is the employee's `nip`).
- `POST /employees`: Add a new employee.
- `PUT /employees/:id`: Update an existing employee by `nip`.
- `DELETE /employees/:id`: Delete an employee by `nip`.

### Example Usage:

To test if the server is working, open your terminal and try this `curl` command:

```bash
curl http://localhost:3001/employees
```

This will return the list of employees in the `db.json` file.

### Customizing the Port:

If you want to run the server on a different port, change the `--port` value:

```bash
json-server --watch db.json --port 5000
```
