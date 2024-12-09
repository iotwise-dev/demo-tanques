import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json"  assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://iotwise-demo-default-rtdb.firebaseio.com"
});

export const handler = async (event) => {

    try {
        let db = admin.database();
        let ref = db.ref("test");
        ref.push({
            id: 1,
            timestamp: new Date().getTime(),
            ...event
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ ok: true })
        };
        
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
}