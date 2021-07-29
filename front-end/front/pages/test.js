import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import styles from '../styles/test.module.css'
import useSWR, { mutate } from 'swr'

const URL = `http://localhost:4001/api/Book/`
const URL2 = `http://localhost:4001/api/income`


const fetcher = url => axios.get(url).then(res => res.data)
const SWR1 = () => {
    const [Books, setBooks] = useState
    const [Book, setBook] = useState('')
    const [id, setid] = useState(0)
    const [title, settitle] = useState('')
    const [page, setpage] = useState(0)
    const [price, setprice] = useState(0)
    const [amount, setamount] = useState(0)
    const [income, setIncome] = useState(0)
    const { data } = useSWR(URL, URL2, fetcher)


    useEffect(() => { getBooks() }, [])
    useEffect(() => { getIncome() }, [])

    const getBooks = async () => {
        let Books = await axios.get(URL)
        setBooks(Books.data)
        
    }
    const getIncome = async () => {
        let income = await axios.get(URL2)
        setIncome(income.data)
        
    }

    const getBook = async (id) => {
        let Book = await axios.get(`${URL}${id}`)
        console.log('Harry id: ', Book.data)
        setBook({id:Book.data.id , title:Book.data.type , page:Book.data.weight ,  price:Book.data.age ,  amount:Book.data.price})
      }



    const printBooks = () => {
        if (Books && Books.length)
            return Books.map((Book, index) =>
                <li className={styles.list} key={index}>
                    <h6>Id:{(Book) ? Book.id : 0}</h6>
                    <h6>Title:{(Book) ? Book.type : '-'}</h6>
                    <h6>Page:{(Book) ? Book.age : 0}</h6>
                    <h6>Price:{(Book) ? Book.weight : 0}</h6>
                    amount:{(Book) ? Book.price : 0}
                    <button className={styles.byttondelet} onClick={() => deleteBook(Book.id)} >Delete</button>
                    <button className={styles.byttonget} onClick={() => getBook(Book.id)}>Get</button>
                    <button className={styles.byttonupdate} onClick={() => updateBook(Book.id)}>Update</button>
                </li>
            )
        else
            return <li> No Book</li>
    }

    const printIncome = () => {
        return income
    }


    const addBook = async (id, title, page, price, amount) => {
        let Books = await axios.post(URL, { id, title, page, price, amount })
        setBooks(Books.data)
    }


    const deleteBook = async (id) => {
        const result = await axios.delete(`${URL}${id}`)
        console.log(result.data)
        getBooks()
    }

    const updateBook = async (id) => {
        const result = await axios.put(`${URL}${id}`, { id, title, page, price, amount })
        
        getBooks()
    }



    return (<div  >
        <h1>Test</h1>
        <h2>Income:{printIncome()}</h2>
        <h2>Book</h2>
        <ul className={styles.list}  >{printBooks()}</ul>
        selected Book: {Book.type} {Book.age} {Book.weight} {Book.price}
        <h2>Add Book</h2>
        <ul className={styles.formadd} >
            Type:<input type="text" onChange={(e) => setType(e.target.value)} /> <br />
        Age:<input type="number" onChange={(e) => setAge(e.target.value)} /> <br />
        Weight:<input type="number" onChange={(e) => setWeight(e.target.value)} /> <br />
        Price:<input type="number" onChange={(e) => setPrice(e.target.value)} /> <br />
            <button className={styles.byttonadd} onClick={() => addBook(type, age, weight, price)}>Add new Book</button>
        </ul>
    </div>
    )
}

export default SWR1