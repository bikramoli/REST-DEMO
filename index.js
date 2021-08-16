const express = require('express');
const app = express();
app.use(express.json());

const Students = [{ id: 1, name: 'Bikram' },
{ id: 2, name: 'Seejan' },
{ id: 3, name: 'Bishal' }]

app.get('/', (req, res) => { res.send('Hello Bikram...') })

app.get('/api/Students', (req, res) => { res.send(Students) })

app.get('/api/Students/:id', (req, res) => {
    const Student = Students.find(c => c.id === parseInt(req.params.id));
    if (!Student) res.status(404).send('You search did not find any match')
    res.send(Student)
})

app.post('/api/Students', (req, res) => {
    if (!req.body.name || req.body.name < 3) {
        res.status(400).send("Name is required and must be grater than three characters")
        return;
    }
    const Student = {
        id: Students.length + 1,
        name: req.body.name
    }
    Students.push(Student)
    res.send(Students)
})

app.put('/api/Students/:id', (req, res) => {
    const Student = Students.find(c => c.id === parseInt(req.params.id));
    Student.name = req.body.name;
    res.send(Students)
})
app.delete('/api/Students/:id', (req, res) => {
    const Student = Students.find(c => c.id === parseInt(req.params.id));
    res.status(200).send('Successfully deleted..!!!')
    res.send(Students)
})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));