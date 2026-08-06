// Horang Landing Page Script: Dark Theme & Scroll Reveal Animations

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Dark Theme Auto-Detection & Toggle Logic
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggleBtn')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')

  function getSavedTheme() {
    return localStorage.getItem('horang_theme')
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }

  // Initial Theme Setup
  const savedTheme = getSavedTheme()
  if (savedTheme) {
    applyTheme(savedTheme)
  } else if (systemPrefersDark.matches) {
    applyTheme('dark')
  }

  // Listen to OS system color preference changes if no manual override
  systemPrefersDark.addEventListener('change', (e) => {
    if (!getSavedTheme()) {
      applyTheme(e.matches ? 'dark' : 'light')
    }
  })

  // Manual Toggle Button
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme')
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

      applyTheme(newTheme)
      localStorage.setItem('horang_theme', newTheme)
    })
  }

  // ==========================================
  // 2. Scroll Reveal Animations (IntersectionObserver)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal')

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      }
    )

    revealElements.forEach((el) => revealObserver.observe(el))
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach((el) => el.classList.add('active'))
  }

  // Trigger check for elements already in viewport on initial load
  setTimeout(() => {
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        el.classList.add('active')
      }
    })
  }, 50)

  // ==========================================
  // 3. FAQ Accordion Logic (Using 'faq-open' to prevent collision with scroll reveal 'active')
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item')
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question')
    const answer = item.querySelector('.faq-answer')

    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('faq-open')

        // Close all other items
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove('faq-open')
          const otherAnswer = otherItem.querySelector('.faq-answer')
          if (otherAnswer) otherAnswer.style.maxHeight = null
        })

        // Toggle clicked item
        if (!isOpen) {
          item.classList.add('faq-open')
          answer.style.maxHeight = answer.scrollHeight + 'px'
        }
      })
    }
  })

  // ==========================================
  // 4. App Showcase Tabs & Lightbox Zoom Logic
  // ==========================================
  const tabBtns = document.querySelectorAll('.tab-btn')
  const showcasePanels = document.querySelectorAll('.showcase-panel')

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab')
      tabBtns.forEach((b) => b.classList.remove('active'))
      showcasePanels.forEach((p) => p.classList.remove('active'))

      btn.classList.add('active')
      const targetPanel = document.getElementById(targetId)
      if (targetPanel) {
        targetPanel.classList.add('active')
      }
    })
  })

  // Lightbox Modal Zoom
  const lightbox = document.getElementById('imageLightbox')
  const lightboxImg = document.getElementById('lightboxImg')
  const lightboxClose = document.querySelector('.lightbox-close')
  const zoomableBoxes = document.querySelectorAll('.zoomable')

  zoomableBoxes.forEach((box) => {
    box.addEventListener('click', () => {
      const src = box.getAttribute('data-src') || box.querySelector('img').src
      if (lightbox && lightboxImg) {
        lightboxImg.src = src
        lightbox.classList.add('open')
      }
    })
  })

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('open')
    })
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open')
      }
    })
  }
})

