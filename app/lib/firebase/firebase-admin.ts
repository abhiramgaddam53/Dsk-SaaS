// app/lib/firebase-admin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
 if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDaf2xKqMmBowFF\n41G9xGOFHHnht/ymWxK0nvLDNYYCbL3cfZsfmxyAAVqCjiS3tmva7rhWPJIs203i\n3ufTzp2+h8QRh00TohgwVj9ZYWqSLQBu3ogZLuzwxQQ2beDU9VImGnEYB3py56jt\nZI1dPJEpUCZvOjI2UiVIi05TFTvH6crKd2DFFzCqqiwdgasPz05NCGGQFYacM+hM\nCQEhf8NGg+jex6YXza85Lk1VkdnqmE2Ry2fPFYZO2a2OFMmy2Ay3s433iS/2F61K\nn/Vtsb3OcL73vYTyMxekkvCtLXRWwXM4abAi/1psey5J38E7PElchIQDtgY8c/xe\nMTLxmV0nAgMBAAECggEAIyBpIHeSLa0u/zVUZtWzyiqRzZ/uli/+Cduj2443RRyG\nSXRIBATDyDBvhJ2leYNyQ3gtWm/ScDOxic+cJYkKAx+AffDqi0V77glvlcb7gxSJ\nBUnxR1sr7GlADCAODS6DTmzh0aMiJGbp2YBY2axrCeFAzJDmkaUTKV578Q9w1OqM\n0gTA2cF5khyRYcLCJUiTlPUV/xv7W6tplCJO3vylYt+yCSI9T5d9OFKO3IyQQ6SW\nhjoxBiRLbSTXrNnhDVlYedrX2wOeem6wn3y0qjY+udeH+uM80/AXq45uyxO9BhiF\n/HJfwtvksMsTHyQ3foj5MpjW+KcnhheJkSzLLJ3qgQKBgQD/fvTvcm1GeioQWizD\nx8uevWdVFOmzipYcWVQL9h1WM62zte+oFDl1sWOxq7XMYGjSniqWkMhwSN28ORw8\n62CLocfTzxBbeQEu1PbvmgmyMQET69LvNjTpWeOnPxAWXs6Ymae3/xQcWGVoWNbQ\n7klmUQbskdNcafBW4k/FycJeHwKBgQDa7ceSmSrnL8Sj3tVLYvec9dt8V77pPJrA\n4R49QOAVnRzX1iC6hOuUT57kYj58uIZQ5Z2H9BzXZc66q27I3JiaFUHL5hqE1vX1\nRVMBYd9r1OCPMPcIPrEeQ4nol3TWDTIfgTP4A15TvDr/0DNYz4/CTVYYFsQkJ60O\n0jnDnvgP+QKBgQCOpGXBLWRe3aOQX5fwciJ3bI09TiCv0Wa/SwwGZZC5aL7Iv4Ge\nmDQARlo/fntQMF81f4KNbyXIspXBGS1vwYW0T01OLqOWPjdv2wxGdvyE1KEiax3n\n2Z6uzTWxUR79Lk8vmVGvAyVKMfvjxv2fxfmKuyAfgca8KJU7HLym017FxwKBgQDX\nezx4nUtuG0Unqbc0qSdglVjADTl6Jc2H1MvHrGgive5avoaeLyAUbT3OOqiYZ6LE\nUwx3eR0+IRWWBBBZoU6OMif9wfEOGOojzGUDskqOvwt7xM0Qj2wThpRhm1lDKd/Q\nxIHbNa2NK3LCwTEY08sCis4XjajmkSqzsNVsJrawOQKBgDlmc7O/DgeMNxul9ptw\n4osbQuE6ljzrxOyjCsvr7qtE5em0BlujdOfGHbQ3Bghiw6lPpg0l6tDE4pmZ/r+k\n4zn2sQZAcl684oa1/E0Brtbn9nzweNprtIu8ucaL8b2jbeiThpM0+NWlESn2Fe6O\nztiQQpHwbQBOJGwYJOiNnU78\n-----END PRIVATE KEY-----\n"  
      // privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const adminAuth = getAuth();
const adminDb = getFirestore();

export { adminAuth, adminDb };