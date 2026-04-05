// Menu link appending
$(window).ready(linkIndex);
document.addEventListener("shopify:section:load", linkIndex);

function linkIndex(){
  var nav_link_child = $("#link-navbar-append-holder > .ic-nav-link");
  var block_link_child = $("#block-navbar-append-holder > .ic-block-link");

  nav_link_child.each(function () {
    $(this).attr("data-index", $(this).index());
  });

  block_link_child.each(function () {
    $(this).attr("data-index", $(this).index());
  });
}


$(window).ready(link_append);
$(window).resize(link_append);
document.addEventListener("shopify:section:load", link_append);

function link_append() {
  var link_navbar = $("#link-navbar-append-holder").hasClass("ic-append-md");
  var top_navbar = $("#top-navbar-append-holder").hasClass("ic-append-md");
  var block_navbar = $("#block-navbar-append-holder").hasClass("ic-append-md");
  var nav_link = $("#link-navbar-append-holder > .ic-nav-link:not(.ic-ex-link-md)");
  var top_link = $("#top-navbar-append-holder > .ic-top-link:not(.ic-ex-link-md)");
  var block_link = $("#block-navbar-append-holder > .ic-block-link:not(.ic-ex-link-md)");
  if (window.matchMedia('(max-width: 1023px)').matches && link_navbar == true) {
    nav_link.appendTo("#link-sidebar-append-holder");
  }
  else {
    $("#link-sidebar-append-holder > .ic-nav-link").appendTo("#link-navbar-append-holder");

    var $link_wrapper = $('#link-navbar-append-holder');

    $link_wrapper.children('.ic-nav-link').sort(function (a, b) {
      return +a.dataset.index - +b.dataset.index;
    })
      .appendTo($link_wrapper);
  }

  if (window.matchMedia('(max-width: 1023px)').matches && top_navbar == true) {
    top_link.appendTo("#top-sidebar-append-holder");

    var $top_side_wrapper = $('#top-sidebar-append-holder');

    $top_side_wrapper.children('.ic-top-link').sort(function (a, b) {
      return +b.dataset.index - +a.dataset.index;
    })
      .appendTo($top_side_wrapper);
  }
  else {
    $("#top-sidebar-append-holder > .ic-top-link").appendTo("#top-navbar-append-holder");

    var $top_wrapper = $('#top-navbar-append-holder');

    $top_wrapper.children('.ic-top-link').sort(function (a, b) {
      return +a.dataset.index - +b.dataset.index;
    })
      .appendTo($top_wrapper);
  }

  if (window.matchMedia('(max-width: 1023px)').matches && block_navbar == true) {
    block_link.appendTo("#block-sidebar-append-holder");
  }
  else {
    $("#block-sidebar-append-holder > .ic-block-link").appendTo("#block-navbar-append-holder");

    var $block_wrapper = $('#block-navbar-append-holder');

    $block_wrapper.children('.ic-block-link').sort(function (a, b) {
      return +a.dataset.index - +b.dataset.index;
    })
      .appendTo($block_wrapper);
  }

  if (window.matchMedia('(max-width: 1023px)').matches) {

    $('.ic-block-link').removeAttr('x-link');
    $('.account-link').removeAttr('x-account');
    $('.login-link').removeAttr('x-login');
  }
}

// Dropdown
$(function () {
  $('.ic-dropdown-toggle').click(function () {
    $(this).next('.ic-dropdown-menu').slideToggle();
  });
  $(document).click(function (e) {
    var target = e.target;
    if (!$(target).is('.ic-dropdown-toggle') && !$(target).parents().is('.ic-dropdown-toggle')) { $('.ic-dropdown-menu').slideUp(); }
  });
});

// Menu toggle 
window.addEventListener("DOMContentLoaded", menuToggle);
document.addEventListener("shopify:section:load", menuToggle);
function menuToggle() {
  $('body').removeClass("menu-overlay");
  $('.ic-breadcrumb').click(function (event) {
    event.stopPropagation();
    $('.ic-mobile-sidebar').toggle();
    $('.ic-breadcrumb').attr('aria-expanded', "true");
    $('.ic-mobile-sidebar-header .ic-close-icon').attr('aria-expanded', "true");
    $('.menu-close-overlay').attr('aria-expanded', "true");
    $('body').addClass("menu-overlay");

  });
  $('.ic-mobile-sidebar-header .ic-close-icon').click(function (event) {
    event.stopPropagation();
    $('.ic-mobile-sidebar').toggle();
    $('.ic-breadcrumb').attr('aria-expanded', "false");
    $('.ic-mobile-sidebar-header .ic-close-icon').attr('aria-expanded', "false");
    $('.menu-close-overlay').attr('aria-expanded', "false");
    $('body').removeClass("menu-overlay");
  });
  $('.menu-close-overlay').click(function (event) {
    event.stopPropagation();
    $('.ic-mobile-sidebar').toggle();
    $('.ic-breadcrumb').attr('aria-expanded', "false");
    $('.ic-mobile-sidebar-header .ic-close-icon').attr('aria-expanded', "false");
    $('.menu-close-overlay').attr('aria-expanded', "false");
    $('body').removeClass("menu-overlay");
  });
  const scrollY = $('body').css("top");

};

// Preventing footer to move up from bottom of screen

$(window).on("DOMContentLoaded resize", handleStickyHeader);
$(window).on("DOMContentLoaded resize", main_height);
// $(document).ready(main_height);

// iOS Safari detection
var isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Header scroll state - moved outside main_height to persist across resize events
var headerScrollState = {
  lastScrollTop: 0,
  headerScrollTop: 0,
  scheduledAnimationFrame: false,
  scrollHandler: null,
  initialized: false,
  lastUpdateTime: 0
};

function main_height() {
  var header_group_height = $('.header-group').length ? $('.header-group').height() : 0;
  var footer_group_height = $('.footer-group').length ? $('.footer-group').height() : 0;
  var breadcrumb_height_val = $('#breadcrumbs').length ? $('#breadcrumbs').height() : 0;
  var inner_header_height = $('.ic-header').length ? $('.ic-header').outerHeight() : 0;
  var header_height = $('.transparent-header').length ? $('.transparent-header').outerHeight() : 0;
  var header_top_bar_height = $('.transparent-header .header-top-bar').length ? $('.transparent-header .header-top-bar').outerHeight() : 0;
  var viewport_height = $(window).height();
  if (breadcrumb_height_val) {
    var breadcrumb_height = breadcrumb_height_val;
  } else {
    var breadcrumb_height = 0;
  }

  var topAnnouncementHeight = 0;
  $('.header-group > *:not(.skip-link)').each(function() {
    if ($(this).is('header')) {
      return false;
    }
    var announcementHeight = $(this).outerHeight();
    topAnnouncementHeight += announcementHeight;
  });
  var bottomAnnouncementHeight = 0;
  var isBtAnnouncement = false;
  $('.header-group > *:not(div):not(.skip-link)').each(function() {
    if(isBtAnnouncement){
      var btannouncementHeight = $(this).outerHeight();
      bottomAnnouncementHeight += btannouncementHeight;
    }
    if ($(this).is('header')) {
      isBtAnnouncement = true;
    }
  });
  $('body').css('--header-group', header_group_height + 'px');
  $('body').css('--header-top', topAnnouncementHeight + 'px');
  $('body').css('--header-top-bar-height', header_top_bar_height + 'px');
  $('body').css('--inner-header-height', inner_header_height + 'px');
  $('body').css('--header-height', header_height + 'px');
  $('body').css('--header-bottom', bottomAnnouncementHeight + 'px');

  var min_height = viewport_height - header_group_height - footer_group_height - breadcrumb_height + 'px'

  $('#MainContent').css('min-height', min_height);
  $('.fill-screen-height').css('--main-height', min_height);
  $('.footer-group').removeAttr('x-footer');
  
  const headerTopHeight = $('.header-top-bar').length ? $('.header-top-bar').outerHeight() : 0;
  const maxHideDistance = topAnnouncementHeight + headerTopHeight;

  // Store values for scroll handler to access
  window.headerScrollConfig = {
    topAnnouncementHeight: topAnnouncementHeight,
    headerTopHeight: headerTopHeight,
    maxHideDistance: maxHideDistance
  };

  // Initialize header position only on first load, not on resize
  if (!headerScrollState.initialized) {
    const initialScroll = $(window).scrollTop();
    if(initialScroll > maxHideDistance){
      headerScrollState.headerScrollTop = -headerTopHeight;
    } else {
      headerScrollState.headerScrollTop = topAnnouncementHeight - Math.min(initialScroll, maxHideDistance);
    }
    headerScrollState.lastScrollTop = initialScroll;
    $('body').css('--fixed-header-top', Math.round(headerScrollState.headerScrollTop) + 'px');
  }
  
  // Update header position with current value
  function updateHeaderPosition() {
    $('body').css('--fixed-header-top', Math.round(headerScrollState.headerScrollTop) + 'px');
    headerScrollState.scheduledAnimationFrame = false;
    headerScrollState.lastUpdateTime = Date.now();
  }
  
  // Only set up scroll handler once
  if (!headerScrollState.initialized) {
    // Scroll threshold - higher on iOS to prevent jitter from address bar
    var scrollThreshold = isIOSSafari ? 3 : 1;
    var minUpdateInterval = isIOSSafari ? 16 : 0; // ~60fps cap on iOS
    
    headerScrollState.scrollHandler = function() {
      var config = window.headerScrollConfig;
      if (!config) return;
      
      var currentScrollTop = $(window).scrollTop();
      var scrollDelta = currentScrollTop - headerScrollState.lastScrollTop;
      
      // Ignore very small scroll movements to prevent jitter on mobile
      // Use higher threshold on iOS Safari
      if (Math.abs(scrollDelta) < scrollThreshold) {
        return;
      }
      
      // Rate limit updates on iOS to prevent rapid firing
      if (isIOSSafari && (Date.now() - headerScrollState.lastUpdateTime) < minUpdateInterval) {
        return;
      }
      
      // Ignore unrealistic scroll deltas (iOS Safari address bar artifact)
      if (Math.abs(scrollDelta) > 100 && isIOSSafari) {
        headerScrollState.lastScrollTop = currentScrollTop;
        return;
      }
      
      var newHeaderScrollTop;
      
      // Calculate new header position based on scroll position
      if (currentScrollTop <= 0) {
        // At top of page - show everything
        newHeaderScrollTop = config.topAnnouncementHeight;
      } else if (currentScrollTop < config.maxHideDistance) {
        // Scrolling within the announcement/topbar area
        // Use the expected position for this scroll level
        var expectedPosition = config.topAnnouncementHeight - currentScrollTop;
        
        if (scrollDelta < 0) {
          // Scrolling UP - smoothly approach expected position, don't jump
          // Take the maximum of current position moved by delta, or expected position
          var deltaBasedPosition = Math.min(config.topAnnouncementHeight, headerScrollState.headerScrollTop - scrollDelta);
          newHeaderScrollTop = Math.max(expectedPosition, deltaBasedPosition);
        } else {
          // Scrolling DOWN - use direct positioning
          newHeaderScrollTop = expectedPosition;
        }
      } else {
        // Scrolled past the topbar area - use smooth delta-based movement
        if (scrollDelta > 0) {
          // Scrolling down - hide header
          newHeaderScrollTop = Math.max(-config.headerTopHeight, headerScrollState.headerScrollTop - scrollDelta);
        } else {
          // Scrolling up - show header
          newHeaderScrollTop = Math.min(0, headerScrollState.headerScrollTop - scrollDelta);
        }
      }
      
      // Only update if there's a meaningful change
      var changeThreshold = isIOSSafari ? 2 : 0.5;
      if (Math.abs(newHeaderScrollTop - headerScrollState.headerScrollTop) >= changeThreshold) {
        headerScrollState.headerScrollTop = newHeaderScrollTop;
        headerScrollState.lastScrollTop = currentScrollTop;
        
        // Use RAF only when not already scheduled
        if (!headerScrollState.scheduledAnimationFrame) {
          headerScrollState.scheduledAnimationFrame = true;
          requestAnimationFrame(updateHeaderPosition);
        }
      } else {
        headerScrollState.lastScrollTop = currentScrollTop;
      }
    };
    
    // Use passive event listener for better mobile scroll performance
    window.addEventListener('scroll', headerScrollState.scrollHandler, { passive: true });
    headerScrollState.initialized = true;
  }

  
  let footerContactForm = $('#footerContactForm');
  let passwordContactForm = $('#passwordContactForm');
  
  $(document).ready(function() {
      if (window.location.hash === '#footerContactForm') {
          $('html, body').scrollTop(footerContactForm.offset().top);
      }
      if (window.location.hash === '#passwordContactForm') {
          $('html, body').scrollTop(passwordContactForm.offset().top);
      }
      let newsLetterFormArr = document.querySelectorAll('.newsletter-wrapper form');
      newsLetterFormArr.forEach(function(newsLetterForm) {
        let formID = '#' + newsLetterForm.getAttribute('id');
        if (window.location.hash ===  formID) {
          let htmlBody = document.querySelector('html, body');
          let newsLetter = document.querySelector(formID).closest('section');
          let offset = newsLetter.offsetTop - header_group_height;
          htmlBody.scrollTo({
            top: offset
          });
        }
      })
  });

  var scrollHeight = 50 + topAnnouncementHeight;

  $(window).scroll(function() {
    let headerBehavior = $('.fixed-header').data('behavior');
    if(headerBehavior == 'sticky'){
      transparentHeaderScroll();
    }
  }); 
  document.addEventListener('shopify:section:load', function(){
    let headerBehavior = $('.fixed-header').data('behavior');
    if(headerBehavior == 'sticky'){
      transparentHeaderScroll();
    }
  });

  function transparentHeaderScroll() {
    const transparentHeader = $('.transparent-header');
    const slideBgHeader = $('.transparent-header[data-slide-bg]');
    if ($(window).scrollTop() >= scrollHeight) {
      transparentHeader.addClass('scrolled');
      slideBgHeader.children('.content-container').removeClass('text-inherit');
      if (slideBgHeader.find('.bottom-menu-content').length > 0) {
        slideBgHeader.find('.bottom-menu-content').removeClass('text-inherit');
      }
    } else {
      transparentHeader.removeClass('scrolled');
      slideBgHeader.children('.content-container').addClass('text-inherit');
      if (slideBgHeader.find('.bottom-menu-content').length > 0) {
        slideBgHeader.find('.bottom-menu-content').addClass('text-inherit');
      }
    }
  }

}

function handleStickyHeader(){
  let headerBehavior = $('.fixed-header').data('behavior');
  if(headerBehavior == 'normal'){
    $('.section-header').removeClass('fixed-header-section')
  }
}

document.addEventListener('shopify:section:load', function (event) {
  handleStickyHeader();
  main_height();
  sectionAllowTransparent();
  $('footer').removeAttr('x-footer');
});
document.addEventListener('shopify:section:reorder', function (event) {
  handleStickyHeader();
  main_height();
  sectionAllowTransparent();
});

$(window).on("DOMContentLoaded", sectionAllowTransparent);


function sectionAllowTransparent(){
  const defaultHeader = $('.ic-header');
  const transparentHeader = $('.transparent-header');
  const sectionHeader = $('.section-header');
  const headerGroup = $('.header-group');
  if ($('.allow-transparent-header').closest('.shopify-section').is(':first-child')) {
    if(defaultHeader.hasClass('transparent-header')){
      transparentHeader.addClass('section-allow');
      sectionHeader.addClass('transparent-header-section');
      headerGroup.addClass('transparent-header-group');
      $('.allow-transparent-header').closest('.shopify-section:first-child').addClass('section-allow');
    }
  } else {
    transparentHeader.removeClass('section-allow');
    sectionHeader.removeClass('transparent-header-section');
    headerGroup.removeClass('transparent-header-group');
  }
}


