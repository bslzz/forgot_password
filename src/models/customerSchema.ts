import { model, Schema, Document } from 'mongoose'

interface ICustomerSchema extends Document {
  name: string
}

const userSchema: Schema = new Schema<ICustomerSchema>({
  name: {
    type: 'string',
    required: true
  }
})

const Customer = model<ICustomerSchema>('Customer', userSchema)

export default Customer
