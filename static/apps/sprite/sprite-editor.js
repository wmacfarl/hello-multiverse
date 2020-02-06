import {pixelPainter} from './pixel-painter.js'
import {spriteAnimationEditor} from './sprite-animation-editor.js'

export let spriteEditor = {};

spriteEditor.pixelPainter = pixelPainter;
spriteEditor.spriteAnimationEditor = spriteAnimationEditor;

pixelPainter.setSpriteEditor(spriteEditor);
spriteAnimationEditor.setSpriteEditor(spriteEditor);