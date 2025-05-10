import './styles.css'
import './script.js'

document.querySelector('#app').innerHTML = `
    <main class="app-container gap-24">
        <section class="flex flex-column gap-24">
            <section class="card card-elevation flex flex-column gap-16">
                <div class="card-body">
                    <div class="form-group">
                        <label for="base-size">Base font size (px)</label>
                        <div class="base-size-control">
                            <button class="btn-icon" id="decrease-base" aria-label="Diminuir tamanho base">-</button>
                            <input type="number" id="base-size" class="form-size-lg" min="8" max="24" value="16">
                            <button class="btn-icon" id="increase-base" aria-label="Aumentar tamanho base">+</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="preview-font">Font family</label>
                        <select id="preview-font" class="form-size-lg">
                            <option value="Inter" selected>Inter</option>
                            <option value="Roboto">Roboto</option>
                            <option value="Open Sans">Open Sans</option>
                            <option value="Lato">Lato</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Poppins">Poppins</option>
                            <option value="Raleway">Raleway</option>
                            <option value="Oswald">Oswald</option>
                            <option value="Source Sans Pro">Source Sans Pro</option>
                            <option value="Playfair Display">Playfair Display</option>
                            <option value="Merriweather">Merriweather</option>
                            <option value="Nunito">Nunito</option>
                            <option value="Roboto Condensed">Roboto Condensed</option>
                            <option value="Ubuntu">Ubuntu</option>
                            <option value="Roboto Mono">Roboto Mono</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="scale-ratio">Ratio</label>
                        <select id="scale-ratio" class="form-size-lg">
                            <option value="1.067">Minor Second (1.067)</option>
                            <option value="1.125">Major Second (1.125)</option>
                            <option value="1.2">Minor Third (1.2)</option>
                            <option value="1.25" selected>Major Third (1.25)</option>
                            <option value="1.333">Perfect Fourth (1.333)</option>
                            <option value="1.414">Augmented Fourth (1.414)</option>
                            <option value="1.5">Perfect Fifth (1.5)</option>
                            <option value="1.618">Golden Ratio (1.618)</option>
                            <option value="1.667">Major Sixth (1.667)</option>
                            <option value="1.778">Minor Seventh (1.778)</option>
                            <option value="1.875">Major Seventh (1.875)</option>
                            <option value="2">Octave (2)</option>
                        </select>
                    </div>
                    <div class="flex" style="justify-content: space-between; gap: 16px;">
                        <div class="form-group flex-1">
                            <label>Escalas Abaixo</label>
                            <div class="adjuster-controls">
                                <button class="btn-icon" id="remove-below" aria-label="Remover escala abaixo">-</button>
                                <span id="below-count" class="flex-1">1</span>
                                <button class="btn-icon" id="add-below" aria-label="Adicionar escala abaixo">+</button>
                            </div>
                        </div>
                        <div class="form-group flex-1">
                            <label>Escalas Acima</label>
                            <div class="adjuster-controls">
                                <button class="btn-icon" id="remove-above" aria-label="Remover escala acima">-</button>
                                <span id="above-count" class="flex-1">6</span>
                                <button class="btn-icon" id="add-above" aria-label="Adicionar escala acima">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="card card-elevation">
                <div class="card-body">
                    <div class="tabs">
                        <div class="tab-buttons">
                            <button class="tab-button active" data-tab="css">CSS</button>
                            <button class="tab-button" data-tab="css-vars">CSS Variables</button>
                            <button class="tab-button" data-tab="sass">Sass Variables</button>
                        </div>
                        <div class="tab-pane active" id="css-tab">
                            <button class="copy-button" data-target="css-code">Copiar</button>
                            <pre id="css-code" class="code-block">/* Código CSS será gerado aqui */</pre>
                        </div>
                        <div class="tab-pane" id="css-vars-tab">
                            <button class="copy-button" data-target="css-vars-code">Copiar</button>
                            <pre id="css-vars-code" class="code-block">/* Código CSS Variables será gerado aqui */</pre>
                        </div>
                        <div class="tab-pane" id="sass-tab">
                            <button class="copy-button" data-target="sass-code">Copiar</button>
                            <pre id="sass-code" class="code-block">/* Código Sass Variables será gerado aqui */</pre>
                        </div>
                    </div>
                </div>
            </section>
        </section>
        <section id="scale-preview" class="scale-preview"></section>
    </main>
`