// Share button
function shareButton() {
  $('.btn--share').on('click', function () {
    $('.social-sharing-wrapper').toggleClass('opened');
    if ($(this).attr('aria-expanded') == "false") {
      $(this).attr('aria-expanded', "true");
    } else {
      $(this).attr('aria-expanded', "false");
    }
  });
  $(document).mouseup(function (e) {
    if ($(e.target).closest('.social-sharing-wrapper').length === 0) {
      $('.social-sharing-wrapper').removeClass('opened');
      $('.btn--share').attr('aria-expanded', "false");
    }
    if ($(e.target).closest('.selectbox').length === 0) {
      $('.selectbox').removeClass('opened');
      // $('.btn--share').attr('aria-expanded', "false");
    }
  });
}
function LinkCopy() {
  const linkCopyBtnArr =  document.querySelectorAll('.link-copy-button');
  for(let i = 0; i < linkCopyBtnArr.length; i++){
    linkCopyBtnArr[i].addEventListener('click',function(){
      var copyText = linkCopyBtnArr[i].closest('.link-copy').querySelector(".copy-link");
    
      const textToCopy = copyText.innerText;
      const tempInput = document.createElement('input');
      tempInput.value = textToCopy;
      tempInput.style.position = 'absolute';
      tempInput.style.left = '-9999px';
      document.body.appendChild(tempInput);
      tempInput.select();
      document.addEventListener('copy', (event) => {
        event.preventDefault();
        event.clipboardData.setData('text/plain', textToCopy);
      });
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    
      document.querySelector('.copied-message').classList.add('show');
      setTimeout(() => {
        document.querySelector('.copied-message').classList.remove('show');
      }, 2000);
    });
  }
}

window.addEventListener("load", shareButton);
document.addEventListener("shopify:section:load", shareButton);

window.addEventListener("load", LinkCopy);
document.addEventListener("shopify:section:load", LinkCopy);

try {
  var heroSwiper = document.querySelectorAll('.hero-swiper');
  for (var i = 0; i < video_preview_elements.length; i++) {
    slide_show_count = video_preview_elements.length;
  }

} catch (e) { }

class VariantSelector extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }
  onVariantChange() {
    this.addLoader();
    this.getSelectedOptions();
    this.getSelectedVariant();
    this.updateVariant();
    this.updateBuyButton();
    this.updateURL();
    this.updateFormID();
    this.updateProductDetails();
  }
  getSelectedOptions() {
    this.options = Array.from(this.querySelectorAll('input[type="radio"]:checked'), (select) => {
      // If the value was escaped in HTML (e.g. 4&quot;), the .value property 
      // will automatically be the unescaped version (4").
      return select.value;
    });
  }
  getVariantJSON() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
  getSelectedVariant() {
    this.currentVariant = this.getVariantJSON().find((variant) => {
      const findings = !variant.options
        .map((option, index) => {
          // Normalize both values to handle special characters properly
          const selectedOption = this.options[index] ? this.options[index].trim() : '';
          const variantOption = option ? option.trim() : '';
          return selectedOption === variantOption;
        })
        .includes(false);
      if (findings) return variant;
    });
  }
  updateURL() {
    if (!this.currentVariant) return;
    if(this.dataset.urlUpdate == 'true'){
      window.history.replaceState({}, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
    }
  }
  updateFormID() {
    if (!this.currentVariant) return;
    const form_inputs = this.closest('.product-form-wrapper').querySelectorAll('input[name="id"]');
    for (let i = 0; i < form_inputs.length; i++){
      form_inputs[i].value = this.currentVariant.id;
    }
  }
  updateProductDetails() {
    let fetchURL = '';
    if (this.currentVariant) {
      fetchURL = `${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`;
    } else { fetchURL = ''; }
    fetch(fetchURL)
      .then((response) => {
        if (response.ok) { return response.text(); }
        throw new Error('Something went wrong');
      })
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html');
        
        const oldSectionId = this.closest('.product-detail').getAttribute('id');
        const oldSection = this.closest('.product-detail');
        const newSection = html.querySelector(`#${oldSectionId}`);
        
        const id = `price-${this.dataset.section}`;
        const oldPrice = document.getElementById(id);
        if (oldPrice) oldPrice.style.opacity = '1';
        const newPrice = html.getElementById(id);
        if (oldPrice && newPrice) oldPrice.innerHTML = newPrice.innerHTML;

        const buttonId = `buy-${this.dataset.section}`;
        const oldButtons = document.getElementById(buttonId);
        const oldQuantityId = `quantity-${this.dataset.section}`;
        const oldQuantityElement = document.getElementById(oldQuantityId);
        const oldQuantityContainer = oldQuantityElement ? oldQuantityElement.closest('.quantity-container') : null;
        const oldQuantityPlus = oldQuantityContainer ? oldQuantityContainer.querySelector('.quantity-btn.plus') : null;
        const oldQuantityMinus = oldQuantityContainer ? oldQuantityContainer.querySelector('.quantity-btn.minus') : null;
        const oldQuantityInput = document.getElementById(oldQuantityId);
        const newButtons = html.getElementById(buttonId);
        const buy_buttons = oldButtons ? oldButtons.querySelectorAll('button') : [];
        if (!this.currentVariant.available) {
          for (let i = 0; i < buy_buttons.length; i++) {
            buy_buttons[i].disabled = true;
            if (buy_buttons[i].getAttribute('name') == 'add') {
              buy_buttons[i].innerHTML = window.variantStrings.soldOut;
            }
          }
          if (oldQuantityContainer) oldQuantityContainer.classList.add('disabled');
          if (oldQuantityPlus) oldQuantityPlus.disabled = true;
          if (oldQuantityMinus) oldQuantityMinus.disabled = true;
          if (oldQuantityInput) oldQuantityInput.disabled = true;
        } else if (this.currentVariant.available) {
          for (let i = 0; i < buy_buttons.length; i++) {
            buy_buttons[i].disabled = false;
            if (buy_buttons[i].getAttribute('name') == 'add') {
              buy_buttons[i].innerHTML = window.variantStrings.addToCart;
            }
          }
          if (oldQuantityContainer) oldQuantityContainer.classList.remove('disabled');
          if (oldQuantityPlus) oldQuantityPlus.disabled = false;
          if (oldQuantityMinus) oldQuantityMinus.disabled = false;
          if (oldQuantityInput) oldQuantityInput.disabled = false;
        }

        const oldRadioElement = this.querySelectorAll('input[type="radio"]');
        const newRadioElement = html.querySelector('variant-selector').querySelectorAll('input[type="radio"]');
        for (let i = 0; i < newRadioElement.length; i++) {
          if (newRadioElement[i].closest('.radio-container').classList.contains('unavailable')) {
            oldRadioElement[i].closest('.radio-container').classList.add('unavailable');
          } else {
            oldRadioElement[i].closest('.radio-container').classList.remove('unavailable');
          }
        }
        
        
        const oldSku = oldSection.querySelector('.variant-sku');
        const skuWrapper = oldSection.querySelector('.sku-wrapper');
        const newSku = newSection.querySelector('.variant-sku');
        if (oldSku && newSku) {
          oldSku.innerHTML = newSku.innerHTML;
        } else if (!oldSku && newSku) {
          skuWrapper.append(newSku);
        } else if (!newSku && oldSku) {
          oldSku.remove();
        }

        const mediaId = `media-${this.dataset.section}`;
        const oldMedia = document.getElementById(mediaId);
        const oldMediaClassList = oldMedia?.classList.contains('em-vdapp--initiated');
        if (!oldMediaClassList) {
          const newMedia = html.getElementById(mediaId);
          if (oldMedia && newMedia) oldMedia.innerHTML = newMedia.innerHTML;
          productSectionSlider();
          thumbProductModel();
          shopifyXr();
          cleanUpVideoPlayers();
          videoPlayerInitialise(`#${mediaId}`);
        }

        const shareId = `.product_feature`;
        const oldShare = oldSection.querySelector(shareId);
        const newShare = newSection.querySelector(shareId);
        if (oldShare && newShare) oldShare.innerHTML = newShare.innerHTML;
        shareButton();
        LinkCopy();

        const inventoryId = `inventory-${this.dataset.section}`;
        const inventoryWrapper = document.getElementById(`inventory-wrapper-${this.dataset.section}`);
        const oldInventory = document.getElementById(inventoryId);
        if (oldInventory) {
          oldInventory.style.visibility = 'visible';
        }
        const newInventory = html.getElementById(inventoryId);
        if (oldInventory && newInventory) {
          oldInventory.innerHTML = newInventory.innerHTML;
        } else if (!oldInventory && newInventory) {
          inventoryWrapper.append(newInventory);
        } else if (!newInventory && oldInventory) {
          oldInventory.remove();
        }

        const oldVariantCartCountEl = oldSection.querySelector('[data-cart-count]');
        const newVariantCartCountEl = newSection.querySelector('[data-cart-count]');
        if (oldVariantCartCountEl && newVariantCartCountEl) {
          const newVariantCartCount = newVariantCartCountEl.getAttribute('data-cart-count');
          oldVariantCartCountEl.setAttribute('data-cart-count', newVariantCartCount);
        }

        const quantityId = `quantity-${this.dataset.section}`;
        const oldQuantity = document.getElementById(quantityId);
        const oldFormInput = oldSection.querySelector('input[name="quantity"][type="hidden"]');
        const oldMaxQuantity = oldQuantity ? oldQuantity.getAttribute('max') : null;
        const newQuantity_el = html.getElementById(quantityId);
        const newQuantity = newQuantity_el ? newQuantity_el.hasAttribute('max') : false;
        if (oldQuantity && newQuantity) {
          oldQuantity.setAttribute('max', newQuantity_el.getAttribute('max'));
        }
        if (oldQuantity && !newQuantity) {
          oldQuantity.removeAttribute('max');
        }
        if (oldQuantity && oldFormInput && newQuantity && oldQuantity.value * 1 > newQuantity_el.getAttribute('max') * 1) {
          oldQuantity.value = newQuantity_el.getAttribute('max');
          oldFormInput.value = newQuantity_el.getAttribute('max');
        }
        hidequantityError(oldSection);
        hideAddToCartError(oldSection);

        const oldVariantAvailabilityEl = oldSection.querySelector('[data-availibility]');
        const newVariantAvailabilityEl = newSection.querySelector('[data-availibility]');
        if (oldVariantAvailabilityEl && newVariantAvailabilityEl) {
          const newVariantAvailability = newVariantAvailabilityEl.getAttribute('data-availibility');
          oldVariantAvailabilityEl.setAttribute('data-availibility', newVariantAvailability);
          
          // Update data-max-inventory attribute
          const newMaxInventory = newVariantAvailabilityEl.getAttribute('data-max-inventory');
          if (newMaxInventory) {
            oldVariantAvailabilityEl.setAttribute('data-max-inventory', newMaxInventory);
          } else {
            oldVariantAvailabilityEl.removeAttribute('data-max-inventory');
          }
          
          // Update data-cart-count attribute
          const newCartCount = newVariantAvailabilityEl.getAttribute('data-cart-count');
          if (newCartCount !== null) {
            oldVariantAvailabilityEl.setAttribute('data-cart-count', newCartCount);
          }
        }

        const pickupId = `pickup-${this.dataset.section}`;
        const wrapperId = `pickup-wrapper-${this.dataset.section}`;
        const pickupWrapper = document.getElementById(wrapperId);
        const oldPickup = document.getElementById(pickupId);
        if (oldPickup) {
          pickupWrapper.style.display = 'block';
        }
        const newPickup = html.getElementById(pickupId);
        if (oldPickup && newPickup) {
          oldPickup.innerHTML = newPickup.innerHTML;
        } else if (!oldPickup && newPickup) {
          pickupWrapper.append(newPickup);
        } else if (!newPickup && oldPickup) {
          oldPickup.remove();
        }

        const pickupLocationId = `pickup-location-${this.dataset.section}`;
        const locationWrapperId = `pickup-location-wrapper-${this.dataset.section}`;
        const pickupLocationWrapper = document.getElementById(locationWrapperId);
        const oldPickupLocation = document.getElementById(pickupLocationId);
        const newPickupLocation = html.getElementById(pickupLocationId);
        if (oldPickupLocation && newPickupLocation) {
          oldPickupLocation.innerHTML = newPickupLocation.innerHTML;
        } else if (!oldPickupLocation && newPickupLocation) {
          pickupLocationWrapper.append(newPickupLocation);
        } else if (!newPickupLocation && oldPickupLocation) {
          oldPickupLocation.remove();
        }

        this.removeLoader();
      })
      .catch((error) => {
        console.log(error);
        const id = `price-${this.dataset.section}`;
        const oldPrice = document.getElementById(id);
        oldPrice.style.opacity = '0.5';
        const inventoryId = `inventory-${this.dataset.section}`;
        const oldInventory = document.getElementById(inventoryId);
        if (oldInventory) {
          oldInventory.style.visibility = 'hidden';
        }
        const pickupId = `pickup-${this.dataset.section}`;
        const wrapperId = `pickup-wrapper-${this.dataset.section}`;
        const pickupWrapper = document.getElementById(wrapperId);
        const oldPickup = document.getElementById(pickupId);
        if (oldPickup) {
          pickupWrapper.style.display = 'none';
        }
        this.removeLoader();
      });
  }
  updateVariant() {
    const radio_element = this.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < radio_element.length; i++) {
      if (radio_element[i].checked) {
        radio_element[i].setAttribute('checked', 'checked');
        radio_element[i].closest('.radio-container').classList.add('active');
        radio_element[i].closest('.option-group').querySelector('.option-label span').innerHTML = radio_element[i].value
      } else {
        radio_element[i].removeAttribute('checked');
        radio_element[i].closest('.radio-container').classList.remove('active');
      }
      let currentVariantTitle = '';
      this.options.map((option, index) => {
        if(index != 0){
          currentVariantTitle += ' / '
        }
        const optionPosition = radio_element[i].closest('.option-group').dataset.option;
        if(optionPosition == (index + 1)){
          currentVariantTitle += radio_element[i].value
        }else{
          currentVariantTitle += option
        }
      })
      for (let j = 0; j < this.variantData.length; j++) {
        let variant = this.variantData[j];
        // Normalize both strings for comparison to handle special characters
        const normalizedVariantTitle = variant.title.trim();
        const normalizedCurrentTitle = currentVariantTitle.trim();
        if (normalizedVariantTitle === normalizedCurrentTitle) {
          radio_element[i].closest('.radio-container').classList.remove('unavailable');
          if(variant.available) {
            radio_element[i].closest('.radio-container').classList.remove('sold-out');
          }else{
            radio_element[i].closest('.radio-container').classList.add('sold-out');
          }
          break;
        } else {
          radio_element[i].closest('.radio-container').classList.add('unavailable');
        }
      }
    }
    
  }
  updateBuyButton() {
    const updatedButtonId = `buy-${this.dataset.section}`;
    const updateOldButtons = document.getElementById(updatedButtonId);
    if (!updateOldButtons) return;
    const oldQuantityId = `quantity-${this.dataset.section}`;
    const oldQuantityElement = document.getElementById(oldQuantityId);
    const oldQuantityContainer = oldQuantityElement ? oldQuantityElement.closest('.quantity-container') : null;
    const oldQuantityPlus = oldQuantityContainer ? oldQuantityContainer.querySelector('.quantity-btn.plus') : null;
    const oldQuantityMinus = oldQuantityContainer ? oldQuantityContainer.querySelector('.quantity-btn.minus') : null;
    const oldQuantityInput = document.getElementById(oldQuantityId);
    const updateUnavailableButton = updateOldButtons.querySelectorAll('button');
    const activeOptions = this.querySelectorAll('input[type="radio"][checked]');
    let variantNotAvailable = false;
    for (let i = 0; i < activeOptions.length; i++) {
      if (activeOptions[i].closest('.radio-container').classList.contains('unavailable')) {
        variantNotAvailable = true;
      }
    }
    if (variantNotAvailable) {
      const updateBuyButtons = updateOldButtons.querySelectorAll('button');
      for (let i = 0; i < updateBuyButtons.length; i++) {
        updateBuyButtons[i].disabled = true;
        if (updateBuyButtons[i].getAttribute('name') == 'add') {
          updateBuyButtons[i].innerHTML = window.variantStrings.unavailable;
        }
      }
      if (oldQuantityContainer) oldQuantityContainer.classList.add('disabled');
      if (oldQuantityPlus) oldQuantityPlus.disabled = true;
      if (oldQuantityMinus) oldQuantityMinus.disabled = true;
      if (oldQuantityInput) oldQuantityInput.disabled = true;
    }
  }
  addLoader() {
    let loaderWrappers = this.closest('.product-detail').querySelectorAll('.load-wrapper');
    for (let i = 0; i < loaderWrappers.length; i++) {
      loaderWrappers[i].setAttribute('data-loading', 'loading');
    }
  }
  removeLoader() {
    let loaderWrappers = this.closest('.product-detail').querySelectorAll('.load-wrapper');
    for (let i = 0; i < loaderWrappers.length; i++) {
      loaderWrappers[i].removeAttribute('data-loading');
    }
  }
}
customElements.define('variant-selector', VariantSelector);



