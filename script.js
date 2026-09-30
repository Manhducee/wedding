/* =========================================================
   ĐỨC & NGỌC - WEDDING WEBSITE V2
   Chỉ cần sửa phần CONFIG nếu muốn đổi thông tin.
========================================================= */
const CONFIG = {
  groom: 'Đức',
  bride: 'Ngọc',
  weddingDate: '2026-10-20T17:30:00+07:00',
  address: 'Số nhà 11, ngõ 5, xóm Lạc Long Quân, thôn Dương Khê, xã Vân Đình, Hà Nội',
  groomFather: 'Ông Nguyễn Văn A',
  groomMother: 'Bà Trần Thị B',
  brideFather: 'Ông Nguyễn Văn C',
  brideMother: 'Bà Phạm Thị D'
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

window.addEventListener('load', () => {
  setTimeout(() => $('#pageLoader')?.classList.add('hide'), 450);
});

$$('[data-scroll]').forEach(btn => btn.addEventListener('click', () => {
  const target = $(btn.dataset.scroll);
  target?.scrollIntoView({ behavior: 'smooth' });
}));

// Music: browsers usually require a user click before audio can play.
const music = $('#weddingMusic');
const musicToggle = $('#musicToggle');
let playing = false;
musicToggle.addEventListener('click', async () => {
  try {
    if (playing) { music.pause(); musicToggle.textContent = '♫'; }
    else { await music.play(); musicToggle.textContent = 'Ⅱ'; }
    playing = !playing;
  } catch { alert('Hãy thêm file music/wedding.mp3 vào GitHub rồi thử lại.'); }
});

// Countdown
const weddingTime = new Date(CONFIG.weddingDate).getTime();
function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }
function updateCountdown() {
  const diff = weddingTime - Date.now();
  if (diff <= 0) {
    $('#days').textContent = $('#hours').textContent = $('#minutes').textContent = $('#seconds').textContent = '00';
    return;
  }
  $('#days').textContent = pad(Math.floor(diff / 86400000));
  $('#hours').textContent = pad(Math.floor(diff / 3600000) % 24);
  $('#minutes').textContent = pad(Math.floor(diff / 60000) % 60);
  $('#seconds').textContent = pad(Math.floor(diff / 1000) % 60);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Gallery lightbox
const galleryButtons = $$('#gallery .gallery-item');
const galleryModal = $('#galleryModal');
const modalImage = $('#modalImage');
let galleryIndex = 0;
function showGallery(index) {
  galleryIndex = (index + galleryButtons.length) % galleryButtons.length;
  modalImage.src = galleryButtons[galleryIndex].querySelector('img').src;
  galleryModal.classList.add('open');
}
galleryButtons.forEach((button, index) => button.addEventListener('click', () => showGallery(index)));
galleryModal.querySelector('.modal-close').addEventListener('click', () => galleryModal.classList.remove('open'));
galleryModal.querySelector('.modal-prev').addEventListener('click', () => showGallery(galleryIndex - 1));
galleryModal.querySelector('.modal-next').addEventListener('click', () => showGallery(galleryIndex + 1));
galleryModal.addEventListener('click', e => { if (e.target === galleryModal) galleryModal.classList.remove('open'); });

// RSVP - demo stores submissions in this browser only.
$('#rsvpForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = {
    name: $('#guestName').value.trim(),
    status: $('#guestStatus').value,
    count: $('#guestCount').value,
    note: $('#guestNote').value.trim(),
    time: new Date().toLocaleString('vi-VN')
  };
  localStorage.setItem('wedding-rsvp-demo', JSON.stringify(data));
  $('#rsvpMessage').textContent = 'Cảm ơn bạn! Thông tin đã được lưu trên trình duyệt này.';
  e.target.reset();
});

// Guestbook - demo stores wishes in this browser only.
const wishList = $('#wishList');
function loadWishes() {
  const wishes = JSON.parse(localStorage.getItem('wedding-wishes') || '[]');
  wishList.innerHTML = wishes.map(w => `<article class="wish"><strong>${escapeHtml(w.name)}</strong><p>${escapeHtml(w.text)}</p><small>${escapeHtml(w.time)}</small></article>`).join('');
}
function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
$('#wishForm').addEventListener('submit', e => {
  e.preventDefault();
  const wishes = JSON.parse(localStorage.getItem('wedding-wishes') || '[]');
  wishes.unshift({ name: $('#wishName').value.trim(), text: $('#wishText').value.trim(), time: new Date().toLocaleDateString('vi-VN') });
  localStorage.setItem('wedding-wishes', JSON.stringify(wishes.slice(0, 30)));
  e.target.reset();
  loadWishes();
});
loadWishes();

// Gift modal
const giftModal = $('#giftModal');
$('#giftButton').addEventListener('click', () => giftModal.classList.add('open'));
giftModal.querySelector('.modal-close').addEventListener('click', () => giftModal.classList.remove('open'));
giftModal.addEventListener('click', e => { if (e.target === giftModal) giftModal.classList.remove('open'); });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') $$('.modal.open').forEach(m => m.classList.remove('open'));
  if (e.key === 'ArrowLeft' && galleryModal.classList.contains('open')) showGallery(galleryIndex - 1);
  if (e.key === 'ArrowRight' && galleryModal.classList.contains('open')) showGallery(galleryIndex + 1);
});
