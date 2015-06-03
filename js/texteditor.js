function applyStyles (beginningTag, endingTag) {
	var selectedText = document.getElementById('inputTextArea');

	if (typeof selectedText.selectionStart !== undefined && selectedText.selectionStart !== selectedText.selectionEnd) {
		var beforeSelection = selectedText.value.substr (0, selectedText.selectionStart);
		var selection = selectedText.value.substr (selectedText.selectionStart, selectedText.selectionEnd - selectedText.selectionStart);
		var afterSelection = selectedText.value.substr (selectedText.selectionEnd);

		selectedText.value = beforeSelection + beginningTag + selection + endingTag + afterSelection;
	}
}

function applyAlignment (typeOfAlignment) {
	document.getElementById('inputTextArea').className = typeOfAlignment;
	document.getElementById('showText').className = typeOfAlignment;
}

document.addEventListener('DOMContentLoaded', function() {
	// Preview
		document.getElementById('previewButton').onclick = function () {
			document.getElementById('preview').classList.remove('hideIt');

			var inputText = document.getElementById('inputTextArea').value;
			var outputText = document.getElementById('showText');

			// to make sure text does not interpret < and > as html
			inputText = inputText.replace (/</gi, "<");
			inputText = inputText.replace (/>/gi, ">");

			// BBCode replacements into HTML
			inputText = inputText.replace (/\[b\]/gi, "<b>");
			inputText = inputText.replace (/\[\/b\]/gi, "</b>");

			inputText = inputText.replace (/\[i\]/gi, "<i>");
			inputText = inputText.replace (/\[\/i\]/gi, "</i>");

			inputText = inputText.replace (/\[u\]/gi, "<u>");
			inputText = inputText.replace (/\[\/u\]/gi, "</u>");

			// from ongoing typing to line breaks
			inputText = inputText.replace (/\n/gi, "<br />");

			outputText.innerHTML = inputText;
		};

		document.getElementById('closeButton').onclick = function () {
			document.getElementById('preview').classList.add('hideIt');
		};

	// Styling Text
		document.getElementById('boldSelection').addEventListener ('click', function () {
			applyStyles ('[b]', '[/b]');
		});

		document.getElementById('italicSelection').addEventListener ('click', function () {
			applyStyles ('[i]', '[/i]');
		});

		document.getElementById('underlineSelection').addEventListener ('click', function () {
			applyStyles ('[u]', '[/u]');
		});

	// Text Alignment
		document.getElementById('alignLeft').addEventListener('click', function () {
			applyAlignment ('textAlignLeft');
		});

		document.getElementById('alignCenter').addEventListener('click', function () {
			applyAlignment ('textAlignCenter');
		});

		document.getElementById('alignRight').addEventListener('click', function () {
			applyAlignment ('textAlignRight');
		});

		document.getElementById('alignJustify').addEventListener('click', function () {
			applyAlignment ('textAlignJustify');
		});

	// Images
		document.getElementById('insertImage').addEventListener('change', function () {
			this.form.submit();
		}, false);
});
