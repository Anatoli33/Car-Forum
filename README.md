# 🚗 Street Garage

A modern Angular web application where car enthusiasts can **share vehicles, ask questions, and interact with a growing community**.

Built as part of a SoftUni course project, but structured with real-world development practices in mind.

---

## 🌐 Live Concept

Street Garage simulates a real automotive community platform where users can:

* Showcase their cars
* Ask for help or advice
* Explore content from other users

---
## 📘 Functional Guide

### 1. Purpose of the Application
**Street Garage** is a specialized platform for automotive enthusiasts, designed to combine the visual appeal of a car showcase with the utility of a technical forum. The application's purpose is to allow users to document their vehicle projects, share technical specifications, and seek advice from a community of like-minded individuals. It solves the problem of scattered automotive information by providing a centralized hub for car builds and technical Q&A.

### 2. Main User Flows

* **Public Exploration (Guest Flow):** Unauthenticated users can land on the platform and browse the public "Cars" feed and "Q&A" sections. This allows them to see the value of the community before committing to a registration.
* **User Onboarding (Auth Flow):** Users can create an account via the Register page or log in with existing credentials. Successful authentication unlocks the ability to contribute content and interact with others.
* **Content Creation & Management (Owner Flow):** Once logged in, a user can navigate to "Add Car" or "Ask Question". They have exclusive rights to manage their own posts—specifically, they can edit or delete their content, while others can only view or interact with it (e.g., liking a post).
* **Active Interaction (Community Flow):** Users interact with the system by exploring posts, liking car builds (with instant UI feedback).

### 3. Explanation of the Core Features

* **Vehicle Showcase (CRUD):** A comprehensive system for managing car profiles. Users can input specific data (Brand, Model, Year, Description) and images, which are stored in Firebase. The system ensures that only the creator of the post can modify it.
* **Automotive Q&A Section:** A dedicated area for technical inquiries. It uses a clean, text-focused UI to prioritize readability for technical advice and troubleshooting steps.
* **Route Protection & Security:** The application uses three distinct Route Guards:
    * `authGuard` to protect private data.
    * `guestGuard` to hide login/register forms from authenticated users.
    * `isOwnerGuard` to prevent unauthorized users from accessing the edit/delete routes of content they don't own.
* **Signal-Based Reactivity:** Utilizes Angular Signals for high-performance state management, ensuring the UI stays in sync with the backend data without unnecessary re-renders.

### 4. How the User Interacts with the System

* **Interactive Forms:** Users submit data through validated reactive forms. The system provides immediate feedback if a field (like a URL or a required description) is incorrect.
* **Dynamic Navigation:** The application's header changes dynamically based on the user’s authentication state, providing a personalized navigation experience.
* **Instant UI Feedback:** Through optimistic updates, when a user "Likes" a car, the heart icon and counter update immediately, providing a "snappy" and modern feel before the server confirmation arrives.
* **Error Notifications:** The system communicates with the user through descriptive error messages in case of failed logins, network issues, or unauthorized access attempts.

---
## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Anatoli33/Car-Forum
cd project
```

### 2. Install dependencies

```bash
npm install
```



### 3. Run the application

```bash
ng serve
```

Open:

```
http://localhost:4200
```

---
## ✨ Features

### 🚘 Cars

* Create and publish car posts
* Upload images and descriptions
* Add tags for better discoverability
* Automatic timestamps

### ❓ Q&A Section

* Ask automotive-related questions
* Browse community questions
* Clean and simple UI for readability

### ⚙️ Core Functionality

* Delete your own content
* Reactive UI using Angular Signals
* Structured Firebase integration

---
## 🛡️ Security & Optimization

* Custom Route Guards:

* authGuard: Protects private routes from guests.

* guestGuard: Prevents logged-in users from accessing Login/Register pages.

* isOwnerGuard: A dynamic guard that prevents users from editing or deleting content they don't own.

* Optimistic UI Updates: Used for the "Like" functionality to ensure an instant, lag-free user experience before the server responds.

* Signal-based State Management: Leveraging Angular Signals for fine-grained reactivity and minimal change detection cycles.

* Comprehensive Error Handling: Graceful handling of Firebase authentication errors (weak passwords, existing emails) and network failures with user-friendly feedback.

---

## 🛠️ Tech Stack

| Layer    | Technology                     |
| -------- | ------------------------------ |
| Frontend | Angular (Standalone + Signals) |
| Backend  | Firebase Firestore             |
| Auth     | Firebase Auth   |
| Styling  | CSS                            |

---

## 📂 Project Structure

```
src/
 ├── app/
 │   ├── guards/       # Auth & Owner security guards
 │   ├── services/     # Firebase logic & data handling
 │   ├── interfaces/   # TypeScript models
```

---

## 🔥 Database Structure

### cars

```ts
{
  id?: string;
  brand: string;
  model: string;
  year: number;
  description: string;
  image: string;
  tags?: string[];
  createdAt: Date;
  ownerId?: string;
  likes?: number;
  likedBy?: string[];
}
```

### questions

```ts
{
  id?: string;
  title: string;
  description: string;
  tags?: string;
  createdAt: Date;
  likes: string[];
  ownerId?: string;
}
```
### comments

```ts
{
  id?: string;
  text: string;
  userId: string;
  username: string;
  createdAt: Date;
}
```

---

## 🔒 Future Improvements
* 🛠️ Technical Upgrades
* 📱 Fully responsive design
* 🔎 Search & filtering
* 🛠️ Better tags functionality
---

## 🧠 What I Learned

* Building scalable Angular applications
* Using Angular Signals for reactive state
* Structuring frontend architecture
* Working with Firebase Firestore
* Managing async data and UI updates

---

## 📌 Project Status

🟡 In development – actively improving structure, features, and performance.

---

## 🤝 Contributing

Contributions are welcome.

If you have ideas or improvements:

* Open an issue
* Submit a pull request

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Anatoli Hadzhiev**

---

⭐ If you find this project useful, consider giving it a star!
