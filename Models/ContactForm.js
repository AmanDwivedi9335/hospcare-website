import mongoose from 'mongoose';

const contactFormSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

const ContactForm = mongoose.models.ContactForm || mongoose.model('ContactForm', contactFormSchema);
export default ContactForm;
