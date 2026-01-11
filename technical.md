# Technical Logic and Frontend-to-Backend Connections for Wix CMS Integration

This document outlines the technical logic and connections required to integrate a full-stack web application with Wix CMS for managing codebase architecture information.

---

## 1. Overview of Integration Strategy

The core strategy for integrating with Wix CMS involves a layered approach:

1.  **Wix-Hosted HTTP Functions:** Custom HTTP functions (also known as Web Modules) will be deployed within the Wix site's backend. These functions will act as an intermediary, using Wix's internal `wix-data` API to perform CRUD operations directly on Wix CMS collections.
2.  **Python/Flask Backend:** Our Python backend will expose RESTful API endpoints. These endpoints will receive requests from the frontend, then forward (proxy) these requests to the Wix-hosted HTTP functions. This backend layer will handle authentication with Wix, data transformation, and robust error handling.
3.  **React/TypeScript Frontend:** The frontend will consume the Python backend's API endpoints. It will manage UI components for displaying and interacting with the architecture data, handle local state, and integrate routing for architecture-specific pages.

## 2. Wix CMS Data Model (Conceptual)

To manage codebase architecture, we propose the following conceptual collections within Wix CMS:

### `ArchitectureComponents` Collection

This collection will store detailed information about each component in the codebase.

*   **`componentName` (Text):** The unique name of the architectural component (e.g., "User Service", "Payment Gateway", "Frontend Web App").
*   **`description` (Rich Text):** A detailed description of the component's purpose, functionality, and scope.
*   **`type` (Dropdown/Text):** Categorization of the component (e.g., 'Frontend Service', 'Backend Service', 'Database', 'Shared Library', 'External API', 'Microservice').
*   **`dependencies` (Multi-reference or Text Array):** A list of other `ArchitectureComponents` this component depends on. Could be implemented as a multi-reference field to other items in the same collection, or a text array of component names.
*   **`ownerTeam` (Text):** The team responsible for maintaining this component.
*   **`repositoryUrl` (URL):** Link to the component's source code repository.
*   **`documentationLink` (URL):** Link to internal documentation or external API docs.
*   **`status` (Dropdown/Text):** Current lifecycle status (e.g., 'Active', 'Deprecated', 'Planned', 'Archived').
*   **`lastUpdated` (Date):** Timestamp of the last modification.
*   **(Optional) `diagramReferences` (Multi-reference):** Link to related diagrams in an `ArchitectureDiagrams` collection.

### `ArchitectureDiagrams` Collection (Optional)

This collection can store references to architecture diagrams.

*   **`diagramName` (Text):** Name of the diagram (e.g., "Overall System Architecture", "User Authentication Flow").
*   **`description` (Rich Text):** Description of what the diagram illustrates.
*   **`imageUrl` (Image or URL):** The image file of the diagram or a URL to where it's hosted.
*   **`relatedComponents` (Multi-reference):** References to `ArchitectureComponents` depicted in the diagram.

---

## 3. Wix CMS API Interaction (Wix-Hosted HTTP Functions)

Direct REST API calls to Wix CMS for collection CRUD are not typical for external applications. Instead, custom HTTP functions within the Wix site's backend are used.

### Authentication for HTTP Functions

*   **API Key Authentication:** For administrative-level access (which managing codebase architecture implies), API Key Authentication is the most suitable method. An API key with appropriate permissions (e.g., read/write access to `ArchitectureComponents` and `ArchitectureDiagrams` collections) will be generated in the Wix site's dashboard.
*   **Secret Token:** If using the `wix-cms-sdk` within the HTTP functions and calling them from an external application, a `SECRET_TOKEN` can be configured for secure access.

### Example Wix HTTP Function (Node.js/JavaScript)

Assuming a file like `backend/http-functions.js` on the Wix site:

