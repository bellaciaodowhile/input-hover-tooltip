(function () {
    console.log('App JS')
    'use strict';


    let $inputsBox = [...document.querySelectorAll('.input__box')];

    $inputsBox.map(($inputBox, $indexBox) => {

        // Input type - Importants
        let $type = $inputBox.attributes.type.textContent;
        let $tooltipStatus = returnBoolean($inputBox.attributes.tooltip.textContent);
        let $videoTooltip = document.createElement('video');

        // Elements
        let $inputField = $type == 'input' ? document.createElement('input') : document.createElement('textarea');
        let $titleElement = document.createElement('span');
        let $characters = document.createElement('div');
        let $charactersCurrent = document.createElement('span');
        let $charactersLimit = document.createElement('span');
        let $resetField = document.createElement('span');
        let $minValidationElement = document.createElement('span');
        let $verifiedField = document.createElement('span');
        let $overlay = document.querySelector('.overlay__input__box')
        let $tooltip = $tooltipStatus ? document.createElement('div') : '';

        // Attributes
        let $title = $inputBox.attributes.title.textContent;
        let $placeholder = $inputBox.attributes.placeholder.textContent;
        let $minLength = $inputBox.attributes.minlength.textContent;
        let $maxLength = $inputBox.attributes.maxlength.textContent;


        // Assigning attributes
        $inputField.placeholder = $placeholder;
        $titleElement.textContent = $title;
        $charactersCurrent.textContent = 0;
        $charactersLimit.textContent = '/' + $maxLength;
        $resetField.textContent = 'close';
        $minValidationElement.textContent = `Mínimo ${ $minLength } caracteres`;
        $verifiedField.textContent = 'verified';
        $inputField.maxLength = $maxLength;

        // Assigning classes
        $inputField.classList.add('input__box-field');
        $titleElement.classList.add('input__box-title');
        $characters.classList.add('input__box-characters');
        $resetField.classList.add('material-icons-outlined', 'input__box-reset');
        $minValidationElement.classList.add('input__box-minvalidation')
        $verifiedField.classList.add('material-icons', 'input__box-verified');
        if ($type == 'textarea') $minValidationElement.classList.add('input__box-minvalidation--textarea');

        // Events
        $inputField.onkeyup = function ($e) {
            limitCharacters($e);
            validationCharacters($e);
            charactersCurrent($e);
        };
        $inputField.onkeydown = function ($e) {
            preventExtraSpace($e);
        };

        $inputField.onfocus = function ($e) {
            inputFieldActive();
            if ($inputBox.hasAttribute('video')) $videoTooltip.play();
        };

        $inputField.onblur = function ($e) {
            inputFieldInactive();
            if ($inputBox.hasAttribute('video')) $videoTooltip.pause();
        };

        if ($type == 'textarea') {
            $inputField.oninput = function (e) {
                adjustTextareaHeight($inputField);
            }
        }

        $resetField.onclick = function ($e) {
            $e.preventDefault();
            $inputField.value = '';
            $charactersCurrent.textContent = '0';
            if ($type == 'textarea') {
                resetTextareaHeight($inputField);
            }
        }

        // Functions
        function charactersCurrent($e) {
            $charactersCurrent.textContent = $e.currentTarget.value.length;
        }

        function preventExtraSpace($e) {
            const $inputValue = $e.currentTarget.value;
            if ($e.key === ' ' && $inputValue.endsWith(' ')) $e.preventDefault();
        }

        function inputFieldActive($e) {
            $inputField.classList.add('input__box-field--active');
            $characters.classList.add('input__box-characters--active');
            $overlay.classList.add('overlay__input__box--active');
            $titleElement.classList.add('input__box-title--absolute');
            $characters.classList.add('input__box-characters--active');
            
            // Activate tooltip
            if ($tooltipStatus) $tooltip.classList.add('input__box-tooltip--active');
            calculateTooltipPosition($inputField, $tooltip);
            window.addEventListener("resize", () => {
                calculateTooltipPosition($inputField, $tooltip);
            });
        }
        
        function inputFieldInactive($e) {
            $inputField.classList.remove('input__box-field--active');
            $overlay.classList.remove('overlay__input__box--active');
            $titleElement.classList.remove('input__box-title--absolute');
            $characters.classList.remove('input__box-characters--active');
            
            if ($inputField.value.length == 0) {
                $minValidationElement.classList.add('input__box-minvalidation--active');
                inputFieldErrorActive();
            }
            // Inactive Tooltip
            if ($tooltipStatus) {
                $tooltip.classList.remove('input__box-tooltip--active');
            }
            resetValuesTooltip();
        }

        function inputFieldErrorActive() {
            $characters.classList.add('input__box-characters--error');
            $inputField.classList.add('input__box-field--error');
            $titleElement.classList.add('input__box-title--error');
        }

        function inputFieldErrorInactive() {
            $characters.classList.remove('input__box-characters--error');
            $inputField.classList.remove('input__box-field--error');
            $titleElement.classList.remove('input__box-title--error');
        }

        function validationCharacters($e) {
            let $current = $e.currentTarget.value.length;
            if ($current == 0) {
                inputFieldErrorInactive();
                $minValidationElement.classList.add('input__box-minvalidation--active');
            }

            if ($current > 0 && $current < $minLength || $current > $maxLength > $maxLength) {
                inputFieldErrorActive();
                $verifiedField.classList.remove('input__box-verified--active');
                $characters.classList.add('input__box-characters--active');
                $minValidationElement.classList.remove('input__box-minvalidation--active');
                if ($type == 'textarea') {
                    $minValidationElement.classList.add('input__box-minvalidation--active');
                    $minValidationElement.classList.add('input__box-minvalidation--textarea');
                } else {
                    $minValidationElement.classList.add('input__box-minvalidation--active');
                }
            } else {
                if ($current > 0) {
                    inputFieldErrorInactive();
                    $verifiedField.classList.add('input__box-verified--active');
                    if ($type == 'textarea') {
                        $minValidationElement.classList.remove('input__box-minvalidation--active');
                        $minValidationElement.classList.remove('input__box-minvalidation--textarea');
                    } else {
                        $minValidationElement.classList.remove('input__box-minvalidation--active');
                    }
                }
            }

            // if ($current > 0 && $current < $minLength || $current > $maxLength) {
            //     $characters.classList.add('input__box-characters--active');
            //     $minValidationElement.classList.remove('input__box-minvalidation--active');
            //     if ($type == 'textarea') {
            //         $minValidationElement.classList.add('input__box-minvalidation--active');
            //         $minValidationElement.classList.add('input__box-minvalidation--textarea');
            //     } else {
            //         $minValidationElement.classList.add('input__box-minvalidation--active');
            //     }
            // }


        }

        function limitCharacters($e) {
            $e.currentTarget.value = $e.currentTarget.value.substring(0, $maxLength);
        }

        function returnBoolean($e) {
            return $e == 'true' ? true : false;
        }

        function calculateTooltipPosition($inputBox, $tooltip) {
            if ($tooltipStatus) {
                let $positionEl = $tooltip.getBoundingClientRect();
                // Calculating the coordinates
                const $x = $inputBox.offsetLeft;
                const $y = $inputBox.offsetTop;
                
                // We calculate the size of the tooltip
                const $widthTooltip = $tooltip.clientWidth;
                const $heightTooltip = $tooltip.clientHeight;
                
                // We calculate where we will position the tooltip
                const $left = $x - $widthTooltip / 2 + $inputBox.offsetWidth / 2;
                const $top = $y - $heightTooltip - 20;
                $tooltip.style.left = `${ $left }px`;
                console.log($positionEl.top)
                if ($positionEl.top < 250) {
                    $tooltip.style.top = `${ ($inputBox.clientHeight + 23) }px`;
                    $tooltip.classList.add('input__box-tooltip--bottom');
                } else {
                    $tooltip.style.top = `${ $top }px`;
                    $tooltip.classList.remove('input__box-tooltip--bottom');
                }
            }
        }
        
        function adjustTextareaHeight($textarea) {
            $textarea.style.height = "auto";
            $textarea.style.height = $textarea.scrollHeight + "px";
            const $inputBox = $textarea.closest(".input__box");
            $inputBox.style.height = $textarea.style.height;
        }

        function resetTextareaHeight($textarea) {
            $textarea.style.height = "98px";
            const $inputBox = $textarea.closest(".input__box");
            $inputBox.style.height = $textarea.style.height;
        }

        function resetValuesTooltip() {
            if ($tooltip != '') {
                $tooltip.style.top = '-254px';
                $tooltip.style.left = "19vw";
                // $tooltip.style.transform = 'translate(-50%, 0)';
            }
        }

        resetValuesTooltip()

        // Append
        $titleElement.appendChild($verifiedField);
        $inputBox.appendChild($titleElement);
        $inputBox.appendChild($inputField);
        $characters.appendChild($charactersCurrent);
        $characters.appendChild($charactersLimit);
        $characters.appendChild($resetField);
        $inputBox.appendChild($characters);
        $inputBox.appendChild($minValidationElement);


        // Create tooltip
        if ($tooltipStatus) {

            // Create elements
            let $titleTooltip = document.createElement('h3');
            let $tooltipInfo = document.createElement('div');
            let $paragraphTooltip = document.createElement('p');
            let $resumeTooltip = document.createElement('p');
            let $imageTooltip = document.createElement('div');
            let $imageTooltipImg = document.createElement('img');
            let $buttonTooltip = document.createElement('button');
            let $videoMainTooltip = document.createElement('div');
            let $videoSourceTooltip = document.createElement('source');

            let $textSmall = $inputBox.hasAttribute('textsmall') ? $inputBox.attributes.textsmall.textContent : '';
            let $resume = $inputBox.hasAttribute('resume') ? $inputBox.attributes.resume.textContent : '';
            let $image = $inputBox.hasAttribute('image') ? $inputBox.attributes.image.textContent : '';
            let $imageAxis = $inputBox.hasAttribute('image-axis') ? $inputBox.attributes['image-axis'].textContent : '';
            let $button = $inputBox.hasAttribute('button') ? $inputBox.attributes['button'].textContent : '';
            let $video = $inputBox.hasAttribute('video') ? $inputBox.attributes['video'].textContent : '';

            // Assigning classes
            $tooltip.className = 'input__box-tooltip';
            $titleTooltip.className = 'input__box-tooltip-title';
            $paragraphTooltip.className = 'input__box-tooltip-paragraph';
            $tooltipInfo.className = 'input__box-tooltip-info';
            $resumeTooltip.className = 'input__box-tooltip-resume';
            $imageTooltip.className = 'input__box-tooltip-img';
            if ($imageAxis != '') $tooltip.classList.add('input__box-tooltip--axis-x');
            $buttonTooltip.className = 'input__box-tooltip-button';
            $videoMainTooltip.className = 'input__box-tooltip-video';

            // Assigning attributes
            $titleTooltip.textContent = $title;
            $paragraphTooltip.textContent = $textSmall;
            $resumeTooltip.textContent = $resume;
            $imageTooltipImg.src = $image;
            $buttonTooltip.innerHTML = '<i class="material-icons-outlined">school</i>' + $button;
            $videoSourceTooltip.src = $video;
            $videoSourceTooltip.type = 'video/mp4';
            $videoTooltip.loop = true;
            $videoTooltip.muted = true;
            $videoTooltip.play();
            // Events
            $tooltip.onmouseenter = function($e) {
                $videoMainTooltip.parentElement.style.height = $videoMainTooltip.parentElement.clientHeight + 'px';
            }
            $videoMainTooltip.onmouseenter = function($e) {
                $videoTooltip.muted = false;
                $videoMainTooltip.classList.add('input__box-tooltip-video--hover');
                console.log($videoMainTooltip.parentElement.clientHeight)
            }
            $videoMainTooltip.onmouseout = function($e) {
                $videoTooltip.muted = true;
                $videoMainTooltip.classList.remove('input__box-tooltip-video--hover');
                // calculateTooltipPosition($inputField, $tooltip);
            }

            // Append
            if ($image != '') {
                $imageTooltip.appendChild($imageTooltipImg);
                $tooltip.appendChild($imageTooltip);
            }

            if ($video != '') {
                $videoTooltip.appendChild($videoSourceTooltip);
                $videoMainTooltip.appendChild($videoTooltip);
                $tooltip.appendChild($videoMainTooltip);
            }

            $tooltipInfo.appendChild($titleTooltip);
            if ($textSmall != '') $tooltipInfo.appendChild($paragraphTooltip);
            if ($resume != '') $tooltipInfo.appendChild($resumeTooltip);
            if ($button != '') $tooltipInfo.appendChild($buttonTooltip);
            $tooltip.appendChild($tooltipInfo);
            $inputBox.appendChild($tooltip);
        }



    });
})();