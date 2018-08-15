var router = require('express').Router();
var studentsRouter = require('../Controllers/students.ctrl');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, done) {
        done(null, "uploads");
    },
    filename: function(req, file, done){
        var fileName = Date.now() + "-" + file.originalname;
        req.body.image = fileName;
        done(null, fileName);
    }
});

var upload = multer({storage : storage});


router.get('/',studentsRouter.getStudents);
router.get('/:pageIndex/:pageSize',studentsRouter.getStudents);
router.post('/',upload.single("image") ,studentsRouter.save);
router.get('/:id', studentsRouter.getStudentsById);
router.delete('/:id',studentsRouter.delete);
router.put('/:id', studentsRouter.update);
router.patch('/:id', studentsRouter.patch);

module.exports = router;