```javascript
// backend/http-functions.js
import { ok, badRequest, created, noContent, notFound, serverError } from 'wix-router';
import wixData from 'wix-data';

// --- Helper for authentication ---
// This is a simplified example. A real implementation would involve more robust token validation.
function authenticate(request) {
    const apiKey = request.headers['x-wix-api-key'];
    // In a real scenario, compare apiKey with a securely stored value (e.g., from Wix Secrets Manager)
    if (!apiKey || apiKey !== 'YOUR_WIX_API_KEY_SECURELY_STORED') {
        return false;
    }
    return true;
}

// --- ARCHITECTURE COMPONENTS CRUD ---

// Get all components
export async function get_architecture_components(request) {
    if (!authenticate(request)) {
        return badRequest("Authentication failed");
    }
    try {
        const results = await wixData.query("ArchitectureComponents").find();
        return ok({ body: { items: results.items } });
    } catch (err) {
        return serverError(err.message);
    }
}

// Get a single component by ID
export async function get_architecture_components_id(request) {
    if (!authenticate(request)) {
        return badRequest("Authentication failed");
    }
    const componentId = request.path[0];
    try {
        const item = await wixData.get("ArchitectureComponents", componentId);
        if (item) {
            return ok({ body: item });
        }
        return notFound("Component not found");
    } catch (err) {
        return serverError(err.message);
    }
}

// Create a new component
export async function post_architecture_components(request) {
    if (!authenticate(request)) {
        return badRequest("Authentication failed");
    }
    const componentData = await request.body.json();
    try {
        const insertedItem = await wixData.insert("ArchitectureComponents", componentData);
        return created({ body: insertedItem });
    } catch (err) {
        return serverError(err.message);
    }
}

// Update a component by ID
export async function put_architecture_components_id(request) {
    if (!authenticate(request)) {
        return badRequest("Authentication failed");
    }
    const componentId = request.path[0];
    const componentData = await request.body.json();
    try {
        // WixData update requires _id field in the data object
        componentData._id = componentId; 
        const updatedItem = await wixData.update("ArchitectureComponents", componentData);
        if (updatedItem) {
            return ok({ body: updatedItem });
        }
        return notFound("Component not found for update");
    } catch (err) {
        return serverError(err.message);
    }
}

// Delete a component by ID
export async function delete_architecture_components_id(request) {
    if (!authenticate(request)) {
        return badRequest("Authentication failed");
    }
    const componentId = request.path[0];
    try {
        await wixData.remove("ArchitectureComponents", componentId);
        return noContent();
    } catch (err) {
        return serverError(err.message);
    }
}
```
*These functions would be accessible at URLs like `https://your-wix-site.com/_functions/architecture_components` for GET (all) and POST, `https://your-wix-site.com/_functions/architecture_components/{id}` for GET, PUT, DELETE.*

---

## 4. Python/Flask Backend Logic

The Flask backend acts as a secure intermediary, exposing API endpoints to the frontend and handling communication with the Wix-hosted HTTP functions.

### 4.1. Wix API Client Module (`backend/wix_api_client.py`)

This module encapsulates all HTTP requests to the Wix-hosted HTTP functions.

**Key Components:**

*   **`WixAPIClient` Class:**
    *   **Initialization (`__init__`):** Loads `WIX_FUNCTIONS_BASE_URL` (e.g., `https://your-wix-site.com/_functions/`) and `WIX_API_KEY` from environment variables for security. Raises `ValueError` if not configured.
    *   **`_make_wix_request(method, endpoint, data=None, params=None)`:**
        *   A private helper method to send authenticated HTTP requests to Wix HTTP functions.
        *   Constructs the full URL: `${self.wix_base_url}${endpoint}`.
        *   Adds `Content-Type: application/json` and `x-wix-api-key: ${self.wix_api_key}` headers.
        *   Uses Python's `requests` library.
        *   Handles `requests.exceptions` (HTTPError, ConnectionError, Timeout, RequestException), printing errors to console (should be replaced with proper logging in production).
        *   Parses JSON responses and raises `HTTPError` for bad responses.
    *   **CRUD Functions:**
        *   `get_architecture_components()`
        *   `get_architecture_component(component_id)`
        *   `create_architecture_component(data)`
        *   `update_architecture_component(component_id, data)`
        *   `delete_architecture_component(component_id)`
        *   These functions simply call `_make_wix_request` with the appropriate HTTP method, endpoint, and data.

### 4.2. Flask Endpoints (`backend/server.py`)

The Flask application will integrate the `WixAPIClient` and expose corresponding RESTful endpoints.

**Integration Steps:**

1.  **Import and Initialize:**
    ```python
    from .wix_api_client import WixAPIClient
    # ...
    try:
        wix_client = WixAPIClient()
        print("Wix API Client initialized.")
    except ValueError as e:
        print(f"Failed to initialize Wix API Client: {e}")
        wix_client = None # Handle this by making related routes unavailable
    ```
2.  **Architecture Management Endpoints:**
    *   **`GET /api/architecture/components`:** Fetches all components using `wix_client.get_architecture_components()`.
    *   **`GET /api/architecture/components/<component_id>`:** Fetches a single component by ID using `wix_client.get_architecture_component(component_id)`.
    *   **`POST /api/architecture/components`:** Creates a new component. Parses JSON request body, performs input validation, and calls `wix_client.create_architecture_component(data)`. Returns `201 Created`.
    *   **`PUT /api/architecture/components/<component_id>`:** Updates an existing component. Parses JSON request body, validates input, and calls `wix_client.update_architecture_component(component_id, data)`.
    *   **`DELETE /api/architecture/components/<component_id>`:** Deletes a component by ID using `wix_client.delete_architecture_component(component_id)`. Returns `204 No Content`.

### 4.3. Error Handling and Security (Backend)

*   **Error Handling:**
    *   **WixAPIClient:** Catches `requests.exceptions` (HTTP, Connection, Timeout, Request) and re-raises them for Flask endpoints to handle. Logging should be added.
    *   **Flask Endpoints:** Implement specific error handling. If `wix_client` is `None`, return `503 Service Unavailable`. Catch exceptions from `WixAPIClient`, extract HTTP status codes (e.g., 400, 401, 403, 404) if provided by Wix HTTP functions, and return them. Generic `500 Internal Server Error` for unexpected issues, logging full tracebacks without exposing details to the client.
