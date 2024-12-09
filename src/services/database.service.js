import FirebaseApp from "./firebase.service"
import { getDatabase, ref, child, set, get, update, remove, push, onValue, off, query, limitToLast } from "firebase/database";

const database = getDatabase(FirebaseApp);


const Database = {}


/**
 * 
 * @param {string} _ref Database reference
 * @param {any} value Value to set
 * @returns {Promise<json | boolean>} Data if success, false if error
 */
Database.set = (_ref, value) => {
    return new Promise(async (resolve) => {
        const database_ref = ref(database, `${_ref}`);
        try {
            await set(database_ref, value)
            resolve(true)
        } catch (error) {
            console.log(error)
            resolve(false)
        }
    })
}

/**
 * 
 * @param {string} _ref Database reference
 * @returns {Promise<json | boolean>} Data if success, false if error
 */
Database.get = (_ref) => {
    return new Promise(async (resolve) => {
        const database_ref = ref(database);
        
        try {
            let data = await get(child(database_ref, `${_ref}`));
            resolve(data.val())
        } catch (error) {
            //alert(error)
            console.log(error)
            resolve(false)
        }
    })
}

/**
 * 
 * @param {string} _ref Database reference
 * @param {any} value Value to set
 * @returns {Promise<boolean>} True if success, false if error
 */
Database.push = (_ref, value) => {
    return new Promise(async (resolve) => {
        const database_ref = ref(database);
        const key = push(child(database_ref, `${_ref}`)).key;
        const updates = {};
        updates[`/${_ref}/` + key] = value;

        try {
            await update(database_ref, updates);
            resolve(key)
        } catch (error) {
            console.log(error)
            resolve(false)
        }
    })
}

/**
 * 
 * @param {string} _ref Database reference
 * @param {any} value Value to set
 * @returns {Promise<boolean>} True if success, false if error
 */
Database.update = (_ref, value) => {
    return new Promise(async (resolve) => {
        const database_ref = ref(database);
        const updates = {};
        updates[`/${_ref}/`] = value;

        try {
            await update(database_ref, updates);
            resolve(true)
        } catch (error) {
            console.log(error)
            resolve(false)
        }
    })
}

/**
 * 
 * @param {string} _ref Database reference
 * @returns {Promise<boolean>} True if success, false if error
 */
Database.remove = (_ref) => {
    return new Promise(async (resolve) => {
        const database_ref = ref(database, `${_ref}`);

        try {
            await remove(database_ref)
            resolve(true)
        } catch (error) {
            console.log(error)
            resolve(false)
        }
    })
}

/**
 * 
 * @param {string} _ref Database reference
 * @param {function} callback Callback function executed when value changes
 * @returns {Observer<any>} Value of snapshot
 */
Database.onValue = async (_ref, limit, callback) => {
    // const database_ref = ref(database, `${_ref}`);
    const _query = query(ref(database, `${_ref}`), limitToLast(limit))
    await Database.off(_ref)
    onValue(_query, (snapshot) => {
        const data = snapshot.val();
        callback(data)
    });
}

/**
 * 
 * @param {string} _ref Database reference
 * @returns {Promise<boolean>} True if success, false if error
 */
Database.off = (_ref) => {
    return new Promise((resolve) => {
        const database_ref = ref(database, `${_ref}`);

        try {
            off(database_ref)
            resolve(true)
        } catch (error) {
            resolve(false)
        }
    })
}

export { Database }