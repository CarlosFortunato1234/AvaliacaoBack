import express from "express";
import db from './repository/index.js'
const app = express();

app.use(express.json ())
 
//C
app.post("/api/v1/tarefa", (req, res) => {

const {id, descricao, data, concluido} = req.body

   if(  !id || !descricao || !data || !concluido){ 
//avisar que é pra enviar tudo
 res.send ({ message: "Envie todas as informações para criar a lista de tarefas!"})
 return
   }
    
  //cadastrar no banco
  db.push({ id,descricao, data, concluido}) 
  res.status(201).send({ message: "Tarefa cadastrado com sucesso"})
  
})
//R
app.get("/api/v1/tarefa", (req, res) => {

res.status(200).send(db);


})

app.get("/api/v1/tarefa/:id", (req, res) => {

const id = Number(req.params.id)
const tarefa = db.find(item => item.id === id)
if (!tarefa) {
  returnres.status(404).send({
    message: "Tarefa não encontrada!"
  })
}
res.status(200).send (tarefa);


})
//U
//aqui eu peguei um exemplo de atualizar descrição e data.
app.put("/api/v1/tarefa/:id", (req, res) => {
  const id = Number(req.params.id)
  const tarefa = db.find (item => item.id === id)

  if (!tarefa) {
    res.status(404).send({message: "tarefa não encontrada!"})
    return
  }
   const { descricao, data} = req.body || {}

   if (!descricao || !data) {
    res.status(400).send ({message: "Envie a descricao e a data!"})
    return
   }
   tarefa.descricao = descricao
   tarefa.data = data

   res.status(200).send ({message: "Tarefa atualizada com sucesso! "})



})
//D
// D - Excluir um livro
app.delete("/api/v1/tarefa/:id", (req, res) => {
  const id = Number(req.params.id)
  const index = db.findIndex(item => item.id === id)

  if (index === -1) {
    return res.status(404).send({ message: "Tarefa não encontrada!" })
  }

  db.splice(index, 1)

  res.status(200).send({ message: "Tarefa excluída com sucesso!" })
})
 
//alterar entre concluida e não concluida

app.put ("/api/v1/tarefas/:id/concluido", (req, res) => {
    const id = Number (req.params.id)
    const tarefa= db.find (item => item.id == id)

    if(!tarefa) {
      return res.send ({ message: "Tarefa não encontrada!" })
    }

    tarefa.concluido = ! tarefa.concluido

    res.send(tarefa)
})
//consultar

// Mostrar a tarefa pelo ID somente se estiver pendente
app.get("/api/v1/tarefa/:id/pendente", (req, res) => {
  const id = Number(req.params.id)
  const tarefa = db.find(item => item.id === id)

  if (!tarefa) {
    return res.send({ message: "Tarefa não encontrada!" })
  }

  if (tarefa.concluido == false) {
    res.send(tarefa)
  } else {
    res.send({ message: "Essa tarefa já foi concluída!" })
  }
})
app.listen(3004, () => {
  console.log(`Servidor rodando em http://localhost:3004`);
});