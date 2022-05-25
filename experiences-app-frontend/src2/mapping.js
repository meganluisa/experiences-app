mapboxgl.accessToken = "pk.eyJ1IjoibWVnYW5sdWlzYSIsImEiOiJjanljNWxiaGQwZnluM2NsZG1wZ3Q3dHRsIn0.St7BhCiZXPL78pfxYA79YQ"



async function createPopup() {
 const data = await axios.get('http://localhost:3000/api/images/')
 console.log(data);
}

