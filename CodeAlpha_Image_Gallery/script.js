let currentIndex = 0;
let categories = new Set();
let totalAssets = 0;

// Clock System
function updateClock() {
    const now = new Date();
    document.getElementById('systemClock').innerText = now.toLocaleTimeString('en-GB', { hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

function updateCount() {
    document.getElementById('assetCount').innerText = totalAssets;
}

// Upload Handler
function handleUpload(event) {
    const files = event.target.files;
    const catInput = document.getElementById('newCategoryName');
    const categoryName = catInput.value.trim().toUpperCase() || "GENERAL";
    const categoryID = categoryName.toLowerCase().replace(/\s+/g, '-');
    const grid = document.getElementById('galleryGrid');

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const div = document.createElement('div');
            div.className = `item all ${categoryID} show`;
            div.innerHTML = `
                <img src="${e.target.result}" alt="${categoryName}">
                <div class="action-btns">
                    <button class="heart" onclick="toggleFavorite(event, this)">❤</button>
                    <button class="delete-btn" onclick="deleteAsset(event, this)">🗑</button>
                </div>
                <div class="overlay">${categoryName}</div>
            `;
            
            div.onclick = (event) => {
                if(event.target.tagName !== 'BUTTON') openLightbox(div);
            };
            
            grid.prepend(div);
            totalAssets++;
            updateCount();
            addCategoryToFilter(categoryName);
        };
        reader.readAsDataURL(file);
    });
    catInput.value = ""; 
}

// DELETE FEATURE
function deleteAsset(event, btn) {
    event.stopPropagation(); // Stop Lightbox from opening
    const confirmed = confirm("LUMINA ARCHIVE NOTIFICATION: Proceed with photo delete?");
    if (confirmed) {
        const item = btn.closest('.item');
        item.remove();
        totalAssets--;
        updateCount();
    }
}

// Filter Logic
function addCategoryToFilter(name) {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    if (categories.has(id)) return;
    categories.add(id);
    const filterBar = document.getElementById('filterBar');
    const btn = document.createElement('button');
    btn.className = 'filter-node';
    btn.innerText = name;
    btn.onclick = () => filterSelection(id);
    filterBar.appendChild(btn);
}

function filterSelection(c) {
    const items = document.querySelectorAll('.item');
    const btns = document.querySelectorAll('.filter-node');
    btns.forEach(btn => {
        btn.classList.remove('active');
        if (c === 'all' && btn.innerText === 'GRAND GALLERY') btn.classList.add('active');
        else if (c === 'fav' && btn.innerText === 'PRIME SELECTION') btn.classList.add('active');
        else if (btn.innerText === c.toUpperCase()) btn.classList.add('active');
    });
    items.forEach(item => {
        item.classList.remove('show');
        if (c === 'all') item.classList.add('show');
        else if (c === 'fav') {
            if (item.classList.contains('is-fav')) item.classList.add('show');
        } else {
            if (item.classList.contains(c)) item.classList.add('show');
        }
    });
}

function toggleFavorite(e, btn) {
    e.stopPropagation();
    btn.classList.toggle('active');
    btn.closest('.item').classList.toggle('is-fav');
}

// Lightbox
function openLightbox(element) {
    const visible = Array.from(document.querySelectorAll('.item.show img')).map(img => img.src);
    currentIndex = visible.indexOf(element.querySelector('img').src);
    document.getElementById('lightbox-img').src = visible[currentIndex];
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() { document.getElementById('lightbox').style.display = 'none'; }

function changeImage(step) {
    const visible = Array.from(document.querySelectorAll('.item.show img')).map(img => img.src);
    if (visible.length === 0) return;
    currentIndex = (currentIndex + step + visible.length) % visible.length;
    document.getElementById('lightbox-img').src = visible[currentIndex];
}

function downloadImage() {
    const a = document.createElement('a');
    a.href = document.getElementById('lightbox-img').src;
    a.download = `LUMINA-ARCHIVE.jpg`;
    a.click();
}

function toggleFullscreen() {
    const img = document.getElementById('lightbox-img');
    if (!document.fullscreenElement) img.requestFullscreen();
    else document.exitFullscreen();
}