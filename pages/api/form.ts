import type { NextApiRequest, NextApiResponse } from "next";
import { credential, initializeApp } from "firebase-admin";

const admin = initializeApp({
  credential: credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});

const db = admin.firestore();

type Form = {
  id: number;
  categoryId: number;
};

async function addForm(form: Form) {
  db.collection("forms").add(form);
}

async function getForms(): Promise<Form[]> {
  const forms = await db
    .collection("forms")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return {
          id: doc.data().id as number,
          categoryId: doc.data().categoryId as number,
        };
      });
    });

  return forms;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Form[]>
) {
  if (req.method === "POST") {
    const form = req.body as Form;
    addForm(form);
  } else if (req.method === "GET") {
    const forms = await getForms();
    res.status(200).json(forms);
  } else {
    res.status(405).end();
  }
}
