
# Deel Demo Project - Team Lead, Mobile Engineer

Payslips Cross Platform App.
This two-page application is designed to provide users with a streamlined experience in viewing and managing their payslips. It fetches payslip data from a mock API, presenting a list of payslips on the main page. Upon selecting a specific payslip, users are seamlessly redirected to a detailed view. This section allows users to explore in-depth information about the selected payslip and provides the convenient option to download the payslip as a PDF.


## Tech Stack
Technologically, the app is crafted using the Next.js framework, incorporating TailwindCSS for modern and responsive styling. TypeScript is employed as a typed language, enhancing the application's robustness and maintainability.

This app is versatile and caters to both web and mobile platforms. For the mobile experience, Capacitor is integrated (Note: In the demo app, only the iOS platform has been tested due to time constraints). Whether you're accessing the app from your desktop or mobile device, the Payslips Cross-Platform App delivers a user-friendly interface for efficient payslip management.

**Client:** NextJs, TailwindCSS, Capacitor
## Run Locally

Clone the project

```bash
  git clone https://gitfront.io/r/dangjo/wzaVqhGTWQDh/deel-demo.git
```

Go to the project directory

```bash
  cd <project directory>
```

Install dependencies

```bash
  npm install
```

Run project on web locally

```bash
  npm run dev
```


## Run on mobile device

Run on native mobile device (ios simulator): In this project only ios has been installed for simplicity. Run build before launching the capacitor sync command


```bash
  npm run build
```
Sync build with capacitor in order to installa the code and Pods into ios Project

```bash
  npx cap sync
```
Open Xcode and project xcworkspace folder
```bash
  Open Xcode
  Open App.xcworkspace in folder in /ios/app
```
Run app on simulatore
```bash
  Select App target
  Select iPhone simulator
  hit Run
```
## Authors

- [Daniel Gjorgjiev](https://www.linkedin.com/in/daniel-gjorgjiev/)

