function applyStyles (beginningTag, endingTag) {
	var selectionAndContainer = "";

	if (typeof window.getSelection != "undefined") {
		var selectionRange = window.getSelection();

		if (selectionRange.rangeCount) {
			var container = document.createElement("div");
			for (var i=0, len = selectionRange.rangeCount; i<len; i++) {
				container.appendChild(selectionRange.getRangeAt(i).cloneContents());
			}

			var replacementText = beginningTag + container.innerHTML + endingTag;

			// console.log(replacementText);

			// console.log(selectionRange.getRangeAt(0));
			selectionRange.getRangeAt(0).deleteContents();
			// console.log(selectionRange.getRangeAt(0));

			selectionRange.getRangeAt(0).insertNode(document.createTextNode(replacementText));
			// console.log(selectionRange.getRangeAt(0));
		}
	} else if (typeof document.selection != "undefined") {
		if (document.selection.type == "Text") {
			selectionAndContainer = document.selection.createRange().htmlText;
		}
	}
}

function applyAlignment (typeOfAlignment) {
	document.getElementById('inputTextArea').className = typeOfAlignment;
	document.getElementById('showText').className = typeOfAlignment;
}

function isOrContainsNode (ancestor, descendant) {
	var node = descendant;

	while (node) {
		if (node === ancestor) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}

function insertNodeOverSelection (node, containerNode) {
	var sel, range, html, str;

	if (window.getSelection) {
		sel = window.getSelection();

		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);

			if (isOrContainsNode(containerNode, range.commonAncestorContainer)) {
				range.deleteContents();
				range.insertNode(node);
			} else {
				containerNode.appendChild(node);
			}
		}

	} else if (document.selection && document.selection.createRange) {
		range = document.selection.createRange();

		if (isOrContainsNode(containerNode, range.parentElement())) {
			html = (node.nodeType===3) ? node.data : node.outerHTML;
			range.pasteHTML(html);
		} else {
			containerNode.appendChild(node);
		}

	}
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

			var x = document.createElement('img');
			x.src = form.insertImage.value;
			insertNodeOverSelection(x, document.getElementById('inputTextArea'));

		}, false);

});