*   **Security:**
    *   **API Keys/Secret Tokens:** Stored in environment variables (`.env` file in development, secure secrets management in production) and never hardcoded or committed.
    *   **Input Validation:** Critical for all `POST`/`PUT` requests to prevent injection attacks and ensure data integrity. All incoming data to Flask endpoints must be thoroughly validated (e.g., presence of required fields, data types, length constraints) before being sent to Wix.
    *   **Authentication/Authorization:** The Flask endpoints should be protected using the existing `token_required` decorator. Further authorization checks (e.g., `current_user['role'] == 'Admin'`) should be applied to `POST`, `PUT`, `DELETE` operations for architecture management endpoints.
    *   **Logging:** Implement a robust logging solution (e.g., Python's `logging` module) to record requests, responses, and errors for auditing and debugging.
    *   **CORS:** Ensure `CORS(app)` in `backend/server.py` is configured to allow requests only from trusted frontend origins in production.

---

## 5. Frontend to Backend Connection (React/TypeScript)

The React frontend will interact with the Flask backend using the `axios` instance for making API calls.

### 5.1. Frontend API Service Extension (`services/api.ts`)

The existing `services/api.ts` file will be extended with new functions.

**Key Functions:**

*   **`fetchArchitectureComponents()`:** `GET /api/architecture/components`
*   **`fetchArchitectureComponentById(componentId: string)`:** `GET /api/architecture/components/{componentId}`
*   **`createArchitectureComponent(data: ArchitectureComponentData)`:** `POST /api/architecture/components`, sends `ArchitectureComponentData`.
*   **`updateArchitectureComponent(componentId: string, data: ArchitectureComponentData)`:** `PUT /api/architecture/components/{componentId}`, sends `ArchitectureComponentData`.
*   **`deleteArchitectureComponent(componentId: string)`:** `DELETE /api/architecture/components/{componentId}`.

These functions will utilize the pre-configured `axios` instance, which automatically handles `API_BASE_URL` and attaches the `x-access-token` for authenticated requests.

### 5.2. Frontend State Management

Frontend state for architecture data can be managed using:

*   **Component-Level State:** For individual components or forms, `useState` and `useEffect` hooks are suitable for managing local data, loading, and error states (e.g., for `ArchitectureDetail` or `ArchitectureFormPage`).
*   **Global State with React Context:** For data shared across multiple components (e.g., a list of all components accessible from different parts of the application), React Context provides an efficient way to manage and distribute this state.
    *   **`ArchitectureContext.tsx`:** Defines the context, `ArchitectureContextType` interface (containing `components` array, `loading`, `error`, and CRUD action functions).
    *   **`ArchitectureProvider`:** A React component that wraps part of the application, manages the central state (`components`, `loading`, `error`), and provides methods (`createComponent`, `updateComponent`, `removeComponent`, `refreshComponents`) that internally call the API service functions. It ensures data consistency across consumers.
    *   **`useArchitecture` Hook:** A custom hook to consume the `ArchitectureContext`, making it easy for components to access architecture data and actions.

### 5.3. Conceptual UI Components and Routing

The frontend will include dedicated pages for managing architecture.

*   **`pages/ArchitectureDashboard.tsx`:**
    *   Displays a paginated/filterable list of `ArchitectureComponents`.
    *   Provides links to view details, edit, and delete components.
    *   Includes a button to navigate to the "Create New Component" form.
    *   Consumes the `ArchitectureContext` (via `useArchitecture`) to get components and trigger refresh/delete actions.

*   **`pages/ArchitectureDetailPage.tsx`:**
    *   Shows all details of a specific `ArchitectureComponent`.
    *   Accessed via a URL like `/client/architecture/:componentId`.
    *   Provides "Edit" and "Delete" actions.
    *   Fetches its data using `useParams` for `componentId` and `fetchArchitectureComponentById` (or `useArchitecture` if applicable).

*   **`pages/ArchitectureFormPage.tsx`:**
    *   A form for creating or editing `ArchitectureComponents`.
    *   Accessed via `/client/architecture/new` (for create) or `/client/architecture/:componentId/edit` (for edit).
    *   Uses `useState` for form fields.
    *   For editing, `useEffect` fetches existing component data to pre-fill the form.
    *   Calls `createArchitectureComponent` or `updateArchitectureComponent` from the API service (or `useArchitecture`).

**Frontend Routing (`App.tsx`):**

New routes will be added within the existing `ProtectedRoute` to ensure only authenticated users can access them, likely under the `/client/` path.

```typescript
// Example snippet within App.tsx (inside <Route element={<ClientLayout />}>)
<Route path="architecture" element={<ArchitectureDashboard />} />
<Route path="architecture/new" element={<ArchitectureFormPage />} />
<Route path="architecture/:componentId" element={<ArchitectureDetailPage />} />
<Route path="architecture/:componentId/edit" element={<ArchitectureFormPage />} />
```

**Navigation:**

*   Add a link to the `ArchitectureDashboard` (`/client/architecture`) in the main application `Navbar` or a dedicated client-portal navigation, conditionally displayed based on user authentication and role (e.g., `Admin`).

---
