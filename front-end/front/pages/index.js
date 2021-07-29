import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../styles/front.module.css'
import useSWR, { mutate } from 'swr'

const URL = `http://localhost:4001/api/Books`

export default () => {
    const [Books, setBooks] = useState({})
    const [Book, setBook] = useState('')
    const [id, setid] = useState(0)
    const [title, settitle] = useState('')
    const [page, setpage] = useState(0)
    const [price, setprice] = useState(0)
    const [amount, setamount] = useState(0)
    useEffect(() => {
        getBooks()
    }, [])
    const getBooks = async () => {
        const result = await axios.get(URL)
        setBooks(result.data.list)
    }
    const getBook = async (id) => {
        const result = await axios.get(`${URL}/${id}`)
        console.log('Book id: ', result.data.list)
        setBook(result.data)
    }
    const addBook = async (id, title, page, price, amount) => {
        const result = await axios.post(URL, {
            id,
            title,
            page,
            price,
            amount
        })
        console.log(result.data)
        getBooks()
    }
    const deleteBook = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        getBooks()
    }
    const updateBook = async (id) => {
        const result = await axios.put(`${URL}/${id}`, {
            id,
            title,
            page,
            price,
            amount
        })
        console.log('Book id update: ', result.data)
        getBooks()
    }
    const printBooks = () => {
        console.log('Books:', Books)
        if (Books && Books.length)
            return (Books.map((Book, index) =>
            (<li className={styles.lable} key={index}>
                {(Book) ? Book.id : 0} : {(Book) ? Book.title : '-'} : {(Book) ? Book.page : 0 } : {(Book) ? Book.price : 0 } : {(Book) ? Book.amount : 0 }
                <div className={styles.editbutton}>
                    <span className={styles.list} >
                    <button className={styles.deleteButton} onClick={() => deleteBook(Book.id)}> Delete </button>
                    <button className={styles .getButton} onClick={() => getBook(Book.id)}>Get</button>
                    <button className={styles.updateButton} onClick={() => updateBook(Book.id)}>Update</button>
                    </span>
                </div>
            </li>)
            ))
        else {
            return (<h2>No book</h2>)
        }
    }

    return (
        <div  >
            <h2>Book</h2>
            <ul>{printBooks()}</ul>

          selected Book: {Book.id} {Book.title} {Book.page} {Book.price} {Book.amount}
            <h2 className={styles.inputDisplay} >Add New Book</h2>
            <div className={styles.inputDisplay} >
          id:<input type="number" onChange={(e) => setid(e.target.value)} /> <br />
          Name:<input type="text" onChange={(e) => settitle(e.target.value)} /> <br />
          Pages:<input type="number" onChange={(e) => setpage(e.target.value)} /> <br />
          Price:<input type="number" onChange={(e) => setprice(e.target.value)} /> <br />
          Amount:<input type="number" onChange={(e) => setamount(e.target.value)} /> <br />

            </div>
            <button className={styles.addButton} onClick={() => addBook(id, title,page, price, amount)}>Add new book</button>
        </div>
    )
}
