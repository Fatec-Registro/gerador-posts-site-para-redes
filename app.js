/* =============================================
   LÓGICA DO GERADOR FATEC (FINAL)
   =============================================
*/

const defaultData = {
    titulo: "FATEC REGISTRO ABRE INSCRIÇÕES PARA O VESTIBULAR 2025",
    tag: "Notícias",
    data: "",
    format: "stories",
    layout: "default",
    primaryColor: "#B20000",
    fontSize: 32,
    imgScale: 1,
    imgPosX: 0,
    imgPosY: 0,
    overlayOpacity: 0,
    courseChipVisible: false,
    courseChipText: "DSM"
};

const colors = [
    "#B20000", "#FBBC1E", "#034EA2", "#089247", "#842519", "#442970", "#005992", "#232254"
];

window.onload = function () {
    generateColorPicker();

    document.getElementById('preview-cover-img').onload = function () {
        updateImgStyle();
    };

    loadFromStorage();

    const wrapper = document.getElementById('zoom-wrapper');
    if (wrapper) wrapper.style.transform = "scale(0.55)";

    setTimeout(() => {
        updateImgStyle();
    }, 100);
};

function syncAndExec(sourceId, targetId, callback) {
    const source = document.getElementById(sourceId);
    const target = document.getElementById(targetId);
    if (source && target) target.value = source.value;
    if (callback && typeof callback === 'function') callback();
}

function generateColorPicker() {
    const container = document.getElementById('color-picker');
    if (!container) return;
    container.innerHTML = '';
    colors.forEach(color => {
        const dot = document.createElement('div');
        dot.className = 'color-dot';
        dot.style.backgroundColor = color;
        dot.onclick = () => setColor(color);
        container.appendChild(dot);
    });
}

function setColor(color) {
    document.documentElement.style.setProperty('--primary-color', color);
    const dots = document.querySelectorAll('.color-dot');
    dots.forEach(d => d.classList.remove('active'));

    const activeDot = Array.from(dots).find(d => {
        const computedColor = rgbToHex(d.style.backgroundColor);
        return computedColor.toLowerCase() === color.toLowerCase();
    });
    if (activeDot) activeDot.classList.add('active');
    saveToStorage();
}

function rgbToHex(rgb) {
    if (!rgb || rgb.indexOf('rgb') === -1) return rgb;
    const parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!parts) return rgb;
    delete parts[0];
    for (let i = 1; i <= 3; i++) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length === 1) parts[i] = '0' + parts[i];
    }
    return '#' + parts.join('');
}

function handleInput(element, max, counterId) {
    if (max && counterId) {
        const count = element.value.length;
        document.getElementById(counterId).innerText = `${count}/${max}`;
    }
    updatePreview();
    saveToStorage();
}

function updateFontSize() {
    const size = document.getElementById('font-size-range').value;
    document.getElementById('preview-titulo').style.fontSize = `${size}px`;
    saveToStorage();
}

function updateOverlay() {
    const opacity = document.getElementById('img-overlay-range').value;
    document.documentElement.style.setProperty('--overlay-opacity', opacity);
    saveToStorage();
}

// --- Lógica do Chip de Curso ---
function toggleCourseChip() {
    const isChecked = document.getElementById('toggle-course-chip').checked;
    const chip = document.getElementById('course-chip');
    const selector = document.getElementById('input-course-chip');

    if (isChecked) {
        chip.style.display = 'block';
        selector.disabled = false;
    } else {
        chip.style.display = 'none';
        selector.disabled = true;
    }
    saveToStorage();
}

function updateCourseChip() {
    const text = document.getElementById('input-course-chip').value;
    document.getElementById('course-chip').innerText = text;
    saveToStorage();
}

function updatePreview() {
    const titulo = document.getElementById('input-titulo').value;
    const dataVal = document.getElementById('input-data').value;
    const tagVal = document.getElementById('input-tag').value;

    document.getElementById('preview-titulo').innerText = titulo || defaultData.titulo;
    document.getElementById('preview-tag').innerText = tagVal || defaultData.tag;

    if (dataVal) {
        const dateObj = new Date(dataVal + "T12:00:00");
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        document.getElementById('preview-data').innerText = "📅 " + dateObj.toLocaleDateString('pt-BR', options).toUpperCase();
    } else {
        document.getElementById('preview-data').innerText = "";
    }
}

