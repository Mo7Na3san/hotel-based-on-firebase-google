function createCard(roomObject) {
  return `<div class="room-card">
          <div>
            <h2>Room Number :</h2>
            <span>${roomObject.roomNumber}</span>
          </div>
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
            <span>${roomObject.price}</span>
          </div>
          <div>
            <p>current user :</p>
            <span>${roomObject.user?.fullName ?? "not booked"}</span>
          </div>
          <div>
            <p>Description :</p>
            <span>${roomObject.description}</span>
          </div>
          <div>
            <button onclick="freeUpRoom('${
              roomObject.id
            }')" class="warning">Free up</button>
            <button onclick="deleteRoom('${
              roomObject.id
            }')" class="danger">Delete</button>
          </div>
        </div>`;
}

async function getRooms() {
  let rooms = [];
  await roomsCollections.get().then(async (snapshot) => {
    for (let i = 0; i < snapshot.docs.length; i++) {
      const doc = snapshot.docs[i];
      const data = await doc.data();
      data.user = (await data.user?.get())?.data();
      const docData = {
        id: doc.id,
        ...data,
      };
      rooms.push(docData);
    }
  });
  return rooms;
}

async function deleteRoom(roomId) {
  await roomsCollections.doc(roomId).delete();
  await refreshRooms();
}

async function freeUpRoom(roomId) {
  await roomsCollections.doc(roomId).update({
    user: null,
  });
  await refreshRooms();
}

async function refreshRooms() {
  const rooms = await getRooms();
  const roomsContainer = document.getElementById("rooms-container");

  if (rooms.length > 0) {
    roomsContainer.innerHTML = rooms.map(createCard).join("");
  } else {
    roomsContainer.innerHTML = "No Rooms Yet";
  }
}
(async () => {
  await refreshRooms();
})();
