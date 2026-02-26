
$(function () {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  ScrollTrigger.normalizeScroll(false);

  // create the smooth scroller FIRST!
  let smoother = ScrollSmoother.create({
    smooth: 2,
    effects: true,
  });

  var scrollDuration = 3;
  var scrollEase = 'power3.inOut';

  // Scroll fluide vers la section #apropos
  function scrollToApropos() {
    var el = document.getElementById('apropos');
    if (el && smoother) {
      var targetOffset = smoother.offset('#apropos', 'top top');
      if (typeof targetOffset === 'number' && !isNaN(targetOffset)) {
        gsap.to(smoother, {
          scrollTop: targetOffset,
          duration: scrollDuration,
          ease: scrollEase
        });
      } else {
        smoother.scrollTo('#apropos', true, 'top top');
      }
    }
  }

  // Scroll fluide vers la section #accueil (haut de page)
  function scrollToAccueil() {
    if (smoother) {
      gsap.to(smoother, {
        scrollTop: 0,
        duration: scrollDuration,
        ease: scrollEase
      });
    }
  }

  // Au chargement : si l'URL contient #apropos, scroller après le preloader
  if (window.location.hash === '#apropos') {
    $(window).on('load', function() {
      setTimeout(scrollToApropos, 3500);
    });
  }

  // Clic sur A propos : scroll fluide sans rechargement (même page)
  $(document).on('click', 'a[href*="#apropos"], a[href*="index.html#apropos"]', function(e) {
    if (document.getElementById('apropos')) {
      e.preventDefault();
      history.replaceState(null, null, 'index.html#apropos');
      scrollToApropos();
    }
  });

  // Clic sur Accueil : scroll fluide vers le haut sans rechargement (même page)
  $(document).on('click', 'a[href*="#accueil"], a[href*="index.html#accueil"], a[href="index.html"]', function(e) {
    if (document.getElementById('accueil') || document.getElementById('apropos')) {
      e.preventDefault();
      history.replaceState(null, null, 'index.html');
      scrollToAccueil();
    }
  });

});