window.addEventListener('DOMContentLoaded', function(){
  cloneScrollingText();
});
window.addEventListener('resize', function(){
  cloneScrollingText();
});
document.addEventListener('shopify:section:load', function(){
  cloneScrollingText();
});
function cloneScrollingText(){
  const scrollingSections = document.querySelectorAll('.scrollign-text-section');
  for (let i = 0; i < scrollingSections.length; i++) {
      const scrollingSection = scrollingSections[i];
      const scrollingWrapper = scrollingSections[i].querySelector('.scrolling-wrapper');
      scrollingWrapper.classList.add('no-scrolling');
      const scrollingText = scrollingSections[i].querySelector('.scrolling-text-wrapper');
      if(scrollingText){
        calculateAnimationDuration(scrollingWrapper, scrollingText);
        duplicateText(scrollingWrapper, scrollingText);
      }else{
        scrollingWrapper.classList.remove('no-scrolling');
      }
  }
}
function duplicateText(scrollingWrapper, scrollingText){
  const screenWidth = window.innerWidth;
  const scrollingTextWidth = scrollingText.offsetWidth;
    const duplicatesNeeded = Math.ceil(screenWidth / scrollingTextWidth);
    for (let i = 0; i < duplicatesNeeded; i++) {
      const duplicatedText = scrollingText.cloneNode(true);
      if (i == 0) {
            scrollingWrapper.replaceChildren(duplicatedText);
            continue;
      }
      duplicatedText.setAttribute('aria-hidden', true);
      scrollingWrapper.appendChild(duplicatedText);
  }
  const additionalDuplicatedText = scrollingText.cloneNode(true);
  additionalDuplicatedText.setAttribute('aria-hidden', true);
  scrollingWrapper.appendChild(additionalDuplicatedText);
  scrollingWrapper.classList.remove('no-scrolling');
}

