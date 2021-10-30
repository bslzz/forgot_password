import mongoose from 'mongoose'

const CONNECT_DB = async () => {
  try {
    await mongoose.connect(process.env.DB!)
    console.log('Connected to DB')
  } catch (error) {
    console.log('DB error', error)
  }
}

export default CONNECT_DB
