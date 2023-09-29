let currentImageIndex = 0;

    function setClipPath(compareDiv) {
      const rangeInput = compareDiv.querySelector('.c-rng.c-compare__range');
      const newImg = compareDiv.querySelector('.c-compare__left');
      const oldImg = compareDiv.querySelector('.c-compare__right');
      const value = `${rangeInput.value}%`;
      newImg.style.clipPath = `polygon(0% 0%, ${value} 0%, ${value} 100%, 0% 100%)`;
      oldImg.style.clipPath = `polygon(100% 0%, ${value} 0%, ${value} 100%, 100% 100%)`;
    }

    function openModal(newImgSrc, oldImgSrc, index) {
      console.log("openModal function triggered");
      console.log("New Image Source:", newImgSrc);
      console.log("Old Image Source:", oldImgSrc);

      const modal = document.getElementById('myModal');
      const modalContent = document.querySelector('.modal-content');

      // Create the comparison div
      const compareDiv = document.createElement('div');
      compareDiv.className = 'c-compare';
      compareDiv.style.setProperty('--value', '50%');

      // Create the new image
      const newImg = document.createElement('img');
      newImg.className = 'c-compare__left';
      newImg.src = newImgSrc;
      newImg.alt = 'New';
      compareDiv.appendChild(newImg);

      // Create the old image
      const oldImg = document.createElement('img');
      oldImg.className = 'c-compare__right';
      oldImg.src = oldImgSrc;
      oldImg.alt = 'Original';
      compareDiv.appendChild(oldImg);

      // Create the range input
      const rangeInput = document.createElement('input');
      rangeInput.type = 'range';
      rangeInput.className = 'c-rng c-compare__range';
      rangeInput.min = '0';
      rangeInput.max = '100';
      rangeInput.value = '50';

      // Add the oninput function for the range input
      rangeInput.oninput = function () {
        compareDiv.style.setProperty('--value', `${this.value}%`);
      };

      compareDiv.appendChild(rangeInput);

      // Append the comparison div to the modal content
      modalContent.innerHTML = '';
      modalContent.appendChild(compareDiv);

      // Manually trigger the oninput event to set the initial state
      rangeInput.dispatchEvent(new Event('input'));

      modal.style.display = "block";
      currentImageIndex = index;

      // Close modal when clicking on the modal's background
      modal.onclick = function (event) {
        if (event.target === modal) {
          closeModal();
        }
      };

      // Stop event propagation for the modal's content
      modalContent.onclick = function (event) {
        event.stopPropagation();
      };
    }
    f

    function closeModal() {
      const modal = document.getElementById('myModal');
      modal.style.display = "none";
    }

    function previousImage() {
      if (currentImageIndex > 0) {
        currentImageIndex--;
        const newImgSrc = getRelativePath(document.querySelectorAll('.thumbnail-grid img')[currentImageIndex].src);
        const oldImgSrc = newImgSrc.replace('/new/', '/old/');
        openModal(newImgSrc, oldImgSrc, currentImageIndex);
      }
    }

    function nextImage() {
      if (currentImageIndex < document.querySelectorAll('.thumbnail-grid img').length - 1) {
        currentImageIndex++;
        const newImgSrc = getRelativePath(document.querySelectorAll('.thumbnail-grid img')[currentImageIndex].src);
        const oldImgSrc = newImgSrc.replace('/new/', '/old/');
        openModal(newImgSrc, oldImgSrc, currentImageIndex);
      }
    }

    function getRelativePath(absoluteUrl) {
      const a = document.createElement('a');
      a.href = absoluteUrl;
      return a.pathname.startsWith('/') ? a.pathname.substring(1) : a.pathname;
    }

    document.addEventListener('DOMContentLoaded', function () {
      const compareDivs = document.querySelectorAll('.c-compare');
      compareDivs.forEach(div => div.style.setProperty('--value', '50%'));
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === "ArrowLeft") {
        previousImage();
      } else if (event.key === "ArrowRight") {
        nextImage();
      }
    });
    document.addEventListener("DOMContentLoaded", function () {
      fetch('navbar.html')
        .then(response => response.text())
        .then(content => {
          document.getElementById('navbar-placeholder').innerHTML = content;
        })
        .catch(error => {
          console.warn('Failed to fetch navbar:', error);
        });
    });