/* =============================================
   GERADOR FATEC - APP MODULAR
   =============================================
*/

const App = {
    config: {
        defaultData: {
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
            brightness: 1,
            contrast: 1,
            courseChipVisible: false,
            courseChipText: "DSM"
        },
        colors: [
            "#B20000", "#FBBC1E", "#034EA2", "#089247", "#842519", "#442970", "#005992", "#232254"
        ],
        storageKey: 'fatec_post_data_v7'
    },

    state: {
        data: {},
        history: [],
        historyIndex: -1,
        isDragging: false,
        dragStartX: 0,
        dragStartY: 0,
        initialImgX: 0,
        initialImgY: 0
    },

    init: function () {
        // Inicializa dados
        this.state.data = { ...this.config.defaultData };

        // UI Init
        this.ui.generateColorPicker();

        // CORREÇÃO DO BUG: Monitora o carregamento da imagem para ajustar proporção
        const imgPreview = document.getElementById('preview-cover-img');
        if (imgPreview) {
            imgPreview.onload = () => {
                this.handlers.updateImgStyle();
            };
        }

        // Load Data
        this.storage.load();

        // Event Listeners Especiais
        this.handlers.setupDragAndDrop();

        // Zoom Inicial
        this.ui.updatePreviewZoom();

        // Delay de segurança para renderização inicial
        setTimeout(() => this.handlers.updateImgStyle(), 100);
    },

    // --- Gerenciamento de Estado e Histórico ---
    history: {
        push: function () {
            if (App.state.historyIndex < App.state.history.length - 1) {
                App.state.history = App.state.history.slice(0, App.state.historyIndex + 1);
            }
            App.state.history.push(JSON.stringify(App.state.data));
            App.state.historyIndex++;

            if (App.state.history.length > 50) {
                App.state.history.shift();
                App.state.historyIndex--;
            }
        },
        undo: function () {
            if (App.state.historyIndex > 0) {
                App.state.historyIndex--;
                App.state.data = JSON.parse(App.state.history[App.state.historyIndex]);
                App.ui.refreshAllInputs();
                App.storage.save(false);
                App.ui.showToast("Desfeito");
            }
        },
        redo: function () {
            if (App.state.historyIndex < App.state.history.length - 1) {
                App.state.historyIndex++;
                App.state.data = JSON.parse(App.state.history[App.state.historyIndex]);
                App.ui.refreshAllInputs();
                App.storage.save(false);
                App.ui.showToast("Refeito");
            }
        }
    },

    storage: {
        save: function (pushToHistory = true) {
            if (pushToHistory) App.history.push();

            const d = App.state.data;
            // Sincroniza objeto state com o DOM
            const safeValue = (id) => {
                const el = document.getElementById(id);
                return el ? el.value : '';
            };

            d.titulo = safeValue('input-titulo');
            d.tag = safeValue('input-tag');
            d.data = safeValue('input-data');
            d.format = safeValue('input-format');
            d.layout = safeValue('input-layout');
            d.fontSize = safeValue('font-size-range');
            d.primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();

            d.imgScale = safeValue('img-scale-range');
            d.imgPosX = safeValue('img-pos-x-range');
            d.imgPosY = safeValue('img-pos-y-range');
            d.overlayOpacity = safeValue('img-overlay-range');
            d.brightness = safeValue('filter-brightness');
            d.contrast = safeValue('filter-contrast');

            const checkCourse = document.getElementById('toggle-course-chip');
            d.courseChipVisible = checkCourse ? checkCourse.checked : false;
            d.courseChipText = safeValue('input-course-chip');

            localStorage.setItem(App.config.storageKey, JSON.stringify(d));

            // Feedback Visual
            const now = new Date();
            const timeDisplay = document.getElementById('last-saved-time');
            if (timeDisplay) {
                timeDisplay.innerText = `Salvo às ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
            }
        },
        load: function () {
            const stored = localStorage.getItem(App.config.storageKey);
            if (stored) {
                App.state.data = JSON.parse(stored);
                App.ui.refreshAllInputs();
                App.history.push();
            } else {
                App.handlers.setColor(App.config.defaultData.primaryColor);
                App.handlers.updatePreview();
                App.history.push();
            }
        },
        resetToDefaults: function () {
            if (confirm("Tem certeza que deseja resetar tudo para o padrão?")) {
                App.state.data = { ...App.config.defaultData };
                App.ui.refreshAllInputs();
                App.storage.save();
                App.ui.showToast("Resetado para o padrão");
            }
        }
    },

    // --- Handlers de Eventos ---
    handlers: {
        handleInput: function (element, max, counterId) {
            if (max && counterId && element) {
                const count = element.value.length;
                const counter = document.getElementById(counterId);
                if (counter) counter.innerText = `${count}/${max}`;

                const warning = document.getElementById('title-warning');
                if (warning) {
                    if (count > 80) {
                        counter.style.color = 'orange';
                        warning.style.display = 'block';
                    } else {
                        counter.style.color = '#999';
                        warning.style.display = 'none';
                    }
                }
            }
            App.handlers.updatePreview();
            App.storage.save();
        },

        updatePreview: function () {
            const titulo = document.getElementById('input-titulo').value;
            const tagVal = document.getElementById('input-tag').value;
            const dataVal = document.getElementById('input-data').value;

            document.getElementById('preview-titulo').innerText = titulo || App.config.defaultData.titulo;
            document.getElementById('preview-tag').innerText = tagVal || App.config.defaultData.tag;

            if (dataVal) {
                const dateObj = new Date(dataVal + "T12:00:00");
                const options = { day: 'numeric', month: 'short', year: 'numeric' };
                document.getElementById('preview-data').innerText = "📅 " + dateObj.toLocaleDateString('pt-BR', options).toUpperCase();
            } else {
                document.getElementById('preview-data').innerText = "";
            }
        },

        updateFontSize: function () {
            const size = document.getElementById('font-size-range').value;
            document.getElementById('preview-titulo').style.fontSize = `${size}px`;
            App.storage.save();
        },

        changeFormat: function () {
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
            setTimeout(() => App.handlers.updateImgStyle(), 50);
            App.storage.save();
        },

        changeLayout: function () {
            const layout = document.getElementById('input-layout').value;
            const flyer = document.getElementById('capture');
            flyer.classList.remove('layout-default', 'layout-immersive', 'layout-minimal');
            flyer.classList.add(`layout-${layout}`);
            setTimeout(() => App.handlers.updateImgStyle(), 50);
            App.storage.save();
        },

        setColor: function (color) {
            document.documentElement.style.setProperty('--primary-color', color);

            const dots = document.querySelectorAll('.color-dot');
            dots.forEach(d => d.classList.remove('active'));
            const activeDot = Array.from(dots).find(d => {
                return App.utils.rgbToHex(d.style.backgroundColor).toLowerCase() === color.toLowerCase();
            });
            if (activeDot) activeDot.classList.add('active');

            const customInput = document.getElementById('custom-color');
            if (customInput) customInput.value = color;

            App.storage.save();
        },

        setCustomColor: function (color) {
            App.handlers.setColor(color);
        },

        toggleCourseChip: function () {
            const check = document.getElementById('toggle-course-chip');
            const isChecked = check ? check.checked : false;
            const chip = document.getElementById('course-chip');
            const selector = document.getElementById('input-course-chip');

            if (chip && selector) {
                if (isChecked) {
                    chip.style.display = 'block';
                    selector.disabled = false;
                } else {
                    chip.style.display = 'none';
                    selector.disabled = true;
                }
            }
            App.storage.save();
        },

        updateCourseChip: function () {
            const text = document.getElementById('input-course-chip').value;
            document.getElementById('course-chip').innerText = text;
            App.storage.save();
        },

        updateOverlay: function () {
            const opacity = document.getElementById('img-overlay-range').value;
            document.documentElement.style.setProperty('--overlay-opacity', opacity);
            App.storage.save();
        },

        handleCoverUpload: function () {
            const fileInput = document.getElementById('input-upload-cover');
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = document.getElementById('preview-cover-img');

                    // O onload definido no init cuidará do updateImgStyle
                    img.src = e.target.result;
                    img.style.display = 'block';

                    document.getElementById('cover-placeholder').style.display = 'none';
                    document.getElementById('img-controls').style.display = 'block';

                    // Reset Controls (Sliders e Números)
                    const resetControl = (id, val) => {
                        const range = document.getElementById(id + '-range');
                        const num = document.getElementById(id + '-num');
                        if (range) range.value = val;
                        if (num) num.value = val;
                    };

                    resetControl('img-scale', 1);
                    resetControl('img-pos-x', 0);
                    resetControl('img-pos-y', 0);

                    // Save sem histórico para não poluir
                    App.storage.save(false);
                }
                reader.readAsDataURL(file);
            }
        },

        handleLogoUpload: function () {
            const file = document.getElementById('input-upload-logo').files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('preview-img-logo').src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        },

        updateImgStyle: function () {
            const img = document.getElementById('preview-cover-img');
            const container = document.querySelector('.cover-area');

            if (!img || !container || img.src === "" || img.style.display === 'none') return;
            if (img.naturalWidth === 0) return;

            const scale = parseFloat(document.getElementById('img-scale-range').value) || 1;
            const posX = parseFloat(document.getElementById('img-pos-x-range').value) || 0;
            const posY = parseFloat(document.getElementById('img-pos-y-range').value) || 0;

            const bright = document.getElementById('filter-brightness').value;
            const contrast = document.getElementById('filter-contrast').value;

            // Manual Cover Logic (Fix for html2canvas)
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
            img.style.filter = `brightness(${bright}) contrast(${contrast})`;
        },

        setupDragAndDrop: function () {
            const container = document.getElementById('cover-area-container');

            const startDrag = (e) => {
                if (document.getElementById('preview-cover-img').style.display === 'none') return;
                e.preventDefault();

                App.state.isDragging = true;

                const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

                App.state.dragStartX = clientX;
                App.state.dragStartY = clientY;

                App.state.initialImgX = parseFloat(document.getElementById('img-pos-x-range').value) || 0;
                App.state.initialImgY = parseFloat(document.getElementById('img-pos-y-range').value) || 0;

                container.style.cursor = 'grabbing';
            };

            const doDrag = (e) => {
                if (!App.state.isDragging) return;
                e.preventDefault();

                const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

                const deltaX = clientX - App.state.dragStartX;
                const deltaY = clientY - App.state.dragStartY;

                const scale = parseFloat(document.getElementById('img-scale-range').value) || 1;
                const factor = 0.5 / scale;

                const newX = App.state.initialImgX + (deltaX * factor);
                const newY = App.state.initialImgY + (deltaY * factor);

                // Update controls (sliders and numbers)
                const updateControl = (id, val) => {
                    document.getElementById(id + '-range').value = val;
                    document.getElementById(id + '-num').value = Math.round(val);
                }
                updateControl('img-pos-x', newX);
                updateControl('img-pos-y', newY);

                App.handlers.updateImgStyle();
            };

            const stopDrag = () => {
                if (App.state.isDragging) {
                    App.state.isDragging = false;
                    container.style.cursor = 'grab';
                    App.storage.save();
                }
            };

            container.addEventListener('mousedown', startDrag);
            window.addEventListener('mousemove', doDrag);
            window.addEventListener('mouseup', stopDrag);

            container.addEventListener('touchstart', startDrag);
            window.addEventListener('touchmove', doDrag);
            window.addEventListener('touchend', stopDrag);
        }
    },

    // --- UI Helpers ---
    ui: {
        generateColorPicker: function () {
            const container = document.getElementById('color-picker');
            if (!container) return;
            container.innerHTML = '';
            App.config.colors.forEach(color => {
                const dot = document.createElement('div');
                dot.className = 'color-dot';
                dot.style.backgroundColor = color;
                dot.onclick = () => App.handlers.setColor(color);
                container.appendChild(dot);
            });
        },

        toggleMobileMenu: function () {
            const panel = document.getElementById('editor-panel');
            if (panel) panel.classList.toggle('open');
        },

        updatePreviewZoom: function () {
            const val = document.getElementById('preview-zoom') ? document.getElementById('preview-zoom').value : 0.55;
            const wrapper = document.getElementById('zoom-wrapper');
            if (wrapper) wrapper.style.transform = `scale(${val})`;
        },

        toggleSafeZone: function () {
            const isChecked = document.getElementById('toggle-safe-zone').checked;
            const zone = document.getElementById('safe-zone');
            if (isChecked) zone.classList.add('visible');
            else zone.classList.remove('visible');
        },

        refreshAllInputs: function () {
            const d = App.state.data;
            const set = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.value = val;
            };
            const setRange = (baseId, val) => {
                set(baseId + '-range', val);
                set(baseId + '-num', val);
            };

            set('input-titulo', d.titulo);
            set('input-tag', d.tag);
            set('input-data', d.data);
            set('input-format', d.format);
            set('input-layout', d.layout);

            setRange('font-size', d.fontSize);
            setRange('img-scale', d.imgScale);
            setRange('img-pos-x', d.imgPosX);
            setRange('img-pos-y', d.imgPosY);
            setRange('img-overlay', d.overlayOpacity);

            set('filter-brightness', d.brightness || 1);
            set('filter-contrast', d.contrast || 1);

            const checkCourse = document.getElementById('toggle-course-chip');
            if (checkCourse) checkCourse.checked = d.courseChipVisible;
            set('input-course-chip', d.courseChipText);

            App.handlers.setColor(d.primaryColor);
            App.handlers.changeFormat();
            App.handlers.changeLayout();
            App.handlers.updateFontSize();
            App.handlers.updateOverlay();
            App.handlers.toggleCourseChip();
            App.handlers.updateCourseChip();
            App.handlers.handleInput(document.getElementById('input-titulo'), 120, 'count-titulo');

            if (document.getElementById('preview-cover-img').src) {
                document.getElementById('img-controls').style.display = 'block';
                App.handlers.updateImgStyle();
            }
        },

        showToast: function (msg) {
            const toast = document.getElementById("toast");
            if (toast) {
                toast.innerText = msg;
                toast.classList.add("show");
                setTimeout(() => { toast.classList.remove("show"); }, 3000);
            }
        },

        toggleLoading: function (show) {
            const overlay = document.getElementById('loading-overlay');
            if (overlay) {
                if (show) overlay.classList.add('visible');
                else overlay.classList.remove('visible');
            }
        }
    },

    // --- Export Logic ---
    export: {
        prepareCapture: function () {
            const element = document.getElementById("capture");
            const wrapper = document.getElementById('zoom-wrapper');
            const zone = document.getElementById('safe-zone');

            const originalTransform = wrapper.style.transform;
            const wasZoneVisible = zone.classList.contains('visible');

            wrapper.style.transform = "none";
            zone.classList.remove('visible');

            App.handlers.updateImgStyle();

            const scale = document.getElementById('export-scale').value || 2;

            return html2canvas(element, {
                scale: scale,
                useCORS: true,
                backgroundColor: "#ffffff",
                allowTaint: true,
                logging: false
            }).then(canvas => {
                wrapper.style.transform = originalTransform;
                if (wasZoneVisible) zone.classList.add('visible');
                return canvas;
            });
        },

        downloadImage: function () {
            App.ui.toggleLoading(true);
            setTimeout(() => {
                App.export.prepareCapture().then(canvas => {
                    const format = document.getElementById('export-format').value;
                    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';

                    const link = document.createElement("a");
                    link.download = `post-fatec-${Date.now()}.${format}`;
                    link.href = canvas.toDataURL(mimeType, 0.9);
                    link.click();

                    App.ui.toggleLoading(false);
                    App.ui.showToast("Imagem baixada!");
                }).catch(err => {
                    console.error(err);
                    App.ui.toggleLoading(false);
                    alert("Erro ao gerar imagem.");
                });
            }, 100);
        },

        copyImage: function () {
            App.ui.toggleLoading(true);
            setTimeout(() => {
                App.export.prepareCapture().then(canvas => {
                    canvas.toBlob(blob => {
                        if (navigator.clipboard && navigator.clipboard.write) {
                            navigator.clipboard.write([
                                new ClipboardItem({ 'image/png': blob })
                            ]).then(() => {
                                App.ui.toggleLoading(false);
                                App.ui.showToast("Copiado para a área de transferência!");
                            }).catch(err => {
                                console.error(err);
                                App.ui.toggleLoading(false);
                                App.ui.showToast("Erro ao copiar.");
                            });
                        } else {
                            App.ui.toggleLoading(false);
                            App.ui.showToast("Navegador não suporta cópia.");
                        }
                    });
                });
            }, 100);
        }
    },

    // --- Utilities ---
    utils: {
        syncAndExec: function (sourceId, targetId, callback) {
            const source = document.getElementById(sourceId);
            const target = document.getElementById(targetId);
            if (source && target) target.value = source.value;
            if (callback && typeof callback === 'function') callback();
            App.storage.save();
        },

        rgbToHex: function (rgb) {
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
    }
};

// Start the App
window.onload = function () {
    App.init();
};