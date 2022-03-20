// require("dotenv").config();
const AWS = require("aws-sdk");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytesResumable, uploadBytes, getDownloadURL } = require("firebase/storage");

const uploadFile = (buffer, name, type, bucket) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const s3 = new AWS.S3();

  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: bucket,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

const uploadFileFirebase = (buffer, name, type, bucket) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDl4nxQW4WAHOzLdXaKWbrmn0fEho9tkQg",
    authDomain: "rodriguesdev-2d63d.firebaseapp.com",
    projectId: "rodriguesdev-2d63d",
    storageBucket: bucket,
    messagingSenderId: "710377145912",
    appId: "1:710377145912:web:a08c6bd140b9dcef4f88cd",
    measurementId: "G-LLTTEME1FS",
  };
  const metadata = {
    contentType: "image/jpeg",
    name: name,
    type: type,
  };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage();
  // Create a child reference
  const imagesRef = ref(storage, name);
  // imagesRef now points to 'images'

  let upload = uploadBytes(imagesRef, buffer, metadata).then((snapshot) => {
    console.log("Uploaded a blob or file!");
    let url = getDownloadURL(imagesRef).then((currentUrl) => {
      return currentUrl;
    });
    return url;
  });
  return upload;
  // const uploadTask = uploadBytesResumable(imagesRef, buffer, metadata);
  // uploadTask.on(
  //   "state_changed",
  //   (snapshot) => {
  //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log("Upload is " + progress + "% done");
  //     switch (snapshot.state) {
  //       case "paused":
  //         console.log("Upload is paused");
  //         break;
  //       case "running":
  //         console.log("Upload is running");
  //         break;
  //     }
  //   },
  //   (error) => {
  //     // A full list of error codes is available at
  //     // https://firebase.google.com/docs/storage/web/handle-errors
  //     switch (error.code) {
  //       case "storage/unauthorized":
  //         // User doesn't have permission to access the object
  //         break;
  //       case "storage/canceled":
  //         // User canceled the upload
  //         break;

  //       // ...

  //       case "storage/unknown":
  //         // Unknown error occurred, inspect error.serverResponse
  //         break;
  //     }
  //   },
  //   () => {
  //     // Upload completed successfully, now we can get the download URL
  //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //       return downloadURL;
  //     });
  //   }
  // );
  // return uploadTask;
};

module.exports = { uploadFile, uploadFileFirebase };