function changeFormat() {
    const format = document.getElementById('input-format').value;
    const flyer = document.getElementById('capture');
    const stickerSpace = document.querySelector('.sticker-space');
    const siteLink = document.querySelector('.site-link');

    if (format === 'feed') {
        flyer.classList.add('feed-mode');
        if (stickerSpace) stickerSpace.style.display = 'none';
        if (siteLink) siteLink.style.display = 'block';
    } else {
        flyer.classList.remove('feed-mode');
        if (stickerSpace) stickerSpace.style.display = 'flex';
        if (siteLink) siteLink.style.display = 'none';
    }

    setTimeout(updateImgStyle, 50);
    saveToStorage();
}

function changeLayout() {
    const layout = document.getElementById('input-layout').value;
    const flyer = document.getElementById('capture');
    flyer.classList.remove('layout-default', 'layout-immersive', 'layout-minimal');
    flyer.classList.add(`layout-${layout}`);

    setTimeout(updateImgStyle, 50);
    saveToStorage();
}

function toggleSafeZone() {
    const isChecked = document.getElementById('toggle-safe-zone').checked;
    const zone = document.getElementById('safe-zone');
    if (isChecked) zone.classList.add('visible');
    else zone.classList.remove('visible');
}

function handleCoverUpload() {
    const fileInput = document.getElementById('input-upload-cover');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.getElementById('preview-cover-img');
            img.src = e.target.result;
            img.style.display = 'block';

            const placeholder = document.getElementById('cover-placeholder');
            if (placeholder) placeholder.style.display = 'none';

            const controls = document.getElementById('img-controls');
            if (controls) controls.style.display = 'block';

            resetImgControls();
        }
        reader.readAsDataURL(file);
    }
}

