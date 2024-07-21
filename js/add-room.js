async function addRoom() {
  const roomNumber = parseInt(document.getElementById("room-number").value);
  const floorNumber = parseInt(document.getElementById("floor-number").value);
  const bedCount = parseInt(document.getElementById("bed-count").value);
  const price = parseFloat(document.getElementById("room-price").value);
  const description = document.getElementById("room-description").value;
  await roomsCollections.add({
    roomNumber,
    floorNumber,
    bedCount,
    price,
    description,
  });
  window.location.href = "/admin/rooms.html";
}