function calculateAnimationDuration(scrollingWrapper, scrollingText) {
  const wrapperWidth = scrollingWrapper.offsetWidth;
  const animationSpeed = scrollingWrapper.getAttribute('animation-duration');
  const textWidth = scrollingText.offsetWidth;
    let animationDuration = textWidth / wrapperWidth;

  if (window.innerWidth >= 1280) {
    animationDuration *= (animationSpeed * 2);
  }else if (window.innerWidth >= 1024 && window.innerWidth <= 1279) {
    animationDuration *= (animationSpeed * 1.5);
  }else if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
    animationDuration *= (animationSpeed * 1);
  }else if (window.innerWidth <= 767) {
    animationDuration *= (animationSpeed * 0.5);
  }

  scrollingWrapper.style.setProperty('--animation-duration', `${animationDuration}s`);
}

    document.addEventListener('DOMContentLoaded', productSectionSlider);
    document.addEventListener('shopify:section:load', productSectionSlider);
    
    // Global variables to track if zoom hint has been shown (across all sections)
    var globalIsFirstZoomWrapper = true;
    var globalHintAlreadyShown = localStorage.getItem('zoomHintHidden') === 'true';
    
    function productSectionSlider(){
      const productSectionSliders = document.querySelectorAll('.product-medias');
      productSectionSliders.forEach(productSectionSlider => {
        const section = '#' + productSectionSlider.id;
        productSlider(section);
      });
    }
    function productSlider(section) {
      let thumbSwiper = section + ' .thumb-swiper';
      let mainSwiper = section + ' .main-swiper';
      let swiperPrev = document.querySelector(`${mainSwiper} ~ button.main-swiper-prev`);
      let swiperNext = document.querySelector(`${mainSwiper} ~ button.main-swiper-next`);
      
      // Check if this is a quick-view section
      var isQuickView = document.querySelector(section).closest('.quick-view-section') !== null;
      // Check if there are other product sections in main content
      var hasMainProductSections = document.querySelectorAll('#MainContent .product-medias').length > 0;

      try {
        var swiper = new Swiper(thumbSwiper, {
          direction: 'horizontal',
          loop: false,
          spaceBetween: 20,
          slidesPerView: 3,
          allowTouchMove: true,
          autoHeight: true,
          navigation: false,
          breakpoints: {
            568: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          },
          on: {
            init: function () {
              $(thumbSwiper).removeAttr('x-swiper');
            },
          },
          a11y: {
            slideLabelMessage: `${ window.slideLabels.goTo } {{index}}`,
            itemRoleDescriptionMessage: `${ window.slideLabels.slide }`
          },
        });
        var swiper_main = new Swiper(mainSwiper, {
          loop: false,
          spaceBetween: 58,
          allowTouchMove: false,
          autoHeight: true,
          thumbs: {
            swiper: swiper,
          },
          navigation: {
            nextEl: '.main-swiper-next',
            prevEl: '.main-swiper-prev',
          },
          on: {
            init: function () {
              $(mainSwiper).removeAttr('x-swiper');
              if (window.innerWidth <= 767) {
                if(this.slides.length > 1){
                  swiperPrev.classList.remove('show');
                  swiperNext.classList.add('show');
                }else{
                  swiperPrev.classList.remove('show');
                  swiperNext.classList.remove('show');
                }
                swiperPrev.addEventListener('click', () => {
                  swiper_main.slidePrev();
                });
                swiperNext.addEventListener('click', () => {
                  swiper_main.slideNext();
                });
              }
            },
            reachEnd: function () {
              if (window.innerWidth <= 767) {
                swiperPrev.classList.add('show');
                swiperNext.classList.remove('show');
              }
            },
            reachBeginning: function () {
              if (window.innerWidth <= 767) {
                swiperPrev.classList.remove('show');
                swiperNext.classList.add('show');
              }
            },
            slideChange: function () {
              if (window.innerWidth <= 767) {
                if (!swiper_main.isEnd) {
                  swiperNext.classList.add('show');
                }else{
                  swiperNext.classList.remove('show');
                }
                if (!swiper_main.isBeginning) {
                  swiperPrev.classList.add('show');
                }else{
                  swiperPrev.classList.remove('show');
                }
              }
            },
            slideChangeTransitionEnd: () => activeProductModel(swiper_main),
          },
          a11y: {
            slideLabelMessage: `${ window.slideLabels.item } {{index}}`,
            itemRoleDescriptionMessage: `${ window.slideLabels.slide }`
          },
        });
        function swiperNavDisplay() {
          if (window.innerWidth <= 767) {
              if (!swiper_main.isEnd) {
                swiperNext.classList.add('show');
              }else{
                swiperNext.classList.remove('show');
              }
              if (!swiper_main.isBeginning) {
                swiperPrev.classList.add('show');
              }else{
                swiperPrev.classList.remove('show');
              }
          } else {
            swiperNext?.classList.remove('show');
            swiperPrev?.classList.remove('show');
          }
        }
        window.addEventListener('resize', swiperNavDisplay);

        var thumbSlides = document.querySelectorAll(thumbSwiper + ' .swiper-slide');
        for (let i = 0; i < thumbSlides.length; i++) {
          thumbSlides[i].addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
              if (this === document.activeElement) {
                var slideIndex = Array.prototype.indexOf.call(this.parentNode.children, this);
                swiper.slideTo(slideIndex);
                swiper_main.slideTo(slideIndex);
              }
            }
          });
        }
      } catch (e) {
        console.log('Swiper JS is not defined', e);
      }
      setImageZoom();
      swiper_main.on('transitionEnd', function () {
        var tarnsitionActiveSlide = document.querySelector(thumbSwiper + ' .swiper-slide-thumb-active');
        
        // Reset zoom on all slides when slide changes
        var allZoomWrappers = document.querySelectorAll(mainSwiper + ' .zoom-wrapper');
        allZoomWrappers.forEach(function(zoomWrapper) {
          if (zoomWrapper.panzoomInstance && zoomWrapper.isZoomEnabled) {
            var instance = zoomWrapper.panzoomInstance;
            instance.moveTo(0, 0);
            instance.zoomAbs(0, 0, 1);
            instance.pause();
            zoomWrapper.isZoomEnabled = false;
            zoomWrapper.classList.remove('is-zoomed');
            zoomWrapper.setAttribute('aria-pressed', 'false');
            zoomWrapper.setAttribute('aria-label', window.zoomLabels.zoomIn);
          }
        });
      });
      
      // Track last known mobile state for resize handling
      var lastWasMobile = window.innerWidth <= 768;
      var resizeDebounceTimer = null;
      
      function setImageZoom() {
        var ImageZoomElWrapper = document.querySelectorAll(mainSwiper + ' .swiper-slide');
        
        // Detect if device is mobile/touch (includes touch devices and screens <= 768px)
        var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth <= 768);
        
        for (let i = 0; i < ImageZoomElWrapper.length; i++) {
          var imageZoomEl = ImageZoomElWrapper[i].querySelector('.zoom-wrapper');
          if (imageZoomEl) {
            var zoomImg = imageZoomEl.querySelector('img');
            if (zoomImg && typeof panzoom === 'function') {
              // Check zoom settings
              var zoomType = imageZoomEl.getAttribute('data-zoom-type');
              var zoomMobileDisable = imageZoomEl.getAttribute('data-zoom-mobile-disable');
              
              // Determine if zoom should be disabled
              var shouldDisableZoom = false;
              if (!isTouchDevice && zoomType === 'none') {
                shouldDisableZoom = true; // Zoom disabled on desktop
              }
              if (isTouchDevice && zoomMobileDisable === 'true') {
                shouldDisableZoom = true; // Zoom disabled on mobile
              }
              
              if (shouldDisableZoom) {
                // Dispose existing panzoom instance if exists
                if (imageZoomEl.panzoomInstance) {
                  imageZoomEl.panzoomInstance.dispose();
                  imageZoomEl.panzoomInstance = null;
                }
                // Remove accessibility attributes when zoom is disabled
                imageZoomEl.removeAttribute('role');
                imageZoomEl.removeAttribute('aria-label');
                imageZoomEl.removeAttribute('aria-pressed');
                imageZoomEl.removeAttribute('tabindex');
                imageZoomEl.isZoomEnabled = false;
                imageZoomEl.classList.remove('is-zoomed');
                continue;
              }
              
              // Zoom should be enabled - restore accessibility attributes if needed
              if (!imageZoomEl.hasAttribute('role')) {
                imageZoomEl.setAttribute('role', 'button');
                imageZoomEl.setAttribute('tabindex', '0');
                imageZoomEl.setAttribute('aria-pressed', 'false');
                imageZoomEl.setAttribute('aria-label', window.zoomLabels.zoomIn);
              }
              
              // Check if panzoom instance needs to be created or re-created
              var needsEventListeners = !imageZoomEl.zoomInitialized;
              
              // If panzoom instance exists, skip creation (already initialized and enabled)
              if (imageZoomEl.panzoomInstance) {
                continue;
              }
              
              // Determine zoom behavior
              var isHoverZoom = zoomType === 'hover';
              
              var panzoomInstance = panzoom(zoomImg, {
                maxZoom: 3,
                minZoom: 1,
                initialZoom: 1,
                bounds: true,
                boundsPadding: 0.5,
                zoomDoubleClickSpeed: 1, // Disable default double-click zoom
                smoothScroll: false,
                beforeWheel: function(e) {
                  // Ignore mouse wheel to allow page scroll
                  return false;
                },
                beforeMouseDown: function(e) {
                  // In panzoom: return false = allow panning, return true = prevent panning
                  // Disable drag panning for hover zoom type
                  if (isHoverZoom) {
                    return true; // Prevent drag panning for hover zoom
                  }
                  return false; // Allow drag panning for non-hover zoom
                }
              });
              
              // Pause panzoom initially
              panzoomInstance.pause();
              
              // Store instance for cleanup
              imageZoomEl.panzoomInstance = panzoomInstance;
              imageZoomEl.isZoomEnabled = false;
              
              // Set up zoom hint - only for the first zoom wrapper and if not previously hidden
              // Skip quick-view if there are main product sections on the page
              var shouldAddHint = globalIsFirstZoomWrapper && !globalHintAlreadyShown && needsEventListeners;
              if (isQuickView && hasMainProductSections) {
                shouldAddHint = false; // Don't add hint to quick-view if main sections exist
              }
              
              if (shouldAddHint) {
                // Create zoom hint element
                var zoomHintElement = document.createElement('span');
                zoomHintElement.className = 'zoom-hint';
                zoomHintElement.setAttribute('aria-hidden', 'true');
                
                // Detect device type and update hint text (reuse existing isTouchDevice)
                zoomHintElement.textContent = isTouchDevice ? window.zoomLabels.actionInfoMobile : window.zoomLabels.actionInfoDesktop;
                
                // Append to zoom wrapper
                imageZoomEl.appendChild(zoomHintElement);
                
                globalIsFirstZoomWrapper = false; // Mark that we've added hint to first wrapper
                
                // Hide hint function - capture the element in closure
                (function(hintEl) {
                  var hideHint = function(e) {
                    if (hintEl) {
                      hintEl.style.display = 'none';
                      localStorage.setItem('zoomHintHidden', 'true');
                    }
                  };
                  
                  // Hide hint on any interaction
                  imageZoomEl.addEventListener('mousedown', hideHint, { once: true });
                  imageZoomEl.addEventListener('touchstart', hideHint, { once: true, passive: true });
                })(zoomHintElement);
              }
              
              // Only add event listeners once (on first initialization)
              if (needsEventListeners) {
                // Handle double-click/tap to toggle panzoom
                var lastTap = 0;
                var touchCount = 0;
                
                // Desktop double-click
                imageZoomEl.addEventListener('dblclick', function(e) {
                  e.preventDefault();
                  toggleZoom(this, zoomImg, e);
                });
                
                // Track touch start to detect pinch gestures
                imageZoomEl.addEventListener('touchstart', function(e) {
                  touchCount = e.touches.length;
                });
                
                // Mobile double-tap (only for single finger)
                imageZoomEl.addEventListener('touchend', function(e) {
                  // Ignore if it's a multi-touch gesture (pinch)
                  if (touchCount > 1 || e.changedTouches.length > 1) {
                    lastTap = 0; // Reset to prevent false double-tap
                    return;
                  }
                  
                  var currentTime = new Date().getTime();
                  var tapLength = currentTime - lastTap;
                  
                  if (tapLength < 300 && tapLength > 0) {
                    e.preventDefault();
                    toggleZoom(this, zoomImg, e);
                    lastTap = 0; // Reset after toggle
                  } else {
                    lastTap = currentTime;
                  }
                });
                
                // Keyboard accessibility - Enter/Space to toggle zoom
                imageZoomEl.addEventListener('keydown', function(e) {
                  // Enter or Space key to toggle zoom
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleZoom(this, zoomImg, null);
                    this.setAttribute('aria-pressed', this.isZoomEnabled);
                  }
                  
                  // Escape key to disable zoom
                  if (e.key === 'Escape' && this.isZoomEnabled) {
                    e.preventDefault();
                    disableZoom(this);
                  }
                });
              
              function toggleZoom(element, img, event) {
                var instance = element.panzoomInstance;
                if (!instance) return; // Guard against disposed instance
                
                if (element.isZoomEnabled) {
                  disableZoom(element);
                } else {
                  enableZoom(element, img, event);
                }
              }
              
              function disableZoom(element) {
                var instance = element.panzoomInstance;
                if (!instance) return; // Guard against disposed instance
                instance.moveTo(0, 0);
                instance.zoomAbs(0, 0, 1);
                instance.pause();
                element.isZoomEnabled = false;
                element.classList.remove('is-zoomed');
                element.setAttribute('aria-pressed', 'false');
                element.setAttribute('aria-label', window.zoomLabels.zoomIn);
              }
              
              function enableZoom(element, img, event) {
                var instance = element.panzoomInstance;
                if (!instance) return; // Guard against disposed instance
                instance.resume();
                var rect = element.getBoundingClientRect();
                var scale = 2;
                
                // Get mouse/touch position or default to center
                var clientX, clientY;
                if (event && event.clientX !== undefined) {
                  clientX = event.clientX;
                  clientY = event.clientY;
                } else if (event && event.changedTouches && event.changedTouches[0]) {
                  clientX = event.changedTouches[0].clientX;
                  clientY = event.changedTouches[0].clientY;
                } else {
                  // Default to center
                  clientX = rect.left + rect.width / 2;
                  clientY = rect.top + rect.height / 2;
                }
                
                // For hover zoom, use instant zoom and position based on mouse
                if (isHoverZoom) {
                  var mouseX = (clientX - rect.left) / rect.width;
                  var mouseY = (clientY - rect.top) / rect.height;
                  
                  mouseX = Math.max(0, Math.min(1, mouseX));
                  mouseY = Math.max(0, Math.min(1, mouseY));
                  
                  var naturalWidth = img.naturalWidth;
                  var naturalHeight = img.naturalHeight;
                  var scaledWidth = naturalWidth * scale;
                  var scaledHeight = naturalHeight * scale;
                  
                  var overflowX = Math.max(0, scaledWidth - rect.width);
                  var overflowY = Math.max(0, scaledHeight - rect.height);
                  
                  var targetX = -mouseX * overflowX;
                  var targetY = -mouseY * overflowY;
                  
                  // Instant zoom and position
                  instance.zoomAbs(0, 0, scale);
                  instance.moveTo(targetX, targetY);
                } else {
                  // For non-hover zoom (drag/grab), zoom to center with animation
                  var centerX = rect.width / 2;
                  var centerY = rect.height / 2;
                  instance.smoothZoomAbs(centerX, centerY, scale);
                }
                
                element.isZoomEnabled = true;
                element.classList.add('is-zoomed');
                element.setAttribute('aria-pressed', 'true');
                element.setAttribute('aria-label', window.zoomLabels.zoomOut);
                
                // Hide any zoom hint on the page when any zoom is activated
                var allHints = document.querySelectorAll('.zoom-hint');
                allHints.forEach(function(hint) {
                  if (hint && hint.style.display !== 'none') {
                    hint.style.display = 'none';
                    localStorage.setItem('zoomHintHidden', 'true');
                  }
                });
              }
              
              // Mouse move panning for hover zoom type
              if (isHoverZoom) {
                imageZoomEl.addEventListener('mousemove', function(e) {
                  if (!this.isZoomEnabled) return;
                  
                  var instance = this.panzoomInstance;
                  if (!instance) return;
                  var transform = instance.getTransform();
                  var scale = transform.scale;
                  
                  if (scale <= 1) return;
                  
                  var rect = this.getBoundingClientRect();
                  var img = this.querySelector('img');
                  
                  // Get the natural dimensions and calculate scaled size
                  var naturalWidth = img.naturalWidth;
                  var naturalHeight = img.naturalHeight;
                  var scaledWidth = naturalWidth * scale;
                  var scaledHeight = naturalHeight * scale;
                  
                  // Get mouse position relative to the wrapper (0 to 1)
                  var mouseX = (e.clientX - rect.left) / rect.width;
                  var mouseY = (e.clientY - rect.top) / rect.height;
                  
                  // Clamp mouse position to 0-1 range
                  mouseX = Math.max(0, Math.min(1, mouseX));
                  mouseY = Math.max(0, Math.min(1, mouseY));
                  
                  // Calculate the overflow (how much larger the scaled image is than container)
                  var overflowX = Math.max(0, scaledWidth - rect.width);
                  var overflowY = Math.max(0, scaledHeight - rect.height);
                  
                  // Calculate target position
                  // When mouse is at 0 (left), show left side (x = 0)
                  // When mouse is at 1 (right), show right side (x = -overflowX)
                  var targetX = -mouseX * overflowX;
                  var targetY = -mouseY * overflowY;
                  
                  // Apply the transform
                  instance.moveTo(targetX, targetY);
                });
                
                // Reset position when mouse leaves - center the image
                imageZoomEl.addEventListener('mouseleave', function(e) {
                  if (!this.isZoomEnabled) return;
                  var instance = this.panzoomInstance;
                  if (!instance) return;
                  var transform = instance.getTransform();
                  var scale = transform.scale;
                  var rect = this.getBoundingClientRect();
                  var img = this.querySelector('img');
                  
                  var scaledWidth = img.naturalWidth * scale;
                  var scaledHeight = img.naturalHeight * scale;
                  var overflowX = Math.max(0, scaledWidth - rect.width);
                  var overflowY = Math.max(0, scaledHeight - rect.height);
                  
                  // Center the image (same as mouse at 0.5, 0.5)
                  instance.moveTo(-overflowX / 2, -overflowY / 2);
                });
              }
              
              // Track zoom state on transform
              panzoomInstance.on('transform', function(e) {
                var transform = e.getTransform();
                if (transform.scale > 1.05) {
                  imageZoomEl.classList.add('is-zoomed');
                  imageZoomEl.isZoomEnabled = true;
                } else if (transform.scale <= 1) {
                  imageZoomEl.classList.remove('is-zoomed');
                }
              });
              
              // Mark as initialized to prevent duplicate event listeners
              imageZoomEl.zoomInitialized = true;
              } // End of needsEventListeners block
            } else if (typeof panzoom !== 'function') {
              console.error("Panzoom is not available.");
            }
          }
        }
      }
      
      // Handle resize to toggle zoom on/off when crossing the mobile breakpoint
      function handleZoomResize() {
        var currentIsMobile = window.innerWidth <= 768;
        
        // Reset zoom on all slides when resizing (similar to slide change)
        var allZoomWrappers = document.querySelectorAll(mainSwiper + ' .zoom-wrapper');
        allZoomWrappers.forEach(function(zoomWrapper) {
          if (zoomWrapper.panzoomInstance && zoomWrapper.isZoomEnabled) {
            var instance = zoomWrapper.panzoomInstance;
            instance.moveTo(0, 0);
            instance.zoomAbs(0, 0, 1);
            instance.pause();
            zoomWrapper.isZoomEnabled = false;
            zoomWrapper.classList.remove('is-zoomed');
            zoomWrapper.setAttribute('aria-pressed', 'false');
            zoomWrapper.setAttribute('aria-label', window.zoomLabels.zoomIn);
          }
        });
        
        // Only re-evaluate zoom setup if we crossed the breakpoint
        if (currentIsMobile !== lastWasMobile) {
          lastWasMobile = currentIsMobile;
          setImageZoom(); // Re-run zoom setup with new screen size
        }
      }
      
      // Debounced resize handler
      window.addEventListener('resize', function() {
        clearTimeout(resizeDebounceTimer);
        resizeDebounceTimer = setTimeout(handleZoomResize, 150);
      });
    }
    function activeProductModel(productSwiper){
      let productSwiperEl = productSwiper.el;
      let firstModelID = productSwiperEl.dataset.firstModel;
      let modelXrButton = productSwiperEl.querySelector('.btn-xr');
      let activeSlide = productSwiperEl.querySelector('.swiper-slide-active');
      let activeModel = activeSlide.querySelector('product-model');
      if(activeModel){
        let modelMediaID = activeModel.dataset.mediaId;
        modelXrButton.setAttribute('data-shopify-model3d-id', modelMediaID)
        }else{
          if(firstModelID != ""){
            modelXrButton.setAttribute('data-shopify-model3d-id', firstModelID)
          }
      }
    }

    document.addEventListener('DOMContentLoaded', sectionSlider);
    document.addEventListener('shopify:section:load', sectionSlider);
    function sectionSlider(){
        const featureSliders = document.querySelectorAll('.featured-collection-slider');
        for (let i = 0; i < featureSliders.length; i++) {
            const featureSlider = featureSliders[i];
            const section = '#' + featureSlider.id;
            collectionSlider(section);
        }
    }
    function collectionSlider(section) {
        try {
            let swiper = new Swiper(section, {
                spaceBetween: 20,
                slidesPerView: 1,
                allowTouchMove: true,
                navigation: {
                  prevEl: '.slider-btn-prev',
                  nextEl: '.slider-btn-next'
                },
                clickable: true,
                breakpoints: {
                  568: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 1,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                  1280: {
                    slidesPerView: 3,
                  },
                  1536: {
                    slidesPerView: 4,
                  },
                },
                on: {
                  init: function () {
                    $(section).removeAttr('x-swiper');
                  },
                },
            });
        } catch (e) {
            console.log('Swiper JS is not defined');
            console.log(e);
        }
    }


    window.addEventListener('resize', collectionSectionSlider);
    document.addEventListener('DOMContentLoaded', collectionSectionSlider);
    document.addEventListener('shopify:section:load', collectionSectionSlider);
    function collectionSectionSlider(){
        const featureSliders = document.querySelectorAll('.collection-list-slider');
        for (let i = 0; i < featureSliders.length; i++) {
            const featureSlider = featureSliders[i];
            const section = '#' + featureSlider.id;
            const prevBtn = featureSlider.closest('.collection-slider-container').querySelector('.slider-btn-prev');
            const nextBtn = featureSlider.closest('.collection-slider-container').querySelector('.slider-btn-next');
            const dtSlides = featureSlider.dataset.desktopSlides;
            const sdtSlides = featureSlider.dataset.smalldesktopSlides;
            const ltSlides = featureSlider.dataset.laptopSlides;
            const tbSlides = featureSlider.dataset.tabletSlides;
            const mbSlides = featureSlider.dataset.mobileSlides;
            const slideAlignment = featureSlider.dataset.itemAlign;
            const slidesLength = featureSlider.querySelectorAll('.swiper-slide').length;
            const swiperWrapper = featureSlider.querySelector('.swiper-wrapper');
            let screenWidth = window.innerWidth;
            let slidesShown;
            switch(true) {
              case (screenWidth >= 520 && screenWidth < 768):
                slidesShown = mbSlides
                break;
              case (screenWidth >= 768 && screenWidth < 1024):
                slidesShown = tbSlides
                break;
              case (screenWidth >= 1024 && screenWidth < 1280):
                slidesShown = ltSlides
                break;
              case (screenWidth >= 1280 && screenWidth < 1536):
                slidesShown = sdtSlides
                break;
              case (screenWidth >= 1536):
                slidesShown = dtSlides
                break;
              default:
                slidesShown = 1;
            }
            if(slidesLength < slidesShown && slideAlignment == "item-center"){
              swiperWrapper.classList.add('slides-center');
            }else{
              swiperWrapper.classList.remove('slides-center');
            }
            collectionListSlider(section, prevBtn, nextBtn, dtSlides, sdtSlides, ltSlides, tbSlides, mbSlides);
        }
    }
    function collectionListSlider(section, prevBtn, nextBtn, dtSlides, sdtSlides, ltSlides, tbSlides, mbSlides) {
        try {
          let swiper = new Swiper(section, {
                spaceBetween: 20,
                slidesPerView: 1,
                allowTouchMove: true,
                navigation: {
                  prevEl: prevBtn,
                  nextEl: nextBtn
                },
                clickable: true,
                breakpoints: {
                  520: {
                    slidesPerView: mbSlides,
                  },
                  768: {
                    slidesPerView: tbSlides,
                  },
                  1024: {
                    slidesPerView: ltSlides,
                  },
                  1280: {
                    slidesPerView: sdtSlides,
                  },
                  1536: {
                    slidesPerView: dtSlides,
                  },
                },
                on: {
                  init: function () {
                    $(section).removeAttr('x-swiper');
                  },
                }
            });
        } catch (e) {
            console.log('Swiper JS is not defined');
            console.log(e);
        }
    }


    document.addEventListener('DOMContentLoaded', slideshowSectionSlider);
    document.addEventListener('shopify:section:load', slideshowSectionSlider);
    document.addEventListener('shopify:section:reorder', slideshowSectionSlider);
    function slideshowSectionSlider(){
      
        const slideshows = document.querySelectorAll('.hero-swiper');
        for (let i = 0; i < slideshows.length; i++) {
            const slideshow = slideshows[i];
            const autoplayToggle = slideshows[i].querySelector('.autoplay-toggle');
            const section = '#' + slideshow.id;

            let slideshowAutoplay;
            if(slideshow.classList.contains('autoplay')){
              slideshowAutoplay = true;
            }else{
              slideshowAutoplay = false;
            }
            const initSlideshow = slideshow.swiper;
            if(initSlideshow){
              slideShowBg(slideshow)
            }
            if(initSlideshow == undefined){
              slideshowSlider(section, slideshowAutoplay); 
              if(autoplayToggle){
                autoplayToggle.addEventListener('click', function(){
                  const slideshowEl = this.closest('.swiper');
                  const playIcon = this.querySelector('.play-icon');
                  const pauseIcon = this.querySelector('.pause-icon');
                  
                  if(slideshowEl.swiper.autoplay.running){
                    slideshowEl.swiper.autoplay.stop();
                    pauseIcon.classList.add('ic-display-none');
                    playIcon.classList.remove('ic-display-none');
                  }else{
                    slideshowEl.swiper.autoplay.start();
                    playIcon.classList.add('ic-display-none');
                    pauseIcon.classList.remove('ic-display-none');
                  }
                })
              }

              slideShowBg(slideshow)

              slideshow.swiper.on('slideChangeTransitionEnd', function(){
                const activeSlideIndex = slideshow.swiper.activeIndex;
                const activeSlide = slideshow.swiper.slides[activeSlideIndex];
                const activeSlideBg = activeSlide.querySelector('.hero-container').dataset.bg;
                const slideOuterBg = slideshow.closest('.slideshow-wrapper').dataset.outerBg;
                const activeSlideColorScheme = activeSlide.querySelector('.hero-container').dataset.colorScheme;
                slideshow.setAttribute('data-bg-active',activeSlideBg);
                const slideshowClasses = slideshow.classList;
                for (let i = 0; i < slideshowClasses.length; i++) {
                  if (slideshowClasses[i].includes('color-scheme')) {
                      if(slideshowClasses[i] != activeSlideColorScheme){
                        slideshow.classList.remove(slideshowClasses[i]);
                        slideshow.classList.add(activeSlideColorScheme);
                      }
                  }else{
                    slideshow.classList.add(activeSlideColorScheme)
                  }
                }

                const parentContainer = slideshow.parentElement;
                const parentSection = parentContainer.closest('.slideshow-section');
                const transparentHeader = document.querySelector('.transparent-header');
                const transparentHeaderSection = parentContainer.classList.contains('allow-transparent-header');
                const transparentHeaderFullSection = parentContainer.classList.contains('full-width-slideshow');
                
                if(transparentHeader && transparentHeaderSection){
                  if(parentSection.parentElement.firstElementChild === parentSection){
                    if(transparentHeaderFullSection){
                      transparentHeader.setAttribute('data-slide-bg',activeSlideBg);
                    }else{
                      transparentHeader.setAttribute('data-slide-bg',slideOuterBg);
                    }
                  }
                }else{
                  if(transparentHeader && !transparentHeader.classList.contains('section-allow')){
                    transparentHeader.removeAttribute('data-slide-bg');
                  }
                }
              })
            }
        }
        
    }
    function slideshowSlider(section, slideshowAutoplay) {
        try {
          let swiper = new Swiper(section, {
            navigation: {
              prevEl: '.slider-prev',
              nextEl: '.slider-next',
            },
            pagination: {
              el: '.slider-pagination',
              type: 'bullets',
              clickable: true,
            },
            autoplay: {
              enabled: slideshowAutoplay,
              disableOnInteraction: false
            },
            loop: true,
            observer: true,
          });
        } catch (e) {
            console.log('Swiper JS is not defined');
            console.log(e);
        }
    }

    function slideShowBg(slideshow) {

      const firstSlideIndex = slideshow.swiper.activeIndex;
      const firstSlide = slideshow.swiper.slides[firstSlideIndex];
      const firstSlideBg = firstSlide.querySelector('.hero-container').dataset.bg;
      const slideOuterBg = slideshow.closest('.slideshow-wrapper').dataset.outerBg;
      const firstSlideColorScheme = firstSlide.querySelector('.hero-container').dataset.colorScheme;

      const parentContainer = slideshow.parentElement;
      const parentSection = parentContainer.closest('.slideshow-section');
      const transparentHeader = document.querySelector('.transparent-header');
      const transparentHeaderSection = parentContainer.classList.contains('allow-transparent-header');
      const transparentHeaderFullSection = parentContainer.classList.contains('full-width-slideshow');


      if(transparentHeader && transparentHeaderSection){
        transparentHeader.querySelector('.content-container').classList.add('text-inherit');
        if (transparentHeader && transparentHeader.querySelector('.bottom-menu-content')) {
          transparentHeader.querySelector('.bottom-menu-content').classList.add('text-inherit');
        }
        if(parentSection.parentElement.firstElementChild === parentSection){
          if(transparentHeaderFullSection){
            transparentHeader.setAttribute('data-slide-bg',firstSlideBg);
          }else{
            transparentHeader.setAttribute('data-slide-bg',slideOuterBg);
          }
        }else{
          if(transparentHeader && !transparentHeader.classList.contains('section-allow')){
            transparentHeader.removeAttribute('data-slide-bg');
          }
        }
      }
      slideshow.setAttribute('data-bg-active',firstSlideBg);
      const slideshowClasses = slideshow.classList;
      for (let i = 0; i < slideshowClasses.length; i++) {
        if (slideshowClasses[i].includes('color-scheme')) {
            if(slideshowClasses[i] != firstSlideColorScheme){
              slideshow.classList.remove(slideshowClasses[i])
              slideshow.classList.add(firstSlideColorScheme)
            }
        }else{
          slideshow.classList.add(firstSlideColorScheme)
        }
      }
    }

    window.addEventListener('load', function(){
        setBanner();
    });
    window.addEventListener('resize', function(){
        setBanner();
    });
    document.addEventListener('shopify:section:load', function(){
        setBanner();
    });
    document.addEventListener('shopify:section:reorder', function(){
        setBanner();
    });
        
    function setBanner(){
        const bannerWrapper = document.querySelectorAll('.banner-wrapper');
        for (let i = 0; i < bannerWrapper.length; i++) {
            const bannerWrapperInner = bannerWrapper[i].querySelector('.inner-container');
            const aspectRatioDecimal = bannerWrapper[i].dataset.ratio * 1;
            const elementId = bannerWrapper[i];
            setBannerHeight(bannerWrapperInner, aspectRatioDecimal, elementId);

            const parentContainer = bannerWrapper[i].parentElement;
            const bannerBg = parentContainer.parentElement.dataset.bg;
            const parentSection = parentContainer.closest('.banner-section');
            const transparentHeader = document.querySelector('.transparent-header');
            const transparentHeaderSection = parentContainer.classList.contains('allow-transparent-header');
            
            if(transparentHeader && transparentHeaderSection){
              if(parentSection.parentElement.firstElementChild === parentSection){
                transparentHeader.setAttribute('data-slide-bg',bannerBg);
              }
            }else{
              if(transparentHeader && !transparentHeader.classList.contains('section-allow')){
                transparentHeader.removeAttribute('data-slide-bg');
              }
            }
        }
        
    }

    function setBannerHeight(bannerWrapperInner, aspectRatioDecimal, elementId){
        const height = calculateHeightPixels(aspectRatioDecimal, elementId);
        bannerWrapperInner.style.minHeight = height + 'px';
    }

    function calculateHeightPixels(aspectRatioDecimal, elementId) {
        const widthElement = elementId.getBoundingClientRect().width;
        const roundedAspectRatio = aspectRatioDecimal;
        const height = Math.round(widthElement / roundedAspectRatio);
        return height;
    }

    document.addEventListener('DOMContentLoaded', sectionBeforeAfter);
    document.addEventListener('shopify:section:load', sectionBeforeAfter);
    function sectionBeforeAfter(){

      const beforeAfterSections = document.querySelectorAll('.before-after-section');
      for(let i=0; i < beforeAfterSections.length; i++){
        const beforeAFterSection = beforeAfterSections[i];
        const beforeAFterContainer = beforeAFterSection.querySelector('.before-after-container');
        const revealer = beforeAFterSection.querySelector('.revealer');
        let scrolling = false;

        revealer.addEventListener('mousedown',function(){
          scrolling = true;
          revealer.classList.add('scrolling');
        });
        document.body.addEventListener('mouseup',function(){
            scrolling = false;
            revealer.classList.remove('scrolling');
        });
        document.body.addEventListener('mouseleave',function(){
            scrolling = false;
            revealer.classList.remove('scrolling');
        });
        document.body.addEventListener('mousemove',function(e){
            if (!scrolling) return;
            let x = e.pageX;
            x -= beforeAFterContainer.getBoundingClientRect().left;
            let percentage = (x / beforeAFterContainer.offsetWidth) * 100;
            beforeAfterScrollIt(percentage);
        });

        function beforeAfterScrollIt(percentage){
            let transform = Math.max(0, Math.min(percentage, 100));
            beforeAFterContainer.style.setProperty('--before-after', transform + "%");
        }

        initialRevealerPosition = beforeAFterContainer.dataset.initialDrag;
        beforeAfterScrollIt(initialRevealerPosition);

        revealer.addEventListener('touchstart',function(event){
            event.preventDefault();
            scrolling = true;
            revealer.classList.add('scrolling');
        });
        revealer.addEventListener('touchend',function(){
            scrolling = false;
            revealer.classList.remove('scrolling');
        });
        revealer.addEventListener('touchcancel',function(){
            scrolling = false;
            revealer.classList.remove('scrolling');
        });
        revealer.addEventListener('touchmove',function(e){
            if (!scrolling) return;
            let x = e.touches[0].pageX;
            x -= beforeAFterContainer.getBoundingClientRect().left;
            let percentage = (x / beforeAFterContainer.offsetWidth) * 100;
            beforeAfterScrollIt(percentage); 
        });
      }
    }
    
    document.addEventListener('DOMContentLoaded', setCountDown);
    document.addEventListener('shopify:section:load', setCountDown);
    function setCountDown() {
      const countDowns = document.querySelectorAll('.count-down-section');
      for (let i = 0; i < countDowns.length; i++) {
        const countDown = countDowns[i];
        const countDownData = countDown.querySelector('.count-down-data');

        const inputMonth = countDownData.dataset.month;
        const inputDate = countDownData.dataset.date;
        const inputYear = countDownData.dataset.year;

        const countDownDate = new Date(inputYear, inputMonth - 1, inputDate).getTime();
        const current = new Date().getTime();
        if (countDownDate >= current) {
          const myfunc = setInterval(function () {
            const now = new Date().getTime();
            const timeleft = countDownDate - now;

            const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

            const dayField = countDown.querySelector('[data-type="days"]');
            const hourField = countDown.querySelector('[data-type="hours"]');
            const minuteField = countDown.querySelector('[data-type="mins"]');
            const secondField = countDown.querySelector('[data-type="secs"]');
            // const endMessage = countDown.querySelector('.end-message');

            dayField.innerHTML = days;
            hourField.innerHTML = hours;
            minuteField.innerHTML = minutes;
            secondField.innerHTML = seconds;

            if (timeleft < 0) {
              clearInterval(myfunc);
              dayField.innerHTML = '';
              hourField.innerHTML = '';
              minuteField.innerHTML = '';
              secondField.innerHTML = '';
              // endMessage.innerHTML = 'TIME UP!!';
            }
          }, 1000);
        }
      }
    }

    class LocalizationForm extends HTMLElement {
      constructor() {
        super();
        this.elements = {
          input: this.querySelector('input[name="language_code"], input[name="country_code"]'),
          button: this.querySelector('button'),
          panel: this.querySelector('ul'),
        };

        this.toggleDropdownHandler = this.toggleDropdown.bind(this);
        this.closeSelectorHandler = this.closeSelector.bind(this);
        this.openSelectorHandler = this.openSelector.bind(this);
        this.onContainerKeyUpHandler = this.onContainerKeyUp.bind(this);
        this.onItemClickHandler = this.onItemClick.bind(this);
        this.querySelectorAll('a').forEach(item => item.addEventListener('click', this.onItemClickHandler));

        this.isPanelVisible = false;
    
        if (window.matchMedia('(max-width: 1023px)').matches) {
          this.bindCountryLanguageDropdown();
        } else {
          this.bindClassFunction();
        }
    
        window.addEventListener('resize', () => {
          if (window.matchMedia('(max-width: 1023px)').matches) {
            this.unbindClassFunction();
            this.bindCountryLanguageDropdown();
          } else {
            this.unbindCountryLanguageDropdown();
            this.bindClassFunction();
          }
        });
      }
    
      bindCountryLanguageDropdown() {
        this.isPanelVisible = false;
        this.elements.panel.style.paddingTop = ""; 
        this.elements.panel.style.paddingBottom = "";
        this.elements.panel.style.height = "";
        this.elements.button.addEventListener('click', this.toggleDropdownHandler);
      }
    
      unbindCountryLanguageDropdown() {
        this.elements.button.removeEventListener('click', this.toggleDropdownHandler); 
      }
    
      bindClassFunction() {
        this.elements.button.addEventListener('click', this.openSelectorHandler);
        this.addEventListener('keyup', this.onContainerKeyUpHandler);
        document.addEventListener('click', this.closeSelectorHandler);

        if (!window.matchMedia('(max-width: 1023px)').matches) {
          
          window.addEventListener('scroll', () => {
            this.elements.button.setAttribute('aria-expanded', false);
            this.elements.panel.setAttribute('hidden', true);
          });
        }
      }
    
      unbindClassFunction() {
        this.elements.button.removeEventListener('click', this.openSelectorHandler);
        this.removeEventListener('keyup', this.onContainerKeyUpHandler); 
        document.removeEventListener('click', this.closeSelectorHandler); 

        if (!window.matchMedia('(max-width: 1023px)').matches) {
          window.removeEventListener('scroll', this.closeScrollHandler);
        }
      }
      

      toggleDropdown(){
        this.isPanelVisible = !this.isPanelVisible;
        if (this.isPanelVisible) {
          const buttonDropdownChilds = this.elements.panel.querySelectorAll('li');
          let dropDownHeight = 0;
          for (let i = 0; i < buttonDropdownChilds.length; i++) {
            const buttonDropdownChild = buttonDropdownChilds[i];
            const dropdownChildComputedStyle = window.getComputedStyle(buttonDropdownChild);
            const dropdownChildHeight = parseInt(dropdownChildComputedStyle.getPropertyValue('height'), 10);
            const dropdownChildMarginBottom = parseInt(dropdownChildComputedStyle.getPropertyValue('margin-bottom'), 10);
            dropDownHeight = dropDownHeight + dropdownChildHeight + dropdownChildMarginBottom;
          }
          dropDownHeight += 48;
          this.elements.panel.toggleAttribute('hidden');
          let popupPadding;
          if (window.matchMedia('(max-width: 1023px)').matches) {
            popupPadding = 8;
          }else{
            popupPadding = 24;
          }
          this.elements.panel.style.paddingTop = popupPadding + 'px';
          this.elements.panel.style.paddingBottom = popupPadding + 'px';
          this.elements.panel.style.height = dropDownHeight + 'px';
          this.elements.button.setAttribute('aria-expanded', (this.elements.button.getAttribute('aria-expanded') === 'false').toString());
        }else{
          this.elements.panel.style.paddingTop = "";
          this.elements.panel.style.paddingBottom = "";
          this.elements.panel.style.height = ""; 
          setTimeout(() => {
            this.elements.button.setAttribute('aria-expanded', 'false');
            this.elements.panel.setAttribute('hidden', true);
          }, 300);
        }
      }
    
      hidePanel() {
        this.elements.button.setAttribute('aria-expanded', 'false');
        this.elements.panel.setAttribute('hidden', true);
      }
    
      onContainerKeyUp(event) {
        if (event.code.toUpperCase() !== 'ESCAPE') return;
        this.hidePanel();
        this.elements.button.focus();
      }
    
      onItemClick(event) {
        event.preventDefault();
        const form = this.querySelector('form');
        this.elements.input.value = event.currentTarget.dataset.value;
        if (form) form.submit();
      }
    
      openSelector() {
        setTimeout(() => {
          // this.elements.panel.focus();
        }, 100);
        this.elements.panel.toggleAttribute('hidden');
        this.elements.button.setAttribute('aria-expanded', (this.elements.button.getAttribute('aria-expanded') === 'false').toString());
      }
    
      closeSelector(event) {
        if (!window.matchMedia('(max-width: 1023px)').matches) {
          const isButton = event.target === this.elements.button;
          const isInsidePanel = this.elements.panel.contains(event.target);
          const isInsideDropdown = this.contains(event.target);
          if (!isButton && !isInsidePanel && !isInsideDropdown) {
            this.isPanelVisible = false;
            this.hidePanel();
          }
        }
      }
    }
    customElements.define('localization-form', LocalizationForm);  

    let isKeyboardFocus = false;
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Tab') {
        isKeyboardFocus = true;
      }
    });

    document.addEventListener('mousedown', function() {
      isKeyboardFocus = false;
    });

    class FilterForm extends HTMLElement {
      constructor() {
        super();
        const filterForm = this.querySelector('form');
        filterForm.addEventListener('input', this.handleFormChange.bind(this));
        
      }

      handleFormChange(event) {
        this.handleCheckboxChange(event);
      }

      handleCheckboxChange(event){
        if(event.target.type === 'checkbox'){
          const root_url = this.dataset.url;
          const name = event.target.name;
          const value = encodeURIComponent(event.target.value).replace(/%20/g, "+");
          const urlRemove = name + '=' + value;

          if (event.target.checked) {
            if(root_url.includes('?')){
              const url = root_url + '&' + urlRemove;
              this.setUrl(url);
            }else{
              const url = root_url + '?' + urlRemove;
              this.setUrl(url); 
            }
          }else{
            const urlQuery = root_url.split('?');
            const queryRoot = urlQuery[0];
            const queryParamString = urlQuery[1];
            if (!queryParamString) {
              this.setUrl(queryRoot);
              return;
            }
            const queryParams = queryParamString.split('&');
            let url = queryRoot;
            let firstQueryParam = true;
            
            // Normalize the urlRemove for comparison by decoding and re-encoding
            const normalizedUrlRemove = this.normalizeParam(urlRemove);
            
            for (let i = 0; i < queryParams.length; i++) {
              // Normalize each query param for comparison
              const normalizedParam = this.normalizeParam(queryParams[i]);
              
              if(normalizedParam === normalizedUrlRemove){
                continue
              }
              if(firstQueryParam){
                url = url + '?' + queryParams[i];
                firstQueryParam = false;
              }else{
                url = url + '&' + queryParams[i]; 
              }
            }
            
            this.setUrl(url);
          }
        }
      }

      normalizeParam(param) {
        // Split parameter into name and value
        const parts = param.split('=');
        if (parts.length !== 2) return param;
        
        const name = parts[0];
        const value = parts[1];
        
        // Decode the value, handling both + and %20 for spaces
        let decodedValue;
        try {
          decodedValue = decodeURIComponent(value.replace(/\+/g, ' '));
        } catch (e) {
          // If decoding fails, use original value
          decodedValue = value.replace(/\+/g, ' ');
        }
        
        // Re-encode consistently
        const encodedValue = encodeURIComponent(decodedValue).replace(/%20/g, '+');
        
        return name + '=' + encodedValue;
      }

      setUrl(url, sort_by){
        this.dataset.url = url;
        document.querySelector('.load-wrapper').setAttribute('data-loading', 'loading');
        this.fetchNewDoc(url, sort_by);
      }

      fetchNewDoc(url, sort_by) {
        fetch(url)
          .then((response) => response.text())
          .then((responseText) => {
            const html = new DOMParser().parseFromString(responseText, 'text/html');
            window.history.replaceState({}, '', url);
            this.renderFilter(html);
            this.renderPage(html);
            const sortByWrapper = this.closest('.search-filter-wrapper, .product-filter-wrapper');
            if (sort_by) {
              setTimeout(() => {
                const sortByEl = sortByWrapper.querySelector('.result-container .sort-by');
                if (sortByEl) {
                  sortByEl.focus();
                  if (isKeyboardFocus) {
                    sortByEl.classList.add('select-keyboard-focused');
                  }
                }
              }, 0);
            }
          });
      }

      renderFilter(html){
        const activeFilterWrappers = ['.filter-head', '.active-filters'];

        activeFilterWrappers.forEach((wrapper) => {
          const activeFilter = html.querySelector(wrapper); 
          if (!activeFilter) return; 
          document.querySelector(wrapper).innerHTML = activeFilter.innerHTML;
        });


        const filterDisplays = document.querySelectorAll('.filter-group-display');
        
        filterDisplays.forEach((filterDisplay) => {
          const displayId = filterDisplay.id;
          const htmlElement = html.getElementById(displayId);
          
          if (!htmlElement) return;

          const displayHead = htmlElement.querySelector('.filter-group-display__header'); 
          if (displayHead){
            document.getElementById(displayId).querySelector('.filter-group-display__header').innerHTML = displayHead.innerHTML; 
          } 

          const displayList = htmlElement.querySelector('.filter-group-display__list'); 
          if (displayList){
            const filterList = document.getElementById(displayId).querySelector('.filter-group-display__list');
            filterList.innerHTML = displayList.innerHTML;
             if(filterList.classList.contains('filter-group-display__list-color')){
               filterColorImage();
             }
          } 
        });

        const range = this.querySelector(".price-slider .price-progress");
        const priceMin = this.querySelector('.price-min');
        const priceMax = this.querySelector('.price-max');
        const rangeMin = this.querySelector('.price-range-min');
        const rangeMax = this.querySelector('.price-range-max');
        const newRangeMin = html.querySelector('.price-range-min');
        const newRangeMax = html.querySelector('.price-range-max');
        const priceRangeFilter = this.querySelector('price-range');
        if(priceRangeFilter){
          priceRangeFilter.resetPriceRange(range, priceMin, priceMax, rangeMin, rangeMax, newRangeMin, newRangeMax);
        }
      }

      renderPage(html){
        const pageContents = ['.result-container', '.pagination-wrapper-bottom', '.pagination-wrapper-top'];

        pageContents.forEach((content) => {
          const pageContent = html.querySelector(content);
          if (!pageContent) return; 
          document.querySelector(content).innerHTML = pageContent.innerHTML;
          if(content == '.result-container'){
            handleQuickView();
          }
        });
        document.querySelector('.load-wrapper').removeAttribute('data-loading'); 
      }
    }
    customElements.define('filter-form', FilterForm);

    $(document).ready(function() {
      filterColorImage();
    });

    function filterColorImage(){
      $('.filter-color-image, .variant-color-image').each(function() {
          let img = $(this); // Current image in the loop
          let canvas = $('<canvas></canvas>')[0]; // Create a new canvas for each image
          let context = canvas.getContext('2d');

          // Function to check if an image exists
          function checkImageExists(imageUrl, callback) {
              var image = new Image();
              image.onload = function() {
                  callback(true);
              };
              image.onerror = function() {
                  callback(false);
              };
              image.src = imageUrl;
          }

          // Load the image and perform color analysis
          checkImageExists(img.attr('src'), function(exists) {
              if (!exists) {
                img.remove();
              } else {
                img.on('load', function() {
                    // Set canvas dimensions to the image's natural dimensions
                    canvas.width = this.naturalWidth;
                    canvas.height = this.naturalHeight;

                    context.drawImage(this, 0, 0, this.naturalWidth, this.naturalHeight);

                    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    let data = imageData.data;

                    let colorCount = {};

                    // Count colors
                    for (let i = 0; i < data.length; i += 4) {
                        let color = data[i] + ',' + data[i+1] + ',' + data[i+2];
                        colorCount[color] = (colorCount[color] || 0) + 1;
                    }

                    let mostFrequentColor = '';
                    let maxCount = 0;

                    // Determine the most frequent color
                    for (let color in colorCount) {
                        if (colorCount[color] > maxCount) {
                            maxCount = colorCount[color];
                            mostFrequentColor = color;
                        }
                    }

                    // Output or use the most used color
                    let rgbArray = mostFrequentColor.split(',');
                    let mostUsedRed = parseInt(rgbArray[0]);
                    let mostUsedGreen = parseInt(rgbArray[1]);
                    let mostUsedBlue = parseInt(rgbArray[2]);

                    let colorBrightness = ((mostUsedRed * 299) + (mostUsedGreen * 587) + (mostUsedBlue * 114)) / 1000;
                    let checkColor = colorBrightness > 128 ? '#000000' : '#ffffff';

                    let closestLabel = $(this).closest('label');
                    if (closestLabel.hasClass('checkbox-label')) {
                        closestLabel.css('--check-color', checkColor);
                    } else {
                        closestLabel.css('--strike-color', checkColor);
                    }
                    canvas = null;
                });

                // Trigger the image load event
                img.attr('src', img.attr('src'));
              }
          });
      });
    }


    class FilterRemove extends HTMLElement {
      constructor() {
        super();
        const filterRemove = this.querySelector('a');
        filterRemove.addEventListener('click', this.handleFilterRemove.bind(this));
        
      }

      setRemoveUrl(url){
        this.querySelector('a').setAttribute('href', url)
      }

      handleFilterRemove(event){
        event.preventDefault();
        const url = this.querySelector('a').getAttribute('href');
        const filterForm = this.closest('filter-form');
        filterForm.setUrl(url); 
      }
    }
    customElements.define('filter-remove', FilterRemove); 


    class SortFilter extends HTMLElement {
      constructor() {
        super();
        this.attachListeners();
      }

      attachListeners() {
        const sortSelect = this.querySelector('select');
        if (sortSelect) {
          sortSelect.addEventListener('change', this.updateSort.bind(this));
          this.handleFocus(sortSelect);
        }
      }

      handleFocus(selectElement) {
        selectElement.addEventListener('focus', function() {
          if (isKeyboardFocus) {
            selectElement.classList.add('select-keyboard-focused');
          }
        });
    
        selectElement.addEventListener('blur', function() {
          selectElement.classList.remove('select-keyboard-focused');
        });
      }

      updateSort() {
        const sortSelect = this.querySelector('select');
        if (sortSelect) {
          const sortOptions = sortSelect.options;
          for (let i = 0; i < sortOptions.length; i++) {
            sortOptions[i].removeAttribute("selected");
          }
    
          const selectedOption = sortOptions[sortSelect.selectedIndex];
          selectedOption.setAttribute("selected", "");
    
          const sortValue = sortSelect.value;
          this.handleSortChange(sortValue);
        }
      }

      handleSortChange(sortValue) {
        const filterForm = document.querySelector('filter-form');
        const root_url = filterForm.dataset.url;
        if (root_url.includes('?')) {
          const urlQuery = root_url.split('?');
          const queryRoot = urlQuery[0];
          let url = queryRoot;
          const queryParamString = urlQuery[1];
          if (queryParamString.includes('sort_by')) {
            const queryParams = queryParamString.split('&');
            let prefix = '';
            for (let i = 0; i < queryParams.length; i++) {
              prefix = (i == 0) ? '?' : '&';
              const queryparamArrray = queryParams[i].split('=');
              const paramName = queryparamArrray[0];
              if (paramName === 'sort_by') {
                url = url + prefix + 'sort_by=' + sortValue;
              } else {
                url = url + prefix + queryParams[i];
              }
            }
          } else {
            url = root_url + '&sort_by=' + sortValue;
          }
          filterForm.setUrl(url, true);
        } else {
          const url = root_url + '?sort_by=' + sortValue;
          filterForm.setUrl(url, true);
        }
      }

      connectedCallback() {
        this.attachListeners();
      }
    
      disconnectedCallback() {
        const sortSelect = this.querySelector('select');
        if (sortSelect) {
          sortSelect.removeEventListener('change', this.updateSort.bind(this));
          sortSelect.removeEventListener('focus', this.handleFocus.bind(this));
          sortSelect.removeEventListener('blur', this.handleFocus.bind(this));
        }
      }
    }
    customElements.define('sort-filter', SortFilter); 


    class PriceRange extends HTMLElement {
      constructor() {
        super();
        const filterForm = this.closest('form');
        const range = this.querySelector(".price-slider .price-progress");
        const priceMin = this.querySelector('.price-min');
        const priceMax = this.querySelector('.price-max');
        const rangeMin = this.querySelector('.price-range-min');
        const rangeMax = this.querySelector('.price-range-max');
        let priceGap = 0;
        
        // Add keydown handler to restrict input to valid characters (like Dawn theme)
        priceMin.addEventListener('keydown', this.onKeyDown.bind(this));
        priceMax.addEventListener('keydown', this.onKeyDown.bind(this));
        
        window.addEventListener('load', this.handlePriceRangeOnLoad.bind(this, range, rangeMin, rangeMax));
        priceMax.addEventListener('input', this.handleMaxPriceChange.bind(this, range, priceMin, priceMax, rangeMax, priceGap));
        priceMin.addEventListener('input', this.handleMinPriceChange.bind(this, range, priceMin, priceMax, rangeMin, rangeMax, priceGap));
        rangeMin.addEventListener('input', this.handleMinRangeChange.bind(this, range, priceMin, priceMax, rangeMin, rangeMax, priceGap));
        rangeMax.addEventListener('input', this.handleMaxRangeChange.bind(this, range, priceMin, priceMax, rangeMin, rangeMax, priceGap));
        priceMin.addEventListener('change', this.handleMinPriceUpdate.bind(this, priceMin, priceMax, rangeMin, rangeMax, priceGap));
        priceMax.addEventListener('change', this.handleMaxPriceUpdate.bind(this, priceMin, priceMax, rangeMin, rangeMax, priceGap));
        rangeMin.addEventListener('change', this.handlePriceUpdate.bind(this, priceMin, priceMax));
        rangeMax.addEventListener('change', this.handlePriceUpdate.bind(this, priceMin, priceMax));
      }

      // Restrict input to valid characters (Dawn theme approach)
      onKeyDown(event) {
        if (event.metaKey || event.ctrlKey) return;
        const pattern = /[0-9]|\.|,|'| |Tab|Backspace|Enter|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Delete|Escape/;
        if (!event.key.match(pattern)) event.preventDefault();
      }

      /**
       * Check if the current locale uses comma as decimal separator
       * Uses Intl.NumberFormat to detect the decimal separator for the current locale
       */
      usesCommaDecimal() {
        const country = window.Shopify?.country || 'US';
        const language = window.Shopify?.locale || 'en';
        
        // Use Intl.NumberFormat to detect decimal separator
        // Format a number with decimals and check if comma is used
        const formatter = new Intl.NumberFormat(`${language}-${country}`, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        });
        
        // Format 1.5 and check if result contains comma as decimal
        const formatted = formatter.format(1.5);
        return formatted.includes(',');
      }

      /**
       * Parse a locale-formatted price string to cents (integer)
       * Uses Shopify locale/currency to determine decimal separator
       * Handles formats like:
       * - "1,234.56" (US/India) -> 123456 cents
       * - "1.234,56" (German/Euro) -> 123456 cents  
       * - "1 234,56" (French) -> 123456 cents
       * - "1234" (no decimals) -> 123400 cents
       * - "1,300" in INR -> 130000 cents (comma is thousand sep)
       * - "1,30" in EUR -> 130 cents (comma is decimal sep)
       */
      parsePriceToCents(value) {
        const str = value.toString().trim();
        if (!str) return 0;
        
        // Remove spaces and apostrophes (thousand separators in some locales)
        let cleaned = str.replace(/[\s']/g, '');
        
        // Find separators
        const lastDot = cleaned.lastIndexOf('.');
        const lastComma = cleaned.lastIndexOf(',');
        
        let integerPart, decimalPart = '';
        
        const commaIsDecimal = this.usesCommaDecimal();
        
        if (lastDot === -1 && lastComma === -1) {
          // No separators: treat as whole number (main currency unit)
          integerPart = cleaned;
        } else if (lastDot !== -1 && lastComma === -1) {
          // Only dot present
          const afterDot = cleaned.substring(lastDot + 1);
          if (commaIsDecimal) {
            // In comma-decimal locales, dot is thousand separator
            // "1.234" = 1234, "1.234.567" = 1234567
            integerPart = cleaned.replace(/\./g, '');
          } else {
            // In dot-decimal locales, dot is decimal separator
            // "1.5" = 1.50, "1234.56" = 1234.56
            integerPart = cleaned.substring(0, lastDot);
            decimalPart = afterDot;
          }
        } else if (lastComma !== -1 && lastDot === -1) {
          // Only comma present
          const afterComma = cleaned.substring(lastComma + 1);
          if (commaIsDecimal) {
            // In comma-decimal locales, comma is decimal separator
            // "1,5" = 1.50, "1234,56" = 1234.56
            integerPart = cleaned.substring(0, lastComma);
            decimalPart = afterComma;
          } else {
            // In dot-decimal locales, comma is thousand separator
            // "1,234" = 1234, "1,234,567" = 1234567
            integerPart = cleaned.replace(/,/g, '');
          }
        } else if (lastDot > lastComma) {
          // Both present, dot comes last: "1,234.56"
          // Dot is decimal, comma is thousand (US/UK/India style)
          integerPart = cleaned.substring(0, lastDot).replace(/,/g, '');
          decimalPart = cleaned.substring(lastDot + 1);
        } else {
          // Both present, comma comes last: "1.234,56"
          // Comma is decimal, dot is thousand (European style)
          integerPart = cleaned.substring(0, lastComma).replace(/\./g, '');
          decimalPart = cleaned.substring(lastComma + 1);
        }
        
        // Handle case where decimal part has more or less than 2 digits
        if (decimalPart.length === 0) {
          decimalPart = '00';
        } else if (decimalPart.length === 1) {
          decimalPart = decimalPart + '0';
        } else if (decimalPart.length > 2) {
          decimalPart = decimalPart.substring(0, 2);
        }
        
        const cents = parseInt(integerPart + decimalPart, 10);
        return isNaN(cents) ? 0 : cents;
      }

      /**
       * Get the price in main currency units (for URL params which expect whole numbers)
       * Rounds appropriately
       */
      getPriceInUnits(value, roundUp = false) {
        const cents = this.parsePriceToCents(value);
        if (roundUp) {
          return Math.ceil(cents / 100);
        }
        return Math.floor(cents / 100);
      }

      /**
       * Format a number for display in the price input
       * Since slider values are whole numbers (no decimals), we keep it simple
       * to avoid parsing issues with thousand separators being mistaken for decimals
       * @param {number} value - The price value to format
       * @param {boolean} roundUp - If true, use ceil (for max values), otherwise floor (for min values)
       */
      formatPrice(value, roundUp = false) {
        // Return as plain integer - the currency symbol is shown separately
        // This avoids issues where "1.400" (German thousand sep) gets parsed as "1.40"
        if (roundUp) {
          return Math.ceil(value).toString();
        }
        return Math.floor(value).toString();
      }

      handlePriceUpdate(priceMin, priceMax){
        // Get values in cents then convert to main units for URL
        const priceMinValue = this.getPriceInUnits(priceMin.value, false);
        const priceMaxValue = this.getPriceInUnits(priceMax.value, true);
        const priceMinName = priceMin.name;
        const priceMaxName = priceMax.name;
        const priceMinFilter = priceMinName + '=' + priceMinValue;
        const priceMaxFilter = priceMaxName + '=' + priceMaxValue;
        const filterForm = document.querySelector('filter-form');

        const root_url = filterForm.dataset.url;
        if (root_url.includes(priceMinName) || root_url.includes(priceMaxName)) {
          const urlQuery = root_url.split('?');
          const queryRoot = urlQuery[0];
          const queryParamString = urlQuery[1];
          const queryParams = queryParamString.split('&');
          let url = queryRoot;
          let firstQueryParam = true;
          for (let i = 0; i < queryParams.length; i++) {
            const queryParam = queryParams[i].split('=');
            const queryParamName = queryParam[0];
            if(queryParamName == priceMinName){
              if(firstQueryParam){
                url = url + '?' + priceMinFilter;
                firstQueryParam = false;
              }else{
                url = url + '&' + priceMinFilter; 
              }
            }else if (queryParamName == priceMaxName){
              if(firstQueryParam){
                url = url + '?' + priceMaxFilter;
                firstQueryParam = false;
              }else{
                url = url + '&' + priceMaxFilter; 
              }
            }else{
              if(firstQueryParam){
                url = url + '?' + queryParams[i];
                firstQueryParam = false;
              }else{
                url = url + '&' + queryParams[i]; 
              }
            }
          }
          
          filterForm.setUrl(url); 
        }else{
          if(root_url.includes('?')){
            const url = root_url + '&' + priceMinFilter + '&' + priceMaxFilter;
            filterForm.setUrl(url);
          }else{
            const url = root_url + '?' + priceMinFilter + '&' + priceMaxFilter;
            filterForm.setUrl(url); 
          }
        }
      }

      handleMinPriceUpdate(priceMin, priceMax, rangeMin, rangeMax, priceGap){
        let minPrice = this.getPriceInUnits(priceMin.value, false);
        let maxPrice = this.getPriceInUnits(priceMax.value, true);
        if (maxPrice - minPrice >= priceGap && minPrice <= parseInt(rangeMax.max) && minPrice >= 0){
          this.toggleErrorMessage(priceMin, priceMax, rangeMax, priceGap);
          this.handlePriceUpdate(priceMin, priceMax);
        }else{
          this.toggleErrorMessage(priceMin, priceMax, rangeMax, priceGap);
        }
      }
      
      handleMaxPriceUpdate(priceMin, priceMax, rangeMin, rangeMax, priceGap){
        let minPrice = this.getPriceInUnits(priceMin.value, false);
        let maxPrice = this.getPriceInUnits(priceMax.value, true);
        if (maxPrice - minPrice >= priceGap && maxPrice <= parseInt(rangeMax.max) && maxPrice >= 0){
          this.toggleErrorMessage(priceMin, priceMax, rangeMax, priceGap);
          this.handlePriceUpdate(priceMin, priceMax);
        }else{
          this.toggleErrorMessage(priceMin, priceMax, rangeMax, priceGap);
        }
      }

      handlePriceRangeOnLoad(range, rangeMin, rangeMax){
        let minPrice = parseInt(rangeMin.value),
            maxPrice = parseInt(rangeMax.value);
        let leftPercentage = (minPrice / rangeMin.max) * 100;
        let rightPercentage = 100 - (maxPrice / rangeMax.max) * 100;
        range.style.left = `calc(${leftPercentage}% - 8px)`;
        range.style.right = `calc(${rightPercentage}% - 8px)`;
      }

      resetPriceRange(range, priceMin, priceMax, rangeMin, rangeMax, newRangeMin, newRangeMax){
        let minPrice = parseInt(newRangeMin.value),
            maxPrice = parseInt(newRangeMax.value);
        let leftPercentage = (minPrice / newRangeMax.max) * 100;
        let rightPercentage = 100 - (maxPrice / newRangeMax.max) * 100;
        priceMin.value = this.formatPrice(minPrice);
        priceMax.value = this.formatPrice(maxPrice, true);
        rangeMin.value = minPrice;
        rangeMax.value = maxPrice;
        range.style.left = `calc(${leftPercentage}% - 8px)`;
        range.style.right = `calc(${rightPercentage}% - 8px)`;
      }

      handleMaxRangeChange(range, priceMin, priceMax, rangeMin, rangeMax, priceGap){
        let minVal = parseInt(rangeMin.value),
        maxVal = parseInt(rangeMax.value);
        if (maxVal - minVal < priceGap) {
          rangeMax.value = minVal + priceGap;
          priceMax.value = this.formatPrice(parseInt(rangeMax.value), true);
          let rightPercentage = 100 - (parseInt(rangeMax.value) / rangeMax.max) * 100;
          range.style.right = `calc(${rightPercentage}% - 8px)`;
          this.toggleErrorMessage(priceMin, priceMax, rangeMax, priceGap);
        } else {
          this.setPriceAndProgress(range, priceMin, priceMax, rangeMin, rangeMax, minVal, maxVal, priceGap);
        }
      }
      
      handleMinRangeChange(range, priceMin, priceMax, rangeMin, rangeMax, priceGap){
        let minVal = parseInt(rangeMin.value),
        maxVal = parseInt(rangeMax.value);

        if (maxVal - minVal < priceGap) {
          rangeMin.value = maxVal - priceGap;
          priceMin.value = this.formatPrice(parseInt(rangeMin.value));
          let leftPercentage = (parseInt(rangeMin.value) / rangeMin.max) * 100 ;
          range.style.left = `calc(${leftPercentage}% - 8px)`;
          this.toggleErrorMessage(priceMin, priceMax, rangeMax, priceGap);
        } else {
          this.setPriceAndProgress(range, priceMin, priceMax, rangeMin, rangeMax, minVal, maxVal, priceGap);
        }
      }

      setPriceAndProgress(range, priceMin, priceMax, rangeMin, rangeMax, minVal, maxVal, priceGap){
        priceMin.value = this.formatPrice(minVal);
        priceMax.value = this.formatPrice(maxVal, true);
        let leftPercentage = (minVal / rangeMin.max) * 100;
        let rightPercentage = 100 - (maxVal / rangeMax.max) * 100;
        range.style.left = `calc(${leftPercentage}% - 8px)`;
        range.style.right = `calc(${rightPercentage}% - 8px)`;
        this.toggleErrorMessage(priceMin, priceMax, rangeMax, priceGap);
      }

      handleMaxPriceChange(range, priceMin, priceMax, rangeMax, priceGap){
        // If input is empty, default to max allowed value
        if (priceMax.value.trim() === '') {
          let maxAllowed = parseInt(rangeMax.max);
          priceMax.value = this.formatPrice(maxAllowed, true);
          rangeMax.value = maxAllowed;
          let rightPercentage = 0;
          range.style.right = `calc(${rightPercentage}% - 8px)`;
          this.toggleErrorMessage(priceMin, priceMax, rangeMax, priceGap);
          return;
        }
        
        let minPrice = this.getPriceInUnits(priceMin.value, false);
        let maxPrice = this.getPriceInUnits(priceMax.value, true);
        if (maxPrice - minPrice >= priceGap && maxPrice <= parseInt(rangeMax.max) && maxPrice >= 0) {
          rangeMax.value = maxPrice;
          let rightPercentage = 100 - (maxPrice / rangeMax.max) * 100;
          range.style.right = `calc(${rightPercentage}% - 8px)`;
          this.toggleErrorMessage(priceMin, priceMax, rangeMax, priceGap);
        }else{
          this.toggleErrorMessage(priceMin, priceMax, rangeMax, priceGap);
        }
      }
      
      handleMinPriceChange(range, priceMin, priceMax, rangeMin, rangeMax, priceGap){
        // If input is empty, default to 0
        if (priceMin.value.trim() === '') {
          priceMin.value = this.formatPrice(0);
          rangeMin.value = 0;
          let leftPercentage = 0;
          range.style.left = `calc(${leftPercentage}% - 8px)`;
          this.toggleErrorMessage(priceMin, priceMax, rangeMax, priceGap);
          return;
        }
        
        let minPrice = this.getPriceInUnits(priceMin.value, false);
        let maxPrice = this.getPriceInUnits(priceMax.value, true);

        if (maxPrice - minPrice >= priceGap && minPrice <= parseInt(rangeMax.max) && minPrice >= 0) {
          rangeMin.value = minPrice;
          let leftPercentage = (minPrice / rangeMin.max) * 100;
          range.style.left = `calc(${leftPercentage}% - 8px)`;
          this.toggleErrorMessage(priceMin, priceMax, rangeMax, priceGap);
        }else{
          this.toggleErrorMessage(priceMin, priceMax, rangeMax, priceGap);
        }
      }

      toggleErrorMessage(priceMin, priceMax, rangeMax, priceGap){
        let minPrice = this.getPriceInUnits(priceMin.value, false);
        let maxPrice = this.getPriceInUnits(priceMax.value, true);
        const fromErrorEl = this.querySelector('.filter-price-error.from-error');
        const toErrorEl = this.querySelector('.filter-price-error.to-error');
        const bothErrorEl = this.querySelector('.filter-price-error.both-error');
        const rangeMaxVal = parseInt(rangeMax.max);
        
        if (maxPrice - minPrice >= priceGap && minPrice <= rangeMaxVal && maxPrice <= rangeMaxVal && minPrice >= 0 && maxPrice >= 0) {
          fromErrorEl.style.display = 'none';
          bothErrorEl.style.display = 'none';
          toErrorEl.style.display = 'none';
        }else if(minPrice < 0 || maxPrice < 0){
          fromErrorEl.style.display = 'none';
          toErrorEl.style.display = 'none';
          bothErrorEl.style.display = 'block';
        }else if(minPrice > maxPrice) {
          toErrorEl.style.display = 'none';
          bothErrorEl.style.display = 'none';
          fromErrorEl.style.display = 'block';
        }else if(maxPrice > rangeMaxVal){
          fromErrorEl.style.display = 'none';
          bothErrorEl.style.display = 'none';
          toErrorEl.style.display = 'block';
        }
      }

    }
    customElements.define('price-range', PriceRange); 


    class CollapsibleContent extends HTMLElement {
      constructor() {
        super();
        const toggle = this.querySelector('.collapsible-toggle');
        window.addEventListener('load', this.handleCollapseState.bind(this));
        window.addEventListener('resize', this.handleCollapseState.bind(this));
        document.addEventListener('shopify:section:load', this.handleCollapseState.bind(this));
        toggle.addEventListener('click', this.handleCollapse.bind(this));
        
      }
      handleCollapseState(){
        const content = this.querySelector('.collapsible-content');
        if(this.getAttribute('aria-expanded') == "true"){
          content.style.height = content.querySelector('.collapsible-content-inner').scrollHeight + 'px';
        }else{
          content.style.height = '0px';
        }
      }
      handleCollapse() {
        const toggle = this.querySelector('.collapsible-toggle');
        const content = this.querySelector('.collapsible-content');
        
        const parentGroup = this.closest('[data-behaviour="group"]');
    
        if (parentGroup) {
          const otherCollapsibles = parentGroup.querySelectorAll('collapsible-content');
          otherCollapsibles.forEach(collapsible => {
            if (collapsible !== this) {
              collapsible.close();
            }
          });
        }
    
        if (content.style.height === '0px') {
          content.style.height = content.scrollHeight + 'px';
          this.setAttribute('aria-expanded', true);
        } else {
          content.style.height = '0px';
          this.setAttribute('aria-expanded', false);
        }
      }
    
      close() {
        const content = this.querySelector('.collapsible-content');
        content.style.height = '0px';
        this.setAttribute('aria-expanded', false);
      }

    }
    customElements.define('collapsible-content', CollapsibleContent);

    document.addEventListener('DOMContentLoaded', thumbProductModel);
    document.addEventListener('shopify:section:load', thumbProductModel);
    function thumbProductModel(){
      var thumb_image = document.querySelectorAll('.thumb-image');
      for (var i = 0; i < thumb_image.length; i++) {
        thumb_image[i].addEventListener('click', function (event) {
          var model = document.querySelector('.product-model-inner');
          model.style.display = 'block';
        });
      }
      var model_close = document.querySelector('.product-model-close');
      model_close.addEventListener('click', function (event) {
        var model = document.querySelector('.product-model-inner');
        model.style.display = 'none';
      });
    }

    function trapFocus(event, trapcontainer) {
      const focusableElements = trapcontainer.querySelectorAll(
      'a[href], button:not([tabindex="-1"]), textarea, input[type="text"], input[type="radio"], input[type="tel"], input[type="checkbox"], select'
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];
      const isTabPressed = event.key === 'Tab' || event.keyCode === 9;

      if (!isTabPressed) {
        return;
      }

      if (event.shiftKey) {
        // If Shift + Tab is pressed, focus the last focusable element when the first focusable element is reached
        if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
        }
      } else {
        // If Tab is pressed, focus the first focusable element when the last focusable element is reached
        if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
        }
      }
    }

    document.addEventListener('shopify:section:load', countryListFocus);
    document.addEventListener('DOMContentLoaded', countryListFocus);
    function countryListFocus(){
      var countryListEl = document.getElementById('CountryList');
      if(countryListEl){
        countryListEl.addEventListener('keydown', function(event) {
          trapFocus(event, countryListEl);
        });
      }
    }

    document.addEventListener('shopify:section:load', addressFormFocus);
    document.addEventListener('DOMContentLoaded', addressFormFocus);
    function addressFormFocus(){
      var addressFormArr = document.querySelectorAll('.address-form-popup-wrapper');
      for (let i = 0; i < addressFormArr.length; i++) {
        let addressForm = addressFormArr[i];
        addressForm.addEventListener('keydown', function(event) {
          trapFocus(event, addressForm);
        });
      }
    }

    window.addEventListener('pageshow', function(event) {
      if (event.persisted) {
        updateCartCount();
      }
    });
    function updateCartCount() {
      fetch('/cart.js')
        .then(res => res.json())
        .then(cart => {
          // Update the cart count element
          const cartCountElement = document.querySelector('.cart-count');
          if (cartCountElement) {
            cartCountElement.textContent = cart.item_count;
          }
          
          const productSections = document.querySelectorAll('.product-section-wrapper');
          productSections.forEach(section => {
            const productForm = section.querySelector('.shopify-product-form');
            const variantId = productForm.querySelector('[name="id"]').value;
            const cartItems = cart.items;
            let variantQuantity = 0;
            cartItems.forEach(cartItem => {
              const cartItemId = cartItem.variant_id;
              if(cartItemId == variantId) {
                variantQuantity += cartItem.quantity;
              }
            })
            const productCartCountEl = section.querySelector('[data-cart-count]');
            productCartCountEl.setAttribute('data-cart-count', variantQuantity);
          })
        })
        .catch(error => {
          console.error('Error fetching cart data:', error);
        });
    }
    
    window.addEventListener('pageshow', function(event) {
      let productDetails = document.querySelectorAll('.featured-product-section .product-detail');
  
      productDetails.forEach(productDetail => {
        let variantSelector = productDetail.querySelector('variant-selector');
        if (variantSelector) {
          // Do something with the variantSelector, for example:
          let variantSection = variantSelector.dataset.section; 
          function handleSectionResponse() {
            if(this.status === 200) {
              let newProductSection = new DOMParser().parseFromString(this.responseText, 'text/html');
              var newVariantSelector = newProductSection.querySelector('variant-selector');
              variantSelector.innerHTML = newVariantSelector.innerHTML;
            }else{
              console.log(this.statusText)
            }
          }
          const request = new XMLHttpRequest();
          request.addEventListener('load', handleSectionResponse);
          request.open('GET', window.location.pathname + '?section_id=' + variantSection , true);
          request.send();
        }
      });
    });


    document.addEventListener('shopify:section:load', handleQuickView);
    document.addEventListener('shopify:section:unload', handleQuickView);
    document.addEventListener('DOMContentLoaded', handleQuickView);

    let isQuickViewSelected = false;
    let isQuickViewOpen = false;

    if (Shopify.designMode) {
      document.addEventListener('shopify:section:select', (event) => handleSectionEvent(event, quickViewShow, quickViewClose));
      document.addEventListener('shopify:section:deselect', (event) => handleSectionEvent(event, null, quickViewClose));
      document.addEventListener('shopify:section:load', (event) => handleSectionEvent(event, quickViewShow, quickViewClose));
      document.addEventListener('shopify:section:unload', (event) => handleSectionEvent(event, null, quickViewClose));
    }

    function handleQuickView() {
      setTimeout(() => {
        const quickViewSection = document.querySelector('.quick-view-section');
        const quickViewWrappers = document.querySelectorAll('.quick-view-wrapper');
        
        quickViewWrappers.forEach(wrapper => {
          const quickViewButton = wrapper.querySelector('.quick-view-button');
    
          if (quickViewButton) {
            const newButton = quickViewButton.cloneNode(true);
            quickViewButton.parentNode.replaceChild(newButton, quickViewButton);
    
            const setupMode = Shopify.designMode ? setupDesignMode : setupNonDesignMode;
            setupMode(wrapper, quickViewSection, newButton);
          }
        });
          const quickViewModal = quickViewSection
              ? quickViewSection.querySelector('#quick-view-modal')
              : null;
    
        if (quickViewModal) {
          const quickViewCloseBtn = quickViewSection.querySelector('.quick-view-close');
          if (quickViewCloseBtn) {
            const newCloseButton = quickViewCloseBtn.cloneNode(true);
            quickViewCloseBtn.parentNode.replaceChild(newCloseButton, quickViewCloseBtn);
    
            newCloseButton.addEventListener('click', () => quickViewClose(quickViewSection.id));
          }

          if (document.quickViewClickListenerAdded) {
            document.removeEventListener('click', document.quickViewClickListener);
          }
    
          document.quickViewClickListener = (event) => {
            const quickViewCard = quickViewSection.querySelector('.product-page');
            const quickViewCartPopup = document.querySelector('.cart-popup-wrapper');
            const quickViewButtonClicked = event.target.closest('.quick-view-button');
            if (
              (quickViewCard && !quickViewCard.contains(event.target)) &&
              (quickViewCartPopup && !quickViewCartPopup.contains(event.target)) &&
              !quickViewButtonClicked
            ) {
              quickViewClose(quickViewSection.id);
            }
          };

          document.addEventListener('click', document.quickViewClickListener);
          document.quickViewClickListenerAdded = true;
        }
      }, 100);
    }

    function setupDesignMode(wrapper, quickViewSection, quickViewButton) {
      const quickViewModal = quickViewSection.querySelector('#quick-view-modal');
      wrapper.classList.toggle('show', !!quickViewModal);
      if (quickViewModal) bindQuickViewButton(quickViewButton, quickViewSection.id);
    }

    function setupNonDesignMode(wrapper, quickViewSection, quickViewButton) {
      const quickViewModal = quickViewSection.querySelector('#quick-view-modal');
      if (quickViewModal) {
        wrapper.classList.add('show');
        bindQuickViewButton(quickViewButton, quickViewSection.id);
      } else {
        wrapper.remove();
      }
    }

    function bindQuickViewButton(button, sectionId) {
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
    
      newButton.addEventListener('click', () => fetchQuickView(sectionId, newButton));
    }

    function fetchQuickView(sectionId, button) {
      const separator = button.dataset.url.includes('?') ? '&' : '?';
      const fetchId = sectionId.replace('shopify-section-', '');
      const productURL = `${button.dataset.url}${separator}section_id=${fetchId}`;
    
      fetch(productURL)
        .then(response => response.text())
        .then(htmlString => {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = htmlString;

          const fetchedProductGrid = tempDiv.querySelector(`#${sectionId} .product-grid`);
          const fetchedSectionContent = fetchedProductGrid.innerHTML;
          const fetchedProductGridClasses = fetchedProductGrid.className;

          const currentProductGrid = document.querySelector(`#${sectionId} .product-grid`);
          currentProductGrid.innerHTML = fetchedSectionContent;
          currentProductGrid.className = fetchedProductGridClasses;
    
          const quickViewMedia = tempDiv.querySelector(`#${sectionId} .product-medias`);
          productSectionSlider();
          thumbProductModel();
          shopifyXr();
          cleanUpVideoPlayers();
          productForm();
          quantityBtnHandle();
          quantityInputHandle();
    
          if (quickViewMedia) videoPlayerInitialise(`#${quickViewMedia.id}`);
          isQuickViewOpen = true;
          quickViewShow(sectionId);
        })
        .catch(error => console.error('Error loading quick view:', error));
    }

    function quickViewShow(sectionId) {
      const htmlEl = document.querySelector('html');
      const quickView = document.querySelector(`#${sectionId}`);
      const quickViewCard = quickView.querySelector('.product-page');
    
      quickView.classList.add('show');
      htmlEl.classList.add('popup-show');
      if (Shopify.designMode) quickView.classList.add('fade');
    
      setTimeout(() => {
        quickView.classList.add('fade');
        if (!Shopify.designMode) quickViewCard.focus();
      }, 100);
    
      quickViewCard.setAttribute('tabindex', '-1');
      quickViewCard.addEventListener('keydown', (event) => trapFocus(event, quickViewCard));
    }

    function quickViewClose(sectionId) {
      const htmlEl = document.querySelector('html');
      const quickView = document.querySelector(`#${sectionId}`);
      if (Shopify.designMode && isQuickViewSelected) {
        htmlEl.classList.remove('popup-show');
        return;
      }
    
      quickView.classList.remove('fade');
      setTimeout(() => {
        
        if(!isQuickViewSelected){
          quickView.classList.remove('show');
          htmlEl.classList.remove('popup-show');
        }
      }, 400);
    }

    function handleSectionEvent(event, showAction, closeAction = null) {
      const quickViewSection = document.querySelector('.quick-view-section');
      const quickViewModal = event.target.querySelector('#quick-view-modal');
      if (event.target.classList.contains('quick-view-section') && quickViewModal) {
        if (showAction && closeAction){
          if(event.type == 'shopify:section:select'){
            isQuickViewSelected = true;
            isQuickViewOpen = true;
            showAction(quickViewSection.id);
          }else{
            if(isQuickViewSelected){
              isQuickViewOpen = true;
              showAction(quickViewSection.id);
            }
          }
        } else if (closeAction){
          if(event.type == 'shopify:section:deselect'){
            isQuickViewSelected = false;
          }
          isQuickViewOpen = false;
          closeAction(quickViewSection.id);
        }
      } else {
        if (closeAction && isQuickViewOpen && !isQuickViewSelected) {
          isQuickViewSelected = false;
          isQuickViewOpen = false;
          closeAction(quickViewSection.id);
        }
        if(event.type == 'shopify:section:deselect'){
          isQuickViewSelected = true;
        }else if(event.type == 'shopify:section:select' || event.type == 'shopify:section:load'){
          isQuickViewSelected = false;
        }
      }
    }

