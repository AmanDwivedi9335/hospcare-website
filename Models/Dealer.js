import mongoose from 'mongoose';

const dealerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    firmName: { type: String, required: true },
    gstin: { type: String, required: true },
  },
  { timestamps: true }
);

const Dealer = mongoose.models.Dealer || mongoose.model('Dealer', dealerSchema);

export default Dealer;
