// ==UserScript==
// @name         GitLab Emoji Picker
// @namespace    https://git.rwth-aachen.de/
// @version      1.0
// @description  Adds an emoji icon to the comment section on GitLab to easily insert emojis. This functionality works on both GitLab and the RWTH GitLab instance.
// @match        https://github.com/*
// @match        https://git.rwth-aachen.de/**
// @require      https://cdn.jsdelivr.net/npm/emoji-mart@latest/dist/browser.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Funktion zum Hinzufügen des Emoji-Buttons
    function addEmojiButton() {

        const toolbars = document.querySelectorAll('div[data-testid="formatting-toolbar"], div[data-testid="formatting-toolbar"]');
        toolbars.forEach(toolbar => {
        if (!toolbar) return;
        console.log(toolbar);
        const emojiButton = document.createElement('button');
        emojiButton.style.border = 'none';
        emojiButton.style.background = 'none';
        emojiButton.textContent = '😊';
        emojiButton.style.cursor = 'pointer';
        emojiButton.style.marginLeft = '5px';

        // Picker-Optionen und Picker erstellen
        function handleEmojiSelect(emoji) {

            const editableDiv = toolbar.nextElementSibling.querySelector('div[contenteditable="true"]');
                if (editableDiv) {
                    editableDiv.textContent += emoji.native;
                }
                picker.style.display = 'none';
        }

        const pickerOptions = { onEmojiSelect: handleEmojiSelect};
        const picker = new EmojiMart.Picker(pickerOptions);
        picker.style.display = 'none';
        picker.style.position = 'absolute';
        picker.style.zIndex = '10000';
        picker.style.height = '200px';

        emojiButton.addEventListener('click', function(event) {
            picker.style.display = picker.style.display === 'none' ? 'block' : 'none';
        });

        toolbar.appendChild(emojiButton);
        toolbar.appendChild(picker);
    });
    }
    window.addEventListener('load', function() {
        addEmojiButton();
    });
})();