// Viedeo carousel - START
function videoCarousel(sectionId) {
  const swiperEl = document.getElementById(`${sectionId}-video-carousel`);
  if (!swiperEl) return;
  
  // Get navigation buttons from parent wrapper
  const wrapper = swiperEl.closest('.wrapper');
  const swiperNavigationNext = wrapper ? wrapper.querySelector(`.video-carousel-button-next[data-carousel-id="${sectionId}-video-carousel"]`) : null;
  const swiperNavigationPrev = wrapper ? wrapper.querySelector(`.video-carousel-button-prev[data-carousel-id="${sectionId}-video-carousel"]`) : null;

  // Get slidesPerView from dataset
  const slidesPerViewLargeDesktop = parseInt(swiperEl.dataset.slidesPerViewLargeDesktop) || 7;
  const slidesPerViewDesktop = parseInt(swiperEl.dataset.slidesPerViewDesktop) || 5;
  const slidesPerViewTablet = parseInt(swiperEl.dataset.slidesPerViewTablet) || 3;
  const slidesPerViewMobileLandscape = parseInt(swiperEl.dataset.slidesPerViewMobileLandscape) || 2;
  const slidesPerViewMobile = parseInt(swiperEl.dataset.slidesPerViewMobile) || 2;

  // Only enable navigation if both next and prev buttons exist
  const navigationEnabled = !!(swiperNavigationNext && swiperNavigationPrev);

  // Build Swiper params
  const swiperParams = { 
    loop: false,
    pagination: false,
    spaceBetween: 20,
    slidesPerView: slidesPerViewMobile,
    centerInsufficientSlides: true,
    breakpoints: {
      566: {
        slidesPerView: slidesPerViewMobileLandscape,
      },
      768: {
        slidesPerView: slidesPerViewTablet,
      },
      1024: {
        slidesPerView: slidesPerViewDesktop,
      },
      1299: {
        slidesPerView: slidesPerViewLargeDesktop,
      },
    },
  };

  // Add navigation if enabled
  if (navigationEnabled) {
    swiperParams.navigation = {
      nextEl: swiperNavigationNext,
      prevEl: swiperNavigationPrev,
    };
  }

  // Add a11y properties from window object
  if (window.videoCarouselA11y) {
    swiperParams.a11y = {
      id: `video-carousel-${sectionId}`,
      prevSlideMessage: window.videoCarouselA11y.prev_slide,
      nextSlideMessage: window.videoCarouselA11y.next_slide,
      slideLabelMessage: window.videoCarouselA11y.slide_label,
    };
  }

  // Initialize Swiper with traditional syntax
  const swiper = new Swiper(swiperEl, swiperParams);
  
  // Store swiper instance on element for reference
  swiperEl.swiper = swiper;
  
  // Remove swiper-initialize class from wrapper to show the carousel
  const videoCarouselWrapper = swiperEl.closest('.video-carousel-wrapper');
  if (videoCarouselWrapper) {
    videoCarouselWrapper.classList.remove('swiper-initialize');
  }
  
  videoToggle(swiperEl);
}

