# Vartalaap

Vartalaap is a real-time chat application designed for collaborative communication on Canva. It allows users to create and join chat rooms, send and receive messages, and stay connected while working on projects. The app supports room-based messaging and provides a seamless user experience for efficient collaboration.

## Features

- Create and join chat rooms using unique room keys
- Real-time messaging with message alignment based on sender
- Video calling and file sharing integration (planned)
- Mobile support and user profiles (planned)
- End-to-end encryption and robust authentication (planned)
- Advanced analytics and scalability enhancements (planned)

## Project Setup

To set up and run Vartalaap locally, follow these steps:

## Requirements

- Node.js `v18` or `v20.10.0`
- npm `v9` or `v10`

**Note:** To make sure you're running the correct version of Node.js, we recommend using a version manager, such as [nvm](https://github.com/nvm-sh/nvm#intro). The [.nvmrc](/.nvmrc) file in the root directory of this repo will ensure the correct version is used once you run `nvm install`.

## Quick start

```bash
git clone git@github.com:canva-sdks/Canav_VartaLaap.git
cd Canva_VartaLaap
```


### Step 1: Start the Frontend server


To start the frontend development server, run the following command:

```bash
cd Frontend
npm install
npm start
```

The server becomes available at <http://localhost:8080>.

The app's source code is in the `src/app.tsx` file.

### Step 2: Preview the app

The local development server only exposes a JavaScript bundle, so you can't preview an app by visiting <http://localhost:8080>. You can only preview an app via the Canva editor.

To preview an app:

1. Create an app via the [Developer Portal](https://www.canva.com/developers/apps).
2. Select **App source > Development URL**.
3. In the **Development URL** field, enter the URL of the development server.
4. Click **Preview**. This opens the Canva editor (and the app) in a new tab.
5. Click **Open**. (This screen only appears when using an app for the first time.)

The app will appear in the side panel.

### (Optional) Step 3: Enable Hot Module Replacement

By default, every time you make a change to an app, you have to reload the entire app to see the results of those changes. If you enable [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) (HMR), changes will be reflected without a full reload, which significantly speeds up the development loop.

**Note:** HMR does **not** work while running the development server in a Docker container.

To enable HMR:

1. Navigate to an app via the [Your apps](https://www.canva.com/developers/apps).
2. Select **Configure your app**.
3. Copy the value from the **App origin** field. This value is unique to each app and cannot be customized.
4. In the starter kit's directory, open the `.env` file.
5. Set the `CANVA_APP_ORIGIN` environment variable to the value copied from the **App origin** field:

   ```bash
   CANVA_APP_ORIGIN=# YOUR APP ORIGIN GOES HERE 
   ```

6. Set the `CANVA_HMR_ENABLED` environment variable to `true`:

   ```bash
   CANVA_HMR_ENABLED=true
   ```

7. Restart the frontend development server.
8. Reload the app manually to ensure that HMR takes effect.

<details>
  <summary>Previewing apps in Safari</summary>

  By default, the development server is not HTTPS-enabled. This is convenient, as there's no need for a security certificate, but it prevents apps from being previewed in Safari.

  **Why Safari requires the development server to be HTTPS-enabled?**

  Canva itself is served via HTTPS and most browsers prevent HTTPS pages from loading scripts via non-HTTPS connections. Chrome and Firefox make exceptions for local servers, such as `localhost`, but Safari does not, so if you're using Safari, the development server must be HTTPS-enabled.

  To learn more, see [Loading mixed-content resources](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content#loading_mixed-content_resources).

  To preview apps in Safari:

  1. Start the development server with HTTPS enabled:

  ```bash
  # Run the main app
  npm start --use-https

  # Run an example
  npm start <example-name> --use-https
  ```

  2. Navigate to <https://localhost:8080>.
  3. Bypass the invalid security certificate warning:
    1. Click **Show details**.
    2. Click **Visit website**.
  4. In the Developer Portal, set the app's **Development URL** to <https://localhost:8080>.

  You need to bypass the invalid security certificate warning every time you start the local server. A similar warning will appear in other browsers (and will need to be bypassed) whenever HTTPS is enabled.
</details>

## Running Backend

To run backend:

1. Navigate to the [Your apps](https://www.canva.com/developers/apps) page.
2. Copy the ID of an app from the **App ID** column in the apps table.
3. In the frontend kit `.env` file, set `CANVA_APP_ID` to the ID of the app.

   For example:

   ```bash
   CANVA_APP_ID=AABBccddeeff
   CANVA_APP_ORIGIN=#
   CANVA_BACKEND_PORT=3001
   CANVA_FRONTEND_PORT=8080
   CANVA_BACKEND_HOST=http://localhost:3001
   CANVA_HMR_ENABLED=FALSE
   ```

4. Start the example:

   ```bash
   cd Backend
   npm install
   nodemon server.js
   ```
   RThe Backend server starts at <https://localhost:4000>.
   
The ID of the app must be explicitly defined because it's required to [send and verify HTTP requests](https://www.canva.dev/docs/apps/verifying-http-requests/). If you don't set up the ID in the `.env` file, an error will be thrown when attempting to run the code.

  ## If you want to Contribute

  - Fork the repository
  - Create a feature branch (git checkout -b feature-branch)
  - Commit your changes (git commit -am 'Add new feature')
  - Push to the branch (git push origin feature-branch)
  - Create a new Pull Request

  ## Acknowledgements
  
  - Socket.IO for real-time communication
  - React and TypeScript for frontend development
  - Canva Design SDK for integration with Canva

  ## Contributers
  
  1. Tanmay Sawankar
  2. Bhavya Madan
  3. Om Bhayde
  4. Akshat Jain

  ## Contact

  This README provides a comprehensive guide for setting up the project locally, contributing, and contacting for further information. Adjust the placeholders as needed, such as your GitHub repository URL and email address.

  ![image](https://github.com/user-attachments/assets/f53ed50b-ef63-4630-966f-cbf00105968f)           ![logo (2)](https://github.com/user-attachments/assets/8d0d5b13-c8c0-4f07-8ce0-0fca267eb490)






