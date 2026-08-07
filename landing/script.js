// Horang Landing Page Script: Scroll Reveal, FAQ, Showcase Tabs, Latest Release Sync

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Scroll Reveal Animations (IntersectionObserver)
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
  // 2. FAQ Accordion Logic (Using 'faq-open' to prevent collision with scroll reveal 'active')
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
  // 3. App Showcase Tabs & Lightbox Zoom Logic
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

  // ==========================================
  // 4. Latest Release Auto-Sync
  // ==========================================
  // 다운로드 링크/버전 표시를 GitHub 릴리즈 저장소의 실제 최신 릴리즈에서 매번 가져와서
  // 채운다. HTML에 박아둔 버전 번호는 JS가 실패했을 때(오프라인, API 레이트리밋 등)를 위한
  // 폴백일 뿐 - 새 버전을 낼 때마다 이 페이지를 손으로 고칠 필요가 없다.
  const RELEASES_API = 'https://api.github.com/repos/zx3519-star/horang-releases/releases/latest'

  fetch(RELEASES_API)
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
    .then((release) => {
      const asset = (release.assets || []).find((a) => a.name.endsWith('-setup.exe'))
      if (!asset) return

      document.querySelectorAll('[data-download-link]').forEach((el) => {
        el.href = asset.browser_download_url
      })

      const brandTag = document.getElementById('brandTag')
      if (brandTag && release.tag_name) {
        brandTag.textContent = release.tag_name
      }
    })
    .catch(() => {
      // 조용히 실패 - 이미 HTML에 있는 정적 폴백 링크/버전 텍스트가 그대로 남는다.
    })
})
