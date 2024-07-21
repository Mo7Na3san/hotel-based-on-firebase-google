async function getCurrentRoom() {
  const roomId = localStorage.getItem("currentRoomId");
  if (!roomId) {
    alert("you don't have any booking !");
    window.location.href = "/book.html";
  }
  const room = await roomsCollections.doc(roomId).get();
  return { id: roomId, ...room.data() };
}

async function checkout() {
  const roomId = localStorage.getItem("currentRoomId");
  await roomsCollections.doc(roomId).update({
    user: null,
  });
  localStorage.removeItem("currentRoomId");
  window.location.href = "/check-out.html";
}

(async () => {
  const room = await getCurrentRoom();
  document.getElementById("room-number").innerHTML = `${room.roomNumber}`;
  document.getElementById("bed-count").innerHTML = `${room.bedCount}`;
  document.getElementById("floor-number").innerHTML = `${room.floorNumber}`;
  document.getElementById("room-price").innerHTML = `${room.price} SR`;
  document.getElementById("room-description").innerHTML = `${room.description}`;

  document.getElementById("room-data").style.display = "flex";
})();
