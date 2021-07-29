let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

const PORT = 4001;

app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let Books = {
    list: [
    { id: 1, title: 'Harry Potter', pages: 120, price: 200, amount: 20},
    { id: 2, title: 'Bitcoin 101', pages: 100, price: 120, amount: 35 }]
 }
 let income = 0

router.route('/Books')
      .get((req,res) => res.json(Books))

      .post((req, res) => {
        console.log(req.body)
        let newBook = {}
        newBook.id = (Books.list.length) ? Books.list[Books.list.length - 1].id + 1:1
        newBook.title = req.body.title
        newBook.pages = req.body.pages
        newBook.price = req.body.price
        newBook.amount = req.body.amount
        Books = { "list": [...Books.list, newBook] }
        res.json(Books)
    })

  router.route('/Books/:Book_id')
        .get((req,res) => {
           const Book_id = req.params.Book_id
           const id = books.list.findIndex(item => +item.id === +Book_id)
           res.json(Books.list[id])
        })
       
        .put((req, res) => {
            const Book_id = req.params.Book_id
            const id = books.list.findIndex(item => +item.id === +Book_id)
            Books.list[id].id = req.body.id
            Books.list[id].title = req.body.title
            Books.list[id].page = req.body.page
            Books.list[id].price = req.body.price
            Books.list[id].amount = req.body.amount
            res.json(Books)
        })

        .delete((req, res) => {
            const Book_id = req.params.Book_id
            console.log('BookId: ',Book_id)
            Books.list = Books.list.filter(item => +item.id !== +Book_id )
            res.json(Books)
        })

router.route('/income')
      .get((req, res) => res.json(income)) 

router.route('/purchase/:Book_id')
      .delete((req, res) => {
          const Book_id = req.params.Book_id
          const id = Book.list.findIndex(item => +item.id === +Book_id)
          console.log('BookID: ', Book_id, 'ID: ', id)
          if (id !== -1) {
              income += Books.list[id].price
              Books.list = Books.list.filter(item => +item.id !== +pet_id)
              res.json(Books.list)
          }
          else {
              res.send('Book not found')
  
          }
      })


app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(PORT, () => console.log('server is running...'))
