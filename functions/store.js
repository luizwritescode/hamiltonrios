import { Firestore } from '@google-cloud/firestore'

export class Fstore {
    constructor() {
        this.db =  new Firestore({
            projectId: "hamiltonrios-e760f",
            keyFilename: "./hamiltonrios.json"
        });
       
    } 


    async get(coll, sid, cb) {
        this.db
            .collection(coll)
            .doc(sid)
            .get()
            .then(doc => {
                if(!doc.exists) {
                    return cb()
                }
                
                try {
                    const res = JSON.parse(doc.data())
                    return cb(res)
                } catch (err) {
                    return cb(err)
                    
                }
            }, cb)
    }

    async set(sid, data, cb) {

        callback = callback || (() => {});
        let sessJson;
        try {
            sessJson = JSON.stringify(data);
        } catch (err) {
            return cb(err);
        }
    
        this.db
      .collection(this.kind)
      .doc(sid)
      .set(sessJson)
      .then(() => {
        cb();
      });
    }

    async destroy(sid, callback) {
        callback = callback || (() => {});
        this.db
          .collection(this.kind)
          .doc(sid)
          .delete()
          .then(() => callback(), callback);
    }

}