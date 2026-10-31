// 호랑 랜딩 v7
document.documentElement.classList.add('js')

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (window.lucide) window.lucide.createIcons()

  // <use>로 그린 호랑이는 안쪽(눈·귀)에 CSS 움직임을 걸 수 없어서 실제 노드로 바꿔 끼운다
  const tiger = document.getElementById('tiger')
  document.querySelectorAll('svg.mascot use').forEach((use) => {
    const copy = tiger.cloneNode(true)
    copy.removeAttribute('id')
    use.replaceWith(copy)
  })

  /* 머리: 스크롤하면 밑줄, 지금 보는 섹션 표시 */
  const header = document.querySelector('.site-header')
  const navLinks = [...document.querySelectorAll('.site-header nav a[href^="#"]')]
  const navSections = navLinks
    .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
    .filter(({ section }) => section)
  let scrollFrame = null
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8)
    const marker = window.scrollY + window.innerHeight * 0.34
    let active = null
    navSections.forEach(({ section }) => {
      if (section.offsetTop <= marker) active = section
    })
    navSections.forEach(({ link, section }) => {
      link.classList.toggle('is-active', section === active)
      if (section === active) link.setAttribute('aria-current', 'true')
      else link.removeAttribute('aria-current')
    })
    scrollFrame = null
  }
  window.addEventListener(
    'scroll',
    () => {
      if (scrollFrame === null) scrollFrame = requestAnimationFrame(onScroll)
    },
    { passive: true }
  )
  onScroll()

  /* 스크롤 등장 */
  const reveals = document.querySelectorAll('.reveal')
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px' }
    )
    reveals.forEach((el) => io.observe(el))
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'))
  }

  /* 화면 둘러보기 */
  const screens = [
    {
      key: 'dashboard',
      label: '대시보드',
      title: '오늘 챙길 것부터',
      text: '지난 마감, 진행 중인 의뢰, 아직 안 들어온 돈, 이번 달 순수익을 첫 화면에서 봐요. 고정한 커미션은 단계 색 카드로 맨 위에 서요.'
    },
    {
      key: 'list',
      label: '커미션 목록',
      title: '찾고 싶은 의뢰만 골라서',
      text: '출처, 유형, 옵션, 고객, 기간, 미수금 여부로 걸러 봐요. 걸러 낸 목록 그대로 엑셀로 내보낼 수 있어요.'
    },
    {
      key: 'detail',
      label: '커미션 상세',
      title: '의뢰 하나의 모든 것',
      text: '진행 단계, 협의 사항, 가격 내역, 선금과 잔금, 작업 파일과 기록이 한 화면에 모여 있어요.'
    },
    {
      key: 'new-commission',
      label: '새 커미션',
      title: '고르기만 하면 가격이 나와요',
      text: '캐릭터를 추가하고 가격표의 유형과 옵션을 고르면 금액이 계산돼요. 작업 폴더도 바로 만들어 줘요.'
    },
    {
      key: 'stats',
      label: '통계',
      title: '얼마나 벌었고 얼마나 빠졌는지',
      text: '기간별 의뢰 수와 매출, 플랫폼·페이팔 수수료, 예상 실수령액까지 숫자로 정리해 줘요.'
    },
    {
      key: 'customers',
      label: '고객',
      title: '다시 찾아온 고객도 바로',
      text: '고객마다 지난 주문 이력과 누적 결제액이 남아 있어서, 재의뢰가 오면 예전 작업을 금방 찾아요.'
    },
    {
      key: 'ledger',
      label: '가계부',
      title: '받은 돈은 알아서 가계부로',
      text: '커미션 입금은 자동으로 기록되고, 재료비나 구독료 같은 지출은 직접 적어요. 매달 반복되는 항목도 걸어 둘 수 있어요.'
    },
    {
      key: 'ledger-stats',
      label: '가계부 통계',
      title: '한 해 흐름을 그래프로',
      text: '월별 수입과 지출, 순이익 선, 분류별 비중을 6개월·1년·전체로 바꿔 봐요.'
    },
    {
      key: 'schedule',
      label: '일정',
      title: '마감과 내 일정을 한 달력에',
      text: '목록·일·주·월 보기로 바꾸고, 끌어서 옮기고, 반복 일정과 공휴일까지 함께 봐요.'
    },
    {
      key: 'memo',
      label: '메모',
      title: '아이디어는 카드 보드에',
      text: '카테고리별로 메모 카드를 붙이고 끌어서 정리해요. 커미션이나 고객과 서로 연결할 수도 있어요.'
    }
  ]

  const tabs = document.querySelector('.tour-tabs')
  const blob = tabs.querySelector('.tab-blob')
  const image = document.querySelector('.tour-image')
  const caption = document.querySelector('.tour-caption')
  const title = caption.querySelector('.tour-title')
  const text = caption.querySelector('.tour-text')
  const count = caption.querySelector('.tour-count')
  let current = 0

  const buttons = screens.map((screen, index) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'tour-tab'
    button.setAttribute('role', 'tab')
    button.textContent = screen.label
    button.addEventListener('click', () => show(index))
    button.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') show((current + 1) % screens.length, true)
      if (event.key === 'ArrowLeft') show((current - 1 + screens.length) % screens.length, true)
    })
    tabs.appendChild(button)
    // 넘길 때 버벅이지 않도록 미리 받아 둔다
    new Image().src = `screens/${screen.key}.webp`
    return button
  })

  const moveBlob = () => {
    const button = buttons[current]
    blob.style.width = `${button.offsetWidth}px`
    blob.style.height = `${button.offsetHeight}px`
    blob.style.transform = `translate(${button.offsetLeft}px, ${button.offsetTop}px)`
  }

  const show = (index, focus = false) => {
    const changed = index !== current
    current = index
    const screen = screens[index]
    buttons.forEach((button, i) => {
      button.setAttribute('aria-selected', String(i === index))
      button.tabIndex = i === index ? 0 : -1
    })
    if (focus) buttons[index].focus()
    moveBlob()
    title.textContent = screen.title
    text.textContent = screen.text
    count.textContent = `${index + 1} / ${screens.length}`
    image.alt = `${screen.label} 화면. ${screen.text}`

    if (!changed || reduceMotion) {
      image.src = `screens/${screen.key}.webp`
      return
    }
    caption.classList.remove('bump')
    void caption.offsetWidth
    caption.classList.add('bump')
    image.classList.remove('swap-in')
    image.classList.add('swap-out')
    setTimeout(() => {
      image.src = `screens/${screen.key}.webp`
      image.classList.remove('swap-out')
      image.classList.add('swap-in')
    }, 180)
  }

  document
    .querySelector('[data-tour-prev]')
    .addEventListener('click', () => show((current - 1 + screens.length) % screens.length))
  document
    .querySelector('[data-tour-next]')
    .addEventListener('click', () => show((current + 1) % screens.length))
  window.addEventListener('resize', moveBlob)
  show(0)

  /* 호랑이 눈이 마우스를 따라온다 */
  if (!reduceMotion) {
    const eyes = [...document.querySelectorAll('.jumper .eyes')]
    window.addEventListener(
      'pointermove',
      (event) => {
        eyes.forEach((group) => {
          const box = group.ownerSVGElement.getBoundingClientRect()
          const dx = event.clientX - (box.left + box.width / 2)
          const dy = event.clientY - (box.top + box.height / 2)
          const len = Math.hypot(dx, dy) || 1
          const reach = Math.min(4, len / 40)
          group.style.transform = `translate(${(dx / len) * reach}px, ${(dy / len) * reach}px)`
        })
      },
      { passive: true }
    )
  }

  /* 다운로드 링크와 버전을 최신 릴리스에 맞춘다 */
  const fallbackUrl = 'https://github.com/zx3519-star/horang-releases/releases/latest'
  const downloadLinks = document.querySelectorAll('[data-download-link]')
  fetch('https://api.github.com/repos/zx3519-star/horang-releases/releases/latest')
    .then((response) => (response.ok ? response.json() : null))
    .then((release) => {
      if (!release) return
      const installer = release.assets?.find((asset) => asset.name.endsWith('.exe'))
      if (installer?.browser_download_url) {
        downloadLinks.forEach((link) => {
          link.href = installer.browser_download_url
        })
      }
      const version = document.querySelector('[data-version]')
      if (version && release.tag_name) version.textContent = `· ${release.tag_name}`
    })
    .catch(() => {
      downloadLinks.forEach((link) => {
        link.href = fallbackUrl
      })
    })
})