function videoToggle(swiperEl) {
  const videoToggleBtns = swiperEl.querySelectorAll('.video-toggle');
  const soundToggleBtns = swiperEl.querySelectorAll('.video-sound-toggle');
  const playOnSetting = swiperEl.dataset.videoPlayOn || 'click';
  const isHoverSupported = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  
  // Handle video play/pause buttons
  videoToggleBtns.forEach(btn => {
    const videoWrapper = btn.closest('.video-wrapper');
    const video = videoWrapper?.querySelector('video');
    if (!video) return;

    // Find the closest swiper-slide and get its index
    const swiperSlide = btn.closest('swiper-slide');
    let slideIndex = 0;
    if (swiperSlide) {
      const slides = Array.from(swiperSlide.parentElement.children).filter(
        el => el.tagName.toLowerCase() === 'swiper-slide'
      );
      slideIndex = slides.indexOf(swiperSlide) + 1;
    }

    function setPlayState() {
      btn.setAttribute(
      'aria-label',
      (window.videoCarouselA11y?.play_video || 'Play video').replace('{{ id }}', slideIndex)
      );
      btn.querySelector('span').innerHTML = window.videoCarouselA11y?.play_icon || '';
      btn.classList.remove('playing');
      btn.setAttribute('aria-pressed', 'false');
    }

    function setPauseState() {
      btn.setAttribute(
      'aria-label',
      (window.videoCarouselA11y?.pause_video || 'Pause video').replace('{{ id }}', slideIndex)
      );
      btn.querySelector('span').innerHTML = window.videoCarouselA11y?.pause_icon || '';
      btn.classList.add('playing');
      btn.setAttribute('aria-pressed', 'true');
    }

    // Always add click handler for button
    if (playOnSetting === 'click' || !isHoverSupported) {
      btn.addEventListener('click', () => {
        if (video.paused) {
          // Pause all other videos in the carousel before playing this one
          const allVideos = swiperEl.querySelectorAll('video');
          allVideos.forEach(v => {
            if (v !== video && !v.paused) {
              v.pause();
            }
          });
          video.play();
        } else {
          video.pause();
        }
      });
    } else if (playOnSetting === 'hover' && isHoverSupported) {
      // Handle focus within video wrapper
      videoWrapper.addEventListener('focusin', () => {
        video.play();
      });
      
      videoWrapper.addEventListener('focusout', (event) => {
        // Only pause if the focus is leaving the video wrapper completely
        if (!videoWrapper.contains(event.relatedTarget)) {
          video.pause();
        }
      });
    }

    // Set up hover behavior if setting is 'hover' and device supports hover
    if (playOnSetting === 'hover' && isHoverSupported) {
      videoWrapper.addEventListener('mouseenter', () => {
        video.play();
      });
      
      videoWrapper.addEventListener('mouseleave', () => {
        video.pause();
      });
    }

    video.addEventListener('play', setPauseState);
    video.addEventListener('pause', setPlayState);

    // Set initial state
    if (video.paused) {
      setPlayState();
    } else {
      setPauseState();
    }
  });

  // Handle sound toggle buttons
  soundToggleBtns.forEach(btn => {
    const videoWrapper = btn.closest('.video-wrapper');
    const video = videoWrapper?.querySelector('video');
    if (!video) return;

    // Find the closest swiper-slide and get its index
    const swiperSlide = btn.closest('swiper-slide');
    let slideIndex = 0;
    if (swiperSlide) {
      const slides = Array.from(swiperSlide.parentElement.children).filter(
        el => el.tagName.toLowerCase() === 'swiper-slide'
      );
      slideIndex = slides.indexOf(swiperSlide) + 1;
    }

    function setMuteState() {
      btn.setAttribute(
        'aria-label',
        (window.videoCarouselA11y?.unmute_video || 'Unmute video').replace('{{ id }}', slideIndex)
      );
      btn.innerHTML = window.videoCarouselA11y?.volume_off_icon || '🔇';
      btn.setAttribute('aria-pressed', 'true');
    }

    function setUnmuteState() {
      btn.setAttribute(
        'aria-label',
        (window.videoCarouselA11y?.mute_video || 'Mute video').replace('{{ id }}', slideIndex)
      );
      btn.innerHTML = window.videoCarouselA11y?.volume_icon || '🔊';
      btn.setAttribute('aria-pressed', 'false');
    }

    // Add click handler for sound toggle button
    btn.addEventListener('click', () => {
      video.muted = !video.muted;
      if (video.muted) {
        setMuteState();
      } else {
        setUnmuteState();
      }
    });

    // Set initial state based on video muted property
    if (video.muted) {
      setMuteState();
    } else {
      setUnmuteState();
    }
  });
}
// Viedeo carousel - END

    // Scrolling Image Section - START
