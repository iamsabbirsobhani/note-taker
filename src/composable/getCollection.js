import { projectFirestore } from "@/firebase/config.js";
import { ref } from "@vue/reactivity";

// global binding
let first = null;
let results = [];
let newResults = [];

const getCollection = () => {
  const notes = ref(null);
  const error = ref(null);
  const showMoreBtn = ref(false);

  // first = null;

  const collectionRef = projectFirestore
    .collection("note")
    .orderBy("createdAt", "desc")
    .limit(4);
  notes.value = null;
  newResults = [];
  collectionRef.onSnapshot(
    (doc) => {
      doc.docs.forEach((doc) => {
        doc.data().createdAt &&
          results.push({
            ...doc.data(),
            ...newResults,
            id: doc.id,
          });
      });
      showMoreBtn.value = false;

      notes.value = results;

      error.value = null;

      newResults = results;

      results = [];
    },
    (err) => {
      console.log(err.message);
      notes.value = null;
      error.value = "Could not fetch data";
    }
  );

  // pagination
  const moreNote = async () => {
    notes.value = null;
    const snapshot = await collectionRef.get();
    const last = snapshot.docs[snapshot.docs.length - 1];

    // preview output
    // if (last) {
    //   console.log("Last", last.data());
    // }

    const next = projectFirestore
      .collection("note")
      .orderBy("createdAt", "desc")
      .startAfter(first || last)
      .limit(4);

    const snapshotB = await next.get();
    let lastB = snapshotB.docs[snapshotB.docs.length - 1];

    // preview output
    // if (lastB) {
    //   console.log("Last B", lastB.data());
    // }

    next.onSnapshot(
      (doc) => {
        doc.docs.forEach((doc) => {
          doc.data().createdAt &&
            newResults.push({
              ...doc.data(),
              id: doc.id,
            });
        });

        notes.value = newResults;

        // when reached at the last document
        if (lastB) {
          first = lastB;
          showMoreBtn.value = false;
        } else {
          console.log("No more documents");
          showMoreBtn.value = true;
          first = null;
          lastB = null;
        }

        error.value = null;
      },
      (err) => {
        console.log(err.message);
        notes.value = null;
        error.value = "Could not fetch data";
      }
    );
  };
  return {
    notes,
    moreNote,
    showMoreBtn,
  };
};

export { getCollection };
