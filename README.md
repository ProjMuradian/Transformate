# MuradianConvertor

<div align="center">
  <img src="https://i.ibb.co/qY2YcY8N/logo.png" alt="MuradianConvertor Logo" width="200" height="200">
</div>

<h3><a style="color:#08b5ff" href="https://github.com/mozaddedalfeshani">Follow me on GitHub</a></h3>

## Free Unlimited File Converter using WebAssembly and FFmpeg

**✅Next.js 13 app router**
**✅TailwindCSS**
**✅Shadcn/ui**
**✅WebAssembly**
**✅FFmpeg**

👉 [Live Demo](https://muradian-convertor.vercel.app/) 👈

A powerful online file conversion tool that allows you to convert images, audio, and video files without any restrictions. Built with modern web technologies for optimal performance and user experience.

## Features

- **Unlimited Conversions**: No file size or conversion limits
- **Multiple Formats**: Support for various image, audio, and video formats
- **WebAssembly Powered**: Fast and efficient conversions using FFmpeg
- **Modern UI**: Beautiful and responsive interface built with TailwindCSS
- **Dark/Light Mode**: Toggle between themes for better user experience

## Installation Guide for Windows

### Prerequisites

Before running this project, you need to install Node.js and Yarn on your Windows system.

#### Step 1: Install Node.js

1. **Download Node.js:**

   - Go to [https://nodejs.org/](https://nodejs.org/)
   - Download the LTS (Long Term Support) version for Windows
   - Choose the Windows Installer (.msi) file

2. **Install Node.js:**

   - Run the downloaded .msi file
   - Follow the installation wizard
   - Make sure to check "Add to PATH" during installation
   - Click "Install" and wait for the installation to complete

3. **Verify Node.js installation:**
   - Open Command Prompt or PowerShell
   - Run: `node --version`
   - Run: `npm --version`
   - Both commands should display version numbers

#### Step 2: Install Yarn

1. **Install Yarn via npm (Recommended):**

   - Open Command Prompt or PowerShell as Administrator
   - Run: `npm install --global yarn`

2. **Verify Yarn installation:**
   - Run: `yarn --version`
   - This should display the Yarn version number

#### Alternative: Install Yarn via Windows Installer

1. **Download Yarn:**

   - Go to [https://classic.yarnpkg.com/latest.msi](https://classic.yarnpkg.com/latest.msi)
   - Download the Windows installer

2. **Install Yarn:**
   - Run the downloaded .msi file
   - Follow the installation wizard
   - Click "Install" and wait for completion

### Running the Project

#### Step 1: Clone the Repository

1. **Open Command Prompt or PowerShell**
2. **Navigate to your desired directory:**
   ```bash
   cd C:\Users\YourUsername\Desktop
   ```
3. **Clone the repository:**
   ```bash
   git clone git@github.com:mozaddedalfeshani/muradian_convertor.git
   ```
4. **Navigate to the project folder:**
   ```bash
   cd muradian_convertor
   ```

#### Step 2: Install Dependencies

1. **Install project dependencies:**
   ```bash
   yarn install
   ```
   - This will install all required packages
   - Wait for the installation to complete (may take a few minutes)

#### Step 3: Run the Development Server

1. **Start the development server:**
   ```bash
   yarn dev
   ```
2. **Wait for the server to start:**
   - You should see output indicating the server is running
   - Look for a message like: "Ready - started server on 0.0.0.0:3000"

#### Step 4: Access the Application

1. **Open your web browser**
2. **Navigate to:** [http://localhost:3000](http://localhost:3000)
3. **You should see the MuradianConvertor application running**

### Troubleshooting

#### Common Issues:

1. **"yarn is not recognized":**

   - Restart Command Prompt/PowerShell after installing Yarn
   - Or restart your computer

2. **"node is not recognized":**

   - Restart Command Prompt/PowerShell after installing Node.js
   - Or restart your computer

3. **Port 3000 already in use:**

   - Close other applications using port 3000
   - Or use a different port: `yarn dev --port 3001`

4. **Permission errors:**

   - Run Command Prompt or PowerShell as Administrator

5. **Git clone fails:**
   - If using SSH, ensure you have SSH keys set up
   - Or use HTTPS: `git clone https://github.com/mozaddedalfeshani/muradian_convertor.git`

### Stopping the Server

- **In the terminal where the server is running:**
  - Press `Ctrl + C` to stop the development server

## Deployment with GitHub CI/CD

This project includes automated deployment to Vercel using GitHub Actions. The CI/CD pipeline will automatically build and deploy your application when you push to the main branch.

### Setting up GitHub Actions for Vercel Deployment

#### Step 1: Get Vercel Credentials

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**

   ```bash
   vercel login
   ```

3. **Get your Vercel tokens:**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to Settings → Tokens
   - Create a new token with appropriate permissions

4. **Get Project and Org IDs:**
   - Run: `vercel projects ls` to get your project ID
   - Run: `vercel teams ls` to get your organization ID

#### Step 2: Configure GitHub Secrets

1. **Go to your GitHub repository**
2. **Navigate to Settings → Secrets and variables → Actions**
3. **Add the following secrets:**
   - `VERCEL_TOKEN`: Your Vercel authentication token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

#### Step 3: Deploy Your Project

1. **Push your code to the main branch:**

   ```bash
   git add .
   git commit -m "Initial deployment setup"
   git push origin main
   ```

2. **Monitor the deployment:**

   - Go to your GitHub repository
   - Click on the "Actions" tab
   - Watch the deployment workflow run

3. **Access your deployed application:**
   - The deployment URL will be provided in the GitHub Actions logs
   - Or check your Vercel dashboard for the live URL

### CI/CD Workflow Details

The GitHub Actions workflow (`/.github/workflows/deploy.yml`) includes:

- **Automatic triggers:** Push to main/master branch or pull requests
- **Node.js setup:** Uses Node.js 18 with Yarn caching
- **Dependency installation:** Installs packages with `yarn install --frozen-lockfile`
- **Code quality checks:** Runs linting and type checking
- **Build process:** Creates production build with `yarn build`
- **Vercel deployment:** Automatically deploys to Vercel

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues automatically
- `yarn type-check` - Run TypeScript type checking

## Tech Stack

- **Frontend**: Next.js 13 with App Router
- **Styling**: TailwindCSS with Shadcn/ui components
- **File Processing**: FFmpeg WebAssembly
- **Deployment**: Vercel

## Getting Started

1. Clone the repository

```bash
git clone git@github.com:mozaddedalfeshani/muradian_convertor.git
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

---

<h3><a style="color:#08b5ff" href="https://github.com/mozaddedalfeshani">Follow me on GitHub</a></h3>
