function keyDown(e) {
210
  if (e.key === 'ArrowRight' || e.key === 'Right') {
211
    moveRight();
212
  } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
213
    moveLeft();
214
  } else if (e.key === 'ArrowUp' || e.key === 'Up') {
215
    moveUp();
216
  } else if (e.key === 'ArrowDown' || e.key === 'Down') {
217
    moveDown();
218
  }
219
}
220
​
221
function keyUp(e) {
222
  if (
223
    e.key == 'Right' ||
224
    e.key == 'ArrowRight' ||
225
    e.key == 'Left' ||
226
    e.key == 'ArrowLeft' ||
227
    e.key == 'Up' ||
228
    e.key == 'ArrowUp' ||
229
    e.key == 'Down' ||
230
    e.key == 'ArrowDown'
231
  ) {
232
    player.dx = 0;
233
    player.dy = 0;
234
  }
235
}
236
​
237
update();
238
​
239
document.addEventListener('keydown', keyDown);
240
document.addEventListener('keyup', keyUp);