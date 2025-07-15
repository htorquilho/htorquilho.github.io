(function($) {

	// Declaração de variáveis principais
	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Ativar ou não o efeito de paralaxe no fundo
			parallax: true,

			// Intensidade da paralaxe (quanto menor o valor, mais forte o efeito)
			parallaxFactor: 20
		};

	// Definição dos breakpoints para responsividade
	breakpoints({
		xlarge:  [ '1281px',  '1800px' ],
		large:   [ '981px',   '1280px' ],
		medium:  [ '737px',   '980px'  ],
		small:   [ '481px',   '736px'  ],
		xsmall:  [ null,      '480px'  ],
	});

	// Remove a classe 'is-preload' após o carregamento da página
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Verifica se é um dispositivo móvel
	if (browser.mobile) {

		// Adiciona classe indicando modo touch
		$body.addClass('is-touch');

		// Corrige altura (principalmente no iOS)
		window.setTimeout(function() {
			$window.scrollTop($window.scrollTop() + 1);
		}, 0);
	}

	// Move o footer para depois do main em telas médias ou menores
	breakpoints.on('<=medium', function() {
		$footer.insertAfter($main);
	});

	// Em telas maiores, move o footer para dentro do header
	breakpoints.on('>medium', function() {
		$footer.appendTo($header);
	});

	// ---------------------------------------
	// Parallax no fundo do header
	// ---------------------------------------

	// Desativa a paralaxe no IE e em dispositivos móveis (melhora desempenho)
	if (browser.name == 'ie' || browser.mobile)
		settings.parallax = false;

	// Se a paralaxe estiver ativada...
	if (settings.parallax) {

		// Desativa a paralaxe em telas médias ou menores
		breakpoints.on('<=medium', function() {
			$window.off('scroll.strata_parallax');
			$header.css('background-position', '');
		});

		// Ativa a paralaxe em telas grandes
		breakpoints.on('>medium', function() {

			// Define posição inicial
			$header.css('background-position', 'left 0px');

			// Altera a posição do background conforme o scroll
			$window.on('scroll.strata_parallax', function() {
				$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
			});
		});

		// Força o evento scroll ao carregar a página
		$window.on('load', function() {
			$window.triggerHandler('scroll');
		});
	}

	// ---------------------------------------
	// Galeria Lightbox (com Poptrox) - DESATIVADA
	// ---------------------------------------

	$window.on('load', function() {

		// A galeria foi comentada, mas pode ser ativada se necessário
		/*
		$('#two').poptrox({
			caption: function($a) { return $a.next('h3').text(); },
			overlayColor: '#2c2c2c',
			overlayOpacity: 0.85,
			popupCloserText: '',
			popupLoaderText: '',
			selector: '.work-item a.image',
			usePopupCaption: true,
			usePopupDefaultStyling: false,
			usePopupEasyClose: false,
			usePopupNav: true,
			windowMargin: (breakpoints.active('<=small') ? 0 : 50)
		});
		*/
	});

})(jQuery);
