// Global jQuery and JavaScript for PETBot website

$(document).ready(function() {
    
    // ============================================
    // NEWSLETTER SUBSCRIPTION
    // ============================================
    $('#newsletterBtn').on('click', function() {
        let email = $('#newsletterEmail').val().trim();
        if (email && isValidEmail(email)) {
            alert('Thank you for subscribing to our newsletter!');
            $('#newsletterEmail').val('');
        } else {
            alert('Please enter a valid email address.');
        }
    });

    // Email validation helper
    function isValidEmail(email) {
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // ============================================
    // CONTACT FORM VALIDATION
    // ============================================
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Clear previous validation states
        $('.form-control').removeClass('is-invalid');
        
        // Validate each field
        $('#name').each(function() { isValid = validateField($(this)) && isValid; });
        $('#email').each(function() { isValid = validateEmail($(this)) && isValid; });
        $('#phone').each(function() { isValid = validateField($(this)) && isValid; });
        $('#subject').each(function() { isValid = validateField($(this)) && isValid; });
        $('#message').each(function() { isValid = validateField($(this)) && isValid; });
        
        if (isValid) {
            // Show success message
            $('#formSuccess').removeClass('d-none');
            $(this)[0].reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                $('#formSuccess').addClass('d-none');
            }, 5000);
        }
    });

    // ============================================
    // FEEDBACK FORM WITH STAR RATING
    // ============================================
    // Star rating functionality
    $('.star-rating').on('click', function() {
        let rating = $(this).data('rating');
        $('#rating').val(rating);
        
        // Update star display
        $('.star-rating').each(function() {
            let starRating = $(this).data('rating');
            if (starRating <= rating) {
                $(this).removeClass('far').addClass('fas');
            } else {
                $(this).removeClass('fas').addClass('far');
            }
        });
        
        // Remove any rating error
        $('.rating-error').hide();
        $(this).closest('.mb-3').find('.rating-error').removeClass('d-block');
    });

    $('#feedbackForm').on('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        $('.form-control').removeClass('is-invalid');
        $('.rating-error').hide();
        
        // Validate name
        if ($('#feedbackName').val().trim() === '') {
            $('#feedbackName').addClass('is-invalid');
            isValid = false;
        }
        
        // Validate email
        let email = $('#feedbackEmail').val().trim();
        if (!isValidEmail(email)) {
            $('#feedbackEmail').addClass('is-invalid');
            isValid = false;
        }
        
        // Validate rating
        let rating = $('#rating').val();
        if (!rating) {
            $('.rating-error').addClass('d-block').show();
            isValid = false;
        }
        
        // Validate comments
        if ($('#comments').val().trim() === '') {
            $('#comments').addClass('is-invalid');
            isValid = false;
        }
        
        if (isValid) {
            $('#feedbackSuccess').removeClass('d-none');
            $(this)[0].reset();
            $('.star-rating').removeClass('fas').addClass('far');
            $('#rating').val('');
            
            setTimeout(function() {
                $('#feedbackSuccess').addClass('d-none');
            }, 5000);
        }
    });

    // ============================================
    // QUERY FORM VALIDATION
    // ============================================
    $('#queryForm').on('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        $('.form-control').removeClass('is-invalid');
        
        if ($('#queryName').val().trim() === '') {
            $('#queryName').addClass('is-invalid');
            isValid = false;
        }
        
        if (!isValidEmail($('#queryEmail').val().trim())) {
            $('#queryEmail').addClass('is-invalid');
            isValid = false;
        }
        
        if ($('#querySubject').val().trim() === '') {
            $('#querySubject').addClass('is-invalid');
            isValid = false;
        }
        
        if ($('#queryMessage').val().trim() === '') {
            $('#queryMessage').addClass('is-invalid');
            isValid = false;
        }
        
        if (isValid) {
            $('#querySuccess').removeClass('d-none');
            $(this)[0].reset();
            
            setTimeout(function() {
                $('#querySuccess').addClass('d-none');
            }, 5000);
        }
    });

    // Field validation helper
    function validateField($field) {
        if ($field.val().trim() === '') {
            $field.addClass('is-invalid');
            return false;
        }
        return true;
    }

    function validateEmail($field) {
        let email = $field.val().trim();
        if (!isValidEmail(email)) {
            $field.addClass('is-invalid');
            return false;
        }
        return true;
    }

    // ============================================
    // GALLERY LIGHTBOX
    // ============================================
    $('.gallery-item img').on('click', function() {
        let imgSrc = $(this).data('bs-image') || $(this).attr('src');
        $('#lightboxImage').attr('src', imgSrc);
    });

    // Clear lightbox image when modal is hidden
    $('#lightboxModal').on('hidden.bs.modal', function() {
        $('#lightboxImage').attr('src', '');
    });

    // ============================================
    // DOWNLOAD COMPANY PROFILE (PDF)
    // ============================================
    function downloadCompanyProfile() {
        // Create PDF content
        const content = `
PETBot Pakistan - Company Profile

About PETBot:
Founded in 2010 in Lahore, Pakistan, PETBot is a leading manufacturer and exporter of PET/PP/PC bottles, jars, and bottle-making machines.

Certifications:
- ISO 9001:2015 Certified
- Food-grade manufacturing
- BPA-free products

Export Markets:
UAE, Saudi Arabia, Kenya, Bangladesh, Afghanistan, Oman, Qatar, Malaysia

Products:
- PET Water Bottles (250ml to 5 gallon)
- PP Jars and Containers
- PC 5-gallon Bottles
- Pharmaceutical Bottles
- Cosmetic Jars
- Blow Moulding Machines
- Injection Moulding Machines
- Labeling and Filling Equipment

Manufacturing Facility:
23-B Industrial Area, Kot Lakhpat, Lahore, Pakistan
Area: 50,000 sq. ft.
Production Capacity: 10 million bottles/month

Contact:
Email: info@petbot.pk
Phone: +92 42 37891234
Website: www.petbot.pk

© 2025 PETBot - Pakistan Export Company. All rights reserved.
        `;

        // Create blob and download
        const blob = new Blob([content], { type: 'application/msword' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'PETBot_Company_Profile.doc';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    // Attach download function to all download buttons
    $('#downloadProfile, #sitemapDownload').on('click', function(e) {
        e.preventDefault();
        downloadCompanyProfile();
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    $('a[href^="#"]').on('click', function(e) {
        let target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

    // ============================================
    // ACTIVE NAVIGATION HIGHLIGHT
    // ============================================
    let currentPage = window.location.pathname.split('/').pop() || 'index.html';
    $('.navbar-nav .nav-link').each(function() {
        let linkPage = $(this).attr('href').split('/').pop().split('#')[0];
        if (linkPage === currentPage) {
            $(this).addClass('active');
        } else if (currentPage === '' && linkPage === 'index.html') {
            $(this).addClass('active');
        }
    });

    // Special handling for dropdown items
    $('.dropdown-item').each(function() {
        let linkPage = $(this).attr('href').split('/').pop().split('#')[0];
        if (linkPage === currentPage) {
            $(this).closest('.nav-item').find('.nav-link').addClass('active');
        }
    });

    // ============================================
    // INITIALIZE BOOTSTRAP COMPONENTS
    // ============================================
    // Enable all tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // ============================================
    // ADD FADE-IN ANIMATION TO MAIN CONTENT
    // ============================================
    $('main').addClass('fade-in');
});