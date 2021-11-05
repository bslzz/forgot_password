import { RequestHandler } from 'express'
import Customer from '../models/customerSchema'

export const createNewCustomerController: RequestHandler = async (
  req,
  res,
  next
) => {
  const { name }: { name: string } = req.body
  try {
    const newCustomer = new Customer({ name })
    await newCustomer.save()
    res.status(200).json({
      message: 'Customer created successfully',
      data: newCustomer
    })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
export const getAllCustomersController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const allCustomers = await Customer.find()
    res.status(200).json({ data: allCustomers })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
