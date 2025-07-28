document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '<i class="bi bi-plus-lg"></i>';
    mobileToggle.title = 'Criar Nova Tarefa';
    document.body.appendChild(mobileToggle);

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'overlay';
    document.body.insertBefore(overlay, document.body.firstChild);

    const card1 = document.querySelector('.card1');
    let isCard1Open = false;

    function toggleCard1() {
        if (window.innerWidth <= 768) {
            isCard1Open = !isCard1Open;
            
            if (isCard1Open) {
                card1.classList.add('active');
                overlay.classList.add('active');
                mobileToggle.innerHTML = '<i class="bi bi-x-lg"></i>';
                document.body.style.overflow = 'hidden';
            } else {
                card1.classList.remove('active');
                overlay.classList.remove('active');
                mobileToggle.innerHTML = '<i class="bi bi-plus-lg"></i>';
                document.body.style.overflow = 'auto';
            }
        }
    }

    mobileToggle.addEventListener('click', toggleCard1);
    overlay.addEventListener('click', toggleCard1);

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isCard1Open) {
            isCard1Open = false;
            card1.classList.remove('active');
            overlay.classList.remove('active');
            mobileToggle.innerHTML = '<i class="bi bi-plus-lg"></i>';
            document.body.style.overflow = 'auto';
        }
    });
});