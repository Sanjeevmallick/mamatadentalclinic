const bookingModal = document.getElementById('bookingModal');
const serviceModal = document.getElementById('serviceModal');
const openBooking = document.getElementById('openBooking');
const closeBooking = document.getElementById('closeBooking');
const closeService = document.getElementById('closeService');
const bookingForm = document.getElementById('bookingForm');
const serviceTitle = document.getElementById('serviceTitle');
const serviceText = document.getElementById('serviceText');
const serviceModalIcon = document.getElementById('serviceModalIcon');
const serviceBook = document.getElementById('serviceBook');

const serviceData = {
  general: {title:'General Dentistry', text:'Routine dental check-ups, cleaning and preventive care to help maintain healthy teeth and gums.', color:'#2b8fc4', icon:'✦'},
  ortho: {title:'Orthodontics', text:'Braces and aligner options for improving tooth alignment, bite and smile appearance.', color:'#1aaeb5', icon:'⌁'},
  cosmetic: {title:'Cosmetic Dentistry', text:'Smile-enhancing treatments including teeth whitening and veneers.', color:'#19bdb3', icon:'✦'},
  pediatric: {title:'Pediatric Dentistry', text:'Kid-friendly dental care focused on comfort, healthy development and prevention.', color:'#ed5c7f', icon:'◌'},
  restorations: {title:'Restorations', text:'Fillings, crowns and bridges to restore damaged or missing tooth structure.', color:'#7251bd', icon:'◆'},
  surgery: {title:'Oral Surgery', text:'Dental procedures such as extractions and implant-related care as advised by the dentist.', color:'#0d5b9d', icon:'✚'}
};

function showModal(el){el.classList.remove('hidden'); document.body.style.overflow='hidden';}
function hideModal(el){el.classList.add('hidden'); if(bookingModal.classList.contains('hidden') && serviceModal.classList.contains('hidden')) document.body.style.overflow='';}

openBooking.addEventListener('click',()=>showModal(bookingModal));
closeBooking.addEventListener('click',()=>hideModal(bookingModal));
closeService.addEventListener('click',()=>hideModal(serviceModal));

for (const card of document.querySelectorAll('.service-card')) {
  card.addEventListener('click',()=>{
    const item = serviceData[card.dataset.service];
    serviceTitle.textContent = item.title;
    serviceText.textContent = item.text;
    serviceModalIcon.style.background = item.color;
    serviceModalIcon.textContent = item.icon;
    serviceBook.dataset.serviceName = item.title;
    showModal(serviceModal);
  });
}
serviceBook.addEventListener('click',()=>{ hideModal(serviceModal); showModal(bookingModal); });

[bookingModal,serviceModal].forEach(modal=>{
  modal.addEventListener('click',(e)=>{ if(e.target===modal) hideModal(modal); });
});
document.addEventListener('keydown',(e)=>{
  if(e.key==='Escape'){ hideModal(bookingModal); hideModal(serviceModal); }
});

bookingForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const data = new FormData(bookingForm);
  const name = data.get('name');
  const phone = data.get('phone');
  const branch = data.get('branch');
  const date = data.get('date');
  const message = data.get('message') || 'No additional message';
  const text = `Hello Mamata Dental Clinic, I would like to book an appointment.%0A%0APatient: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ABranch: ${encodeURIComponent(branch)}%0APreferred date: ${encodeURIComponent(date)}%0AReason/Message: ${encodeURIComponent(message)}`;
  window.open(`https://wa.me/917608048761?text=${text}`, '_blank', 'noopener');
});
