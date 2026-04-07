// services/questions.js
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "./firebase";
import { Question } from "../interfaces/questions.interface.js";
import { serverTimestamp } from "firebase/firestore";

const db = getFirestore(app);
export async function getQuestions(): Promise<Question[]> {
  const questionsCollection = collection(db, "questions");
  const snapshot = await getDocs(questionsCollection);

  return snapshot.docs.map(doc => {
    const data = doc.data() as Question;

    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      tags: data.tags,
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
    };
  });
}

export async function addQuestion(question: Question) {
  try {
    const questionsCollection = collection(db, "questions");

    const docRef = await addDoc(questionsCollection, {
      ...question,
      createdAt: serverTimestamp(), 
    });

    console.log("Question added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding question:", error);
    throw error;
  }
}