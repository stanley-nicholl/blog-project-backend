const uuid = require('uuid')
const fs = require('fs')
const path = require('path')


const postFile = path.join(__dirname, '../data/blogs.json')

function getAll(){
  const readData = fs.readFileSync(postFile, 'utf-8')
  blogs = JSON.parse(readData)
  return blogs
}

function getOne(id){
  const errors = []
  const readData = fs.readFileSync(postFile, 'utf-8')
  blogs = JSON.parse(readData)
  let response
  const post = blogs.data.find(post => {
    return post.id === id
  })

  if(!post){
    errors.push(`No post available`)
    response = errors
  }else{
    response = post
  }
  return response
}

function create(body){
  const {title, content} = body
  const errors = []
  const readData = fs.readFileSync(postFile, 'utf-8')
  blogs = JSON.parse(readData)
  let response

  if(!title || !content){
    errors.push('Fields title and content are required')
    response = { errors }
  }else{
    const id = uuid()
    const post = {id, title, content}
    blogs.data.push(post)
    response = post
    const updatedBlogs = JSON.stringify(blogs)
    fs.writeFileSync(postFile, updatedBlogs)
  }
  return response
}


function update(id, body){
  const errors = []
  const { title, content } = body
  const readData = fs.readFileSync(postFile, 'utf-8')
  blogs = JSON.parse(readData)
  let response

  const post = blogs.data.find(post => {
    return post.id === id
  })
  if (!post) {
    errors.push(`Could not find post with id of ${id}`)
    response = { errors }
  } else if(!title || !content){
    errors.push('Fields title and content are required')
    response = { errors }
  }else{
  post.title = title
  post.content = content
  response = post
  const updatedBlogs = JSON.stringify(blogs)
  fs.writeFileSync(postFile, updatedBlogs)
  }
  return response
}

function destroy(id){
  const errors = []
  const readData = fs.readFileSync(postFile, 'utf-8')
  blogs = JSON.parse(readData)
  let response

  const post = blogs.data.find(post => {
    return post.id === id
  })

  if (!post) {
    errors.push(`Could not find post with id of ${id}`)
    response = { errors }
  } else{
    const index = blogs.data.indexOf(post)
    blogs.data.splice(index,1)
    response = blogs
    const updatedBlogs = JSON.stringify(blogs)
    fs.writeFileSync(postFile, updatedBlogs)
  }
  return response
}


module.exports = {getAll, getOne, create, update, destroy}
