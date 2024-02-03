

(function () {
    console.log('App JS')
    'use strict';


    let $inputsBox = [...document.querySelectorAll('.input__box')];

    $inputsBox.map(($inputBox, $indexBox) => {

        // Input type
        let $type = $inputBox.attributes.type.textContent;
        let $tooltipStatus = returnBoolean($inputBox.attributes.tooltip.textContent);
        
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

        // Events
        $inputField.onkeyup = function ($e) {
            limitCharacters($e);
            validationCharacters($e);
            charactersCurrent($e);
        };
        $inputField.onkeydown = function ($e) {
            preventExtraSpace($e);
        };

        $inputField.onfocus = function($e) {
            inputFieldActive();
        };

        $inputField.onblur = function($e) {
            inputFieldInactive();
        };

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

            // Activate tooltip
            if ($tooltipStatus) $tooltip.classList.add('input__box-tooltip--active');
            calculateTooltipPosition($inputField, $tooltip);
            window.addEventListener("resize", () => {
                calculateTooltipPosition($inputField, $tooltip);
            });
        }

        function inputFieldInactive($e) {
            $inputField.classList.remove('input__box-field--active');
            $characters.classList.remove('input__box-characters--active');
            $overlay.classList.remove('overlay__input__box--active');
            $titleElement.classList.remove('input__box-title--absolute');
            
            // Inactive Tooltip
            if ($tooltipStatus) {
                $tooltip.classList.remove('input__box-tooltip--active');
            } 
        }

        function inputFieldError($e) {
            $inputField.classList.add('input__box-field--error');
        }

        function validationCharacters($e) {
            let $current = $e.currentTarget.value.length;

            if ($current < $minLength || $current > $maxLength) {
                $characters.classList.add('input__box-characters--error');
                $inputField.classList.add('input__box-field--error');
                $titleElement.classList.add('input__box-title--error');
                $verifiedField.classList.remove('input__box-verified--active');
            } else {
                $characters.classList.remove('input__box-characters--error');
                $inputField.classList.remove('input__box-field--error');
                $titleElement.classList.remove('input__box-title--error');
                $verifiedField.classList.add('input__box-verified--active');
                if ($type == 'textarea') {
                    $minValidationElement.classList.remove('input__box-minvalidation--active');
                    $minValidationElement.classList.remove('input__box-minvalidation--textarea');
                } else {
                    $minValidationElement.classList.remove('input__box-minvalidation--active');
                }
            }

            if ($current >= 0 && $current < $minLength || $current > $maxLength) {
                $characters.classList.add('input__box-characters--active');
                if ($type == 'textarea') {
                    $minValidationElement.classList.add('input__box-minvalidation--active');
                    $minValidationElement.classList.add('input__box-minvalidation--textarea');
                } else {
                    $minValidationElement.classList.add('input__box-minvalidation--active');
                }
            }
            
        }

        function limitCharacters($e) {
            $e.currentTarget.value = $e.currentTarget.value.substring(0, $maxLength);
        }
    
        function returnBoolean($e) {
            return $e == 'true' ? true : false;
        }

        function calculateTooltipPosition($inputBox, $tooltip) {
            if ($tooltipStatus) {
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
                $tooltip.style.top = `${ $top }px`;
            }
        }


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
            let $textSmall = $inputBox.hasAttribute('textsmall') ? $inputBox.attributes.textsmall.textContent : '';
            let $resume = $inputBox.hasAttribute('resume') ? $inputBox.attributes.resume.textContent : '';
            let $image = $inputBox.hasAttribute('image') ? $inputBox.attributes.image.textContent : '';
            let $imageAxis = $inputBox.hasAttribute('image-axis') ? $inputBox.attributes['image-axis'].textContent : '';
            let $button = $inputBox.hasAttribute('button') ? $inputBox.attributes['button'].textContent : '';

            // Assigning classes
            $tooltip.className = 'input__box-tooltip';
            $titleTooltip.className = 'input__box-tooltip-title';
            $paragraphTooltip.className = 'input__box-tooltip-paragraph';
            $tooltipInfo.className = 'input__box-tooltip-info';
            $resumeTooltip.className = 'input__box-tooltip-resume';
            $imageTooltip.className = 'input__box-tooltip-img';
            if ($imageAxis != '') $tooltip.classList.add('input__box-tooltip--axis-x');
            $buttonTooltip.className = 'input__box-tooltip-button';

            // Assigning attributes
            $titleTooltip.textContent = $title;
            $paragraphTooltip.textContent = $textSmall;
            $resumeTooltip.textContent = $resume;
            $imageTooltipImg.src = $image;
            $buttonTooltip.innerHTML = '<i class="material-icons-outlined">school</i>' + $button;

            // Append
            if ($image != '') {
                $imageTooltip.appendChild($imageTooltipImg);
                $tooltip.appendChild($imageTooltip);
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