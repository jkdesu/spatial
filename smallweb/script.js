/**
 * SmallWeb Digital Garden - Main JavaScript
 * Handles navigation, filtering, and interactive elements
 */

// ==========================================================================
// DOM Elements & State Management
// ==========================================================================

class DigitalGarden {
  constructor() {
    this.elements = {
      arrow: document.getElementById('hero-arrow'),
      hero: document.querySelector('.hero'),
      aboutLink: document.getElementById('about-link'),
      aboutBtn: document.getElementById('about-btn'),
      exploreBtn: document.getElementById('explore-btn'),
      projectsLink: document.getElementById('projects-link'),
      logoLinks: document.querySelectorAll('.logo-link, .brand'),
      filters: document.querySelectorAll('.filter'),
      cards: document.querySelectorAll('.card'),
      flowPills: document.querySelectorAll('.flow-pill'),
      projectsGrid: document.querySelector('.projects-grid'),
      aboutBook: document.getElementById('about-book'),
      pageClose: document.getElementById('page-close')
    };
    
    this.currentFilter = 'all';
    this.init();
  }

  /**
   * Initialize all event listeners and functionality
   */
  init() {
    this.setupNavigation();
    this.setupHeroControls();
    this.setupFlowNavigation();
    this.setupFiltering();
    this.setupBookPopup();
  }

  // ==========================================================================
  // Navigation & Hero Controls
  // ==========================================================================

  /**
   * Setup logo and brand navigation
   */
  setupNavigation() {
    this.elements.logoLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.showHero();
      });
    });
  }

  /**
   * Setup hero section controls (about, explore, dismiss)
   */
  setupHeroControls() {
    // About functionality - show book popup
    const showAbout = () => {
      this.showBook();
    };

    if (this.elements.aboutLink) {
      this.elements.aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        showAbout();
      });
    }

    if (this.elements.aboutBtn) {
      this.elements.aboutBtn.addEventListener('click', showAbout);
    }

    // Projects link - same as explore button
    if (this.elements.projectsLink) {
      this.elements.projectsLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.hideHero();
      });
    }

    // Explore button - dismiss hero and show content
    if (this.elements.exploreBtn) {
      this.elements.exploreBtn.addEventListener('click', () => {
        this.hideHero();
      });
    }

    // Hero arrow - dismiss hero
    if (this.elements.arrow) {
      this.elements.arrow.addEventListener('click', () => {
        this.hideHero();
      });
    }
  }

  /**
   * Show hero section (landing page)
   */
  showHero() {
    this.elements.hero.classList.remove('hide');
    document.body.classList.remove('hero-dismissed');
  }

  /**
   * Hide hero section and show main content
   */
  hideHero() {
    this.elements.hero.classList.add('hide');
    document.body.classList.add('hero-dismissed');
  }

  // ==========================================================================
  // Filtering System
  // ==========================================================================

  /**
   * Setup collection filtering functionality
   */
  setupFiltering() {
    this.elements.filters.forEach(filter => {
      filter.addEventListener('click', () => {
        this.setActiveFilter(filter);
        this.filterCards(filter.dataset.filter);
      });
    });
  }

  /**
   * Set active filter state and update ARIA attributes
   */
  setActiveFilter(activeFilter) {
    this.elements.filters.forEach(filter => {
      filter.classList.remove('active');
      filter.setAttribute('aria-selected', 'false');
    });
    
    activeFilter.classList.add('active');
    activeFilter.setAttribute('aria-selected', 'true');
    this.currentFilter = activeFilter.dataset.filter;
  }

  /**
   * Filter cards based on collection type
   * @param {string} filterType - The collection type to filter by
   */
  filterCards(filterType) {
    this.elements.cards.forEach(card => {
      const shouldShow = filterType === 'all' || card.dataset.collection === filterType;
      card.style.display = shouldShow ? 'block' : 'none';
    });
  }

  // ==========================================================================
  // Flow Navigation
  // ==========================================================================

  /**
   * Setup flow pill navigation (quick collection access)
   */
  setupFlowNavigation() {
    this.elements.flowPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const collection = pill.dataset.collection;
        this.navigateToCollection(collection);
      });
    });
  }

  /**
   * Navigate to specific collection and scroll to it
   * @param {string} collection - The collection to navigate to
   */
  navigateToCollection(collection) {
    // Update filter buttons to match collection
    const targetFilter = document.querySelector(`[data-filter="${collection}"]`);
    if (targetFilter) {
      this.setActiveFilter(targetFilter);
      this.filterCards(collection);
    }
    
    // Smooth scroll to collections section
    if (this.elements.collections) {
      this.elements.projectsGrid.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // ==========================================================================
  // Book Popup Functionality
  // ==========================================================================

  /**
   * Setup book popup controls and event listeners
   */
  setupBookPopup() {
    // Close book when clicking close button
    if (this.elements.pageClose) {
      this.elements.pageClose.addEventListener('click', () => {
        this.hideBook();
      });
    }

    // Close book when clicking overlay
    if (this.elements.aboutBook) {
      this.elements.aboutBook.addEventListener('click', (e) => {
        if (e.target === this.elements.aboutBook) {
          this.hideBook();
        }
      });
    }

    // Close book with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.elements.aboutBook.classList.contains('active')) {
        this.hideBook();
      }
    });
  }

  /**
   * Show the About book popup
   */
  showBook() {
    if (this.elements.aboutBook) {
      this.elements.aboutBook.classList.add('active');
      this.elements.aboutBook.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  /**
   * Hide the About book popup
   */
  hideBook() {
    if (this.elements.aboutBook) {
      this.elements.aboutBook.classList.remove('active');
      this.elements.aboutBook.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }
}

// ==========================================================================
// Initialize Application
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  new DigitalGarden();
});