function initScrollingImageSections() {
  document.querySelectorAll('.scrolling-image-section').forEach(section => {
    const wrapper = section.querySelector('.scrolling-image-wrapper');
    if (!wrapper) return;
    wrapper.classList.add('no-scrolling');
    const scrollSpeed = parseInt(wrapper.getAttribute('data-scroll-speed')) || 8;
    setScrollingImageAnimationDuration(wrapper, scrollSpeed);
    duplicateScrollingImageContainer(wrapper);
  });
}

function duplicateScrollingImageContainer(wrapper) {
  const scrollingImageContainer = wrapper.querySelector('.scrolling-image-container');
  if (!scrollingImageContainer) return;
  const screenWidth = window.innerWidth;
  const containerWidth = scrollingImageContainer.offsetWidth;
  const duplicatesNeeded = Math.ceil(screenWidth / containerWidth);
  for (let i = 0; i < duplicatesNeeded; i++) {
    const clone = scrollingImageContainer.cloneNode(true);
    if (i === 0) {
      wrapper.replaceChildren(clone);
      continue;
    }
    clone.setAttribute('aria-hidden', 'true');
    wrapper.appendChild(clone);
  }
  // Add one more for seamless loop
  const extraClone = scrollingImageContainer.cloneNode(true);
  extraClone.setAttribute('aria-hidden', 'true');
  wrapper.appendChild(extraClone);
  wrapper.classList.remove('no-scrolling');
}

function setScrollingImageAnimationDuration(wrapper, speed) {
  const scrollingImageContainer = wrapper.querySelector('.scrolling-image-container');
  if (!scrollingImageContainer) return;
  const wrapperWidth = wrapper.offsetWidth;
  const containerWidth = scrollingImageContainer.offsetWidth;
  let duration = containerWidth / wrapperWidth;
  if (window.innerWidth >= 1280) {
    duration *= (speed * 2);
  } else if (window.innerWidth >= 1024) {
    duration *= (speed * 1.5);
  } else if (window.innerWidth >= 768) {
    duration *= (speed * 1);
  } else {
    duration *= (speed * 0.5);
  }
  wrapper.style.setProperty('--animation-duration', `${duration}s`);
}

window.addEventListener('DOMContentLoaded', () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initScrollingImageSections);
  } else {
    setTimeout(initScrollingImageSections, 100);
  }
});
window.addEventListener('resize', initScrollingImageSections);
document.addEventListener('shopify:section:load', initScrollingImageSections);
// Scrolling Image Section - END