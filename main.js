function mudarHumor(classeTema, corHex, urlFoto, tituloText, textoDesc) {
            const container = document.getElementById('conceito4');
            const titulo = document.getElementById('ds-titulo');
            const foto = document.getElementById('ds-foto');
            const texto = document.getElementById('ds-texto');
            
            // Limpa classes anteriores
            container.className = '';
            // Adiciona nova classe de cor de fundo
            container.classList.add('theme-' + classeTema);
            
            // Altera conteúdos dinâmicos
            titulo.style.color = corHex;
            titulo.innerText = tituloText;
            foto.src = urlFoto;
            texto.innerText = textoDesc;
        }