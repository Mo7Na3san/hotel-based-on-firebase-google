function createCard(roomObject) {
  return `
  <div class="card">
              <span class='room-number'>
              <i class="fa-solid fa-hashtag hash"></i> ${roomObject.roomNumber}
              </span>
            <div>
              <p>Floor number :</p>
              <span>${roomObject.floorNumber}</span>
            </div>
            <div>
              <p>number of beds :</p>
              <span>${roomObject.bedCount}</span>
            </div>
            <div>
              <p>price :</p>
              <span>${roomObject.price} .SR</span>
            </div>
            <div class="room-description">
              <p>Description :</p>
              <span>${roomObject.description}</span>
            </div>
            <div>
               <button onclick="bookRoom('${roomObject.id}')" class="primary book-btn">Book</button>
            </div>
          </div>
    `;
}
async function hasRoom() {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    alert("here you stop");
  } else {
    return await roomsCollections.get().then(async (snapshot) => {
      let hasBooking = false;
      for (let i = 0; i < snapshot.docs.length; i++) {
        const doc = snapshot.docs[i];
        const data = doc.data();
        hasBooking = data.user?.id === uid;
        if (hasBooking) break;
      }
      return hasBooking;
    });
  }
}

async function bookRoom(roomId) {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    alert("you have to login");
  } else {
    if (await hasRoom(roomId)) {
      alert("you already have a room");
    } else {
      await roomsCollections.doc(roomId).update({
        user: usersCollections.doc(uid),
      });
      localStorage.setItem("currentRoomId", roomId);
      window.location.href = "/current-room.html";
    }
  }
}

async function getRooms() {
  let rooms = [];
  await roomsCollections.get().then(async (snapshot) => {
    for (let i = 0; i < snapshot.docs.length; i++) {
      const doc = snapshot.docs[i];
      const data = await doc.data();
      if (!data.user) {
        const docData = {
          id: doc.id,
          ...data,
        };
        rooms.push(docData);
      }
    }
  });
  return rooms;
}

async function refreshRooms() {
  const rooms = await getRooms();
  const roomsContainer = document.getElementById("free-rooms-container");

  if (rooms.length > 0) {
    roomsContainer.innerHTML = rooms.map(createCard).join("");
  } else {
    roomsContainer.innerHTML = "No Rooms available";
  }
}
(async () => {
  await refreshRooms();
})();
