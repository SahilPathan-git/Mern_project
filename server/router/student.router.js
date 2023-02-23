
const router = require('express').Router()


const Student = require('../model/model.student')

// Get All Data in MonogoDB Get call
router.route('').get(async (req, res) => {
    try {
        const studData = await Student.find()
        res.json(studData)
    } catch (error) {
        res.status(404).send(error)
    }
})

// Add Data in MonogoDB Post call
router.route('/add').post(async (req, res) => {
    const student = req.body.student
    console.log(student)
    try {

        const newStudent = new Student(student)
        newStudent.save()
        res.status(200).json(newStudent)
    } catch (error) {
        res.status(404).json({ message: error.message })
        console.log(error)

    }

})


// Update Data in MonogoDB Put call
router.route('/update/:id').put(async (req, res) => {

    try {

        const result = await Student.findByIdAndUpdate(req.params.id, {
            name: req.body.student.name,
            lname: req.body.student.lname
        }, { new: true })
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//delete student into mongoDB 

router.route('/delete/:id').delete(async (req, res) => {
    try {

        const result = await Student.deleteOne({ _id: req.params.id })
        res.json(result)
    } catch (error) {
        // res.status(500).res.send({ message: error.message })
        console.log(error)
    }
})

module.exports = router