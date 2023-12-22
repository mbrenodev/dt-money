import { ReactNode, useEffect, useState, useCallback } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

type Transaction = {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface FetchAllTransactionsProps {
  query?: string
  page?: number
}

interface TransactionContextType {
  transactions: Transaction[]
  allTransactions: Transaction[]
  limitPerPage: number

  fetchTransactions: ({
    query,
    page,
  }: FetchAllTransactionsProps) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransationsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

const limitPerPage = 4

export function TransactionProvider({ children }: TransationsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(
    async ({ page = 1, query }: FetchAllTransactionsProps) => {
      const response = await api.get('/transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
          _page: page,
          _limit: limitPerPage,
        },
      })
      setTransactions(response.data)
    },
    [],
  )

  const fetchAllTransactions = useCallback(async () => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
      },
    })
    setAllTransactions(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data

      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })
      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions({})
  }, [fetchTransactions])

  useEffect(() => {
    fetchAllTransactions()
  }, [fetchAllTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        allTransactions,
        limitPerPage,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
