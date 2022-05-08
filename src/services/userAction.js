import {usersCollection} from './../config/firestore';
import auth from '@react-native-firebase/auth';
import regex from '../utils/regex';
import {getGeoHashRange} from '../utils/location';

export function createNewUserAction(uid, parameter) {
  return new Promise((resolve, reject) => {
    usersCollection
      .doc(uid)
      .set(parameter)
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
}

export function updateUserAction(uid, parameter, callFrom) {
  console.log(parameter)
  return new Promise((resolve, reject) => {
    usersCollection
      .doc(uid)
      .update(parameter)
      .then(() => {
        if (callFrom !== 'register') {
          getUserDetail(uid, parameter).then((data) => {
            let response = data.response._data;
            return resolve(response);
          });
        } else {
          resolve(true);
        }
      })
      .catch((error) => {
        return reject(error);
      });
  });
}

export function getUserDetail(uid, data) {
  return new Promise((resolve, reject) => {
    usersCollection
      .doc(uid)
      .get()
      .then((response) => {
        return resolve({response, data});
      })
      .catch((error) => {
        return reject(error);
      });
  });
}

export async function getSpecificFieldData(uid) {
  const res = await usersCollection.doc(uid).get();
  if (res) {
    return res.data()
  } else {
    return "error"
  }
  
}
export const getUserDataAndUpdateInFirestore = (response) => {
  return new Promise((resolve, reject) => {
    let user = response.user;
    let providerId = response.additionalUserInfo.providerId;
    let getUser = user._user;
    if (getUser) {
      let uid = getUser.uid;
      var todayDate = new Date();
      var packageEndDate = todayDate.setDate(todayDate.getDate() + 30);
      var packageEndDate = Math.floor(packageEndDate / 1000);
      let parameter = {
        uid: uid,
        name: regex.isEmpty(getUser.displayName) ? '' : getUser.displayName,
        email: regex.isEmpty(getUser.email) ? '' : getUser.email,
        packageEndDate: packageEndDate,
        profilePic: regex.isEmpty(getUser.photoURL) ? '' : getUser.photoURL,
        socialType:
          providerId === 'facebook.com'
            ? 'facebook'
            : providerId === 'google.com'
            ? 'google'
            : 'phone',
      };
      getUserDetail(uid, user).then((data) => {
        let getUser = data.response;
        if (getUser.exists) {
          resolve({exists: getUser.exists, user: getUser.data()});
        } else {
          parameter.stepCompleted = 0;
          parameter.notificationOn = true;
          parameter.matchOn = true;
          parameter.soundOn = true;
          parameter.online = true;
          createNewUserAction(uid, parameter).then(() => {
            resolve({exists: getUser.exists, user: parameter}); // New User Added
          });
        }
      });
    } else {
      reject('Something went wrong.');
    }
  });
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    let user = auth().currentUser;
    if (!regex.isEmpty(user)) {
      let getUser = user._user;
      let uid = getUser.uid;
      getUserDetail(uid, user).then((data) => {
        let getUser = data.response;
        if (getUser.exists) {
          resolve({user: getUser.data()});
        } else {
          reject({user: null});
        }
      });
    }
  });
};

export function deleteUser(uid) {
  return new Promise((resolve, reject) => {
    usersCollection
      .doc(uid)
      .delete()
      .then(() => {
        resolve(true);
      });
  });
}

export function deletePhoto(uid, photos, currentPhoto) {
  var currentPhotoIndex = photos.indexOf(currentPhoto)
  newPhotos = [];
  for (var i = 0; i < photos.length; i++) {
    if (i != currentPhotoIndex){
      newPhotos.push(photos[i]);
    }
  }
  return new Promise((photos, resolve, reject) => {
    usersCollection.doc(uid).update({
      photos: newPhotos
    }).then(() => {
      resolve(true);
    });
  });
}

export function discoverUsers(uid, location, distance) {
  return new Promise((resolve, reject) => {
    const {latitude, longitude} = location;
    const range = getGeoHashRange(latitude, longitude, distance);

    usersCollection
      .where('location.geoHash', '>=', range.lower)
      .where('location.geoHash', '<=', range.upper)
      .onSnapshot((snapshot) => {
        if (Boolean(snapshot)) {
          resolve(snapshot.docs);
        }
      });
  });
}
