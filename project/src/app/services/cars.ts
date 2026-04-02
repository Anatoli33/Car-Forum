// services/cars.js
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebase";
import { Car } from "../interfaces/car.interface.js";
import { getDocs } from "firebase/firestore";

const db = getFirestore(app);

export async function getCars() {
  const carsCollection = collection(db, "cars");
  const snapshot = await getDocs(carsCollection);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function addCar(car: Car) {
  try {
    const carsCollection = collection(db, "cars"); // колекция "cars"
    const docRef = await addDoc(carsCollection, car);
    console.log("Car added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding car:", error);
    throw error; // за да може компонентът да хване грешката
  }
}