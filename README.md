# 🧪 UI Automation Testing — saucedemo.com

**Author:** **Fritzie Primananda Adi Praja**  

---

## 📘 Project Description  
This repository contains automated UI test scripts written in **JavaScript** using the **Playwright Test** framework.  

The tests cover **positive** and **negative** scenarios for the **LOGIN FUNCTIONALITY** at:  
[https://www.saucedemo.com](https://www.saucedemo.com)

---

## 🧩 LOGIN Test Coverage  

### **(+) Positive Scenarios**
1. Successful Navigation to Login Page
2. Input Validation
3. Login Functionality
4. Session Retention After Successful Login
5. Logout Functionality
6. Relogin After Error Message Closed

### **(-) Negative Scenarios**
1. Empty Username and Password Fields
2. Empty Password Field
3. Empty Username Field
4. Error Whitespace Handling in Credentials
5. Error Sensitive Case Handling in Credentials
6. Invalid Password
7. Invalid Username 

---

## ⚙️ How to Run the Tests  

### 1️ **Clone this repository**
```bash
git clone https://github.com/Fritzie1860/qa-submission_ui-test.git
cd qa-submission_ui-test
```

### 2️ **Install dependencies**
```bash
npm install
```

### 3️ **Run the tests**
Run all tests using Playwright’s built-in test runner:
```bash
npx playwright test
```

### 4️ **View the HTML report**
After execution:
```bash
npx playwright show-report
```

If no report is generated:
```bash
npx playwright test --reporter=list,html
```

---

## 📁 Project Structure  
```
qa-submission_ui-test/
├── tests/
│   ├── positive_ui_test.spec.js
│   └── negative_ui_test.spec.js
