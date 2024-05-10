const loadPhone=async(searchPhone)=>{
const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
const data = await res.json();
const phones = data.data;
displayPhone(phones);
}
const displayPhone=phones=>{
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerText='';
    const showAllBtn = document.getElementById("show-all-container");
    if(phones.length > 12){
      showAllBtn.classList.remove("hidden")
    }
    else{
      showAllBtn.classList.add("hidden")
    }
    phones=phones.slice(0,12);
phones.forEach(phone => {
   const phoneCard = document.createElement("div");
   phoneCard.classList= `card w-96 mx-auto bg-gray-100 shadow-xl`;
   phoneCard.innerHTML =`
   <figure><img src="${phone.image}" alt="Shoes" /></figure>
   <div class="card-body">
     <h2 class="card-title">${phone.phone_name}</h2>
     <p>${phone.slug}</p>
     <div class="card-actions justify-center">
       <button onclick="handleShowDetail('${phone.slug}')" class="bg-blue-950 py-2 px-6 rounded-lg text-white mt-5">Show details</button>
     </div>
   </div>
   `;
   phoneContainer.appendChild(phoneCard);
});
toggleLoadingSpinner(false)
}


const handleSearch = () =>{
  toggleLoadingSpinner(true)
const searchField = document.getElementById("search-field");
const searchText = searchField.value;
loadPhone(searchText);
console.log(searchText)
}
const toggleLoadingSpinner=(isLoading)=>{
  const spinner = document.getElementById("loading-spinner");
  if(isLoading){
    spinner.classList.remove("hidden")
  }
  else{
    spinner.classList.add("hidden")
  }
}
const handleShowDetail =async(id)=>{
 const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
 const data = await res.json();
 const phone = data.data;
 console.log(data);
 phoneShowDetails(phone);
}
const phoneShowDetails = (phone) =>{
  const showDetailPhoneName = document.getElementById("show-detail-phone-name");
  showDetailPhoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML=`
    <div class='flex justify-center py-5'>
    <img src='${phone.image}'>
    </div>
     <h3>${phone.mainFeatures.storage}</h3>
  `
  my_modal_5.showModal();
}
loadPhone("13");