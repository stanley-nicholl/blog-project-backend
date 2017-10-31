const model = require('../model/model')


function getAll(req, res, next){
  const result = model.getAll()
  res.status(200).json(result)
}

function getOne(req, res, next){

  const id = req.params.id
  const result = model.getOne(id)
  if(result.errors){
    next({ status: 404, message: `Could not find post`, errors: result.errors })
  }else{
    res.status(200).json(result)
  }
}

function create(req, res, next){
  const body = req.body
  const result = model.create(body)
  if(result.errors){
    next({ status: 400, message: `Could not create post`, errors: result.errors })
  }else{
    res.status(201).json(result)
  }
}

function update(req, res, next){
  const id = req.params.id
  const body = req.body
  const result = model.update(id, body)
  if(result.errors){
    next({ status: 404, message: `Could not find post`, errors: result.errors })
  }else{
    res.status(200).json(result)
  }
}

function destroy(req, res, next){
  const id = req.params.id
  const result = model.destroy(id)

  if(result.errors){
    next({ status: 404, message: `Could not find post`, errors: result.errors })
  }else{
    res.status(200).json(result)
  }
}


module.exports = {getAll, getOne, create, update, destroy}
