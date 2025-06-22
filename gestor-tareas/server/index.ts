import cors from 'cors';
import express from "express";
import taskRoutes from './routes/tasks.js';


const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json());

app.use('/api/tasks', taskRoutes)


app.get('/', (req, res) => {
    res.send('Backend funcionando 🎉')
})

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})