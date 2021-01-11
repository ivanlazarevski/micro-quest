const router = require('express').Router();
const errorHandler = require('../utils/error.handler');
const StoryController = require('../controllers/story.controller');
const sc = new StoryController();

// [Get All Books]

// [Get All Chapters for a Book]
router.get('/book/:bookId', (req, res) => {
  if (req.session.user.username) {
    sc.getChaptersForBook(req.params.bookId)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        const errorObject = errorHandler('firestore', error);
        res.status(errorObject.code).json({
          message: errorObject.message,
        });
      });
  }
});

// [Get All Quests for a Chapter]
router.get('/chapter/:chapterId', (req, res) => {
  if (req.session.user.username) {
    sc.getQuestsForChapter(req.params.chapterId)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        const errorObject = errorHandler('firestore', error);
        res.status(errorObject.code).json({
          message: errorObject.message,
        });
      });
  }
});

router.get('/', (req, res) => {
  if (req.session.user.username) {
    sc.getAllBooks()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        const errorObject = errorHandler('firestore', error);
        res.status(errorObject.code).json({
          message: errorObject.message,
        });
      });
  }
});

module.exports = router;
