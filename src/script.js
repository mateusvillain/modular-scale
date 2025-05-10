document.addEventListener("DOMContentLoaded", () => {
  // Elementos do DOM
  const baseSizeInput = document.getElementById("base-size")
  const decreaseBaseBtn = document.getElementById("decrease-base")
  const increaseBaseBtn = document.getElementById("increase-base")
  const scaleRatioSelect = document.getElementById("scale-ratio")
  const previewFontSelect = document.getElementById("preview-font")
  const scalePreviewContainer = document.getElementById("scale-preview")
  const cssCodeBlock = document.getElementById("css-code")
  const cssVarsCodeBlock = document.getElementById("css-vars-code")
  const sassCodeBlock = document.getElementById("sass-code")
  const addBelowBtn = document.getElementById("add-below")
  const removeBelowBtn = document.getElementById("remove-below")
  const addAboveBtn = document.getElementById("add-above")
  const removeAboveBtn = document.getElementById("remove-above")
  const belowCountSpan = document.getElementById("below-count")
  const aboveCountSpan = document.getElementById("above-count")
  const tabButtons = document.querySelectorAll(".tab-button")
  const copyButtons = document.querySelectorAll(".copy-button")

  // Estado da aplicação
  const state = {
    baseSize: 16,
    ratio: 1.25,
    scaleCount: {
      below: 1,
      above: 6,
    },
    selectedFont: "Inter",
    fontLoaded: false,
  }

  // Inicializar a aplicação
  init()

  // Função de inicialização
  function init() {
    // Carregar fontes do Google
    loadGoogleFonts()

    // Configurar event listeners
    setupEventListeners()

    // Renderizar a escala inicial
    updateUI()
  }

  // Carregar fontes do Google
  function loadGoogleFonts() {
    const fonts = [
      "Inter",
      "Roboto",
      "Open Sans",
      "Lato",
      "Montserrat",
      "Poppins",
      "Raleway",
      "Oswald",
      "Source Sans Pro",
      "Playfair Display",
      "Merriweather",
      "Nunito",
      "Roboto Condensed",
      "Ubuntu",
      "Roboto Mono",
    ]

    const link = document.createElement("link")
    link.href = `https://fonts.googleapis.com/css2?family=${fonts.map((font) => font.replace(/ /g, "+")).join("&family=")}&display=swap`
    link.rel = "stylesheet"
    document.head.appendChild(link)

    link.onload = () => {
      state.fontLoaded = true
      updateUI()
    }
  }

  // Configurar event listeners
  function setupEventListeners() {
    // Botões de tamanho base
    decreaseBaseBtn.addEventListener("click", () => {
      if (state.baseSize > 8) {
        state.baseSize--
        baseSizeInput.value = state.baseSize
        updateUI()
      }
    })

    increaseBaseBtn.addEventListener("click", () => {
      if (state.baseSize < 24) {
        state.baseSize++
        baseSizeInput.value = state.baseSize
        updateUI()
      }
    })

    // Inputs e selects
    baseSizeInput.addEventListener("input", () => {
      state.baseSize = Number.parseFloat(baseSizeInput.value) || 16
      updateUI()
    })

    scaleRatioSelect.addEventListener("change", () => {
      state.ratio = Number.parseFloat(scaleRatioSelect.value)
      updateUI()
    })

    previewFontSelect.addEventListener("change", () => {
      state.selectedFont = previewFontSelect.value
      updateUI()
    })

    // Botões de ajuste de escala
    addBelowBtn.addEventListener("click", () => {
      state.scaleCount.below++
      updateUI()
    })

    removeBelowBtn.addEventListener("click", () => {
      if (state.scaleCount.below > 1) {
        state.scaleCount.below--
        updateUI()
      }
    })

    addAboveBtn.addEventListener("click", () => {
      state.scaleCount.above++
      updateUI()
    })

    removeAboveBtn.addEventListener("click", () => {
      if (state.scaleCount.above > 1) {
        state.scaleCount.above--
        updateUI()
      }
    })

    // Tabs
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")

        const tabId = button.dataset.tab
        document.querySelectorAll(".tab-pane").forEach((pane) => {
          pane.classList.remove("active")
        })
        document.getElementById(`${tabId}-tab`).classList.add("active")
      })
    })

    // Botões de cópia
    copyButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.dataset.target
        const codeBlock = document.getElementById(targetId)

        navigator.clipboard
          .writeText(codeBlock.textContent)
          .then(() => {
            button.classList.add("copied")
            button.innerHTML = `
              Copiado
            `

            setTimeout(() => {
              button.classList.remove("copied")
              button.innerHTML = `
                Copiar
              `
            }, 2000)
          })
          .catch((err) => {
            console.error("Erro ao copiar texto: ", err)
          })
      })
    })
  }

  // Atualizar a interface do usuário
  function updateUI() {
    // Atualizar contadores
    belowCountSpan.textContent = state.scaleCount.below
    aboveCountSpan.textContent = state.scaleCount.above

    // Habilitar/desabilitar botões
    removeBelowBtn.disabled = state.scaleCount.below <= 1
    removeAboveBtn.disabled = state.scaleCount.above <= 1

    // Calcular e renderizar a escala
    const scales = calculateScales()
    renderScalePreview(scales)

    // Gerar e exibir o código
    cssCodeBlock.textContent = generateCSS(scales)
    cssVarsCodeBlock.textContent = generateCSSVars(scales)
    sassCodeBlock.textContent = generateSass(scales)
  }

  // Calcular as escalas
  function calculateScales() {
    const scales = []

    // Abaixo da base
    for (let i = state.scaleCount.below; i > 0; i--) {
      const value = state.baseSize / Math.pow(state.ratio, i)
      scales.push({
        level: -i,
        px: value,
        rem: value / 16,
        pt: value * 0.75,
      })
    }

    // Base
    scales.push({
      level: 0,
      px: state.baseSize,
      rem: state.baseSize / 16,
      pt: state.baseSize * 0.75,
    })

    // Acima da base
    for (let i = 1; i <= state.scaleCount.above; i++) {
      const value = state.baseSize * Math.pow(state.ratio, i)
      scales.push({
        level: i,
        px: value,
        rem: value / 16,
        pt: value * 0.75,
      })
    }

    return scales
  }

  // Renderizar a visualização da escala
  function renderScalePreview(scales) {
    scalePreviewContainer.innerHTML = ""

    // Ordenar as escalas pelo tamanho da fonte (px), do maior para o menor
    const sortedScales = [...scales].sort((a, b) => b.px - a.px)

    sortedScales.forEach((scale) => {
      const scaleItem = document.createElement("div")
      scaleItem.className = `scale-item ${scale.level === 0 ? "base" : ""}`

      const previewText = document.createElement("div")
      previewText.className = "scale-preview-text"
      previewText.style.fontFamily = state.selectedFont
      previewText.style.fontSize = `${scale.px}px`
      previewText.textContent = "Aa"

      const scaleDetails = document.createElement("div")
      scaleDetails.className = "scale-details"

      const levelDetail = document.createElement("div")
      levelDetail.className = "scale-detail"
      levelDetail.textContent = scale.level === 0 ? "Base" : scale.level > 0 ? `+${scale.level}` : `${scale.level}`

      const pxDetail = document.createElement("div")
      pxDetail.className = "scale-detail"
      pxDetail.textContent = `${scale.px.toFixed(2)}px`

      const remDetail = document.createElement("div")
      remDetail.className = "scale-detail"
      remDetail.textContent = `${scale.rem.toFixed(3)}rem`

      const ptDetail = document.createElement("div")
      ptDetail.className = "scale-detail"
      ptDetail.textContent = `${scale.pt.toFixed(2)}pt`

      scaleDetails.appendChild(levelDetail)
      scaleDetails.appendChild(pxDetail)
      scaleDetails.appendChild(remDetail)
      scaleDetails.appendChild(ptDetail)

      scaleItem.appendChild(previewText)
      scaleItem.appendChild(scaleDetails)

      scalePreviewContainer.appendChild(scaleItem)
    })
  }

  // Gerar código CSS
  function generateCSS(scales) {
    return scales
      .map(
        (scale) =>
          `.scale-${scale.level >= 0 ? "plus" : "minus"}-${Math.abs(scale.level)} { font-size: ${scale.px.toFixed(2)}px; /* ${scale.rem.toFixed(3)}rem */ }`,
      )
      .join("\n\n")
  }

  // Gerar CSS Variables
  function generateCSSVars(scales) {
    const vars = scales
      .map(
        (scale) =>
          `  --scale-${scale.level >= 0 ? "plus" : "minus"}-${Math.abs(scale.level)}: ${scale.px.toFixed(2)}px; /* ${scale.rem.toFixed(3)}rem */`,
      )
      .join("\n")

    return `:root {\n${vars}\n}`
  }

  // Gerar Sass Variables
  function generateSass(scales) {
    return scales
      .map(
        (scale) =>
          `$scale-${scale.level >= 0 ? "plus" : "minus"}-${Math.abs(scale.level)}: ${scale.px.toFixed(2)}px; // ${scale.rem.toFixed(3)}rem`,
      )
      .join("\n")
  }
})
