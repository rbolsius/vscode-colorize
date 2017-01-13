'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  commands,
  window,
  workspace,
  ExtensionContext,
  OverviewRulerLane,
  TextEditor,
  DecorationOptions,
  Range,
  TextEditorDecorationType,
  TextDocument,
  TextLine,
  Position
} from 'vscode';

import { ColorUtils, HEXA_COLOR_SMALL, HEXA_COLOR } from './utils/color-utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

let decorations: ColorDecoration[] = [];
let deco: Map<number, ColorDecoration[]> = new Map();

export function activate(context: ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "colorize" is now active!');
  let timeout = null,
      decoration: TextEditorDecorationType = null;
  let editor = window.activeTextEditor;

  function triggerUpdateDecorations(/*range*/) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(updateDecorations, 500);
  }

  function updateDecorations( /*editor: TextEditor, editedRange: Range*/) {
    // Create an issue on vscode github
    // "Decoration should not be expandeable" or something like this
    // if (decoration)
    // 	decoration.dispose()
    // let startPos = new Position(1, 1);
    // let endPos = new Position(1, 5);
    // let range = new Range(startPos, endPos);
    // decoration = window.createTextEditorDecorationType({
    // 	borderWidth: "1px",
    // 	borderStyle: "solid",
    // 	borderColor: "#FFF",
    // 	backgroundColor: "#FFF",
    // 	color: "#000"
    // });
    // editor.setDecorations(decoration, [range]);

    if (!editor) {
      return;
    }

    // debugger;

    // let disposed = decorations.filter(decoration => {
    // 	decoration.checkDecoration(editor)
    // 	return decoration.disposed;
   // });

    let text = window.activeTextEditor.document.getText();
    let match = null;

    // while (match = ColorUtils.HEXA_COLOR_SMALL.exec(text)) {
    // 	var startPos = editor.document.positionAt(match.index);
    // 	var endPos = editor.document.positionAt(match.index + match[1].length);
    // 	let alreadyIn = decorations.find(decoration => decoration.textPosition.start.isEqual(startPos) || decoration.textPosition.end.isEqual(endPos));
    // 	if (alreadyIn) {
    // 		continue;
    // 	}
    // 	let range = new Range(startPos, endPos);
    // 	let decoration = generateDecorator(match[1]);
    // 	editor.setDecorations(deation, [range]);

    // 	decorations.push(new ColorDecoration(new Range(startPos, endPos), decoration, ColorUtils.HEXA_COLSMALL, match[1]));

    // 	// if (deco.has(range.start.line)) {
    // 	// 	deco.get(range.start.line).push(new ColorDecoration(range, decoration, ColorUtils.HEXA_COLOR_SMALL, match[1]))
    // 	// }
    // }
    let start = 0;
    while (match = HEXA_COLOR.exec(text)) {
      let startPos = editor.document.positionAt(start + match.index);
      let endPos = editor.document.positionAt(start + match.index + match[1].length);
      start += match.index + match[1].length;
      text = text.substr(match.index + match[1].length);
      // let alreadyIn = decorations.find(decoration => decoration.textPosition.start.isEqual(startPos) && decoration.textPosition.end.isEqual(endPos));
      // if (alreadyIn) {
      // 	continue;
      // }
      let range = new Range(startPos, endPos);

      let decoration = generateDecorator(match[1]);
      decorations.push(new ColorDecoration(range, decoration, HEXA_COLOR, match[1]));
      editor.setDecorations(decoration, [range]);

      // if (deco.has(range.start.line)) {
      // 	deco.get(range.start.line).push(new ColorDecoration(range, decoration, ColorUtils.HEXA_COLOR_SMALL, match[1]))
      // }
    }
  }


  if (editor) {
    triggerUpdateDecorations();
  }
  window.onDidChangeActiveTextEditor(newEditor => {
    editor = newEditor;
    if (editor) {
      triggerUpdateDecorations();
    }
  }, null, context.subscriptions);

  workspace.onDidChangeTextDocument(event => {
    if (editor && event.document === editor.document) {
      triggerUpdateDecorations(/*event.contentChanges*/);
    }
  }, null, context.subscriptions);
}


function generateDecorator(color: string): TextEditorDecorationType {

  let backgroundDecorationType = window.createTextEditorDecorationType({
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: color,
    backgroundColor: color,
    color: ColorUtils.luminance(color) < 100 ? '#fff' : '#000'
  });
  console.log(`color: ${color}, luminance: ${ColorUtils.luminance(color)}`);
  return backgroundDecorationType;
}

// this method is called when your extension is deactivated
export function deactivate() { }


class ColorDecoration {
  public textPosition: Range;
  private _decoration: TextEditorDecorationType;
  private _matcher: RegExp;
  private _match: string;
  public disposed: boolean = false;

  public constructor(textPosition: Range, decoration: TextEditorDecorationType, matcher: RegExp, match: string) {
    this.textPosition = textPosition;
    this._decoration = decoration;
    this._matcher = matcher;
    this._match = match;
  }
  public checkDecoration(editor: TextEditor): void {
    let text = editor.document.lineAt(this.textPosition.start.line).text.substring(this.textPosition.start.character, this.textPosition.end.character + 1);
    if (!this._matcher.test(text)) {
      this._decoration.dispose();
      this.disposed = true;
      return;
    }
    if (text === this._match) {
      return;
    }
    this._match = text;
    this._updateDecoration(editor);
    return;
  }

  private _updateDecoration(editor) {
    this._decoration.dispose();
    let decoration = generateDecorator(this._match);
    this._decoration = decoration;
    editor.setDecorations(this._decoration, [{ range: this.textPosition }]);
  }
  public dispose(): void {
    this._decoration.dispose();
  }
}
