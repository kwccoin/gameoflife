(ql:quickload 'cl-charms)
;(ql:quickload 'cl-ncurses)

(defpackage #:game-of-life
  (:use #:cl #:cl-charms)
  (:nicknames #:gol))

(in-package #:gol)

(defconstant +xmax+ 100)
(defconstant +ymax+ 100)
(defconstant +pattern-file+ "game-of-life.patterns")

(defvar *time-steps*)
(defvar *board* (make-array (list +xmax+ +ymax+) :initial-element nil))

(defun update-board ()
  (let ((updates nil))
    (dotimes (x +xmax+)
            (dotimes (y +ymax+)
              (push (get-cell-update x y) updates)))
    (perform-updates updates)))

(defun perform-updates (updates)
  (dolist (update updates)
    (when update
      (let ((fn (first update))
            (args (second update)))
        (apply fn args)))))

(defun get-cell-update (x y)
  (let ((nn (num-neighbors x y))
        (alive (not (null (aref *board* x y)))))
    (cond
      ((and alive (or (> nn 3) (< nn 2))) (list #'kill (list x y)))
      ((and (not alive) (= nn 3)) (list #'birth (list  x y)))
      (t nil))))

(defun kill (x y)
  (setf (aref *board* x y) nil))

(defun birth (x y)
  (setf (aref *board* x y) 't))

(defun num-neighbors (x y)
  (let ((dirs '((-1 0) (-1 -1) (-1 1) (1 -1) (1 0) (1 1) (0 1) (0 -1))))
    (flet ((neighbor (dir)
             (neighbor x y dir)))
      (reduce #'+ (mapcar #'neighbor dirs)))))

(defun neighbor (x y dir)
  (let ((nx (+ x (first dir)))
        (ny (+ y (second dir))))
    (if (or (minusp nx) (>= nx +xmax+)
            (minusp ny) (>= ny +ymax+)
            (null (aref *board* nx ny)))
        0
        1)))

(defun run ()
  (init-curses)
  (set-num-timesteps)
  (let* ((name (get-pattern-name-from-argv)))
    (if (string-equal name "all")
        (mapc #'run-pattern (get-bag-of-patterns))
        (run-pattern name)))
  (exit-life))

(defun run-pattern (name)
  (let ((pattern (read-pattern-from-file name)))
    (populate-board pattern))
  (game-loop)
  (reset-board))

(defun init-curses ()
  (initscr)
  (raw)
  (keypad *stdscr* TRUE)
  (curs-set 0)
  (noecho))

(defun game-loop ()
  (dotimes (i *time-steps*)
    (progn (draw-board)
           (update-board)
           (sleep 0.5))))

(defun draw-board ()
    (dotimes (x +xmax+)
      (dotimes (y +ymax+)
        (if (aref *board* x y)
            (draw x y (char-code #\*))
            (draw x y (char-code #\Space)))))
    (refresh))

(defun draw (x y ch)
  (mvaddch x y ch))

(defun exit-life ()
  (endwin)
 (sb-ext:exit)); (quit));  (bye)); (sb-ext:exit))

(defun get-pattern-name-from-argv ()
  (let* ((args sb-ext:*posix-argv*) ;   ext:comma,nd-args)   ; sb-ext:*posix-argv*)
         (num-args (length args))
         (default-pattern "TOAD"))
    (if (> num-args 1)
        (sanitize-name (second args))
        default-pattern)))

(defun get-num-timesteps-from-argv ()
  (let* ((args sb-ext:*posix-argv*);ext:command-args) ;sb-ext:*posix-argv*)
         (num-args (length args)))
    (if (> num-args 2)
        (safely-read-from-string (third args))
        20)))

(defun set-num-timesteps ()
  (setf *time-steps* (get-num-timesteps-from-argv)))

(defun safely-read-from-string (str &rest read-from-string-args)
  (let ((*read-eval* nil))
    (ignore-errors
      (apply 'read-from-string str read-from-string-args))))

(defun read-pattern-from-file (name)
  (with-open-file (stream "patterns")
    (let ((pattern '()))
      (do ((line (read-line stream nil)
                 (read-line stream nil)))
          ((null line) (sanitize-pattern (nreverse pattern)))
        (when (equal (sanitize-name line) name)
          (do ((pattern-line (read-line stream nil)
                             (read-line stream nil)))
              ((or (null pattern-line) (equal pattern-line "")))
                           (push pattern-line pattern)))))))

(defun sanitize-name (string)
  (string-downcase (substitute #\- #\Space string)))

(defun sanitize-pattern (pattern)
  (labels ((pattern-symbol-p (char)
             (or (char= char #\*) (char= char #\.)))
           (sanitizer (string)
             (remove-if-not #'pattern-symbol-p string)))
    (mapcar #'sanitizer pattern)))

(defun populate-board (pattern)
  (let* ((pattern-length (length (first pattern)))
         (start (round (- (/ +xmax+ 2) (/ pattern-length 2)))))
    (loop
       for line in pattern
       for x from start below +xmax+
       do (loop
             for char across line
             for y from start below +ymax+
             do (when (char= char #\*)
                  (setf (aref *board* x y) 't))))))

(defun reset-board ()
  (loop
     for x from 0 below +xmax+
     for y from 0 below +ymax+
       do (setf (aref *board* x y) nil)))

(defun get-bag-of-patterns ()
  (with-open-file (stream +pattern-file+)
    (let ((names '()))
      (do ((line (read-line stream nil)
                 (read-line stream nil)))
          ((null line) (mapcar #'sanitize-name (nreverse names)))
        (unless (string= line "")
            (let ((char (elt line 0)))
           (unless (or (char= char #\Space)
                       (char= char  #\*)
                       (char= char #\.))
             (push line names))))))))

(run)