function handleLogoUpload() {
    const file = document.getElementById('input-upload-logo').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview-img-logo').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

function updateImgStyle() {
    const img = document.getElementById('preview-cover-img');
    const container = document.querySelector('.cover-area');

    if (!img || !container || img.src === "" || img.style.display === 'none') return;
    if (img.naturalWidth === 0) return;

    const scale = parseFloat(document.getElementById('img-scale-range').value) || 1;
    const posX = parseFloat(document.getElementById('img-pos-x-range').value) || 0;
    const posY = parseFloat(document.getElementById('img-pos-y-range').value) || 0;

    img.style.objectFit = 'fill';
    img.style.width = 'auto';
    img.style.height = 'auto';
    img.style.maxWidth = 'none';
    img.style.maxHeight = 'none';

    const containerW = container.offsetWidth;
    const containerH = container.offsetHeight;
    const containerRatio = containerW / containerH;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let finalW, finalH;

    if (imgRatio > containerRatio) {
        finalH = containerH;
        finalW = containerH * imgRatio;
    } else {
        finalW = containerW;
        finalH = containerW / imgRatio;
    }

    img.style.width = `${finalW}px`;
    img.style.height = `${finalH}px`;
    img.style.position = 'absolute';
    img.style.left = '50%';
    img.style.top = '50%';

    img.style.transform = `translate(-50%, -50%) translate(${posX}px, ${posY}px) scale(${scale})`;

    saveToStorage();
}

function resetImgControls() {
    const inputs = [
        { r: 'img-scale-range', n: 'img-scale-num', v: 1 },
        { r: 'img-pos-x-range', n: 'img-pos-x-num', v: 0 },
        { r: 'img-pos-y-range', n: 'img-pos-y-num', v: 0 },
        { r: 'img-overlay-range', n: 'img-overlay-num', v: 0 }
    ];

    inputs.forEach(item => {
        document.getElementById(item.r).value = item.v;
        document.getElementById(item.n).value = item.v;
    });

    document.documentElement.style.setProperty('--overlay-opacity', 0);
    setTimeout(updateImgStyle, 0);
}

function saveToStorage() {
    const data = {
        titulo: document.getElementById('input-titulo').value,
        tag: document.getElementById('input-tag').value,
        data: document.getElementById('input-data').value,
        format: document.getElementById('input-format').value,
        layout: document.getElementById('input-layout').value,
        fontSize: document.getElementById('font-size-range').value,
        primaryColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim(),
        imgScale: document.getElementById('img-scale-range').value,
        imgPosX: document.getElementById('img-pos-x-range').value,
        imgPosY: document.getElementById('img-pos-y-range').value,
        overlayOpacity: document.getElementById('img-overlay-range').value,
        courseChipVisible: document.getElementById('toggle-course-chip').checked,
        courseChipText: document.getElementById('input-course-chip').value
    };
    localStorage.setItem('fatec_post_data_v6', JSON.stringify(data));
}

function loadFromStorage() {
    const stored = localStorage.getItem('fatec_post_data_v6');
    if (stored) {
        const data = JSON.parse(stored);
        document.getElementById('input-titulo').value = data.titulo || defaultData.titulo;
        document.getElementById('input-tag').value = data.tag || defaultData.tag;
        document.getElementById('input-data').value = data.data || "";
        document.getElementById('input-format').value = data.format || "stories";
        document.getElementById('input-layout').value = data.layout || "default";

        const setControl = (baseId, val) => {
            document.getElementById(baseId + '-range').value = val;
            document.getElementById(baseId + '-num').value = val;
        };

        setControl('font-size', data.fontSize || defaultData.fontSize);
        setControl('img-scale', data.imgScale || defaultData.imgScale);
        setControl('img-pos-x', data.imgPosX || defaultData.imgPosX);
        setControl('img-pos-y', data.imgPosY || defaultData.imgPosY);
        setControl('img-overlay', data.overlayOpacity || defaultData.overlayOpacity);

        setColor(data.primaryColor || defaultData.primaryColor);

        // Load Chip Settings
        document.getElementById('toggle-course-chip').checked = data.courseChipVisible || false;
        document.getElementById('input-course-chip').value = data.courseChipText || "DSM";

        toggleCourseChip();
        updateCourseChip();

        changeFormat();
        changeLayout();
        updateFontSize();
        updateOverlay();
        handleInput(document.getElementById('input-titulo'), 120, 'count-titulo');

        if (document.getElementById('preview-cover-img').src && document.getElementById('preview-cover-img').src !== window.location.href) {
            const controls = document.getElementById('img-controls');
            if (controls) controls.style.display = 'block';
        }

        setTimeout(updateImgStyle, 100);
    } else {
        setColor(defaultData.primaryColor);
        updatePreview();
    }
}

function downloadImage() {
    prepareCapture().then(canvas => {
        const link = document.createElement("a");
        link.download = `post-fatec-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        showToast("Imagem baixada com sucesso!");
    });
}

function copyImage() {
    prepareCapture().then(canvas => {
        canvas.toBlob(blob => {
            if (navigator.clipboard && navigator.clipboard.write) {
                navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]).then(() => {
                    showToast("Imagem copiada! Cole no WhatsApp/Insta.");
                }).catch(err => {
                    console.error("Erro ao copiar:", err);
                    showToast("Erro ao copiar. Tente baixar.");
                });
            } else {
                showToast("Seu navegador não suporta cópia direta.");
            }
        });
    });
}

function prepareCapture() {
    const element = document.getElementById("capture");
    const wrapper = document.getElementById('zoom-wrapper');
    const zone = document.getElementById('safe-zone');

    const originalTransform = wrapper.style.transform;
    const wasZoneVisible = zone.classList.contains('visible');

    wrapper.style.transform = "none";
    zone.classList.remove('visible');

    updateImgStyle();

    return html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        allowTaint: true
    }).then(canvas => {
        wrapper.style.transform = originalTransform;
        if (wasZoneVisible) zone.classList.add('visible');
        return canvas;
    });
}

function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 3000);
}